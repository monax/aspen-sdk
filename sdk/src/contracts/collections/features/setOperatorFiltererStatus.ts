import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetOperatorFiltererStatusFunctions = {
  v1: 'setOperatorFiltererStatus(bool)[]',
} as const;

const SetOperatorFiltererStatusPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorFiltererStatusFunctions.v1].drop],
};
type SetOperatorFiltererStatusPartitions = typeof SetOperatorFiltererStatusPartitions;

const SetOperatorFiltererStatusInterfaces = Object.values(SetOperatorFiltererStatusPartitions).flat();
type SetOperatorFiltererStatusInterfaces = (typeof SetOperatorFiltererStatusInterfaces)[number];

export type SetOperatorFiltererStatusCallArgs = [signer: Signerish, enabled: boolean, overrides?: WriteOverrides];
export type SetOperatorFiltererStatusResponse = ContractTransaction;

export class SetOperatorFiltererStatus extends ContractFunction<
  SetOperatorFiltererStatusInterfaces,
  SetOperatorFiltererStatusPartitions,
  SetOperatorFiltererStatusCallArgs,
  SetOperatorFiltererStatusResponse
> {
  readonly functionName = 'setOperatorFiltererStatus';

  constructor(base: CollectionContract) {
    super(
      base,
      SetOperatorFiltererStatusInterfaces,
      SetOperatorFiltererStatusPartitions,
      SetOperatorFiltererStatusFunctions,
    );
  }

  execute(...args: SetOperatorFiltererStatusCallArgs): Promise<SetOperatorFiltererStatusResponse> {
    return this.setOperatorFiltererStatus(...args);
  }

  async setOperatorFiltererStatus(
    signer: Signerish,
    enabled: boolean,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setOperatorFiltererStatus(enabled, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, enabled: boolean, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setOperatorFiltererStatus(enabled, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(enabled: boolean, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setOperatorFiltererStatus(enabled, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setOperatorFiltererStatus = asCallableClass(SetOperatorFiltererStatus);
