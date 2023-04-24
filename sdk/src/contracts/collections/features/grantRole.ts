import { BigNumber, BytesLike, CallOverrides, ContractTransaction, ethers, PopulatedTransaction } from 'ethers';
import { AccessControl, Addressish, asAddress, CollectionContract, Signerish } from '../..';
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

export type GrantRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: CallOverrides];
export type GrantRoleResponse = ContractTransaction;

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
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: CallOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const abi = ['function grantRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = contract.grantRole(role, wallet, overrides);
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
      const abi = ['function grantRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const estimate = await contract.estimateGas.grantRole(role, wallet, overrides);
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
      const abi = ['function grantRole(bytes32 role, address account)'];
      const contract = new ethers.Contract(this.base.address, abi, signer) as AccessControl;
      const tx = await contract.populateTransaction.grantRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const grantRole = asCallableClass(GrantRole);
