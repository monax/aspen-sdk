import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex, parseAbi } from 'viem';
import { BytesLike, CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const GrantRoleFunctions = {} as const;

const GrantRolePartitions = {
  // 'GrantRole' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type GrantRolePartitions = typeof GrantRolePartitions;

const GrantRoleInterfaces = Object.values(GrantRolePartitions).flat();
type GrantRoleInterfaces = (typeof GrantRoleInterfaces)[number];

export type GrantRoleCallArgs = [walletClient: Signer, role: BytesLike, account: Addressish, params?: WriteParameters];
export type GrantRoleResponse = TransactionHash;

const GrantRoleAbi = ['function grantRole(bytes32 role, address account) public'];

export class GrantRole extends ContractFunction<
  GrantRoleInterfaces,
  GrantRolePartitions,
  GrantRoleCallArgs,
  GrantRoleResponse
> {
  readonly functionName = 'grantRole';

  constructor(base: CollectionContract) {
    super(base, GrantRoleInterfaces, GrantRolePartitions, GrantRoleFunctions);
  }

  execute(...args: GrantRoleCallArgs): Promise<GrantRoleResponse> {
    return this.grantRole(...args);
  }

  async grantRole(
    walletClient: Signer,
    role: BytesLike,
    account: Addressish,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(GrantRoleAbi);
      const { request } = await this.reader(abi).simulate.grantRole([role as Hex, wallet as Hex], params);
      const tx = await walletClient.sendTransaction(request);
      return tx as TransactionHash;
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
      const abi = parseAbi(GrantRoleAbi);
      const estimate = await this.reader(abi).estimateGas.grantRole([role as Hex, wallet as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(role: BytesLike, account: Addressish, params?: WriteParameters): Promise<string> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(GrantRoleAbi);
      const { request } = await this.reader(abi).simulate.grantRole([role as Hex, wallet as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const grantRole = asCallableClass(GrantRole);
