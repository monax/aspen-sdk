import { CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const IsAspenFeaturesFunctions = {
  v1: 'isICedarFeaturesV0()[bool]',
  v2: 'isIAspenFeaturesV0()[bool]',
} as const;

const IsAspenFeaturesPartitions = {
  v1: [...FeatureFunctionsMap[IsAspenFeaturesFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[IsAspenFeaturesFunctions.v2].drop],
};
type IsAspenFeaturesPartitions = typeof IsAspenFeaturesPartitions;

const IsAspenFeaturesInterfaces = Object.values(IsAspenFeaturesPartitions).flat();
type IsAspenFeaturesInterfaces = (typeof IsAspenFeaturesInterfaces)[number];

export type IsAspenFeaturesCallArgs = [overrides?: CallOverrides];
export type IsAspenFeaturesResponse = boolean;

export class IsAspenFeatures extends ContractFunction<
  IsAspenFeaturesInterfaces,
  IsAspenFeaturesPartitions,
  IsAspenFeaturesCallArgs,
  IsAspenFeaturesResponse
> {
  readonly functionName = 'isAspenFeatures';

  constructor(base: CollectionContract) {
    super(base, IsAspenFeaturesInterfaces, IsAspenFeaturesPartitions, IsAspenFeaturesFunctions);
  }

  call(...args: IsAspenFeaturesCallArgs): Promise<IsAspenFeaturesResponse> {
    return this.isAspenFeatures(...args);
  }

  async isAspenFeatures(overrides: CallOverrides = {}): Promise<boolean> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const isAspen = await v1.connectReadOnly().isICedarFeaturesV0(overrides);
        return isAspen;
      } else if (v2) {
        const isAspen = await v2.connectReadOnly().isIAspenFeaturesV0(overrides);
        return isAspen;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}
