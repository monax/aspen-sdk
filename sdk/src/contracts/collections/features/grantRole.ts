import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, BytesLike, ContractTransaction, PopulatedTransaction } from 'ethers';
import { AccessControl__factory, CollectionContract, Signerish, WriteOverrides } from '../..';
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

export type GrantRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: WriteOverrides];
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
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const contract = AccessControl__factory.connect(this.base.address, signer);
      const tx = await contract.grantRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    role: BytesLike,
    account: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const wallet = await asAddress(account);

    try {
      const contract = AccessControl__factory.connect(this.base.address, signer);
      const estimate = await contract.estimateGas.grantRole(role, wallet, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    role: BytesLike,
    account: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const wallet = await asAddress(account);

    try {
      const contract = AccessControl__factory.connect(this.base.address, this.base.provider);
      const tx = await contract.populateTransaction.grantRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const grantRole = asCallableClass(GrantRole);
