import { BigNumber, BytesLike, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetOperatorFiltererFunctions = {
  v1: 'setOperatorFilterer(bytes32)[]',
} as const;

const SetOperatorFiltererPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorFiltererFunctions.v1].drop],
};
type SetOperatorFiltererPartitions = typeof SetOperatorFiltererPartitions;

const SetOperatorFiltererInterfaces = Object.values(SetOperatorFiltererPartitions).flat();
type SetOperatorFiltererInterfaces = (typeof SetOperatorFiltererInterfaces)[number];

export type SetOperatorFiltererCallArgs = [signer: Signerish, operatorId: BytesLike, overrides?: WriteOverrides];
export type SetOperatorFiltererResponse = ContractTransaction;

export class SetOperatorFilterer extends ContractFunction<
  SetOperatorFiltererInterfaces,
  SetOperatorFiltererPartitions,
  SetOperatorFiltererCallArgs,
  SetOperatorFiltererResponse
> {
  readonly functionName = 'setOperatorFilterer';

  constructor(base: CollectionContract) {
    super(base, SetOperatorFiltererInterfaces, SetOperatorFiltererPartitions, SetOperatorFiltererFunctions);
  }

  execute(...args: SetOperatorFiltererCallArgs): Promise<SetOperatorFiltererResponse> {
    return this.setOperatorFilterer(...args);
  }

  async setOperatorFilterer(
    signer: Signerish,
    operatorId: BytesLike,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setOperatorFilterer(operatorId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, operatorId: BytesLike, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setOperatorFilterer(operatorId, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(operatorId: BytesLike, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setOperatorFilterer(operatorId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setOperatorFilterer = asCallableClass(SetOperatorFilterer);
