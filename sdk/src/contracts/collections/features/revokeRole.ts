import { BigNumber, BytesLike, CallOverrides, ContractTransaction, ethers, PopulatedTransaction } from 'ethers';
import { AccessControl, Addressish, asAddress, CollectionContract, Signerish } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const RevokeRoleFunctions = {} as const;

const RevokeRolePartitions = {
  // 'RevokeRole' is always present but not actually exposed by any interface
  catchAll: CatchAllInterfaces,
};
type RevokeRolePartitions = typeof RevokeRolePartitions;

const RevokeRoleInterfaces = Object.values(RevokeRolePartitions).flat();
type RevokeRoleInterfaces = (typeof RevokeRoleInterfaces)[number];

export type RevokeRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: CallOverrides];
export type RevokeRoleResponse = ContractTransaction;

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
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function revokeRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = contract.revokeRole(role, wallet, overrides);
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
      const abi = ['function revokeRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const estimate = await contract.estimateGas.revokeRole(role, wallet, overrides);
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
    const abi = ['function revokeRole(bytes32 role, address account)'];

    try {
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = await contract.populateTransaction.revokeRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const revokeRole = asCallableClass(RevokeRole);
