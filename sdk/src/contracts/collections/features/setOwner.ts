import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetOwnerFunctions = {
  v1: 'setOwner(address)[]',
} as const;

const SetOwnerPartitions = {
  v1: [...FeatureFunctionsMap[SetOwnerFunctions.v1].drop],
};
type SetOwnerPartitions = typeof SetOwnerPartitions;

const SetOwnerInterfaces = Object.values(SetOwnerPartitions).flat();
type SetOwnerInterfaces = (typeof SetOwnerInterfaces)[number];

export type SetOwnerCallArgs = [walletClient: Signer, ownerAddress: Addressish, params?: WriteParameters];
export type SetOwnerResponse = GetTransactionReceiptReturnType;

export class SetOwner extends ContractFunction<
  SetOwnerInterfaces,
  SetOwnerPartitions,
  SetOwnerCallArgs,
  SetOwnerResponse
> {
  readonly functionName = 'setOwner';

  constructor(base: CollectionContract) {
    super(base, SetOwnerInterfaces, SetOwnerPartitions, SetOwnerFunctions);
  }

  execute(...args: SetOwnerCallArgs): Promise<SetOwnerResponse> {
    return this.setOwner(...args);
  }

  async setOwner(walletClient: Signer, ownerAddress: Addressish, params?: WriteParameters): Promise<SetOwnerResponse> {
    const v1 = this.partition('v1');
    const owner = await asAddress(ownerAddress);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setOwner([owner as Hex], params);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, ownerAddress: Addressish, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const owner = await asAddress(ownerAddress);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setOwner([owner as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(ownerAddress: Addressish, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    const owner = await asAddress(ownerAddress);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setOwner([owner as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setOwner = asCallableClass(SetOwner);
