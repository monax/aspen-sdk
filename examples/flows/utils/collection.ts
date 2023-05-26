import { SupportedNetwork } from '@monaxlabs/aspen-sdk';
import { Collection } from '../state';

export type Phase = {};

export type CollectionOptions = {
  maxTokens: number;
  maxSupplyPerToken: number;
  tokenCount: number;
  terms: string;
};

export async function deployERC1155(
  network: SupportedNetwork,
  phases: Phase[],
  opts?: Partial<CollectionOptions>,
): Promise<Collection> {
  throw new Error(`Needs to be implemented against Aspen API`);
}

export async function deployERC721(network: SupportedNetwork, opts?: Partial<CollectionOptions>): Promise<Collection> {
  throw new Error(`Needs to be implemented against Aspen API`);
}
