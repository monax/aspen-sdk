import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const AcceptTermsPartitions = {
  v1: [...FeatureFunctionsMap['acceptTerms()+[]'].drop],
  v2: [...FeatureFunctionsMap['acceptTerms()[]'].drop],
};
type AcceptTermsPartitions = typeof AcceptTermsPartitions;

const AcceptTermsInterfaces = Object.values(AcceptTermsPartitions).flat();
type AcceptTermsInterfaces = (typeof AcceptTermsInterfaces)[number];

export type AcceptTermsCallArgs = [signer: Signerish, overrides?: SourcedOverrides];
export type AcceptTermsResponse = ContractTransaction;

export class AcceptTerms extends ContractFunction<
  AcceptTermsInterfaces,
  AcceptTermsPartitions,
  AcceptTermsCallArgs,
  AcceptTermsResponse
> {
  readonly functionName = 'acceptTerms';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsInterfaces, AcceptTermsPartitions);
  }

  /** The signing wallet accepts the terms of the collection */
  call(...args: AcceptTermsCallArgs): Promise<AcceptTermsResponse> {
    return this.acceptTerms(...args);
  }

  protected async acceptTerms(signer: Signerish, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const tx = await v2.connectWith(signer).acceptTerms(overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer)['acceptTerms()'](overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(signer: Signerish, overrides?: SourcedOverrides): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.acceptTerms(overrides);
        return estimate;
      } else if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas['acceptTerms()'](overrides);
        return estimate;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
