import { CallOverrides } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '@monaxlabs/phloem/dist/schema';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetDefaultRoyaltyInfoFunctions = {
  v1: 'getDefaultRoyaltyInfo()[address,uint16]',
} as const;

const GetDefaultRoyaltyInfoPartitions = {
  v1: [...FeatureFunctionsMap[GetDefaultRoyaltyInfoFunctions.v1].drop],
};
type GetDefaultRoyaltyInfoPartitions = typeof GetDefaultRoyaltyInfoPartitions;

const GetDefaultRoyaltyInfoInterfaces = Object.values(GetDefaultRoyaltyInfoPartitions).flat();
type GetDefaultRoyaltyInfoInterfaces = (typeof GetDefaultRoyaltyInfoInterfaces)[number];

export type GetDefaultRoyaltyInfoCallArgs = [overrides?: CallOverrides];
export type GetDefaultRoyaltyInfoResponse = DefaultRoyaltyInfo;

export type DefaultRoyaltyInfo = {
  recipient: Address;
  basisPoints: number;
};

export class GetDefaultRoyaltyInfo extends ContractFunction<
  GetDefaultRoyaltyInfoInterfaces,
  GetDefaultRoyaltyInfoPartitions,
  GetDefaultRoyaltyInfoCallArgs,
  GetDefaultRoyaltyInfoResponse
> {
  readonly functionName = 'getDefaultRoyaltyInfo';

  constructor(base: CollectionContract) {
    super(base, GetDefaultRoyaltyInfoInterfaces, GetDefaultRoyaltyInfoPartitions, GetDefaultRoyaltyInfoFunctions);
  }

  execute(...args: GetDefaultRoyaltyInfoCallArgs): Promise<GetDefaultRoyaltyInfoResponse> {
    return this.getDefaultRoyaltyInfo(...args);
  }

  async getDefaultRoyaltyInfo(overrides: CallOverrides = {}): Promise<DefaultRoyaltyInfo> {
    const v1 = this.partition('v1');

    try {
      const [recipient, basisPoints] = await v1.connectReadOnly().getDefaultRoyaltyInfo(overrides);
      return { recipient: parse(Address, recipient), basisPoints };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getDefaultRoyaltyInfo = asCallableClass(GetDefaultRoyaltyInfo);
