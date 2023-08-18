import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const HasAcceptedTermsVersionFunctions = {
  v1: 'hasAcceptedTerms(address,uint8)[bool]',
} as const;

const HasAcceptedTermsVersionPartitions = {
  v1: [...FeatureFunctionsMap[HasAcceptedTermsVersionFunctions.v1].drop],
};
type HasAcceptedTermsVersionPartitions = typeof HasAcceptedTermsVersionPartitions;

const HasAcceptedTermsVersionInterfaces = Object.values(HasAcceptedTermsVersionPartitions).flat();
type HasAcceptedTermsVersionInterfaces = (typeof HasAcceptedTermsVersionInterfaces)[number];

export type HasAcceptedTermsVersionCallArgs = [userAddress: Addressish, version: number, params?: ReadParameters];
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

  execute(...args: HasAcceptedTermsVersionCallArgs): Promise<HasAcceptedTermsVersionResponse> {
    return this.hasAcceptedTermsVersion(...args);
  }

  async hasAcceptedTermsVersion(userAddress: Addressish, version: number, params?: ReadParameters): Promise<boolean> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(userAddress);

    try {
      const status = await this.reader(this.abi(v1)).read.hasAcceptedTerms([wallet as Hex, version], params);
      return status;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const hasAcceptedTermsVersion = asCallableClass(HasAcceptedTermsVersion);
