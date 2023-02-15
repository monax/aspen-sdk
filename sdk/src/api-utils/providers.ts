import { providers, Wallet } from 'ethers';
import { JsonFromString } from 'io-ts-types';
import { NetworkSecrets, ProviderConfig, SupportedNetwork } from '../apis';
import { parseFromEnvOrFile } from './environment';

// A JSON object of type EnvCredentials is expected to be saved here (ignored from repo)
const defaultConfigFile = 'providers.json';
const defaultConfigEnvVarName = 'PROVIDERS_JSON';

export const supportedNetworks = Object.freeze(Object.keys(NetworkSecrets.props)) as SupportedNetwork[];

export async function getProvider(
  network: SupportedNetwork,
  providerConfig: ProviderConfig,
  chainId?: number,
): Promise<providers.JsonRpcProvider> {
  const { providerUrls } = providerConfig;
  const providerUrl = providerUrls[network];
  if (!providerUrl) {
    throw new Error(`No provider URL provided for network ${network}`);
  }
  return new providers.JsonRpcProvider(providerUrl, chainId);
}

export async function getSigner(network: SupportedNetwork, providerConfig: ProviderConfig): Promise<Wallet> {
  const { privateKeys } = providerConfig;
  const provider = await getProvider(network, providerConfig);
  const privateKey = privateKeys[network];
  if (!privateKey) {
    throw new Error(`No private key provided for network ${network}`);
  }
  return new Wallet(privateKey, provider);
}

export async function getProviderConfig(
  configFile = defaultConfigFile,
  configEnvVarName = defaultConfigEnvVarName,
): Promise<ProviderConfig> {
  return parseFromEnvOrFile(JsonFromString.pipe(ProviderConfig), configFile, configEnvVarName);
}
