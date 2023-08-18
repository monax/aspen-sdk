import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
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

export type SetPrimarySaleRecipientCallArgs = [walletClient: Signer, recipient: Addressish, params?: WriteParameters];
export type SetPrimarySaleRecipientResponse = TransactionHash;

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
    walletClient: Signer,
    recipient: Addressish,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPrimarySaleRecipient([wallet as Hex], params);
      const tx = await walletClient.sendTransaction(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, recipient: Addressish, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setPrimarySaleRecipient([wallet as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(recipient: Addressish, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPrimarySaleRecipient([wallet as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setPrimarySaleRecipient = asCallableClass(SetPrimarySaleRecipient);
