import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const HasAcceptedTermsPartitions = {
  v1: [...FeatureFunctionsMap['getAgreementStatus(address)[bool]'].drop],
  v2: [...FeatureFunctionsMap['hasAcceptedTerms(address)[bool]'].drop],
  v3: [...FeatureFunctionsMap['hasAcceptedTerms(address)+[bool]'].drop],
};
type HasAcceptedTermsPartitions = typeof HasAcceptedTermsPartitions;

const HasAcceptedTermsInterfaces = Object.values(HasAcceptedTermsPartitions).flat();
type HasAcceptedTermsInterfaces = (typeof HasAcceptedTermsInterfaces)[number];

export type HasAcceptedTermsCallArgs = [userAddress: Address, overrides?: SourcedOverrides];
export type HasAcceptedTermsResponse = boolean;

export class HasAcceptedTerms extends ContractFunction<
  HasAcceptedTermsInterfaces,
  HasAcceptedTermsPartitions,
  HasAcceptedTermsCallArgs,
  HasAcceptedTermsResponse
> {
  readonly functionName = 'hasAcceptedTerms';

  constructor(base: CollectionContract) {
    super(base, HasAcceptedTermsInterfaces, HasAcceptedTermsPartitions);
  }

  call(...args: HasAcceptedTermsCallArgs): Promise<HasAcceptedTermsResponse> {
    return this.hasAcceptedTerms(...args);
  }

  async hasAcceptedTerms(userAddress: Address, overrides?: SourcedOverrides): Promise<boolean> {
    const { v1, v2, v3 } = this.partitions;

    try {
      if (v3) {
        const status = await v3.connectReadOnly()['hasAcceptedTerms(address)'](userAddress, overrides);
        return status;
      } else if (v2) {
        const status = await v2.connectReadOnly().hasAcceptedTerms(userAddress, overrides);
        return status;
      } else if (v1) {
        const status = await v1.connectReadOnly().getAgreementStatus(userAddress, overrides);
        return status;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { function: this.functionName });
  }
}
