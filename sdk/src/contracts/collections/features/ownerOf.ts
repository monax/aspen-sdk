import { BigNumberish } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const OwnerOfFunctions = {
  v1: 'ownerOf(uint256)[address]',
} as const;

const OwnerOfPartitions = {
  v1: [...FeatureFunctionsMap[OwnerOfFunctions.v1].drop],
};
type OwnerOfPartitions = typeof OwnerOfPartitions;

const OwnerOfInterfaces = Object.values(OwnerOfPartitions).flat();
type OwnerOfInterfaces = (typeof OwnerOfInterfaces)[number];

export type OwnerOfCallArgs = [tokenId: BigNumberish, overrides?: SourcedOverrides];
export type OwnerOfResponse = Address;

export class OwnerOf extends ContractFunction<OwnerOfInterfaces, OwnerOfPartitions, OwnerOfCallArgs, OwnerOfResponse> {
  readonly functionName = 'ownerOf';

  constructor(base: CollectionContract) {
    super(base, OwnerOfInterfaces, OwnerOfPartitions, OwnerOfFunctions);
  }

  /** Get the token owner */
  call(...args: OwnerOfCallArgs): Promise<OwnerOfResponse> {
    return this.ownerOf(...args);
  }

  async ownerOf(tokenId: BigNumberish, overrides?: SourcedOverrides): Promise<Address> {
    const v1 = this.partition('v1');

    try {
      const ownerOf = await v1.connectReadOnly().ownerOf(tokenId, overrides);
      return parse(Address, ownerOf);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
