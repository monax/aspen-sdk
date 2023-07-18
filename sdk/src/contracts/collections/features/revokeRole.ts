import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, BytesLike, ContractTransaction, PopulatedTransaction } from 'ethers';
import { AccessControl__factory, CollectionContract, Signerish, WriteOverrides } from '../..';
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

export type RevokeRoleCallArgs = [signer: Signerish, role: BytesLike, account: Addressish, overrides?: WriteOverrides];
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
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const contract = AccessControl__factory.connect(this.base.address, signer);
      const tx = await contract.revokeRole(role, wallet, overrides);
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
      const estimate = await contract.estimateGas.revokeRole(role, wallet, overrides);
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
      const tx = await contract.populateTransaction.revokeRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const revokeRole = asCallableClass(RevokeRole);
