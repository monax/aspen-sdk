import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import * as t from 'io-ts';
import { ChainId } from '../../contracts';
import { Chain } from '../publishing';

export type Signerish = Signer | Provider;

export const NetworkSecrets = t.partial({
  Mumbai: t.string,
  Mainnet: t.string,
  Goerli: t.string,
  Polygon: t.string,
});

export type NetworkSecrets = t.TypeOf<typeof NetworkSecrets>;

export const ProviderConfig = t.type({
  providerUrls: NetworkSecrets,
  privateKeys: NetworkSecrets,
});

export type ProviderConfig = t.TypeOf<typeof ProviderConfig>;

export type SupportedNetwork = keyof NetworkSecrets;
export const SupportedNetwork = t.keyof(NetworkSecrets.props);

export type ChainMapEntry = {
  network: SupportedNetwork;
  chain: Chain;
  chainId: ChainId;
};
