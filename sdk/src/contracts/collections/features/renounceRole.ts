import { BigNumber, BytesLike, CallOverrides, ContractTransaction, ethers, PopulatedTransaction } from 'ethers';
import { AccessControl, Addressish, asAddress, CollectionContract, Signerish } from '../..';
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

export type RenounceRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: CallOverrides];
export type RenounceRoleResponse = ContractTransaction;

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
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function renounceRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = contract.renounceRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<BigNumber> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function renounceRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const estimate = await contract.estimateGas.renounceRole(role, wallet, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<PopulatedTransaction> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function renounceRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = await contract.populateTransaction.renounceRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const renounceRole = asCallableClass(RenounceRole);
