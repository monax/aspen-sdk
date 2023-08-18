import {
  AspenClient,
  AspenContractChainId,
  extractEvents,
  getCurrentDeployer,
  parse,
  SupportedNetwork,
} from '@monaxlabs/aspen-sdk';
import { Signer } from 'ethers';
import { Collection } from '../state';

export type CollectionOptions = {
  name: string;
  maxTokens?: number;
};

export async function deployERC1155(network: SupportedNetwork, opts?: Partial<CollectionOptions>): Promise<Collection> {
  throw new Error(`Needs to be implemented against Aspen API`);
}

export async function deployERC721(
  signer: Signer,
  client: AspenClient,
  { name }: CollectionOptions,
): Promise<Collection> {
  const orgs = await client.getOrganizationsForUser();
  const org = orgs.find((o) => o.role === 'ADMIN');
  if (!org) {
    throw new Error(`No organization for which user is admin`);
  }
  const resp = await client.createStorefront({
    body: { name, organizationId: org.organizationId, isTestStorefront: false },
  });
  const chainId = parse(AspenContractChainId, await signer.getChainId());
  const deployer = getCurrentDeployer(signer, chainId);
  const tx = await deployer.deployAspenERC721Drop({name, symbol: name, contractURI});
  const [{ contractAddress }] = await extractEvents(deployer, (f) => f.AspenInterfaceDeployed(), tx);
  client.updateStorefront({body: { address: contractAddress, storefrontId: resp.id}}
  return { address: contractAddress, guid: resp.id };
  throw new Error(`Needs to be implemented against Aspen API`);
}
