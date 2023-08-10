import { Address, Chain, parse } from '@monaxlabs/aspen-sdk';
import { generateAccounts, getProvider, getSigner } from '@monaxlabs/aspen-sdk/dist/api-utils';
import {
  AspenEnvironment,
  authenticateForGate,
  configureGate,
  GatingAPI,
  parseAndVerifyJWT,
  ProviderConfig,
  SupportedNetwork,
} from '@monaxlabs/aspen-sdk/dist/apis';
import {
  CollectionContract,
  extractCustomError,
  GasStrategy,
  getGasStrategy,
  ICedarERC1155DropV5,
  ICedarERC1155DropV5__factory,
  ICedarERC721DropV7,
  ICedarERC721DropV7__factory,
  IssueSuccessState,
  PendingIssue,
} from '@monaxlabs/aspen-sdk/dist/contracts';
import { BigNumber, BigNumberish, Signer } from 'ethers';
import { providers } from 'ethers/lib/ethers';
import { formatEther } from 'ethers/lib/utils';
import { format } from 'util';
import { demoMnemonic } from './keys';
import { authenticate } from './secrets';
import { collectionInfoFile, CollectionPair, readCollectionInfo, writeCollectionInfo } from './state';
import { deployERC721 } from './utils/collection';

// Global config for flows
const network: SupportedNetwork = 'Goerli';
const environment: AspenEnvironment = 'production';
const numberOfCollectionPairs = 1;
const numberOfTokensPerCollection = 100;

type Drop1155 = ICedarERC1155DropV5;
const Drop1155__factory = ICedarERC1155DropV5__factory;
type Drop721 = ICedarERC721DropV7;
const Drop721__factory = ICedarERC721DropV7__factory;
type Drop = Drop721 | Drop1155;

// const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));
const placeHolderFile = __dirname + '/assets/tokens/0.jpg';

// Various flows:
const flows = {
  1: { cmd: cmdDeployCollections, desc: 'Contract creation via API of collections A and B (done once on our end)' },
  2: { cmd: cmdClaimA, desc: 'Claiming some A tokens to some different addresses (client-side flow)' },
  4: { cmd: cmdDirectIssueB, desc: 'Issue B directly from contract' },
  5: { cmd: cmdGateA, desc: 'Gating something on A/B (server-side flow)' },
} as const;

// Change this to perform a different run
// const flowToRun: (keyof typeof flows)[] = [1, 2, 3, 4];
const flowToRun: (keyof typeof flows)[] = [1, 4];

let providerConfig: ProviderConfig;

async function main(): Promise<void> {
  // Store global auth token
  const { aspenClient } = await authenticate(network, environment);
  const resp = await aspenClient.request(
    'getStorefrontPublicChainIdAndAddress',
    { chainId: Chain.Mainnet, address: parse(Address, '0x3006d58cB3f1b94074D3898dF6367BD8cCf5f908') },
    null,
    null,
  );
  console.log(resp);
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

async function cmdDirectIssueB(): Promise<void> {
  const {
    collections: [{ b }],
  } = await readCollectionInfo();
  const signer = await getSigner(network, providerConfig);
  const provider = signer.provider;
  const contract = await CollectionContract.from(signer.provider, b.address);

  const maxSize = 10;
  const accounts = generateAccounts(maxSize, { mnemonic: demoMnemonic, provider });

  const gasStrategy = await getGasStrategy(provider);

  const promises: Promise<IssueSuccessState>[] = [];
  for (const account of accounts) {
    const signerAddress = await signer.getAddress();
    console.error(`Calling issue to receiver ${account.address} with signer ${signerAddress}`);
    promises.push(
      new PendingIssue(contract, null).processAsync(signer, parse(Address, account.address), 1, gasStrategy),
    );
  }
  const issuedTokens = (await Promise.all(promises)).map((s) => s.tokens).flat();

  console.error(
    `Issued tokens ${issuedTokens
      .map((i) => `tokenId: ${i.tokenId}, quantity: ${i.quantity}, receiver: ${i.receiver}`)
      .join(', ')} on contract ${contract.address}`,
  );
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
    const jwtToken = await authenticateForGate(Chain[network], id, account);

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
  const phase = await dropA.getActiveClaimConditions();
  const { pricePerToken, currency } = phase.condition;
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
    const customError = extractCustomError(dropA.interface, err);
    if (customError) {
      throw customError;
    }
    throw err;
  }
}

async function gasClaimerWalletForAcceptTerms(
  drop: Drop721 | Drop1155,
  claimer: string,
  pricePerToken: BigNumber,
  gasStrategy: GasStrategy,
) {
  const gas = await drop.estimateGas['acceptTerms()']();
  await gasClaimerWallet(drop.signer, drop.provider, gas, claimer, pricePerToken, gasStrategy);
}

async function gasClaimerWallet(
  signer: Signer,
  provider: providers.Provider,
  gas: BigNumberish,
  claimer: string,
  pricePerToken: BigNumber,
  gasStrategy: GasStrategy,
) {
  const walletAddress = await signer.getAddress();
  console.error(`Gassing claimer wallet ${walletAddress}...`);
  const gasPrice = await provider.getGasPrice();
  const value = gasPrice.mul(gas).add(pricePerToken);
  const claimerBalance = await provider.getBalance(claimer);
  if (claimerBalance.lt(value)) {
    const tx = await signer.sendTransaction({
      from: walletAddress,
      to: claimer,
      value: value.mul(4),
      ...gasStrategy,
    });
    await tx.wait();
  }
}

async function acceptTerms(
  dropPayer: Drop,
  dropReceiver: Drop,
  receiver: string,
  pricePerToken: BigNumber,
  gasStrategy: GasStrategy,
  didUserAcceptTerms: (termsURI: string) => Promise<boolean>,
) {
  // Make sure our test wallets have enough gas to claim
  await gasClaimerWalletForAcceptTerms(dropPayer, receiver, pricePerToken, gasStrategy);
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

// Mod-biased random number in [min, sup)
function rnd(min: number, sup: number): number {
  return Math.floor(min + Math.random() * (sup - min));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export function wait(ms: number, reason?: string): Promise<void> {
  if (reason) {
    console.error(`Waiting ${ms}ms for ${reason}...`);
  }
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
