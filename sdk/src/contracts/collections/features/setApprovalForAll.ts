import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetApprovalForAllFunctions = {
  v1: 'setApprovalForAll(address,bool)[]',
} as const;

const SetApprovalForAllPartitions = {
  v1: [...FeatureFunctionsMap[SetApprovalForAllFunctions.v1].drop],
};
type SetApprovalForAllPartitions = typeof SetApprovalForAllPartitions;

const SetApprovalForAllInterfaces = Object.values(SetApprovalForAllPartitions).flat();
type SetApprovalForAllInterfaces = (typeof SetApprovalForAllInterfaces)[number];

export type SetApprovalForAllArgs = {
  operator: Addressish;
  approved: boolean;
};

export type SetApprovalForAllCallArgs = [signer: Signerish, args: SetApprovalForAllArgs, overrides?: WriteOverrides];
export type SetApprovalForAllResponse = ContractTransaction;

export class SetApprovalForAll extends ContractFunction<
  SetApprovalForAllInterfaces,
  SetApprovalForAllPartitions,
  SetApprovalForAllCallArgs,
  SetApprovalForAllResponse
> {
  readonly functionName = 'setApprovalForAll';

  constructor(base: CollectionContract) {
    super(base, SetApprovalForAllInterfaces, SetApprovalForAllPartitions, SetApprovalForAllFunctions);
  }

  execute(...args: SetApprovalForAllCallArgs): Promise<SetApprovalForAllResponse> {
    return this.setApprovalForAll(...args);
  }

  async setApprovalForAll(
    signer: Signerish,
    { operator, approved }: SetApprovalForAllArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);

    try {
      const tx = await v1.connectWith(signer).setApprovalForAll(wallet, approved, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }

  async estimateGas(
    signer: Signerish,
    { operator, approved }: SetApprovalForAllArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setApprovalForAll(wallet, approved, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }

  async populateTransaction(
    { operator, approved }: SetApprovalForAllArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setApprovalForAll(wallet, approved, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }
}

export const setApprovalForAll = asCallableClass(SetApprovalForAll);
