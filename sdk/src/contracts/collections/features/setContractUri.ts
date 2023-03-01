import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetContractUriFunctions = {
  v1: 'setContractURI(string)[]',
} as const;

const SetContractUriPartitions = {
  v1: [...FeatureFunctionsMap[SetContractUriFunctions.v1].drop],
};
type SetContractUriPartitions = typeof SetContractUriPartitions;

const SetContractUriInterfaces = Object.values(SetContractUriPartitions).flat();
type SetContractUriInterfaces = (typeof SetContractUriInterfaces)[number];

export type SetContractUriCallArgs = [signer: Signerish, uri: string, overrides?: WriteOverrides];
export type SetContractUriResponse = ContractTransaction;

export class SetContractUri extends ContractFunction<
  SetContractUriInterfaces,
  SetContractUriPartitions,
  SetContractUriCallArgs,
  SetContractUriResponse
> {
  readonly functionName = 'setContractUri';

  constructor(base: CollectionContract) {
    super(base, SetContractUriInterfaces, SetContractUriPartitions, SetContractUriFunctions);
  }

  execute(...args: SetContractUriCallArgs): Promise<SetContractUriResponse> {
    return this.setContractUri(...args);
  }

  async setContractUri(signer: Signerish, uri: string, overrides: WriteOverrides = {}): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setContractURI(uri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }

  async estimateGas(signer: Signerish, uri: string, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setContractURI(uri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }

  async populateTransaction(
    signer: Signerish,
    uri: string,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).populateTransaction.setContractURI(uri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }
}

export const setContractUri = asCallableClass(SetContractUri);
