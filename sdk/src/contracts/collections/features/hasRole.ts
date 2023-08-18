import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { Hex, parseAbi } from 'viem';
import { BytesLike, CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const HasRoleFunctions = {} as const;

const HasRolePartitions = {
  // 'HasRole' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type HasRolePartitions = typeof HasRolePartitions;

const HasRoleInterfaces = Object.values(HasRolePartitions).flat();
type HasRoleInterfaces = (typeof HasRoleInterfaces)[number];

export type HasRoleCallArgs = [role: BytesLike, account: Addressish, params?: ReadParameters];
export type HasRoleResponse = boolean;

export class HasRole extends ContractFunction<HasRoleInterfaces, HasRolePartitions, HasRoleCallArgs, HasRoleResponse> {
  readonly functionName = 'hasRole';

  constructor(base: CollectionContract) {
    super(base, HasRoleInterfaces, HasRolePartitions, HasRoleFunctions);
  }

  execute(...args: HasRoleCallArgs): Promise<HasRoleResponse> {
    return this.hasRole(...args);
  }

  async hasRole(role: BytesLike, account: Addressish, params?: ReadParameters): Promise<boolean> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(['function hasRole(bytes32 role, address account) external view returns (bool)']);
      const hasRole = await this.reader(abi).read.hasRole([role as Hex, wallet as Hex], params);
      return hasRole;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const hasRole = asCallableClass(HasRole);
