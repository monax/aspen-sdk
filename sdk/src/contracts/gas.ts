import { BigNumber, ethers } from 'ethers';
import { ChainIdEnum } from './network';

export type GasStrategy = {
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasLimit?: number;
};

const simpleStrategy: number[] = [ChainIdEnum.Mumbai, ChainIdEnum.Polygon];

const priorityFee = ethers.utils.parseUnits('10', 'gwei');

export async function getGasStrategy(provider: ethers.providers.Provider): Promise<GasStrategy> {
  const { chainId } = await provider.getNetwork();
  if (simpleStrategy.includes(chainId)) {
    const maxPriorityFeePerGas = priorityFee;
    const block = await provider.getBlock('latest');
    const maxFeePerGas = block.baseFeePerGas?.add(maxPriorityFeePerGas).sub(1);
    return { maxPriorityFeePerGas, maxFeePerGas };
  }
  return {};
}

export async function signerWithGasStrategy<T extends ethers.Signer>(signer: T): Promise<T> {
  const provider = signer.provider;
  if (!provider) {
    return signer;
  }
  return extendWithPrototype(
    {
      provider: await providerWithGasStrategy(provider),
    },
    signer,
  );
}

export async function providerWithGasStrategy(provider: ethers.providers.Provider): Promise<ethers.providers.Provider> {
  const gasStrategy = await getGasStrategy(provider);
  const feeData = await provider.getFeeData();
  return extendWithPrototype(
    {
      getFeeData: async () => {
        console.error(`Using signer with custom gas strategy`);
        return {
          ...feeData,
          ...gasStrategy,
        };
      },
    },
    provider,
  );
}

// Cannot get type inference to correctly infer keys from the Provider type (inference over class types seem flaky
// in general), so Object works here
// eslint-disable-next-line @typescript-eslint/ban-types
function extendWithPrototype<TObj, TProto extends Object>(
  obj: TObj,
  proto: TProto,
): TObj & TProto & { _pandoExtendWithPrototype: true } {
  // Proxy everything other than what is defined on obj to proto
  return Object.assign(Object.create(proto), obj, { _pandoExtendWithPrototype: true });
}
