import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';
import { DefaultRoyaltyInfo } from './getDefaultRoyaltyInfo';

const GetRoyaltyInfoForTokenFunctions = {
  v1: 'getRoyaltyInfoForToken(uint256)[address,uint16]',
} as const;

const GetRoyaltyInfoForTokenPartitions = {
  v1: [...FeatureFunctionsMap[GetRoyaltyInfoForTokenFunctions.v1].drop],
};
type GetRoyaltyInfoForTokenPartitions = typeof GetRoyaltyInfoForTokenPartitions;

const GetRoyaltyInfoForTokenInterfaces = Object.values(GetRoyaltyInfoForTokenPartitions).flat();
type GetRoyaltyInfoForTokenInterfaces = (typeof GetRoyaltyInfoForTokenInterfaces)[number];

export type GetRoyaltyInfoForTokenCallArgs = [tokenId: bigint, params?: ReadParameters];
export type GetRoyaltyInfoForTokenResponse = DefaultRoyaltyInfo;

export class GetRoyaltyInfoForToken extends ContractFunction<
  GetRoyaltyInfoForTokenInterfaces,
  GetRoyaltyInfoForTokenPartitions,
  GetRoyaltyInfoForTokenCallArgs,
  GetRoyaltyInfoForTokenResponse
> {
  readonly functionName = 'getRoyaltyInfoForToken';

  constructor(base: CollectionContract) {
    super(base, GetRoyaltyInfoForTokenInterfaces, GetRoyaltyInfoForTokenPartitions, GetRoyaltyInfoForTokenFunctions);
  }

  execute(...args: GetRoyaltyInfoForTokenCallArgs): Promise<GetRoyaltyInfoForTokenResponse> {
    return this.getRoyaltyInfoForToken(...args);
  }

  async getRoyaltyInfoForToken(tokenId: bigint, params?: ReadParameters): Promise<DefaultRoyaltyInfo> {
    const v1 = this.partition('v1');

    try {
      const [recipient, basisPoints] = await this.reader(this.abi(v1)).read.getRoyaltyInfoForToken([tokenId], params);
      return { recipient: parse(Address, recipient), basisPoints };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getRoyaltyInfoForToken = asCallableClass(GetRoyaltyInfoForToken);
