import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetOperatorRestrictionFunctions = {
  v1: 'operatorRestriction()[bool]',
} as const;

const GetOperatorRestrictionPartitions = {
  v1: [...FeatureFunctionsMap[GetOperatorRestrictionFunctions.v1].drop],
};
type GetOperatorRestrictionPartitions = typeof GetOperatorRestrictionPartitions;

const GetOperatorRestrictionInterfaces = Object.values(GetOperatorRestrictionPartitions).flat();
type GetOperatorRestrictionInterfaces = (typeof GetOperatorRestrictionInterfaces)[number];

export type GetOperatorRestrictionCallArgs = [overrides?: WriteOverrides];
export type GetOperatorRestrictionResponse = boolean;

export class GetOperatorRestriction extends ContractFunction<
  GetOperatorRestrictionInterfaces,
  GetOperatorRestrictionPartitions,
  GetOperatorRestrictionCallArgs,
  GetOperatorRestrictionResponse
> {
  readonly functionName = 'getOperatorRestriction';

  constructor(base: CollectionContract) {
    super(base, GetOperatorRestrictionInterfaces, GetOperatorRestrictionPartitions, GetOperatorRestrictionFunctions);
  }

  execute(...args: GetOperatorRestrictionCallArgs): Promise<GetOperatorRestrictionResponse> {
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

export const getOperatorRestriction = asCallableClass(GetOperatorRestriction);
