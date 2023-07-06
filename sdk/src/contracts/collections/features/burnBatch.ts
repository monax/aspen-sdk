import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
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
  signer: Signerish,
  tokenIds: BigNumberish[],
  wallet: Addressish,
  amount: BigNumberish[],
  overrides?: WriteOverrides,
];
export type BurnBatchResponse = ContractTransaction;

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
    signer: Signerish,
    tokenIds: BigNumberish[],
    wallet: Addressish,
    amount: BigNumberish[],
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const tx = await sft.connectWith(signer).burnBatch(account, tokenIds, amount, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    tokenIds: BigNumberish[],
    wallet: Addressish,
    amount: BigNumberish[],
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const estimate = await sft.connectWith(signer).estimateGas.burnBatch(account, tokenIds, amount, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenIds: BigNumberish[],
    wallet: Addressish,
    amount: BigNumberish[],
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const sft = this.partition('sft');
    const account = await asAddress(wallet);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const tx = await sft.connectReadOnly().populateTransaction.burnBatch(account, tokenIds, amount, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const burnBatch = asCallableClass(BurnBatch);
