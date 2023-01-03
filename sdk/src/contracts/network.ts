export const ChainIdFromChainName = {
  Mainnet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  BSC: 56,
  xDai: 100,
  Polygon: 137,
  Moonriver: 1285,
  Localhost: 1337,
  Hardhat: 31337,
  Mumbai: 80001,
  Harmony: 1666600000,
  Palm: 11297108109,
  PalmTestnet: 11297108099,
} as const;

export type ChainName = keyof typeof ChainIdFromChainName;
export type ChainId = typeof ChainIdFromChainName[ChainName];

export const ChainNameFromChainId = Object.fromEntries(
  Object.entries(ChainIdFromChainName).map(([n, i]) => [i, n]),
) as Record<ChainId, ChainName>;
