import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const AcceptTermsForManyPartitions = {
  v1: [...FeatureFunctionsMap['batchAcceptTerms(address[])[]'].drop],
};
type AcceptTermsForManyPartitions = typeof AcceptTermsForManyPartitions;

const AcceptTermsForManyInterfaces = Object.values(AcceptTermsForManyPartitions).flat();
type AcceptTermsForManyInterfaces = (typeof AcceptTermsForManyInterfaces)[number];

export type AcceptTermsForManyCallArgs = [signer: Signerish, acceptors: Address[], overrides?: SourcedOverrides];
export type AcceptTermsForManyResponse = ContractTransaction;

export class AcceptTermsForMany extends ContractFunction<
  AcceptTermsForManyInterfaces,
  AcceptTermsForManyPartitions,
  AcceptTermsForManyCallArgs,
  AcceptTermsForManyResponse
> {
  readonly functionName = 'acceptTermsForMany';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsForManyInterfaces, AcceptTermsForManyPartitions);
  }

  call(...args: AcceptTermsForManyCallArgs): Promise<AcceptTermsForManyResponse> {
    return this.acceptTermsForMany(...args);
  }

  async acceptTermsForMany(
    signer: Signerish,
    acceptors: Address[],
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).batchAcceptTerms(acceptors, overrides);
      return tx;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }

  async estimateGas(signer: Signerish, acceptors: Address[], overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.batchAcceptTerms(acceptors, overrides);
      return estimate;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }
}
