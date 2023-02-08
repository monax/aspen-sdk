import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const IsAspenFeaturesPartitions = {
  v1: [...FeatureFunctionsMap['isICedarFeaturesV0()[bool]'].drop],
  v2: [...FeatureFunctionsMap['isIAspenFeaturesV0()[bool]'].drop],
};
type IsAspenFeaturesPartitions = typeof IsAspenFeaturesPartitions;

const IsAspenFeaturesInterfaces = Object.values(IsAspenFeaturesPartitions).flat();
type IsAspenFeaturesInterfaces = (typeof IsAspenFeaturesInterfaces)[number];

export type IsAspenFeaturesCallArgs = [overrides?: SourcedOverrides];
export type IsAspenFeaturesResponse = boolean;

export class IsAspenFeatures extends ContractFunction<
  IsAspenFeaturesInterfaces,
  IsAspenFeaturesPartitions,
  IsAspenFeaturesCallArgs,
  IsAspenFeaturesResponse
> {
  readonly functionName = 'isAspenFeatures';

  constructor(base: CollectionContract) {
    super(base, IsAspenFeaturesInterfaces, IsAspenFeaturesPartitions);
  }

  call(...args: IsAspenFeaturesCallArgs): Promise<IsAspenFeaturesResponse> {
    return this.isAspenFeatures(...args);
  }

  async isAspenFeatures(overrides?: SourcedOverrides): Promise<boolean> {
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
