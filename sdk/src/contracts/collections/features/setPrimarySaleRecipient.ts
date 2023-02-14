import { BigNumber, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetPrimarySaleRecipientFunctions = {
  v1: 'setPrimarySaleRecipient(address)[]',
} as const;

const SetPrimarySaleRecipientPartitions = {
  v1: [...FeatureFunctionsMap[SetPrimarySaleRecipientFunctions.v1].drop],
};
type SetPrimarySaleRecipientPartitions = typeof SetPrimarySaleRecipientPartitions;

const SetPrimarySaleRecipientInterfaces = Object.values(SetPrimarySaleRecipientPartitions).flat();
type SetPrimarySaleRecipientInterfaces = (typeof SetPrimarySaleRecipientInterfaces)[number];

export type SetPrimarySaleRecipientCallArgs = [signer: Signerish, recipient: Addressish, overrides?: SourcedOverrides];
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

  call(...args: SetPrimarySaleRecipientCallArgs): Promise<SetPrimarySaleRecipientResponse> {
    return this.setPrimarySaleRecipient(...args);
  }

  async setPrimarySaleRecipient(
    signer: Signerish,
    recipient: Addressish,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setPrimarySaleRecipient(asAddress(recipient), overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, recipient: Addressish, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1
        .connectWith(signer)
        .estimateGas.setPrimarySaleRecipient(asAddress(recipient), overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}