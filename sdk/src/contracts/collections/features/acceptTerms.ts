import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const AcceptTermsFunctions = {
  v1: 'acceptTerms()[]',
} as const;

const AcceptTermsPartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsFunctions.v1].drop],
};
type AcceptTermsPartitions = typeof AcceptTermsPartitions;

const AcceptTermsInterfaces = Object.values(AcceptTermsPartitions).flat();
type AcceptTermsInterfaces = (typeof AcceptTermsInterfaces)[number];

export type AcceptTermsCallArgs = [walletClient: Signer, params?: WriteParameters];
export type AcceptTermsResponse = TransactionHash;

export class AcceptTerms extends ContractFunction<
  AcceptTermsInterfaces,
  AcceptTermsPartitions,
  AcceptTermsCallArgs,
  AcceptTermsResponse
> {
  readonly functionName = 'acceptTerms';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsInterfaces, AcceptTermsPartitions, AcceptTermsFunctions);
  }

  /** The signing wallet accepts the terms of the collection */
  execute(...args: AcceptTermsCallArgs): Promise<AcceptTermsResponse> {
    return this.acceptTerms(...args);
  }

  protected async acceptTerms(walletClient: Signer, params?: WriteParameters): Promise<AcceptTermsResponse> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms(params);
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.acceptTerms({
        account: walletClient.account,
        ...params,
      });
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms(params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const acceptTerms = asCallableClass(AcceptTerms);
