import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const AcceptTermsForManyFunctions = {
  v1: 'batchAcceptTerms(address[])[]',
} as const;

const AcceptTermsForManyPartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsForManyFunctions.v1].drop],
};
type AcceptTermsForManyPartitions = typeof AcceptTermsForManyPartitions;

const AcceptTermsForManyInterfaces = Object.values(AcceptTermsForManyPartitions).flat();
type AcceptTermsForManyInterfaces = (typeof AcceptTermsForManyInterfaces)[number];

export type AcceptTermsForManyCallArgs = [walletClient: Signer, acceptors: Addressish[], params?: WriteParameters];
export type AcceptTermsForManyResponse = GetTransactionReceiptReturnType;

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
    walletClient: Signer,
    acceptors: Addressish[],
    params?: WriteParameters,
  ): Promise<AcceptTermsForManyResponse> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.batchAcceptTerms([wallets as Hex[]], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, acceptors: Addressish[], params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.batchAcceptTerms([wallets as Hex[]], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(acceptors: Addressish[], params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    const wallets = await Promise.all(acceptors.map((a) => asAddress(a)));

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.batchAcceptTerms([wallets as Hex[]], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const acceptTermsForMany = asCallableClass(AcceptTermsForMany);
