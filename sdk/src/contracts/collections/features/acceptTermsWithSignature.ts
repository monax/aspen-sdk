import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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
  signer: Signerish,
  acceptor: Address,
  signature: string,
  overrides?: WriteOverrides,
];
export type AcceptTermsWithSignatureResponse = ContractTransaction;

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
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const tx = await v1.connectWith(signer).acceptTerms(acceptor, signature, overrides);
        return tx;
      } else if (v2) {
        const tx = await v2.connectWith(signer).storeTermsAccepted(acceptor, signature, overrides);
        return tx;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas.acceptTerms(acceptor, signature, overrides);
        return estimate;
      } else if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.storeTermsAccepted(acceptor, signature, overrides);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v1) {
        const tx = await v1.connectWith(signer).populateTransaction.acceptTerms(acceptor, signature, overrides);
        return tx;
      } else if (v2) {
        const tx = await v2.connectWith(signer).populateTransaction.storeTermsAccepted(acceptor, signature, overrides);
        return tx;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const acceptTermsWithSignature = asCallableClass(AcceptTermsWithSignature);
