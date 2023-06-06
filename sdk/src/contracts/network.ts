import * as t from 'io-ts';

export const ChainIdEnum = {
  Mainnet: 1,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  BSC: 56,
  xDai: 100,
  Polygon: 137,
  Moonriver: 1285,
  Mumbai: 80001,
  Harmony: 1666600000,
  Palm: 11297108109,
  PalmTestnet: 11297108099,
  Canto: 7700,
  CantoTestnet: 740,
  Localhost: 1337,
  Hardhat: 31337,
} as const;

export type ChainName = keyof typeof ChainIdEnum;
export const ChainName = t.keyof(ChainIdEnum);

const chainIds = new Set(Object.values(ChainIdEnum));
export type ChainId = (typeof ChainIdEnum)[ChainName];
export const ChainId = new t.Type<ChainId>(
  'ChainId',
  (u): u is ChainId => typeof u === 'number' && chainIds.has(u as ChainId),
  (i, c) => (chainIds.has(Number(i) as ChainId) ? t.success(Number(i) as ChainId) : t.failure(i, c)),
  t.identity,
);

export const ChainNameFromChainId = Object.fromEntries(Object.entries(ChainIdEnum).map(([n, i]) => [i, n])) as Record<
  ChainId,
  ChainName
>;
