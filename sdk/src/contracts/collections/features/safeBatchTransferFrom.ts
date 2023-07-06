import { BigNumberish, BytesLike, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SafeBatchTransferFromFunctions = {
  sft: 'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)[]',
} as const;

const SafeBatchTransferFromPartitions = {
  sft: [...FeatureFunctionsMap[SafeBatchTransferFromFunctions.sft].drop],
};
type SafeBatchTransferFromPartitions = typeof SafeBatchTransferFromPartitions;

const SafeBatchTransferFromInterfaces = Object.values(SafeBatchTransferFromPartitions).flat();
type SafeBatchTransferFromInterfaces = (typeof SafeBatchTransferFromInterfaces)[number];

export type SafeBatchTransferFromCallArgs = [
  signer: Signerish,
  args: SafeBatchTransferFromArgs,
  overrides?: WriteOverrides,
];
export type SafeBatchTransferFromResponse = ContractTransaction;

export type SafeBatchTransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenIds: BigNumberish[];
  bytes: BytesLike;
  amounts: BigNumberish[];
};

export class SafeBatchTransferFrom extends ContractFunction<
  SafeBatchTransferFromInterfaces,
  SafeBatchTransferFromPartitions,
  SafeBatchTransferFromCallArgs,
  SafeBatchTransferFromResponse
> {
  readonly functionName = 'safeBatchTransferFrom';

  constructor(base: CollectionContract) {
    super(base, SafeBatchTransferFromInterfaces, SafeBatchTransferFromPartitions, SafeBatchTransferFromFunctions);
  }

  execute(...args: SafeBatchTransferFromCallArgs): Promise<SafeBatchTransferFromResponse> {
    return this.safeBatchTransferFrom(...args);
  }

  async safeBatchTransferFrom(
    signer: Signerish,
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const tx = await sft.connectWith(signer).safeBatchTransferFrom(from, to, tokenIds, amounts, bytes, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    overrides: WriteOverrides = {},
  ) {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const tx = await sft
        .connectWith(signer)
        .estimateGas.safeBatchTransferFrom(from, to, tokenIds, amounts, bytes, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    overrides: WriteOverrides = {},
  ) {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));

    try {
      const tx = await sft
        .connectReadOnly()
        .populateTransaction.safeBatchTransferFrom(from, to, tokenIds, amounts, bytes, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const safeBatchTransferFrom = asCallableClass(SafeBatchTransferFrom);
