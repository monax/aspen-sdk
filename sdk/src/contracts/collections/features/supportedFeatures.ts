import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SupportedFeaturesFunctions = {
  v1: 'supportedFeatures()[string[]]',
} as const;

const SupportedFeaturesPartitions = {
  v1: [...FeatureFunctionsMap[SupportedFeaturesFunctions.v1].drop],
};
type SupportedFeaturesPartitions = typeof SupportedFeaturesPartitions;

const SupportedFeaturesInterfaces = Object.values(SupportedFeaturesPartitions).flat();
type SupportedFeaturesInterfaces = (typeof SupportedFeaturesInterfaces)[number];

export type SupportedFeaturesCallArgs = [overrides?: SourcedOverrides];
export type SupportedFeaturesResponse = string[];

export class SupportedFeatures extends ContractFunction<
  SupportedFeaturesInterfaces,
  SupportedFeaturesPartitions,
  SupportedFeaturesCallArgs,
  SupportedFeaturesResponse
> {
  readonly functionName = 'supportedFeatures';

  constructor(base: CollectionContract) {
    super(base, SupportedFeaturesInterfaces, SupportedFeaturesPartitions, SupportedFeaturesFunctions);
  }

  call(...args: SupportedFeaturesCallArgs): Promise<SupportedFeaturesResponse> {
    return this.supportedFeatures(...args);
  }

  async supportedFeatures(overrides?: SourcedOverrides): Promise<string[]> {
    const v1 = this.partition('v1');

    try {
      const supported = await v1.connectReadOnly().supportedFeatures(overrides);
      return supported;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}