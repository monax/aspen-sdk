import { parse } from "@monaxlabs/phloem/dist/schema";
import { partialRecord } from "@monaxlabs/phloem/dist/schema/index.js";
import { Address,Chain } from "@monaxlabs/phloem/dist/types";
import { promises as fs } from 'fs';
import * as t from "io-ts";
import { OidcClient } from "oidc-client-ts";
import merge from 'ts-deepmerge';
import { Hex,HttpTransport,PrivateKeyAccount,WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { AspenClient } from "./aspen/index.js";
import { allUserOrganizationsScope,walletLogin } from "./identity/index.js";
import { IdentityAPI } from './index.js';
import { ViemChain,getWalletClient } from "./providers.js";
import {string} from "fp-ts";

const flowKeyName = 'aspen-sdk-flow-key';

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

export const ApiConfig = t.type({
  identityServiceHost: t.string,
  aspenHost: t.string,
  clientId: t.string,
  redirectUri: t.string,
});

export type ApiConfig = t.TypeOf<typeof ApiConfig>;

export const AspenEnvironment = t.keyof({
  stagingmain: null,
  nightlymain: null,
  production: null,
  develop: null,
  localhost: null,
});

export type AspenEnvironment = t.TypeOf<typeof AspenEnvironment>;

export const ApiConfigs = partialRecord(AspenEnvironment, ApiConfig);

export type ApiConfigs = t.TypeOf<typeof ApiConfigs>;

export const APIKeys = partialRecord(AspenEnvironment, partialRecord(SupportedNetwork, t.record(Address, t.string)));

export type APIKeys = t.TypeOf<typeof APIKeys>;

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

export function getAspenClient(config: ApiConfig, apiKey: string): AspenClient {
  const { aspenHost } = config;
  return AspenClient.new({ baseUrl: aspenHost, apiKey });
}

export function getIdentityClient(config: ApiConfig): OidcClient {
  const { identityServiceHost, clientId, redirectUri } = config;
  return new OidcClient({
    authority: identityServiceHost,
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile identity:profile.write aspen_api offline_access',
  });
}

export async function getProviderConfig(providersFile: string): Promise<ProviderConfig> {
  const js = await readJsonFile(providersFile);
  return parse(ProviderConfig, js);
}

export async function getApiConfigs(apisFile: string): Promise<ApiConfigs> {
  const js = await readJsonFile(apisFile);
  return parse(ApiConfigs, js);
}

export interface APIKeyCache {
    getApiKey(env: AspenEnvironment, network: SupportedNetwork, walletAddress: Address): Promise<string>;
}

export class FileAPIKeyCache implements APIKeyCache {
  constructor(private readonly apiKeysFile: string) {

  }

  async getApiKey(environment: AspenEnvironment, network: SupportedNetwork, walletAddress: Address): Promise<string> {
    const js = await readJsonFile(this.apiKeysFile);
    let keys = parse(APIKeys, js);
    let apiKey = keys[environment]?.[network]?.[walletAddress];
    if (apiKey) {
      console.error(`Found API key for ${walletAddress}, reusing...`);
    } else {
      console.error(`Generating API key for ${walletAddress}`);
      const keyResponse = await IdentityAPI.ProfileService.generateApiKeyForSignedInUser({
        requestBody: { name: flowKeyName, scopes: allUserOrganizationsScope },
      });
      apiKey = keyResponse.key;
      keys = merge(keys, { [environment]: { [walletAddress]: apiKey } });
      await fs.writeFile(this.apiKeysFile, JSON.stringify(keys, null, 2));
      console.error(`Generated API key and saved to ${this.apiKeysFile}`);
    }
    return apiKey
  }

}

export async function authenticate<T extends SupportedNetwork>(
  network: T,
  environment: AspenEnvironment,
  providerConfig: ProviderConfig,
  apiConfig: ApiConfig,
  apiKeyCache: APIKeyCache,
): Promise<{ aspenClient: AspenClient; wallet:  WalletClient<HttpTransport, ViemChain<T>, PrivateKeyAccount>}> {
  // Store global auth token
  const account = await privateKeyAccountFor(providerConfig, network);
  const identityClient = await getIdentityClient(apiConfig);
  const response = await walletLogin(account, Chain[network], identityClient);
  const walletAddress = parse(Address, account.address);
  const apiKey = await apiKeyCache.getApiKey(environment, network, walletAddress)
  const aspenClient = getAspenClient(apiConfig, apiKey);
  const wallet = getWalletClient(network, providerConfig)
  return { wallet, aspenClient };
}

async function readJsonFile(file: string): Promise<unknown> {
  const js = await fs.readFile(file);
  return JSON.parse(js.toString());
}
