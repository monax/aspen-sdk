import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const BalanceOfBatchFunctions = {
  sft: 'balanceOfBatch(address[],uint256[])[uint256[]]',
} as const;

const BalanceOfBatchPartitions = {
  sft: [...FeatureFunctionsMap[BalanceOfBatchFunctions.sft].drop],
};
type BalanceOfBatchPartitions = typeof BalanceOfBatchPartitions;

const BalanceOfBatchInterfaces = Object.values(BalanceOfBatchPartitions).flat();
type BalanceOfBatchInterfaces = (typeof BalanceOfBatchInterfaces)[number];

export type BalanceOfBatchCallArgs = [addresses: Addressish[], tokenIds: bigint[], params?: ReadParameters];
export type BalanceOfBatchResponse = { address: Addressish; tokenId: bigint; balance: bigint }[];

export class BalanceOfBatch extends ContractFunction<
  BalanceOfBatchInterfaces,
  BalanceOfBatchPartitions,
  BalanceOfBatchCallArgs,
  BalanceOfBatchResponse
> {
  readonly functionName = 'balanceOfBatch';

  constructor(base: CollectionContract) {
    super(base, BalanceOfBatchInterfaces, BalanceOfBatchPartitions, BalanceOfBatchFunctions);
  }

  /** Get the token supply for a set of tokens owned by a set of wallets */
  execute(...args: BalanceOfBatchCallArgs): Promise<BalanceOfBatchResponse> {
    return this.balanceOfBatch(...args);
  }

  async balanceOfBatch(
    addresses: Addressish[],
    tokenIds: bigint[],
    params?: ReadParameters,
  ): Promise<BalanceOfBatchResponse> {
    const wallets = await Promise.all(addresses.map((a) => asAddress(a)));
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    try {
      const sft = this.partition('sft');
      const balances = await this.reader(this.abi(sft)).read.balanceOfBatch([wallets as Hex[], tokenIds], params);
      return balances.map((b, i) => ({ balance: b, address: addresses[i], tokenId: tokenIds[i] }));
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { addresses, tokenIds });
    }
  }
}

export const balanceOfBatch = asCallableClass(BalanceOfBatch);
