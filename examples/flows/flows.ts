import {
  AspenEnvironment,
  authenticateAllFromFile,
  authenticateForGate,
  configureGate,
  GatingAPI,
  generateAccounts,
  getInnermostError,
  getProvider,
  getProviderConfig,
  getSigner,
  issueToken,
  parseAndVerifyJWT,
  PostFileResponse,
  ProviderConfig,
  PublishingAPI,
  SupportedNetwork,
  uploadFile,
} from '@monaxlabs/aspen-sdk/dist/apis';
import { ClaimBalance, getClaimBalances } from '@monaxlabs/aspen-sdk/dist/claimgraph';
import {
  GasStrategy,
  getGasStrategy,
  ICedarERC1155DropV5,
  ICedarERC1155DropV5__factory,
  ICedarERC721DropV7,
  ICedarERC721DropV7__factory,
} from '@monaxlabs/aspen-sdk/dist/contracts';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { createReadStream } from 'fs';
import { GraphQLClient } from 'graphql-request';
import { URL } from 'url';
import { format } from 'util';
import { demoMnemonic } from './keys';
import {
  collectionInfoFile,
  CollectionPair,
  readCollectionInfo,
  readIssuanceInfo,
  writeCollectionInfo,
  writeIssuanceInfo,
} from './state';
import { deployERC721, wait } from './utils/collection';
import {credentialsFile, providersFile} from "./secrets";

// Global config for flows
const network: SupportedNetwork = 'Mumbai';
const environment: AspenEnvironment = 'production';
const claimGraphUrl = `https://api.thegraph.com/subgraphs/name/silasdavis/claimgraph-${network.toLowerCase()}`;
const numberOfCollectionPairs = 1;
const numberOfTokensPerCollection = 100;

type Drop1155 = ICedarERC1155DropV5;
const Drop1155__factory = ICedarERC1155DropV5__factory;
type Drop721 = ICedarERC721DropV7;
const Drop721__factory = ICedarERC721DropV7__factory;

// Various flows:
const flows = {
  1: { cmd: cmdDeployCollections, desc: 'Contract creation via API of A and B (done once on our end)' },
  2: { cmd: cmdClaimA, desc: 'Claiming some A tokens to some different addresses (client-side flow)' },
  3: { cmd: cmdIssueB, desc: 'Issue B based on looking up claims on A from claimgraph (server-side flow)' },
  4: { cmd: cmdGateA, desc: 'Gating something on A/B (server-side flow)' },
} as const;

// Change this to perform a different run
const flowToRun: (keyof typeof flows)[] = [1, 2, 3, 4];

let providerConfig: ProviderConfig;

async function main(): Promise<void> {
  // Store global auth token
  await authenticateAllFromFile(environment, credentialsFile);
  // Read in provider which is then cached as a singleton
  providerConfig = await getProviderConfig(providersFile);
  await runFlows();
}

async function runFlows(): Promise<void> {
  for (const i of flowToRun) {
    const { cmd, desc } = flows[i];
    console.error(`Running flow ${i}: ${desc}`);
    await cmd();
    console.error('\n');
  }
}

async function cmdDeployCollections(): Promise<void> {
  try {
    const info = await readCollectionInfo();
    console.error(
      `Found collection info so not-redeploying (delete ${collectionInfoFile} if you want to rerun deployment):\n${JSON.stringify(
        info,
        null,
        2,
      )}`,
    );
    return;
  } catch (err) {
    console.error(`Could not read existing collection info, so redeploying collections A and B: ${format(err)}`);
  }

  const collections: CollectionPair[] = await Promise.all(
    new Array(numberOfCollectionPairs).fill(null).map(() => deployERC721Pair()),
  );

  await writeCollectionInfo({
    network,
    environment,
    collections,
  });
}

async function cmdClaimA(): Promise<void> {
  const { collections } = await readCollectionInfo();
  const randomPair = collections[rnd(0, collections.length)];
  const collectionA = randomPair.a;
  const collectionB = randomPair.b;
  const signer = await getSigner(network, providerConfig);
  const provider = signer.provider;
  const numAccounts = 4;
  // TODO: these user signers should be pulled from metamask
  const userSigners = generateAccounts(numAccounts, { mnemonic: demoMnemonic, provider });
  // User signer to do the claims rather than the accounts themselves to avoid having to gas them
  const gasStrategy = await getGasStrategy(provider);
  const dropA = Drop721__factory.connect(collectionA.address, signer);
  // Do some randomised claims
  for (const userSigner of userSigners) {
    const dropAReceiver = Drop721__factory.connect(collectionA.address, userSigner);
    const dropBReceiver = Drop721__factory.connect(collectionB.address, userSigner);
    await claimA(dropA, dropAReceiver, dropBReceiver, gasStrategy, rnd(1, 2));
    await wait(1100, `claim cooldown for ${dropA.address}`);
  }
}

