import { ethers } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction } from './features';

const NameFunctions = {
  v1: 'name()[string]',
} as const;

const NamePartitions = {
  v1: [...FeatureFunctionsMap[NameFunctions.v1].drop],
  // 'name' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type NamePartitions = typeof NamePartitions;

const NameInterfaces = Object.values(NamePartitions).flat();
type NameInterfaces = (typeof NameInterfaces)[number];

export type NameCallArgs = [overrides?: SourcedOverrides];
export type NameResponse = string;

export class Name extends ContractFunction<NameInterfaces, NamePartitions, NameCallArgs, NameResponse> {
  readonly functionName = 'name';

  constructor(base: CollectionContract) {
    super(base, NameInterfaces, NamePartitions, NameFunctions);
  }

  call(...args: NameCallArgs): Promise<NameResponse> {
    return this.name(...args);
  }

  async name(overrides?: SourcedOverrides): Promise<string> {
    try {
      const abi = ['function name() external returns (string)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      const name = await contract.name(overrides);
      return name;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
