import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { CollectionContract, ReadParameters, RequiredTokenId } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const OwnerOfFunctions = {
  v1: 'ownerOf(uint256)[address]',
} as const;

const OwnerOfPartitions = {
  v1: [...FeatureFunctionsMap[OwnerOfFunctions.v1].drop],
};
type OwnerOfPartitions = typeof OwnerOfPartitions;

const OwnerOfInterfaces = Object.values(OwnerOfPartitions).flat();
type OwnerOfInterfaces = (typeof OwnerOfInterfaces)[number];

export type OwnerOfCallArgs = [tokenId: RequiredTokenId, params?: ReadParameters];
export type OwnerOfResponse = Address;

export class OwnerOf extends ContractFunction<OwnerOfInterfaces, OwnerOfPartitions, OwnerOfCallArgs, OwnerOfResponse> {
  readonly functionName = 'ownerOf';

  constructor(base: CollectionContract) {
    super(base, OwnerOfInterfaces, OwnerOfPartitions, OwnerOfFunctions);
  }

  /** Get the token owner */
  execute(...args: OwnerOfCallArgs): Promise<OwnerOfResponse> {
    return this.ownerOf(...args);
  }

  async ownerOf(tokenId: RequiredTokenId, params?: ReadParameters): Promise<Address> {
    const v1 = this.partition('v1');
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const ownerOf = await this.reader(this.abi(v1)).read.ownerOf([tokenId], params);
      return parse(Address, ownerOf);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const ownerOf = asCallableClass(OwnerOf);
