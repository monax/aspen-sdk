import { Hex, parseAbi } from 'viem';
import { BytesLike, CollectionContract, ReadParameters } from '../..';
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

export type GetRoleAdminCallArgs = [role: BytesLike, params?: ReadParameters];
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

  async getRoleAdmin(role: BytesLike, params?: ReadParameters): Promise<string> {
    try {
      const abi = parseAbi(['function getRoleAdmin(bytes32 role) view returns (bytes32)']);
      return await this.reader(abi).read.getRoleAdmin([role as Hex], params);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getRoleAdmin = asCallableClass(GetRoleAdmin);
