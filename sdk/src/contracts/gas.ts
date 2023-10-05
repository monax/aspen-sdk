import { Chain, parseGwei, PublicClient, Transport } from 'viem';
import { polygon, polygonMumbai } from 'viem/chains';

export type GasStrategy = {
  maxPriorityFeePerGas?: bigint;
  maxFeePerGas?: bigint;
  gasLimit?: number;
};

const simpleStrategy: Chain[] = [polygonMumbai, polygon];

const priorityFee = parseGwei('10');

export async function getGasStrategy(publicClient: PublicClient<Transport, Chain>): Promise<GasStrategy> {
  if (simpleStrategy.includes(publicClient.chain)) {
    const maxPriorityFeePerGas = priorityFee;
    const block = await publicClient.getBlock({
      blockTag: 'latest',
    });
    const maxFeePerGas = block.baseFeePerGas ?? BigInt(0) + maxPriorityFeePerGas - BigInt(1);
    return { maxPriorityFeePerGas, maxFeePerGas };
  }
  return {};
}
