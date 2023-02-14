import { BigNumberish } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const HasAcceptedTermsVersionFunctions = {
  v1: 'hasAcceptedTerms(address,uint8)+[bool]',
} as const;

const HasAcceptedTermsVersionPartitions = {
  v1: [...FeatureFunctionsMap[HasAcceptedTermsVersionFunctions.v1].drop],
};
type HasAcceptedTermsVersionPartitions = typeof HasAcceptedTermsVersionPartitions;

const HasAcceptedTermsVersionInterfaces = Object.values(HasAcceptedTermsVersionPartitions).flat();
type HasAcceptedTermsVersionInterfaces = (typeof HasAcceptedTermsVersionInterfaces)[number];

export type HasAcceptedTermsVersionCallArgs = [
  userAddress: Address,
  version: BigNumberish,
  overrides?: SourcedOverrides,
];
export type HasAcceptedTermsVersionResponse = boolean;

export class HasAcceptedTermsVersion extends ContractFunction<
  HasAcceptedTermsVersionInterfaces,
  HasAcceptedTermsVersionPartitions,
  HasAcceptedTermsVersionCallArgs,
  HasAcceptedTermsVersionResponse
> {
  readonly functionName = 'hasAcceptedTermsVersion';

  constructor(base: CollectionContract) {
    super(base, HasAcceptedTermsVersionInterfaces, HasAcceptedTermsVersionPartitions, HasAcceptedTermsVersionFunctions);
  }

  call(...args: HasAcceptedTermsVersionCallArgs): Promise<HasAcceptedTermsVersionResponse> {
    return this.hasAcceptedTermsVersion(...args);
  }

  async hasAcceptedTermsVersion(
    userAddress: Address,
    version: BigNumberish,
    overrides?: SourcedOverrides,
  ): Promise<boolean> {
    const v1 = this.partition('v1');

    try {
      const status = await v1.connectReadOnly()['hasAcceptedTerms(address,uint8)'](userAddress, version, overrides);
      return status;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