// Issue B based on claims of A
async function cmdIssueB(): Promise<void> {
  const { collections } = await readCollectionInfo();
  // Stub for an actual database - this should have its state saved every issue to avoid double-issuance after a crash
  const issuanceInfo = await readIssuanceInfo();
  const committer = async (issuee: string, tokenId: number) => {
    issuanceInfo[issuee] = (issuanceInfo[issuee] ?? 0) + 1;
  };
  // Grab a random file to demonstrate upload
  const stream = createReadStream(placeHolderFile);
  const uploaded = await uploadFile(stream);
  // Here we are reading all claim balances for all user addresses from A - filter this down by looking at the users
  // address (typically `web3.eth.accounts[0]`)
  const balances = await claimGraphQuery(collections.map((c) => c.a.address));

  const collectionsByAddressOfA = Object.fromEntries(collections.map((c) => [c.a.address.toLowerCase(), c]));

  const tokensIssued = await Promise.all(
    balances.flatMap(({ tokenId: baseTokenId, receiver, totalClaimed, contractAddress }, i) => {
      // Calculate the unclaimed balance based on previously stored value
      const remainingToClaim = BigNumber.from(totalClaimed)
        .sub(issuanceInfo[receiver] ?? 0)
        .toNumber();
      if (remainingToClaim <= 0) {
        return [];
      }
      const collection = collectionsByAddressOfA[contractAddress];
      return new Array(remainingToClaim).fill(null).map(() =>
        issueTokenFlow(collection.b.guid, receiver, Number(baseTokenId), committer, uploaded).then(
          ({ tokenId, collectionGuid }) => ({
            receiver,
            issuedTokenId: tokenId,
            collectionGuid,
          }),
        ),
      );
    }),
  );
  const tokenURIs = await Promise.all(
    tokensIssued.map(({ issuedTokenId, collectionGuid }) => checkTokenURI(collectionGuid, issuedTokenId)),
  );
  await writeIssuanceInfo(issuanceInfo);
  console.error(`The following token Bs have been issued:\n${JSON.stringify(issuanceInfo, null, 2)}`);
  console.error(`Total tokens issued: ${Object.values(issuanceInfo ?? []).reduce((sum, v) => sum + v, 0)}`);
  console.error(tokenURIs);
}

async function cmdGateA(): Promise<void> {
  const {
    collections: [{ a: collectionA }],
  } = await readCollectionInfo();
  const { id, publicKey } = await configureGate(
    network,
    'GateA',
    [
      {
        name: `TokenAHolder`,
        contractAddress: collectionA.address,
        matchType: GatingAPI.RoleMatchType.NFT,
        priority: 1,
        requiredQuantity: 1,
      },
    ],
    { onExisting: 'delete' },
  );

  const provider = await getProvider(network, providerConfig);
  const numAccounts = 4;
  const accounts = generateAccounts(numAccounts, { mnemonic: demoMnemonic, provider });

  for (const account of accounts) {
    const jwtToken = await authenticateForGate(id, account);

    console.error(`Verifying JWT for ${account.address}...`);
    const { payload, roles } = await parseAndVerifyJWT(publicKey, jwtToken);
    console.error(`JWT received for ${payload.sub} with roles ${roles.map((r) => `'${r}'`).join(', ')}`);
  }
}

// Support functions

async function deployERC721Pair(): Promise<CollectionPair> {
  const a = await deployERC721(network, { maxTokens: numberOfTokensPerCollection });
  const b = await deployERC721(network, { maxTokens: numberOfTokensPerCollection });
  return { a, b };
}

async function claimA(
  dropA: Drop721,
  dropAReceiver: Drop721,
  dropBReceiver: Drop721,
  gasStrategy: GasStrategy,
  quantity: number,
): Promise<void> {
  const [condition] = await dropA.getActiveClaimConditions();
  const { pricePerToken, currency } = condition;
  const priceEth = formatEther(pricePerToken);
  const receiver = await dropAReceiver.signer.getAddress();
  try {
    await acceptTerms(dropA, dropAReceiver, receiver, pricePerToken, gasStrategy, async (termsURI) => {
      console.error(
        `Claiming ${quantity} A-type tokens from contract ${dropAReceiver.address} to receiver ${receiver} for ${priceEth} Matic with terms URI ${termsURI}`,
      );
      // TODO: substitute with whether the user accepted terms in UI
      return true;
    });
    await acceptTerms(dropA, dropBReceiver, receiver, pricePerToken, gasStrategy, async (termsURI) => {
      console.error(`Accepting terms on B-type token contract ${dropBReceiver.address} with ${termsURI}`);
      // TODO: substitute with user-acceptance input
      return true;
    });
    // If claimer had any native token we could use them to call
    const tx = await dropA.claim(receiver, quantity, currency, pricePerToken, [], 0, {
      value: pricePerToken.mul(quantity),
      ...gasStrategy,
    });
    console.error(`Claim transaction sent with tx hash ${tx.hash}`);
    await tx.wait();
  } catch (err) {
    const innerError = getInnermostError(err);
    if (innerError) {
      const revertData = innerError.data;
      if (typeof revertData === 'string') {
        const decodedError = dropA.interface.parseError(revertData);
        throw decodedError;
      }
    }
    // Beware stupidly nested solidity errors with 'data' set - they can be decoded to a custom error
    console.error(err);
    process.exit(1);
  }
}

