import { BigNumberish, CallOverrides } from 'ethers';
import { Addressish, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetApprovedFunctions = {
  nft: 'getApproved(uint256)[address]',
} as const;

const GetApprovedPartitions = {
  nft: [...FeatureFunctionsMap[GetApprovedFunctions.nft].drop],
};
type GetApprovedPartitions = typeof GetApprovedPartitions;

const GetApprovedInterfaces = Object.values(GetApprovedPartitions).flat();
type GetApprovedInterfaces = (typeof GetApprovedInterfaces)[number];

export type GetApprovedCallArgs = [tokenId: BigNumberish, overrides?: CallOverrides];
export type GetApprovedResponse = Addressish;

export class GetApproved extends ContractFunction<
  GetApprovedInterfaces,
  GetApprovedPartitions,
  GetApprovedCallArgs,
  GetApprovedResponse
> {
  readonly functionName = 'getApproved';

  constructor(base: CollectionContract) {
    super(base, GetApprovedInterfaces, GetApprovedPartitions, GetApprovedFunctions);
  }

  execute(...args: GetApprovedCallArgs): Promise<GetApprovedResponse> {
    return this.getApproved(...args);
  }

  async getApproved(tokenId: BigNumberish, overrides: CallOverrides = {}): Promise<Addressish> {
    const nft = this.partition('nft');
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const isApproved = await nft.connectReadOnly().getApproved(tokenId, overrides);
      return isApproved;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getApproved = asCallableClass(GetApproved);
