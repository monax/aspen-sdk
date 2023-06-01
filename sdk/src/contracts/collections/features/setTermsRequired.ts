import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTermsRequiredFunctions = {
  v1: 'setTermsRequired(bool)[]',
} as const;

const SetTermsRequiredPartitions = {
  v1: [...FeatureFunctionsMap[SetTermsRequiredFunctions.v1].drop],
};
type SetTermsRequiredPartitions = typeof SetTermsRequiredPartitions;

const SetTermsRequiredInterfaces = Object.values(SetTermsRequiredPartitions).flat();
type SetTermsRequiredInterfaces = (typeof SetTermsRequiredInterfaces)[number];

export type SetTermsRequiredCallArgs = [signer: Signerish, termsRequired: boolean, overrides?: WriteOverrides];
export type SetTermsRequiredResponse = ContractTransaction;

export class SetTermsRequired extends ContractFunction<
  SetTermsRequiredInterfaces,
  SetTermsRequiredPartitions,
  SetTermsRequiredCallArgs,
  SetTermsRequiredResponse
> {
  readonly functionName = 'setTermsRequired';

  constructor(base: CollectionContract) {
    super(base, SetTermsRequiredInterfaces, SetTermsRequiredPartitions, SetTermsRequiredFunctions);
  }

  execute(...args: SetTermsRequiredCallArgs): Promise<SetTermsRequiredResponse> {
    return this.setTermsRequired(...args);
  }

  async setTermsRequired(
    signer: Signerish,
    termsRequired: boolean,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setTermsRequired(termsRequired, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, termsRequired: boolean, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setTermsRequired(termsRequired, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(termsRequired: boolean, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setTermsRequired(termsRequired, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTermsRequired = asCallableClass(SetTermsRequired);
