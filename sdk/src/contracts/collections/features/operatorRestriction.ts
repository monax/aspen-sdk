import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const OperatorRestrictionFunctions = {
  v1: 'operatorRestriction()[bool]',
} as const;

const OperatorRestrictionPartitions = {
  v1: [...FeatureFunctionsMap[OperatorRestrictionFunctions.v1].drop],
};
type OperatorRestrictionPartitions = typeof OperatorRestrictionPartitions;

const OperatorRestrictionInterfaces = Object.values(OperatorRestrictionPartitions).flat();
type OperatorRestrictionInterfaces = (typeof OperatorRestrictionInterfaces)[number];

export type OperatorRestrictionCallArgs = [overrides?: WriteOverrides];
export type OperatorRestrictionResponse = boolean;

export class OperatorRestriction extends ContractFunction<
  OperatorRestrictionInterfaces,
  OperatorRestrictionPartitions,
  OperatorRestrictionCallArgs,
  OperatorRestrictionResponse
> {
  readonly functionName = 'operatorRestriction';

  constructor(base: CollectionContract) {
    super(base, OperatorRestrictionInterfaces, OperatorRestrictionPartitions, OperatorRestrictionFunctions);
  }

  execute(...args: OperatorRestrictionCallArgs): Promise<OperatorRestrictionResponse> {
    return this.operatorRestriction(...args);
  }

  async operatorRestriction(overrides: WriteOverrides = {}): Promise<boolean> {
    const v1 = this.partition('v1');

    try {
      const isRestricted = await v1.connectReadOnly().operatorRestriction(overrides);
      return isRestricted;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const operatorRestriction = asCallableClass(OperatorRestriction);
