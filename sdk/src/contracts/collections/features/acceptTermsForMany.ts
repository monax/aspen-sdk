import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const AcceptTermsForManyFunctions = {
  v1: 'batchAcceptTerms(address[])[]',
} as const;

const AcceptTermsForManyPartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsForManyFunctions.v1].drop],
};
type AcceptTermsForManyPartitions = typeof AcceptTermsForManyPartitions;

const AcceptTermsForManyInterfaces = Object.values(AcceptTermsForManyPartitions).flat();
type AcceptTermsForManyInterfaces = (typeof AcceptTermsForManyInterfaces)[number];

export type AcceptTermsForManyCallArgs = [signer: Signerish, acceptors: Addressish[], overrides?: WriteOverrides];
export type AcceptTermsForManyResponse = ContractTransaction;

export class AcceptTermsForMany extends ContractFunction<
  AcceptTermsForManyInterfaces,
  AcceptTermsForManyPartitions,
  AcceptTermsForManyCallArgs,
  AcceptTermsForManyResponse
> {
  readonly functionName = 'acceptTermsForMany';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsForManyInterfaces, AcceptTermsForManyPartitions, AcceptTermsForManyFunctions);
  }

  execute(...args: AcceptTermsForManyCallArgs): Promise<AcceptTermsForManyResponse> {
    return this.acceptTermsForMany(...args);
  }

  async acceptTermsForMany(
    signer: Signerish,
    acceptors: Addressish[],
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));

    try {
      const tx = await v1.connectWith(signer).batchAcceptTerms(wallets, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, acceptors: Addressish[], overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));

    try {
      const estimate = await v1.connectWith(signer).estimateGas.batchAcceptTerms(wallets, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    acceptors: Addressish[],
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));

    try {
      const tx = await v1.connectWith(signer).populateTransaction.batchAcceptTerms(wallets, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const acceptTermsForMany = asCallableClass(AcceptTermsForMany);
