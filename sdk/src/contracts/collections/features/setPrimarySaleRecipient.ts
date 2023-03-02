import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetPrimarySaleRecipientFunctions = {
  v1: 'setPrimarySaleRecipient(address)[]',
} as const;

const SetPrimarySaleRecipientPartitions = {
  v1: [...FeatureFunctionsMap[SetPrimarySaleRecipientFunctions.v1].drop],
};
type SetPrimarySaleRecipientPartitions = typeof SetPrimarySaleRecipientPartitions;

const SetPrimarySaleRecipientInterfaces = Object.values(SetPrimarySaleRecipientPartitions).flat();
type SetPrimarySaleRecipientInterfaces = (typeof SetPrimarySaleRecipientInterfaces)[number];

export type SetPrimarySaleRecipientCallArgs = [signer: Signerish, recipient: Addressish, overrides?: WriteOverrides];
export type SetPrimarySaleRecipientResponse = ContractTransaction;

export class SetPrimarySaleRecipient extends ContractFunction<
  SetPrimarySaleRecipientInterfaces,
  SetPrimarySaleRecipientPartitions,
  SetPrimarySaleRecipientCallArgs,
  SetPrimarySaleRecipientResponse
> {
  readonly functionName = 'setPrimarySaleRecipient';

  constructor(base: CollectionContract) {
    super(base, SetPrimarySaleRecipientInterfaces, SetPrimarySaleRecipientPartitions, SetPrimarySaleRecipientFunctions);
  }

  execute(...args: SetPrimarySaleRecipientCallArgs): Promise<SetPrimarySaleRecipientResponse> {
    return this.setPrimarySaleRecipient(...args);
  }

  async setPrimarySaleRecipient(
    signer: Signerish,
    recipient: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const tx = await v1.connectWith(signer).setPrimarySaleRecipient(wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, recipient: Addressish, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setPrimarySaleRecipient(wallet, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    recipient: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const tx = await v1.connectWith(signer).populateTransaction.setPrimarySaleRecipient(wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setPrimarySaleRecipient = asCallableClass(SetPrimarySaleRecipient);
