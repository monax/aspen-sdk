import { Provider } from '@ethersproject/providers';
import { providers, Signer, Wallet } from 'ethers';
import * as t from 'io-ts';
import { JsonFromString } from 'io-ts-types';
import { ChainId } from '../../contracts';
import { Chain } from '../publishing';
import { parseFromEnvOrFile } from './environment';

// A JSON object of type EnvCredentials is expected to be saved here (ignored from repo)
const defaultConfigFile = 'providers.json';
const defaultConfigEnvVarName = 'PROVIDERS_JSON';

const NetworkSecrets = t.partial({
  Mumbai: t.string,
  Mainnet: t.string,
  Goerli: t.string,
  Polygon: t.string,
});

export type Signerish = Signer | Provider;

type NetworkSecrets = t.TypeOf<typeof NetworkSecrets>;

export const ProviderConfig = t.type({
  providerUrls: NetworkSecrets,
  privateKeys: NetworkSecrets,
});

export type ProviderConfig = t.TypeOf<typeof ProviderConfig>;

export type SupportedNetwork = keyof NetworkSecrets;
export const SupportedNetwork = t.keyof(NetworkSecrets.props);

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

type ChainMapEntry = {
  network: SupportedNetwork;
  chain: Chain;
  chainId: ChainId;
};

const ChainMap: Array<ChainMapEntry> = [
  { network: 'Mainnet', chain: Chain.ETHEREUM, chainId: 1 },
  { network: 'Goerli', chain: Chain.GOERLI, chainId: 5 },
  { network: 'Polygon', chain: Chain.POLYGON, chainId: 137 },
  { network: 'Mumbai', chain: Chain.MUMBAI, chainId: 80001 },
];

function getChainMap<T extends keyof ChainMapEntry, K extends keyof ChainMapEntry>(
  val: ChainMapEntry[T],
  source: T,
  target: K,
): ChainMapEntry[K] {
  const entry = ChainMap.find((c) => c[source] === val);
  if (!entry) {
    throw new Error(`Missing ${target}`);
  }
  return entry[target];
}

export const publishingChainFromNetwork = (network: SupportedNetwork): Chain => {
  return getChainMap(network, 'network', 'chain');
};
export const networkFromPublishingChain = (chain: Chain): SupportedNetwork => {
  return getChainMap(chain, 'chain', 'network');
};
export const publishingChainFromChainId = (chainId: ChainId): Chain => {
  return getChainMap(chainId, 'chainId', 'chain');
};
