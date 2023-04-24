import { BytesLike, CallOverrides, ethers } from 'ethers';
import { AccessControl, Addressish, asAddress, CollectionContract, Signerish } from '../..';
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

export type HasRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: CallOverrides];
export type HasRoleResponse = boolean;

export class HasRole extends ContractFunction<HasRoleInterfaces, HasRolePartitions, HasRoleCallArgs, HasRoleResponse> {
  readonly functionName = 'hasRole';

  constructor(base: CollectionContract) {
    super(base, HasRoleInterfaces, HasRolePartitions, HasRoleFunctions);
  }

  execute(...args: HasRoleCallArgs): Promise<HasRoleResponse> {
    return this.hasRole(...args);
  }

  async hasRole(
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<boolean> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function hasRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      return contract.hasRole(role, wallet, overrides);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const hasRole = asCallableClass(HasRole);
