import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { ReadParameters } from '../types';
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

export type GetChargebackProtectionPeriodCallArgs = [params?: ReadParameters];
export type GetChargebackProtectionPeriodResponse = ChargebackProtectionPeriod;

export type ChargebackProtectionPeriod = bigint;

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

  async getChargebackProtectionPeriod(params?: ReadParameters): Promise<ChargebackProtectionPeriod> {
    const v1 = this.partition('v1');
    try {
      const chargebackProtectionPeriod = await this.reader(this.abi(v1)).read.getChargebackProtectionPeriod(params);
      return chargebackProtectionPeriod;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getChargebackProtectionPeriod = asCallableClass(GetChargebackProtectionPeriod);
