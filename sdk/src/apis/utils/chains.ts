import { ChainId } from '../../contracts';
import { Chain } from '../publishing';
import { ChainMapEntry, SupportedNetwork } from './types';

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
