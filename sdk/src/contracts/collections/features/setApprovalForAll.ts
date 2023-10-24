import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const SetApprovalForAllFunctions = {
  v1: 'setApprovalForAll(address,bool)[]',
} as const;

const SetApprovalForAllPartitions = {
  v1: [...FeatureFunctionsMap[SetApprovalForAllFunctions.v1].drop],
};
type SetApprovalForAllPartitions = typeof SetApprovalForAllPartitions;

const SetApprovalForAllInterfaces = Object.values(SetApprovalForAllPartitions).flat();
type SetApprovalForAllInterfaces = (typeof SetApprovalForAllInterfaces)[number];

export type SetApprovalForAllArgs = {
  operator: Addressish;
  approved: boolean;
};

export type SetApprovalForAllCallArgs = [walletClient: Signer, args: SetApprovalForAllArgs, params?: WriteParameters];
export type SetApprovalForAllResponse = GetTransactionReceiptReturnType;

export class SetApprovalForAll extends ContractFunction<
  SetApprovalForAllInterfaces,
  SetApprovalForAllPartitions,
  SetApprovalForAllCallArgs,
  SetApprovalForAllResponse
> {
  readonly functionName = 'setApprovalForAll';

  constructor(base: CollectionContract) {
    super(base, SetApprovalForAllInterfaces, SetApprovalForAllPartitions, SetApprovalForAllFunctions);
  }

  execute(...args: SetApprovalForAllCallArgs): Promise<SetApprovalForAllResponse> {
    return this.setApprovalForAll(...args);
  }

  async setApprovalForAll(
    walletClient: Signer,
    { operator, approved }: SetApprovalForAllArgs,
    params?: WriteParameters,
  ): Promise<SetApprovalForAllResponse> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setApprovalForAll(
        [wallet as Hex, approved],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }

  async estimateGas(
    walletClient: Signer,
    { operator, approved }: SetApprovalForAllArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setApprovalForAll(
        [wallet as Hex, approved],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }

  async populateTransaction({ operator, approved }: SetApprovalForAllArgs, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(operator);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setApprovalForAll([wallet as Hex, approved], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { operator, approved });
    }
  }
}

export const setApprovalForAll = asCallableClass(SetApprovalForAll);
