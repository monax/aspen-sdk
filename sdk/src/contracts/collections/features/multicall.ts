import { BigNumber, BytesLike, ContractTransaction } from 'ethers';
import { CollectionContract, Signerish, SourcedOverrides } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const MulticallFeatures = ['IMulticallable.sol:IMulticallableV0'] as const;

export type MulticallFeatures = (typeof MulticallFeatures)[number];

export class Multicall extends FeatureSet<MulticallFeatures> {
  constructor(base: CollectionContract) {
    super(base, MulticallFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const multicall = partitioner({
      v0: ['IMulticallable.sol:IMulticallableV0'],
    });

    return { multicall };
  });

  async call(signer: Signerish, data: BytesLike[], overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const { v0 } = this.getPartition('multicall');

    try {
      if (v0) {
        const tx = await v0.connectWith(signer).multicall(data, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'multicall' });
  }

  async estimateGas(signer: Signerish, data: BytesLike[]): Promise<BigNumber> {
    const { v0 } = this.getPartition('multicall');

    try {
      if (v0) {
        const estimate = await v0.connectWith(signer).estimateGas.multicall(data);
        return estimate;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'multicall' });
  }
}