async function gasClaimerWallet(drop: Drop721, claimer: string, pricePerToken: BigNumber, gasStrategy: GasStrategy) {
  const gas = await drop.estimateGas['acceptTerms()']();
  const walletAddress = await drop.signer.getAddress();
  const gasPrice = await drop.provider.getGasPrice();
  const value = gas.mul(gasPrice).add(pricePerToken);
  const claimerBalance = await drop.provider.getBalance(claimer);
  if (claimerBalance.lt(value)) {
    const tx = await drop.signer.sendTransaction({
      from: walletAddress,
      to: claimer,
      value: value.mul(4),
      ...gasStrategy,
    });
    await tx.wait();
  }
}

async function claimGraphQuery(contractAddresses: string[], userAddress?: string): Promise<ClaimBalance[]> {
  const client = new GraphQLClient(claimGraphUrl);
  // NOTE: important to normalise addresses to lowercase before looking them up since they are just stored as string
  // keys in the graph
  return getClaimBalances(client, {
    contractAddress_in: contractAddresses.map((a) => a.toLowerCase()),
    receiver: userAddress ? userAddress.toLowerCase() : undefined,
  });
}

const placeHolderFile = new URL('./assets/tokens/0.jpg', import.meta.url).pathname;

async function issueTokenFlow(
  collectionGuid: string,
  issuee: string,
  baseTokenId: number,
  commitIssue: (issuee: string, tokenId: number) => Promise<void>,
  { ipfsUrl, web2Url, contentType, extension }: PostFileResponse,
): Promise<{ tokenId: number; collectionGuid: string }> {
  const { address } = await PublishingAPI.CollectionService.getCollectionById({ guid: collectionGuid });
  const tokenData = {
    files: [{ fileType: PublishingAPI.FileType.IMAGE, url: web2Url, contentType, extension }],
    // No need for you to do this just showing you what it looks like
    attributes: [
      { trait_type: 'ipfs_backup', traitObject: { name: 'image', value: ipfsUrl } },
      {
        trait_type: 'base_token_id',
        traitObject: { value: baseTokenId },
      },
      {
        trait_type: 'base_contract_address',
        traitObject: { value: address },
      },
    ],
  };
  const { tokenId } = await issueToken(collectionGuid, {
    to: issuee,
    // NOTE: Uncomment to issue with token data
    // tokenData,
  });
  // NOTE: Checkpoint - now we must save the issuee balance to a database
  await commitIssue(issuee, tokenId);
  console.error(`Issued token ${tokenId} at ${address}`);
  return { tokenId, collectionGuid };
}

async function acceptTerms(
  dropPayer: Drop721,
  dropReceiver: Drop721,
  receiver: string,
  pricePerToken: BigNumber,
  gasStrategy: GasStrategy,
  didUserAcceptTerms: (termsURI: string) => Promise<boolean>,
) {
  // Make sure our test wallets have enough gas to claim
  await gasClaimerWallet(dropPayer, receiver, pricePerToken, gasStrategy);
  const termsAlreadyAccepted = await dropReceiver['hasAcceptedTerms(address)'](receiver);
  if (termsAlreadyAccepted) {
    return true;
  }
  // Get terms using this call to get the termsURI, then fetch it, and show the document to user
  const { termsURI } = await dropReceiver.getTermsDetails();
  const termsAccepted = await didUserAcceptTerms(termsURI);
  if (!termsAccepted) {
    throw new Error(`Terms acceptor did not accept terms`);
  }
  const tx = await dropReceiver['acceptTerms()'](gasStrategy);
  console.error(`Accept terms sent with tx hash ${tx.hash}`);
  await tx.wait();
}

async function checkTokenURI(collectionGuid: string, tokenId: number): Promise<string> {
  const { address } = await PublishingAPI.CollectionService.getCollectionById({ guid: collectionGuid });
  if (!address) {
    throw new Error(`Collection has no address, is it deployed?`);
  }
  const drop = Drop721__factory.connect(address, await getProvider(network, providerConfig));
  return await drop.tokenURI(tokenId);
}

// Mod-biased random number in [min, sup)
function rnd(min: number, sup: number): number {
  return Math.floor(min + Math.random() * (sup - min));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
