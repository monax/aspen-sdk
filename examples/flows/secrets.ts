// const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));
import {
  Address,
  ApiConfigs,
  APIKeys,
  AspenClient,
  AspenEnvironment,
  getAspenClient,
  getIdentityClient,
  IdentityAPI,
  parse,
  privateKeyAccountFor,
  ProviderConfig,
  SupportedNetwork,
} from '@monaxlabs/aspen-sdk';
import { walletLogin } from '@monaxlabs/aspen-sdk/dist/apis/identity';
import { Wallet } from 'ethers';
import { promises as fs } from 'fs';
import merge from 'ts-deepmerge';
import { allUserOrganizationsScope } from '../../sdk/dist/apis/identity';

export const providersFile = __dirname + '/../secrets/providers.json';
export const apisFile = __dirname + '/../secrets/apis.json';
export const apiKeysFile = __dirname + '/../secrets/api-keys.json';

const flowKeyName = 'aspen-sdk-flow-key';

export async function getProviderConfig(): Promise<ProviderConfig> {
  const js = await readJsonFile(providersFile);
  return parse(ProviderConfig, js);
}

export async function getApiConfigs(): Promise<ApiConfigs> {
  const js = await readJsonFile(apisFile);
  return parse(ApiConfigs, js);
}

export async function getAPIKeys(): Promise<APIKeys> {
  const js = await readJsonFile(apiKeysFile);
  return parse(APIKeys, js);
}

export async function authenticate(
  network: SupportedNetwork,
  environment: AspenEnvironment,
): Promise<{ aspenClient: AspenClient; wallet: Wallet }> {
  // Store global auth token
  const providerConfig = await getProviderConfig();
  const apiConfigs = await getApiConfigs();
  const account = await privateKeyAccountFor(providerConfig, network);
  const identityClient = await getIdentityClient(apiConfigs, environment);
  const response = await walletLogin(account, network, identityClient);
  const walletAddress = parse(Address, account.address);
  let keys = await getAPIKeys();
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
    await fs.writeFile(apiKeysFile, JSON.stringify(keys, null, 2));
    console.error(`Generated API key and saved to ${apiKeysFile}`);
  }

  const aspenClient = getAspenClient(apiConfigs, environment, apiKey);
  return { wallet, aspenClient };
}

async function readJsonFile(file: string): Promise<unknown> {
  const js = await fs.readFile(file);
  return JSON.parse(js.toString());
}
