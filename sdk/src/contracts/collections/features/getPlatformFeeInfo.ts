import { BigNumber, CallOverrides } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetPlatformFeeInfoFunctions = {
  v1: 'getPlatformFeeInfo()[address,uint16]',
} as const;

const GetPlatformFeeInfoPartitions = {
  v1: [...FeatureFunctionsMap[GetPlatformFeeInfoFunctions.v1].drop],
};
type GetPlatformFeeInfoPartitions = typeof GetPlatformFeeInfoPartitions;

const GetPlatformFeeInfoInterfaces = Object.values(GetPlatformFeeInfoPartitions).flat();
type GetPlatformFeeInfoInterfaces = (typeof GetPlatformFeeInfoInterfaces)[number];

export type GetPlatformFeeInfoCallArgs = [overrides?: CallOverrides];
export type GetPlatformFeeInfoResponse = PlatformFee;

export type PlatformFee = {
  recipient: Address;
  basisPoints: BigNumber;
};

export class GetPlatformFeeInfo extends ContractFunction<
  GetPlatformFeeInfoInterfaces,
  GetPlatformFeeInfoPartitions,
  GetPlatformFeeInfoCallArgs,
  GetPlatformFeeInfoResponse
> {
  readonly functionName = 'getPlatformFeeInfo';

  constructor(base: CollectionContract) {
    super(base, GetPlatformFeeInfoInterfaces, GetPlatformFeeInfoPartitions, GetPlatformFeeInfoFunctions);
  }

  call(...args: GetPlatformFeeInfoCallArgs): Promise<GetPlatformFeeInfoResponse> {
    return this.getPlatformFeeInfo(...args);
  }

  async getPlatformFeeInfo(overrides: WriteOverrides = {}): Promise<PlatformFee> {
    const v1 = this.partition('v1');

    try {
      const [recipient, basisPoints] = await v1.connectReadOnly().getPlatformFeeInfo(overrides);
      return { recipient: parse(Address, recipient), basisPoints: BigNumber.from(basisPoints) };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
