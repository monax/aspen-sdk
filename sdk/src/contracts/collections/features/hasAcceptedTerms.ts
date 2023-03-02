import { CallOverrides } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const HasAcceptedTermsFunctions = {
  v1: 'getAgreementStatus(address)[bool]',
  v2: 'hasAcceptedTerms(address)[bool]',
  v3: 'hasAcceptedTerms(address)+[bool]',
} as const;

const HasAcceptedTermsPartitions = {
  v1: [...FeatureFunctionsMap[HasAcceptedTermsFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[HasAcceptedTermsFunctions.v2].drop],
  v3: [...FeatureFunctionsMap[HasAcceptedTermsFunctions.v3].drop],
};
type HasAcceptedTermsPartitions = typeof HasAcceptedTermsPartitions;

const HasAcceptedTermsInterfaces = Object.values(HasAcceptedTermsPartitions).flat();
type HasAcceptedTermsInterfaces = (typeof HasAcceptedTermsInterfaces)[number];

export type HasAcceptedTermsCallArgs = [userAddress: Addressish, overrides?: CallOverrides];
export type HasAcceptedTermsResponse = boolean;

export class HasAcceptedTerms extends ContractFunction<
  HasAcceptedTermsInterfaces,
  HasAcceptedTermsPartitions,
  HasAcceptedTermsCallArgs,
  HasAcceptedTermsResponse
> {
  readonly functionName = 'hasAcceptedTerms';

  constructor(base: CollectionContract) {
    super(base, HasAcceptedTermsInterfaces, HasAcceptedTermsPartitions, HasAcceptedTermsFunctions);
  }

  execute(...args: HasAcceptedTermsCallArgs): Promise<HasAcceptedTermsResponse> {
    return this.hasAcceptedTerms(...args);
  }

  async hasAcceptedTerms(userAddress: Addressish, overrides: CallOverrides = {}): Promise<boolean> {
    const { v1, v2, v3 } = this.partitions;
    const wallet = await asAddress(userAddress);

    try {
      if (v3) {
        const status = await v3.connectReadOnly()['hasAcceptedTerms(address)'](wallet, overrides);
        return status;
      } else if (v2) {
        const status = await v2.connectReadOnly().hasAcceptedTerms(wallet, overrides);
        return status;
      } else if (v1) {
        const status = await v1.connectReadOnly().getAgreementStatus(wallet, overrides);
        return status;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const hasAcceptedTerms = asCallableClass(HasAcceptedTerms);
