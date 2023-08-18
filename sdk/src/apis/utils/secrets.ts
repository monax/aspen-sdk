import { Address } from '@monaxlabs/phloem/dist/types';
import * as t from 'io-ts';
import { OidcClient } from 'oidc-client-ts';
import { Hex, PrivateKeyAccount } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { AspenClient } from '../aspen';

export const NetworkSecrets = t.partial({
  Mumbai: t.string,
  Mainnet: t.string,
  Goerli: t.string,
  Polygon: t.string,
});

export type NetworkSecrets = t.TypeOf<typeof NetworkSecrets>;

export const APIKeys = t.record(Address, t.string);

export type APIKeys = t.TypeOf<typeof APIKeys>;

export const ProviderConfig = t.type({
  providerUrls: NetworkSecrets,
  privateKeys: NetworkSecrets,
});

export type ProviderConfig = t.TypeOf<typeof ProviderConfig>;

export type SupportedNetwork = keyof NetworkSecrets;
export const SupportedNetwork = t.keyof(NetworkSecrets.props);

export const ApiConfig = t.type({
  identityServiceHost: t.string,
  aspenHost: t.string,
  clientId: t.string,
  redirectUri: t.string,
});

export type IdentityClientConfig = t.TypeOf<typeof ApiConfig>;

export const ApiConfigs = t.partial({
  staging: ApiConfig,
  develop: ApiConfig,
  production: ApiConfig,
  localhost: ApiConfig,
});

export type ApiConfigs = t.TypeOf<typeof ApiConfigs>;

export type AspenEnvironment = keyof ApiConfigs;
export const AspenEnvironment = t.keyof(ApiConfigs.props);

export async function privateKeyAccountFor(
  config: ProviderConfig,
  network: SupportedNetwork,
): Promise<PrivateKeyAccount> {
  const privateKey = config.privateKeys[network];
  if (!privateKey) {
    throw new Error(`No private key found for network ${network}`);
  }
  return privateKeyToAccount(privateKey as Hex);
}

export function getAspenClient(configs: ApiConfigs, env: AspenEnvironment, apiKey: string): AspenClient {
  const config = configs[env];
  if (!config) {
    throw new Error(`No aspen client config found for environment ${env}`);
  }
  const { aspenHost } = config;
  return new AspenClient({ baseUrl: aspenHost, apiKey });
}

export function getIdentityClient(configs: ApiConfigs, env: AspenEnvironment): OidcClient {
  const config = configs[env];
  if (!config) {
    throw new Error(`No identity client config found for environment ${env}`);
  }
  const { identityServiceHost, clientId, redirectUri } = config;
  return new OidcClient({
    authority: identityServiceHost,
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile identity:profile.write aspen_api offline_access',
  });
}
