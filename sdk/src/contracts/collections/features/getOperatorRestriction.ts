import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetOperatorRestrictionFunctions = {
  v1: 'operatorRestriction()[bool]',
  v2: 'getOperatorRestriction()[bool]',
} as const;

const GetOperatorRestrictionPartitions = {
  v1: [...FeatureFunctionsMap[GetOperatorRestrictionFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[GetOperatorRestrictionFunctions.v2].drop],
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
    return this.getOperatorRestriction(...args);
  }

  async getOperatorRestriction(overrides: WriteOverrides = {}): Promise<boolean> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const isRestricted = await v2.connectReadOnly().getOperatorRestriction(overrides);
        return isRestricted;
      } else if (v1) {
        const isRestricted = await v1.connectReadOnly().operatorRestriction(overrides);
        return isRestricted;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getOperatorRestriction = asCallableClass(GetOperatorRestriction);
