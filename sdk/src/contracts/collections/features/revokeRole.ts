import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData, parseAbi } from 'viem';
import { BytesLike, CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { CatchAllInterfaces, ContractFunction, asCallableClass } from './features';

const RevokeRoleFunctions = {} as const;

const RevokeRolePartitions = {
  // 'RevokeRole' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type RevokeRolePartitions = typeof RevokeRolePartitions;

const RevokeRoleInterfaces = Object.values(RevokeRolePartitions).flat();
type RevokeRoleInterfaces = (typeof RevokeRoleInterfaces)[number];

export type RevokeRoleCallArgs = [signer: Signer, role: BytesLike, account: Addressish, params?: WriteParameters];
export type RevokeRoleResponse = GetTransactionReceiptReturnType;

const RevokeRoleAbi = ['function revokeRole(bytes32 role, address account) public'];

export class RevokeRole extends ContractFunction<
  RevokeRoleInterfaces,
  RevokeRolePartitions,
  RevokeRoleCallArgs,
  RevokeRoleResponse
> {
  readonly functionName = 'revokeRole';

  constructor(base: CollectionContract) {
    super(base, RevokeRoleInterfaces, RevokeRolePartitions, RevokeRoleFunctions);
  }

  execute(...args: RevokeRoleCallArgs): Promise<RevokeRoleResponse> {
    return this.revokeRole(...args);
  }

  async revokeRole(
    walletClient: Signer,
    role: BytesLike,
    account: Addressish,
    params?: WriteParameters,
  ): Promise<RevokeRoleResponse> {
    const wallet = await asAddress(account);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const abi = parseAbi(RevokeRoleAbi);
      const { request } = await this.reader(abi).simulate.renounceRole([role as Hex, wallet as Hex], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    role: BytesLike,
    account: Addressish,
    params?: WriteParameters,
  ): Promise<bigint> {
    const wallet = await asAddress(account);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const abi = parseAbi(RevokeRoleAbi);
      const estimate = await this.reader(abi).estimateGas.renounceRole([role as Hex, wallet as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(role: BytesLike, account: Addressish, params?: WriteParameters): Promise<string> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(RevokeRoleAbi);
      const { request } = await this.reader(abi).simulate.renounceRole([role as Hex, wallet as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const revokeRole = asCallableClass(RevokeRole);
