import { BigNumber } from 'ethers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetChargebackProtectionPeriodFunctions = {
  v1: 'getChargebackProtectionPeriod()[uint256]',
} as const;

const GetChargebackProtectionPeriodPartitions = {
  v1: [...FeatureFunctionsMap[GetChargebackProtectionPeriodFunctions.v1].drop],
};
type GetChargebackProtectionPeriodPartitions = typeof GetChargebackProtectionPeriodPartitions;

const GetChargebackProtectionPeriodInterfaces = Object.values(GetChargebackProtectionPeriodPartitions).flat();
type GetChargebackProtectionPeriodInterfaces = (typeof GetChargebackProtectionPeriodInterfaces)[number];

export type GetChargebackProtectionPeriodCallArgs = [overrides?: WriteOverrides];
export type GetChargebackProtectionPeriodResponse = ChargebackProtectionPeriod;

export type ChargebackProtectionPeriod = BigNumber;

export class GetChargebackProtectionPeriod extends ContractFunction<
  GetChargebackProtectionPeriodInterfaces,
  GetChargebackProtectionPeriodPartitions,
  GetChargebackProtectionPeriodCallArgs,
  GetChargebackProtectionPeriodResponse
> {
  readonly functionName = 'getChargebackProtectionPeriod';

  constructor(base: CollectionContract) {
    super(
      base,
      GetChargebackProtectionPeriodInterfaces,
      GetChargebackProtectionPeriodPartitions,
      GetChargebackProtectionPeriodFunctions,
    );
  }

  execute(...args: GetChargebackProtectionPeriodCallArgs): Promise<GetChargebackProtectionPeriodResponse> {
    return this.getChargebackProtectionPeriod(...args);
  }

  async getChargebackProtectionPeriod(overrides: WriteOverrides = {}): Promise<ChargebackProtectionPeriod> {
    const v1 = this.partition('v1');

    try {
      const chargebackProtectionPeriod = await v1.connectReadOnly().getChargebackProtectionPeriod(overrides);
      return chargebackProtectionPeriod;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getChargebackProtectionPeriod = asCallableClass(GetChargebackProtectionPeriod);
