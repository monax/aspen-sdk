import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { normalise } from '../number';
import type { BigIntish, Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction, ERC1155StandardInterfaces } from './features';

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
export type BurnBatchResponse = TransactionHash;

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

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.burnBatch(
        [account as `0x${string}`, tokenIds.map(normalise), amount.map(normalise)],
        params,
      );
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
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

    try {
      const estimate = await this.reader(this.abi(sft)).estimateGas.burnBatch(
        [account as `0x${string}`, tokenIds.map(normalise), amount.map(normalise)],
        {
          account: walletClient.account,
          ...params,
        },
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
        [account as `0x${string}`, tokenIds.map(normalise), amount.map(normalise)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const burnBatch = asCallableClass(BurnBatch);
