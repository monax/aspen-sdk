import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const AcceptTermsWithSignatureFunctions = {
  v1: 'acceptTerms(address,bytes)[]',
  v2: 'storeTermsAccepted(address,bytes)[]',
} as const;

const AcceptTermsWithSignaturePartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsWithSignatureFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[AcceptTermsWithSignatureFunctions.v2].drop],
};
type AcceptTermsWithSignaturePartitions = typeof AcceptTermsWithSignaturePartitions;

const AcceptTermsWithSignatureInterfaces = Object.values(AcceptTermsWithSignaturePartitions).flat();
type AcceptTermsWithSignatureInterfaces = (typeof AcceptTermsWithSignatureInterfaces)[number];

export type AcceptTermsWithSignatureCallArgs = [
  walletClient: Signer,
  acceptor: Addressish,
  signature: string,
  params?: WriteParameters,
];
export type AcceptTermsWithSignatureResponse = GetTransactionReceiptReturnType;

export class AcceptTermsWithSignature extends ContractFunction<
  AcceptTermsWithSignatureInterfaces,
  AcceptTermsWithSignaturePartitions,
  AcceptTermsWithSignatureCallArgs,
  AcceptTermsWithSignatureResponse
> {
  readonly functionName = 'acceptTermsWithSignature';

  constructor(base: CollectionContract) {
    super(
      base,
      AcceptTermsWithSignatureInterfaces,
      AcceptTermsWithSignaturePartitions,
      AcceptTermsWithSignatureFunctions,
    );
  }

  execute(...args: AcceptTermsWithSignatureCallArgs): Promise<AcceptTermsWithSignatureResponse> {
    return this.acceptTermsWithSignature(...args);
  }

  async acceptTermsWithSignature(
    walletClient: Signer,
    acceptor: Addressish,
    signature: string,
    params?: WriteParameters,
  ): Promise<AcceptTermsWithSignatureResponse> {
    const { v1, v2 } = this.partitions;
    const wallet = await asAddress(acceptor);
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms(
          [wallet as Hex, signature as Hex],
          fullParams,
        );
        const hash = await walletClient.writeContract(request);
        return this.base.publicClient.waitForTransactionReceipt({
          hash,
        });
      } else if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.storeTermsAccepted(
          [wallet as Hex, signature as Hex],
          fullParams,
        );
        const hash = await walletClient.writeContract(request);
        return this.base.publicClient.waitForTransactionReceipt({
          hash,
        });
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    acceptor: Addressish,
    signature: string,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { v1, v2 } = this.partitions;
    const wallet = await asAddress(acceptor);
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v1) {
        const estimate = await this.reader(this.abi(v1)).estimateGas.acceptTerms(
          [wallet as Hex, signature as Hex],
          fullParams,
        );
        return estimate;
      } else if (v2) {
        const estimate = await this.reader(this.abi(v2)).estimateGas.storeTermsAccepted(
          [wallet as Hex, signature as Hex],
          fullParams,
        );
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(acceptor: Addressish, signature: string, params?: WriteParameters): Promise<string> {
    const { v1, v2 } = this.partitions;
    const wallet = await asAddress(acceptor);

    try {
      if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.acceptTerms(
          [wallet as Hex, signature as Hex],
          params,
        );
        return encodeFunctionData(request);
      } else if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.storeTermsAccepted(
          [wallet as Hex, signature as Hex],
          params,
        );
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const acceptTermsWithSignature = asCallableClass(AcceptTermsWithSignature);
