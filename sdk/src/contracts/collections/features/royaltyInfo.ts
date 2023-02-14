import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const RoyaltyInfoFunctions = {
  v1: 'royaltyInfo(uint256,uint256)[address,uint256]',
} as const;

const RoyaltyInfoPartitions = {
  v1: [...FeatureFunctionsMap[RoyaltyInfoFunctions.v1].drop],
};
type RoyaltyInfoPartitions = typeof RoyaltyInfoPartitions;

const RoyaltyInfoInterfaces = Object.values(RoyaltyInfoPartitions).flat();
type RoyaltyInfoInterfaces = (typeof RoyaltyInfoInterfaces)[number];

export type RoyaltyInfoCallArgs = [tokenId: BigNumber, salePrice: BigNumber, overrides?: SourcedOverrides];
export type RoyaltyInfoResponse = RoyaltiesInfo;

export type RoyaltiesInfo = {
  receiver: string;
  royaltyAmount: BigNumber;
};

export class RoyaltyInfo extends ContractFunction<
  RoyaltyInfoInterfaces,
  RoyaltyInfoPartitions,
  RoyaltyInfoCallArgs,
  RoyaltyInfoResponse
> {
  readonly functionName = 'royaltyInfo';

  constructor(base: CollectionContract) {
    super(base, RoyaltyInfoInterfaces, RoyaltyInfoPartitions, RoyaltyInfoFunctions);
  }

  call(...args: RoyaltyInfoCallArgs): Promise<RoyaltyInfoResponse> {
    return this.royaltyInfo(...args);
  }

  async royaltyInfo(tokenId: BigNumber, salePrice: BigNumber, overrides?: SourcedOverrides): Promise<RoyaltiesInfo> {
    const v1 = this.partition('v1');

    try {
      const { receiver, royaltyAmount } = await v1.connectReadOnly().royaltyInfo(tokenId, salePrice, overrides);
      return { receiver, royaltyAmount };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
