import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const AcceptTermsForPartitions = {
  v1: [...FeatureFunctionsMap['acceptTerms(address)+[]'].drop],
  v2: [...FeatureFunctionsMap['acceptTerms(address)[]'].drop],
};
type AcceptTermsForPartitions = typeof AcceptTermsForPartitions;

const AcceptTermsForInterfaces = Object.values(AcceptTermsForPartitions).flat();
type AcceptTermsForInterfaces = (typeof AcceptTermsForInterfaces)[number];

export type AcceptTermsForCallArgs = [signer: Signerish, acceptor: Address, overrides?: SourcedOverrides];
export type AcceptTermsForResponse = ContractTransaction;

export class AcceptTermsFor extends ContractFunction<
  AcceptTermsForInterfaces,
  AcceptTermsForPartitions,
  AcceptTermsForCallArgs,
  AcceptTermsForResponse
> {
  readonly functionName = 'acceptTermsFor';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsForInterfaces, AcceptTermsForPartitions);
  }

  call(...args: AcceptTermsForCallArgs): Promise<AcceptTermsForResponse> {
    return this.acceptTermsFor(...args);
  }

  async acceptTermsFor(
    signer: Signerish,
    acceptor: Address,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const tx = await v1.connectWith(signer)['acceptTerms(address)'](acceptor, overrides);
        return tx;
      } else if (v2) {
        const tx = await v2.connectWith(signer).acceptTerms(acceptor, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(signer: Signerish, acceptor: Address, overrides?: SourcedOverrides): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas['acceptTerms(address)'](acceptor, overrides);
        return estimate;
      } else if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.acceptTerms(acceptor, overrides);
        return estimate;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { function: this.functionName });
  }
}
