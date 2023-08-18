import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex, parseAbi } from 'viem';
import { BytesLike, CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const RenounceRoleFunctions = {} as const;

const RenounceRolePartitions = {
  // 'RenounceRole' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type RenounceRolePartitions = typeof RenounceRolePartitions;

const RenounceRoleInterfaces = Object.values(RenounceRolePartitions).flat();
type RenounceRoleInterfaces = (typeof RenounceRoleInterfaces)[number];

export type RenounceRoleCallArgs = [
  walletClient: Signer,
  role: BytesLike,
  account: Addressish,
  params?: WriteParameters,
];
export type RenounceRoleResponse = TransactionHash;

const RenounceRoleAbi = ['function renounceRole(bytes32 role, address account) external'];

export class RenounceRole extends ContractFunction<
  RenounceRoleInterfaces,
  RenounceRolePartitions,
  RenounceRoleCallArgs,
  RenounceRoleResponse
> {
  readonly functionName = 'renounceRole';

  constructor(base: CollectionContract) {
    super(base, RenounceRoleInterfaces, RenounceRolePartitions, RenounceRoleFunctions);
  }

  execute(...args: RenounceRoleCallArgs): Promise<RenounceRoleResponse> {
    return this.renounceRole(...args);
  }

  async renounceRole(
    walletClient: Signer,
    role: BytesLike,
    account: Addressish,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(RenounceRoleAbi);
      const { request } = await this.reader(abi).simulate.renounceRole([role as Hex, wallet as Hex], params);
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
      const abi = parseAbi(RenounceRoleAbi);
      const estimate = await this.reader(abi).estimateGas.renounceRole([role as Hex, wallet as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(role: BytesLike, account: Addressish, params?: WriteParameters): Promise<string> {
    const wallet = await asAddress(account);

    try {
      const abi = parseAbi(RenounceRoleAbi);
      const { request } = await this.reader(abi).simulate.renounceRole([role as Hex, wallet as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const renounceRole = asCallableClass(RenounceRole);
