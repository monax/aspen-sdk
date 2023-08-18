import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const HasAcceptedTermsFunctions = {
  v1: 'getAgreementStatus(address)[bool]',
  v2: 'hasAcceptedTerms(address)[bool]',
} as const;

const HasAcceptedTermsPartitions = {
  v1: [...FeatureFunctionsMap[HasAcceptedTermsFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[HasAcceptedTermsFunctions.v2].drop],
};
type HasAcceptedTermsPartitions = typeof HasAcceptedTermsPartitions;

const HasAcceptedTermsInterfaces = Object.values(HasAcceptedTermsPartitions).flat();
type HasAcceptedTermsInterfaces = (typeof HasAcceptedTermsInterfaces)[number];

export type HasAcceptedTermsCallArgs = [userAddress: Addressish, params?: ReadParameters];
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

  async hasAcceptedTerms(userAddress: Addressish, params?: ReadParameters): Promise<boolean> {
    const { v1, v2 } = this.partitions;
    const wallet = await asAddress(userAddress);

    try {
      if (v2) {
        const status = await this.reader(this.abi(v2)).read.hasAcceptedTerms([wallet as Hex], params);
        return status;
      } else if (v1) {
        const status = await this.reader(this.abi(v1)).read.getAgreementStatus([wallet as Hex], params);
        return status;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const hasAcceptedTerms = asCallableClass(HasAcceptedTerms);
