import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const BalanceOfBatchFunctions = {
  sft: 'balanceOfBatch(address[],uint256[])[uint256[]]',
} as const;

const BalanceOfBatchPartitions = {
  sft: [...FeatureFunctionsMap[BalanceOfBatchFunctions.sft].drop],
};
type BalanceOfBatchPartitions = typeof BalanceOfBatchPartitions;

const BalanceOfBatchInterfaces = Object.values(BalanceOfBatchPartitions).flat();
type BalanceOfBatchInterfaces = (typeof BalanceOfBatchInterfaces)[number];

export type BalanceOfBatchCallArgs = [addresses: Addressish[], tokenIds: BigNumberish[], overrides?: CallOverrides];
export type BalanceOfBatchResponse = BigNumber[];

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

  /** Get the token supply owned by a wallet [ERC721: across the collection] [ERC1155: for specific token] */
  execute(...args: BalanceOfBatchCallArgs): Promise<BalanceOfBatchResponse> {
    return this.balanceOfBatch(...args);
  }

  async balanceOfBatch(
    addresses: Addressish[],
    tokenIds: BigNumberish[],
    overrides: CallOverrides = {},
  ): Promise<BigNumber[]> {
    const wallets = await Promise.all(addresses.map((a) => asAddress(a)));
    tokenIds = await Promise.all(tokenIds.map((t) => this.base.requireTokenId(t, this.functionName)));
    try {
      const sft = this.partition('sft');
      const balance = await sft.connectReadOnly().balanceOfBatch(wallets, tokenIds, overrides);
      return balance;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { addresses, tokenIds });
    }
  }
}

export const balanceOfBatch = asCallableClass(BalanceOfBatch);
