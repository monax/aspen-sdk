import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const OwnerFunctions = {
  v1: 'owner()[address]',
} as const;

const OwnerPartitions = {
  v1: [...FeatureFunctionsMap[OwnerFunctions.v1].drop],
};
type OwnerPartitions = typeof OwnerPartitions;

const OwnerInterfaces = Object.values(OwnerPartitions).flat();
type OwnerInterfaces = (typeof OwnerInterfaces)[number];

export type OwnerCallArgs = [params?: ReadParameters];
export type OwnerResponse = Address;

export class Owner extends ContractFunction<OwnerInterfaces, OwnerPartitions, OwnerCallArgs, OwnerResponse> {
  readonly functionName = 'owner';

  constructor(base: CollectionContract) {
    super(base, OwnerInterfaces, OwnerPartitions, OwnerFunctions);
  }

  /** Get contract owner */
  execute(...args: OwnerCallArgs): Promise<OwnerResponse> {
    return this.owner(...args);
  }

  async owner(params?: ReadParameters): Promise<Address> {
    const v1 = this.partition('v1');

    try {
      const owner = await this.reader(this.abi(v1)).read.owner(params);
      return parse(Address, owner);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const owner = asCallableClass(Owner);
