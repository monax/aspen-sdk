import { createTestClient, http, publicActions } from 'viem';
import { polygonMumbai } from 'viem/chains';

// const PROVIDER_URL = 'http://localhost:8545';
// const TESTNET: Network = {
//   chainId: 63,
//   name: 'classicMordor',
// };

export const getMockPublicClient = () => {
  return createTestClient({
    chain: polygonMumbai,
    mode: 'anvil',
    transport: http(),
  }).extend(publicActions);
};
