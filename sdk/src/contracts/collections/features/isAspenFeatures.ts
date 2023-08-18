import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type IsAspenFeaturesCallArgs = [params?: ReadParameters];
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

  execute(...args: IsAspenFeaturesCallArgs): Promise<IsAspenFeaturesResponse> {
    return this.isAspenFeatures(...args);
  }

  async isAspenFeatures(params?: ReadParameters): Promise<boolean> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const isAspen = await this.reader(this.abi(v1)).read.isICedarFeaturesV0(params);
        return isAspen;
      } else if (v2) {
        const isAspen = await this.reader(this.abi(v2)).read.isIAspenFeaturesV0(params);
        return isAspen;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const isAspenFeatures = asCallableClass(IsAspenFeatures);
