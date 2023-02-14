import { BigNumber } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';
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

export type GetRoyaltyInfoForTokenCallArgs = [tokenId: BigNumber, overrides?: SourcedOverrides];
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

  call(...args: GetRoyaltyInfoForTokenCallArgs): Promise<GetRoyaltyInfoForTokenResponse> {
    return this.getRoyaltyInfoForToken(...args);
  }

  async getRoyaltyInfoForToken(tokenId: BigNumber, overrides?: SourcedOverrides): Promise<DefaultRoyaltyInfo> {
    const v1 = this.partition('v1');

    try {
      const [recipient, basisPoints] = await v1.connectReadOnly().getRoyaltyInfoForToken(tokenId, overrides);
      return { recipient: parse(Address, recipient), basisPoints };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
