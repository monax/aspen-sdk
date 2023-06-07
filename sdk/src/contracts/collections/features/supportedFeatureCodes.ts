import { BigNumber, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SupportedFeatureCodesFunctions = {
  v1: 'supportedFeatureCodes()[uint256[]]',
} as const;

const SupportedFeatureCodesPartitions = {
  v1: [...FeatureFunctionsMap[SupportedFeatureCodesFunctions.v1].drop],
};
type SupportedFeatureCodesPartitions = typeof SupportedFeatureCodesPartitions;

const SupportedFeatureCodesInterfaces = Object.values(SupportedFeatureCodesPartitions).flat();
type SupportedFeatureCodesInterfaces = (typeof SupportedFeatureCodesInterfaces)[number];

export type SupportedFeatureCodesCallArgs = [overrides?: CallOverrides];
export type SupportedFeatureCodesResponse = BigNumber[];

export class SupportedFeatureCodes extends ContractFunction<
  SupportedFeatureCodesInterfaces,
  SupportedFeatureCodesPartitions,
  SupportedFeatureCodesCallArgs,
  SupportedFeatureCodesResponse
> {
  readonly functionName = 'supportedFeatureCodes';

  constructor(base: CollectionContract) {
    super(base, SupportedFeatureCodesInterfaces, SupportedFeatureCodesPartitions, SupportedFeatureCodesFunctions);
  }

  execute(...args: SupportedFeatureCodesCallArgs): Promise<SupportedFeatureCodesResponse> {
    return this.supportedFeatureCodes(...args);
  }

  async supportedFeatureCodes(overrides: CallOverrides = {}): Promise<BigNumber[]> {
    const v1 = this.partition('v1');

    try {
      const codes = await v1.connectReadOnly().supportedFeatureCodes(overrides);
      return codes;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const supportedFeatureCodes = asCallableClass(SupportedFeatureCodes);
