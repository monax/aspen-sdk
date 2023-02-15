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

export const Credential = t.type({
  baseUrl: t.string,
  name: t.string,
  password: t.string,
});

export type Credential = t.TypeOf<typeof Credential>;

export const Credentials = t.type({
  gating: Credential,
  publishing: Credential,
});

export type Credentials = t.TypeOf<typeof Credentials>;

export const EnvCredentials = t.partial({
  staging: Credentials,
  develop: Credentials,
  production: Credentials,
  localhost: Credentials,
});

type EnvCredentials = t.TypeOf<typeof EnvCredentials>;

export type AspenEnvironment = keyof EnvCredentials;
export const AspenEnvironment = t.keyof(EnvCredentials.props);
