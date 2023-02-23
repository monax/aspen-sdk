import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const AcceptTermsForFunctions = {
  v1: 'acceptTerms(address)+[]',
  v2: 'acceptTerms(address)[]',
} as const;

const AcceptTermsForPartitions = {
  v1: [...FeatureFunctionsMap[AcceptTermsForFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[AcceptTermsForFunctions.v2].drop],
};
type AcceptTermsForPartitions = typeof AcceptTermsForPartitions;

const AcceptTermsForInterfaces = Object.values(AcceptTermsForPartitions).flat();
type AcceptTermsForInterfaces = (typeof AcceptTermsForInterfaces)[number];

export type AcceptTermsForCallArgs = [signer: Signerish, acceptor: Address, overrides?: WriteOverrides];
export type AcceptTermsForResponse = ContractTransaction;

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
    signer: Signerish,
    acceptor: Address,
    overrides: WriteOverrides = {},
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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(signer: Signerish, acceptor: Address, overrides: WriteOverrides = {}): Promise<BigNumber> {
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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const acceptTermsFor = asCallableClass(AcceptTermsFor);
