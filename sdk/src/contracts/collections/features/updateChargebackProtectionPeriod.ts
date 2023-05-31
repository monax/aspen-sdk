import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const UpdateChargebackProtectionPeriodFunctions = {
  v1: 'updateChargebackProtectionPeriod(uint256)[]',
} as const;

const UpdateChargebackProtectionPeriodPartitions = {
  v1: [...FeatureFunctionsMap[UpdateChargebackProtectionPeriodFunctions.v1].drop],
};
type UpdateChargebackProtectionPeriodPartitions = typeof UpdateChargebackProtectionPeriodPartitions;

const UpdateChargebackProtectionPeriodInterfaces = Object.values(UpdateChargebackProtectionPeriodPartitions).flat();
type UpdateChargebackProtectionPeriodInterfaces = (typeof UpdateChargebackProtectionPeriodInterfaces)[number];

export type UpdateChargebackProtectionPeriodCallArgs = [
  signer: Signerish,
  newPeriodInSeconds: number,
  overrides?: WriteOverrides,
];
export type UpdateChargebackProtectionPeriodResponse = ContractTransaction;

export class UpdateChargebackProtectionPeriod extends ContractFunction<
  UpdateChargebackProtectionPeriodInterfaces,
  UpdateChargebackProtectionPeriodPartitions,
  UpdateChargebackProtectionPeriodCallArgs,
  UpdateChargebackProtectionPeriodResponse
> {
  readonly functionName = 'updateChargebackProtectionPeriod';

  constructor(base: CollectionContract) {
    super(
      base,
      UpdateChargebackProtectionPeriodInterfaces,
      UpdateChargebackProtectionPeriodPartitions,
      UpdateChargebackProtectionPeriodFunctions,
    );
  }

  execute(...args: UpdateChargebackProtectionPeriodCallArgs): Promise<UpdateChargebackProtectionPeriodResponse> {
    return this.updateChargebackProtectionPeriod(...args);
  }

  async updateChargebackProtectionPeriod(
    signer: Signerish,
    newPeriodInSeconds: number,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).updateChargebackProtectionPeriod(newPeriodInSeconds, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }

  async estimateGas(signer: Signerish, newPeriodInSeconds: number, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const gas = await v1
        .connectWith(signer)
        .estimateGas.updateChargebackProtectionPeriod(newPeriodInSeconds, overrides);
      return gas;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }

  async populateTransaction(
    newPeriodInSeconds: number,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    try {
      const tx = await v1
        .connectReadOnly()
        .populateTransaction.updateChargebackProtectionPeriod(newPeriodInSeconds, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }
}

export const updateChargebackProtectionPeriod = asCallableClass(UpdateChargebackProtectionPeriod);
