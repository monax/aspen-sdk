import { BigNumber, BytesLike, ContractTransaction, PopulatedTransaction } from 'ethers';
import { AccessControl__factory, Addressish, asAddress, CollectionContract, Signerish, WriteOverrides } from '../..';
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
  signer: Signerish,
  role: BytesLike,
  account: Addressish,
  overrides?: WriteOverrides,
];
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
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const wallet = await asAddress(account);

    try {
      const contract = AccessControl__factory.connect(this.base.address, signer);
      const tx = await contract.renounceRole(role, wallet, overrides);
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
      const estimate = await contract.estimateGas.renounceRole(role, wallet, overrides);
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
      const tx = await contract.populateTransaction.renounceRole(role, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const renounceRole = asCallableClass(RenounceRole);
