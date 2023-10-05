import { Addressish } from '@monaxlabs/phloem/dist/types';
import { CollectionContract, ReadParameters, RequiredTokenId } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IsApprovedFunctions = {
  nft: 'getApproved(uint256)[address]',
} as const;

const IsApprovedPartitions = {
  nft: [...FeatureFunctionsMap[IsApprovedFunctions.nft].drop],
};
type IsApprovedPartitions = typeof IsApprovedPartitions;

const IsApprovedInterfaces = Object.values(IsApprovedPartitions).flat();
type IsApprovedInterfaces = (typeof IsApprovedInterfaces)[number];

export type IsApprovedCallArgs = [tokenId: RequiredTokenId, params?: ReadParameters];
export type IsApprovedResponse = Addressish;

export class IsApproved extends ContractFunction<
  IsApprovedInterfaces,
  IsApprovedPartitions,
  IsApprovedCallArgs,
  IsApprovedResponse
> {
  readonly functionName = 'isApproved';

  constructor(base: CollectionContract) {
    super(base, IsApprovedInterfaces, IsApprovedPartitions, IsApprovedFunctions);
  }

  execute(...args: IsApprovedCallArgs): Promise<IsApprovedResponse> {
    return this.isApproved(...args);
  }

  async isApproved(tokenId: RequiredTokenId, params?: ReadParameters): Promise<Addressish> {
    const nft = this.partition('nft');
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const isApproved = await this.reader(this.abi(nft)).read.getApproved([tokenId], params);
      return isApproved;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const isApproved = asCallableClass(IsApproved);
