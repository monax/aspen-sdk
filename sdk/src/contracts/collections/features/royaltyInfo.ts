import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const RoyaltyInfoFunctions = {
  v1: 'royaltyInfo(uint256,uint256)[address,uint256]',
} as const;

const RoyaltyInfoPartitions = {
  v1: [...FeatureFunctionsMap[RoyaltyInfoFunctions.v1].drop],
};
type RoyaltyInfoPartitions = typeof RoyaltyInfoPartitions;

const RoyaltyInfoInterfaces = Object.values(RoyaltyInfoPartitions).flat();
type RoyaltyInfoInterfaces = (typeof RoyaltyInfoInterfaces)[number];

export type RoyaltyInfoCallArgs = [tokenId: bigint, salePrice: bigint, params?: ReadParameters];
export type RoyaltyInfoResponse = RoyaltiesInfo;

export type RoyaltiesInfo = {
  receiver: string;
  royaltyAmount: bigint;
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

  execute(...args: RoyaltyInfoCallArgs): Promise<RoyaltyInfoResponse> {
    return this.royaltyInfo(...args);
  }

  async royaltyInfo(tokenId: bigint, salePrice: bigint, params?: ReadParameters): Promise<RoyaltiesInfo> {
    const v1 = this.partition('v1');

    try {
      const [receiver, royaltyAmount] = await this.reader(this.abi(v1)).read.royaltyInfo([tokenId, salePrice], params);
      return { receiver, royaltyAmount };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const royaltyInfo = asCallableClass(RoyaltyInfo);
