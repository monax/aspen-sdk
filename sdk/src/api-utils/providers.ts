import { parse } from '@monaxlabs/phloem/dist/schema';
import { PrefixedHex } from '@monaxlabs/phloem/dist/types';
import { JsonFromString } from 'io-ts-types';
import {
  Chain,
  createPublicClient,
  createWalletClient,
  http,
  HttpTransport,
  PrivateKeyAccount,
  PublicClient,
  WalletClient,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { goerli, mainnet, polygon, polygonMumbai } from 'viem/chains';
import { NetworkSecrets, ProviderConfig, SupportedNetwork } from '../apis';
import { parseFromEnvOrFile } from './environment';

// A JSON object of type EnvCredentials is expected to be saved here (ignored from repo)
const defaultConfigFile = 'providers.json';
const defaultConfigEnvVarName = 'PROVIDERS_JSON';

export const supportedNetworks = Object.freeze(Object.keys(NetworkSecrets.props)) as SupportedNetwork[];

const viemChainByName = {
  Mainnet: mainnet,
  Goerli: goerli,
  Polygon: polygon,
  Mumbai: polygonMumbai,
} as const satisfies Record<SupportedNetwork, Chain>;

export type ViemChain<T extends SupportedNetwork> = (typeof viemChainByName)[T];

export function getPublicClient<T extends SupportedNetwork>(
  network: T,
  providerConfig: ProviderConfig,
): PublicClient<HttpTransport, ViemChain<T>> {
  const { providerUrls } = providerConfig;
  const providerUrl = providerUrls[network];
  if (!providerUrl) {
    throw new Error(`No provider URL provided for network ${network}`);
  }
  return createPublicClient({ chain: viemChainByName[network], transport: http(providerUrl) });
}

export function getWalletClient<T extends SupportedNetwork>(
  network: T,
  providerConfig: ProviderConfig,
): WalletClient<HttpTransport, ViemChain<T>, PrivateKeyAccount> {
  const { providerUrls, privateKeys } = providerConfig;
  const providerUrl = providerUrls[network];
  if (!providerUrl) {
    throw new Error(`No provider URL provided for network ${network}`);
  }
  const privateKey = privateKeys[network];
  if (!privateKey) {
    throw new Error(`No private key provided for network ${network}`);
  }
  return createWalletClient({
    account: privateKeyToAccount(parseHex(privateKey)),
    chain: viemChainByName[network],
    transport: http(providerUrl),
  });
}

export async function getProviderConfig(
  configFile = defaultConfigFile,
  configEnvVarName = defaultConfigEnvVarName,
): Promise<ProviderConfig> {
  return parseFromEnvOrFile(JsonFromString.pipe(ProviderConfig), configFile, configEnvVarName);
}

// TODO: put somewhere more general
function parseHex(hex: string): PrefixedHex & `0x${string}` {
  // Naturally this is safe
  return parse(PrefixedHex, hex) as PrefixedHex & `0x${string}`;
}
