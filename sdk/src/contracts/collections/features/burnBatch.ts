import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { normalise } from '../number';
import type { BigIntish, Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, ERC1155StandardInterfaces, asCallableClass } from './features';

const BurnBatchFunctions = {
  sft: 'burnBatch(address,uint256[],uint256[])[]',
} as const;

const BurnBatchPartitions = {
  sft: [...FeatureFunctionsMap[BurnBatchFunctions.sft].drop],
  // 'burnBatch' has always been present but not actually exposed by the old interfaces
  catchAll: [...ERC1155StandardInterfaces],
};
type BurnBatchPartitions = typeof BurnBatchPartitions;

const BurnBatchInterfaces = Object.values(BurnBatchPartitions).flat();
type BurnBatchInterfaces = (typeof BurnBatchInterfaces)[number];

export type BurnBatchCallArgs = [
  walletClient: Signer,
  tokenIds: BigIntish[],
  wallet: Addressish,
  amount: BigIntish[],
  params?: WriteParameters,
];
export type BurnBatchResponse = GetTransactionReceiptReturnType;

export class BurnBatch extends ContractFunction<
  BurnBatchInterfaces,
  BurnBatchPartitions,
  BurnBatchCallArgs,
  BurnBatchResponse
> {
  readonly functionName = 'burnBatch';

  constructor(base: CollectionContract) {
    super(base, BurnBatchInterfaces, BurnBatchPartitions, BurnBatchFunctions);
  }

  execute(...args: BurnBatchCallArgs): Promise<BurnBatchResponse> {
    return this.burnBatch(...args);
  }

  async burnBatch(
    walletClient: Signer,
    tokenIds: BigIntish[],
    wallet: Addressish,
    amount: BigIntish[],
    params?: WriteParameters,
  ): Promise<BurnBatchResponse> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.burnBatch(
        [account as Hex, tokenIds.map(normalise), amount.map(normalise)],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    tokenIds: BigIntish[],
    wallet: Addressish,
    amount: BigIntish[],
    params?: WriteParameters,
  ): Promise<bigint> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(sft)).estimateGas.burnBatch(
        [account as Hex, tokenIds.map(normalise), amount.map(normalise)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenIds: BigIntish[],
    wallet: Addressish,
    amount: BigIntish[],
    params?: WriteParameters,
  ): Promise<string> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.burnBatch(
        [account as Hex, tokenIds.map(normalise), amount.map(normalise)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const burnBatch = asCallableClass(BurnBatch);
