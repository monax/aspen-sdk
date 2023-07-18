import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IsApprovedForAllFunctions = {
  v1: 'isApprovedForAll(address,address)[bool]',
} as const;

const IsApprovedForAllPartitions = {
  v1: [...FeatureFunctionsMap[IsApprovedForAllFunctions.v1].drop],
};
type IsApprovedForAllPartitions = typeof IsApprovedForAllPartitions;

const IsApprovedForAllInterfaces = Object.values(IsApprovedForAllPartitions).flat();
type IsApprovedForAllInterfaces = (typeof IsApprovedForAllInterfaces)[number];

export type IsApprovedForAllCallArgs = [args: IsApprovedForAllArgs, overrides?: CallOverrides];
export type IsApprovedForAllResponse = Boolean;

export type IsApprovedForAllArgs = {
  owner: Addressish;
  operator: Addressish;
};

export class IsApprovedForAll extends ContractFunction<
  IsApprovedForAllInterfaces,
  IsApprovedForAllPartitions,
  IsApprovedForAllCallArgs,
  IsApprovedForAllResponse
> {
  readonly functionName = 'isApprovedForAll';

  constructor(base: CollectionContract) {
    super(base, IsApprovedForAllInterfaces, IsApprovedForAllPartitions, IsApprovedForAllFunctions);
  }

  execute(...args: IsApprovedForAllCallArgs): Promise<IsApprovedForAllResponse> {
    return this.isApprovedForAll(...args);
  }

  async isApprovedForAll({ owner, operator }: IsApprovedForAllArgs, overrides: CallOverrides = {}): Promise<Boolean> {
    const v1 = this.partition('v1');
    const _owner = await asAddress(owner);
    const _operator = await asAddress(operator);

    try {
      const isApproved = await v1.connectReadOnly().isApprovedForAll(_owner, _operator, overrides);
      return isApproved;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const isApprovedForAll = asCallableClass(IsApprovedForAll);
