import { BigNumberish } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const HasAcceptedTermsVersionPartitions = {
  v1: [...FeatureFunctionsMap['hasAcceptedTerms(address,uint8)+[bool]'].drop],
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
    super(base, HasAcceptedTermsVersionInterfaces, HasAcceptedTermsVersionPartitions);
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }
}
