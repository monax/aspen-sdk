import { BytesLike, CallOverrides } from 'ethers';
import { AccessControl__factory, CollectionContract, Signerish } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const GetRoleAdminFunctions = {} as const;

const GetRoleAdminPartitions = {
  // 'GetRoleAdmin' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type GetRoleAdminPartitions = typeof GetRoleAdminPartitions;

const GetRoleAdminInterfaces = Object.values(GetRoleAdminPartitions).flat();
type GetRoleAdminInterfaces = (typeof GetRoleAdminInterfaces)[number];

export type GetRoleAdminCallArgs = [signer: Signerish, role: BytesLike, overrides?: CallOverrides];
export type GetRoleAdminResponse = string;

export class GetRoleAdmin extends ContractFunction<
  GetRoleAdminInterfaces,
  GetRoleAdminPartitions,
  GetRoleAdminCallArgs,
  GetRoleAdminResponse
> {
  readonly functionName = 'getRoleAdmin';

  constructor(base: CollectionContract) {
    super(base, GetRoleAdminInterfaces, GetRoleAdminPartitions, GetRoleAdminFunctions);
  }

  execute(...args: GetRoleAdminCallArgs): Promise<GetRoleAdminResponse> {
    return this.getRoleAdmin(...args);
  }

  async getRoleAdmin(signer: Signerish, role: BytesLike, overrides: CallOverrides = {}): Promise<string> {
    try {
      const contract = AccessControl__factory.connect(this.base.address, signer);
      return await contract.getRoleAdmin(role, overrides);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getRoleAdmin = asCallableClass(GetRoleAdmin);
