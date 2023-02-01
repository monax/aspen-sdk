import { CollectionContract } from '../..';
import { FeatureSet } from './features';

import { BytesLike } from 'ethers';
import { SdkError, SdkErrorCode } from '../errors';

export const ContractFeatures = [
  'IAspenFeatures.sol:ICedarFeaturesV0',
  'ICedarFeatures.sol:ICedarFeaturesV0',
  'IAspenFeatures.sol:IAspenFeaturesV0',
] as const;

export type ContractFeatures = (typeof ContractFeatures)[number];

export class Contract extends FeatureSet<ContractFeatures> {
  constructor(base: CollectionContract) {
    super(base, ContractFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const isAspen = partitioner({
      v0: ['IAspenFeatures.sol:ICedarFeaturesV0', 'ICedarFeatures.sol:ICedarFeaturesV0'],
      v1: ['IAspenFeatures.sol:IAspenFeaturesV0'],
    });

    const supportedFeatures = partitioner({
      v0: [
        'IAspenFeatures.sol:IAspenFeaturesV0',
        'IAspenFeatures.sol:ICedarFeaturesV0',
        'ICedarFeatures.sol:ICedarFeaturesV0',
      ],
    });

    return { isAspen, supportedFeatures };
  });

  async isAspen(): Promise<boolean> {
    const { v0, v1 } = this.getPartition('isAspen');

    try {
      if (v0) {
        const isAspen = await v0.connectReadOnly().isICedarFeaturesV0();
        return isAspen;
      } else if (v1) {
        const isAspen = await v1.connectReadOnly().isIAspenFeaturesV0();
        return isAspen;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'contract', function: 'isAspen' });
  }

  async supportedFeatures(): Promise<string[]> {
    const { v0 } = this.getPartition('supportedFeatures');

    try {
      if (v0) {
        const isAspen = await v0.connectReadOnly().supportedFeatures();
        return isAspen;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'contract', function: 'supportedFeatures' });
  }

  async supportsInterface(interfaceId: BytesLike): Promise<boolean> {
    const { v0 } = this.getPartition('supportedFeatures');

    try {
      if (v0) {
        const isAspen = await v0.connectReadOnly().supportsInterface(interfaceId);
        return isAspen;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'contract', function: 'supportsInterface' });
  }
}
