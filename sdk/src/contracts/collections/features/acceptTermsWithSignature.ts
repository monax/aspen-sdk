import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const AcceptTermsWithSignaturePartitions = {
  v1: [...FeatureFunctionsMap['acceptTerms(address,bytes)[]'].drop],
  v2: [...FeatureFunctionsMap['storeTermsAccepted(address,bytes)[]'].drop],
};
type AcceptTermsWithSignaturePartitions = typeof AcceptTermsWithSignaturePartitions;

const AcceptTermsWithSignatureInterfaces = Object.values(AcceptTermsWithSignaturePartitions).flat();
type AcceptTermsWithSignatureInterfaces = (typeof AcceptTermsWithSignatureInterfaces)[number];

export type AcceptTermsWithSignatureCallArgs = [
  signer: Signerish,
  acceptor: Address,
  signature: string,
  overrides?: SourcedOverrides,
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
    super(base, AcceptTermsWithSignatureInterfaces, AcceptTermsWithSignaturePartitions);
  }

  call(...args: AcceptTermsWithSignatureCallArgs): Promise<AcceptTermsWithSignatureResponse> {
    return this.acceptTermsWithSignature(...args);
  }

  async acceptTermsWithSignature(
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides?: SourcedOverrides,
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides?: SourcedOverrides,
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { function: this.functionName });
  }
}
