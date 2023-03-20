import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTermsUriFunctions = {
  v1: 'setTermsURI(string)[]',
} as const;

const SetTermsUriPartitions = {
  v1: [...FeatureFunctionsMap[SetTermsUriFunctions.v1].drop],
};
type SetTermsUriPartitions = typeof SetTermsUriPartitions;

const SetTermsUriInterfaces = Object.values(SetTermsUriPartitions).flat();
type SetTermsUriInterfaces = (typeof SetTermsUriInterfaces)[number];

export type SetTermsUriCallArgs = [signer: Signerish, termsUri: string, overrides?: WriteOverrides];
export type SetTermsUriResponse = ContractTransaction;

export class SetTermsUri extends ContractFunction<
  SetTermsUriInterfaces,
  SetTermsUriPartitions,
  SetTermsUriCallArgs,
  SetTermsUriResponse
> {
  readonly functionName = 'setTermsUri';

  constructor(base: CollectionContract) {
    super(base, SetTermsUriInterfaces, SetTermsUriPartitions, SetTermsUriFunctions);
  }

  execute(...args: SetTermsUriCallArgs): Promise<SetTermsUriResponse> {
    return this.setTermsUri(...args);
  }

  async setTermsUri(signer: Signerish, termsUri: string, overrides: WriteOverrides = {}): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setTermsURI(termsUri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, termsUri: string, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setTermsURI(termsUri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(termsUri: string, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setTermsURI(termsUri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTermsUri = asCallableClass(SetTermsUri);
