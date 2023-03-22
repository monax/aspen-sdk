import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetOperatorRestrictionFunctions = {
  v1: 'setOperatorFiltererStatus(bool)[]',
  v2: 'setOperatorRestriction(bool)[]',
} as const;

const SetOperatorRestrictionPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorRestrictionFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[SetOperatorRestrictionFunctions.v2].drop],
};
type SetOperatorRestrictionPartitions = typeof SetOperatorRestrictionPartitions;

const SetOperatorRestrictionInterfaces = Object.values(SetOperatorRestrictionPartitions).flat();
type SetOperatorRestrictionInterfaces = (typeof SetOperatorRestrictionInterfaces)[number];

export type SetOperatorRestrictionCallArgs = [signer: Signerish, enabled: boolean, overrides?: WriteOverrides];
export type SetOperatorRestrictionResponse = ContractTransaction;

export class SetOperatorRestriction extends ContractFunction<
  SetOperatorRestrictionInterfaces,
  SetOperatorRestrictionPartitions,
  SetOperatorRestrictionCallArgs,
  SetOperatorRestrictionResponse
> {
  readonly functionName = 'setOperatorRestriction';

  constructor(base: CollectionContract) {
    super(
      base,
      SetOperatorRestrictionInterfaces,
      SetOperatorRestrictionPartitions,
      SetOperatorRestrictionFunctions,
    );
  }

  execute(...args: SetOperatorRestrictionCallArgs): Promise<SetOperatorRestrictionResponse> {
    return this.setOperatorRestriction(...args);
  }

  async setOperatorRestriction(
    signer: Signerish,
    enabled: boolean,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const {v1, v2} = this.partitions;

    try {
      if (v2) {
        const tx = await v2.connectWith(signer).setOperatorRestriction(enabled, overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer).setOperatorFiltererStatus(enabled, overrides);
        return tx;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(signer: Signerish, enabled: boolean, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const {v1, v2} = this.partitions;

    try {
      if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.setOperatorRestriction(enabled, overrides);
        return estimate;
      } else if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas.setOperatorFiltererStatus(enabled, overrides);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
    
    this.notSupported();
  }

  async populateTransaction(enabled: boolean, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const {v1, v2} = this.partitions;

    try {
      if (v2) { 
        const tx = await v2.connectReadOnly().populateTransaction.setOperatorRestriction(enabled, overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectReadOnly().populateTransaction.setOperatorFiltererStatus(enabled, overrides);
        return tx; 
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setOperatorRestriction = asCallableClass(SetOperatorRestriction);
