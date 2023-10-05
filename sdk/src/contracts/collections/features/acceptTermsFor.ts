import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const AcceptTermsForFunctions = {
  v1: 'acceptTerms(address)[]',
} as const;

const AcceptTermsForPartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsForFunctions.v1].drop],
};
type AcceptTermsForPartitions = typeof AcceptTermsForPartitions;

const AcceptTermsForInterfaces = Object.values(AcceptTermsForPartitions).flat();
type AcceptTermsForInterfaces = (typeof AcceptTermsForInterfaces)[number];

export type AcceptTermsForCallArgs = [walletClient: Signer, acceptor: Addressish, params?: WriteParameters];
export type AcceptTermsForResponse = GetTransactionReceiptReturnType;

export class AcceptTermsFor extends ContractFunction<
  AcceptTermsForInterfaces,
  AcceptTermsForPartitions,
  AcceptTermsForCallArgs,
  AcceptTermsForResponse
> {
  readonly functionName = 'acceptTermsFor';

  constructor(base: CollectionContract) {
    super(base, AcceptTermsForInterfaces, AcceptTermsForPartitions, AcceptTermsForFunctions);
  }

  execute(...args: AcceptTermsForCallArgs): Promise<AcceptTermsForResponse> {
    return this.acceptTermsFor(...args);
  }

  async acceptTermsFor(
    walletClient: Signer,
    acceptor: Addressish,
    params?: WriteParameters,
  ): Promise<AcceptTermsForResponse> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(acceptor);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms([wallet as Hex], params);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, acceptor: Addressish, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(acceptor);

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.acceptTerms([wallet as Hex], {
        account: walletClient.account,
        ...params,
      });
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(acceptor: Addressish, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(acceptor);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms([wallet as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const acceptTermsFor = asCallableClass(AcceptTermsFor);
