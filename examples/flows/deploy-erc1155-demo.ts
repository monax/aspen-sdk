import { generateAccounts } from '@monaxlabs/aspen-sdk/dist/apis';
import { IDropClaimConditionV0 } from '@monaxlabs/aspen-sdk/dist/contracts/generated/impl/ICedarERC1155Drop.sol/ICedarERC1155DropV4';
import {
  extractEvents,
  getDeployer,
  getGasStrategy,
  ICedarDeployerV9,
  ICedarERC1155DropV4,
  ICedarERC1155DropV4__factory,
  NATIVE_TOKEN,
  ZERO_BYTES32,
} from '@monaxlabs/aspen-sdk/dist/contracts';
import '@nomiclabs/hardhat-ethers';
import { Overrides, providers } from 'ethers/lib/ethers';
import 'hardhat-deploy';

import ClaimConditionStruct = IDropClaimConditionV0.ClaimConditionStruct;

const log = console.log;
const aspenSpaceshipURL = 'https://ipfs.aspenft.io/ipfs/QmYw8W5U69N541xLnNzHQsGvpJF2jMAJ9qzjptJhwMpMbm/';
const demoMnemonic =
  'sausage orbit answer enroll idle sketch ritual shadow knock actress tennis attack business rule forget deputy invest ready hockey final task elegant flush before';

const cedarERC1155DropName = 'CedarERC1155Drop';

export async function deployCedarERC1155DropDemo(provider: providers.Provider) {
  const wallets = generateAccounts(5, { mnemonic: demoMnemonic, provider: provider });
  const shereen = wallets[0];

  const gas = await getGasStrategy(provider);

  const deployer = getDeployer('Mumbai', provider);
  const contractAddress = await deployDrop(deployer);
  // ONE made earlier on Mumbai. Setting an existing contract here is useful if you want to just do some claims and not
  // redeploy
  // const contractAddress = '0x1584Fe2270771b81C99D3F3D533F0023ADe3eb01';

  log(`Demo ${cedarERC1155DropName} deployed to ${contractAddress}`);

  const dropAdmin = ICedarERC1155DropV4__factory.connect(contractAddress, shereen);
  const drops = wallets.map((s) => ICedarERC1155DropV4__factory.connect(contractAddress, s));
  const numTokens = 9;
  await doRandomClaims(dropAdmin, drops, numTokens, 10, gas);
  await doRandomClaims(dropAdmin, drops, numTokens, 4, gas);
  await doRandomClaims(dropAdmin, drops, numTokens, 30, gas);
  await doRandomClaims(dropAdmin, drops, numTokens, 10, gas);
}

async function deployDrop(cedarDeployer: ICedarDeployerV9): Promise<string> {
  const shereenAddress = await cedarDeployer.signer.getAddress();
  const gas = await getGasStrategy(cedarDeployer.provider);
  let tx = await cedarDeployer.deployCedarERC1155DropV4(
    shereenAddress,
    'Fake SS',
    'FSS',
    'https://ipfs.io/ipfs/QmU6vhPJAdiTaCcpZvRHDY6b8QfHSEHxskhU4oFp5yCwJs',
    [],
    shereenAddress,
    shereenAddress,
    0,
    'https://ipfs.io/ipfs/QmU6vhPJAdiTaCcpZvRHDY6b8QfHSEHxskhU4oFp5yCwJs',
    0,
    shereenAddress,
    gas,
  );

  const [{ contractAddress }] = await extractEvents(cedarDeployer, (f) => f.CedarInterfaceDeployed(), tx);

  log(`Demo ${cedarERC1155DropName} deployed to ${contractAddress}`);
  const dropAdmin = ICedarERC1155DropV4__factory.connect(contractAddress, cedarDeployer.signer);

  // Activate terms
  await dropAdmin.setTermsStatus(true);
  const numTokens = 9;
  log(`Lazy-minting ${numTokens} tokens...`);
  tx = await dropAdmin.lazyMint(numTokens, aspenSpaceshipURL, gas);
  await tx.wait();
  const freemint: ClaimConditionStruct = {
    maxClaimableSupply: 100000,
    quantityLimitPerTransaction: 100,
    startTimestamp: Math.floor(Date.now() / 1000) - 10,
    supplyClaimed: 0,
    waitTimeInSecondsBetweenClaims: 0,
    merkleRoot: ZERO_BYTES32,
    pricePerToken: 0,
    currency: NATIVE_TOKEN,
  };
  for (let tokenId = 0; tokenId < numTokens; tokenId++) {
    log(`Setting claim conditions for tokenId ${tokenId}`);
    tx = await dropAdmin.setClaimConditions(tokenId, [freemint], false, gas);
    await tx.wait();
  }
  return contractAddress;
}

async function doRandomClaims(
  dropAdmin: ICedarERC1155DropV4,
  drops: ICedarERC1155DropV4[],
  numTokens: number,
  maxPerClaim: number,
  overrides?: Overrides,
): Promise<void> {
  for (const drop of drops) {
    const receiver = await drop.signer.getAddress();
    const tokenId = Math.floor(Math.random() * numTokens);
    const quantity = Math.floor(Math.random() * (maxPerClaim - 1)) + 1;
    log(`Claiming ${quantity} of tokenId ${tokenId} for ${receiver}`);
    const tx = await dropAdmin.claim(receiver, tokenId, quantity, NATIVE_TOKEN, 0, [], 0, overrides);
    await tx.wait();
  }
}
