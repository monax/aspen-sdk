import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { BytesLike, RequiredTokenId, Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

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
  walletClient: Signer,
  args: SafeBatchTransferFromArgs,
  params?: WriteParameters,
];
export type SafeBatchTransferFromResponse = GetTransactionReceiptReturnType;

export type SafeBatchTransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenIds: RequiredTokenId[];
  bytes: BytesLike;
  amounts: (bigint | number)[];
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
    walletClient: Signer,
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    params?: WriteParameters,
  ): Promise<SafeBatchTransferFromResponse> {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    const _tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const _amounts = amounts.map((a) => BigInt(a));
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.safeBatchTransferFrom(
        [from as Hex, to as Hex, _tokenIds, _amounts, bytes as Hex],
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
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    params?: WriteParameters,
  ) {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    const _tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const _amounts = amounts.map((a) => BigInt(a));
    const fullParams = { account: walletClient.account, ...params };

    try {
      const tx = await this.reader(this.abi(sft)).estimateGas.safeBatchTransferFrom(
        [from as Hex, to as Hex, _tokenIds, _amounts, bytes as Hex],
        fullParams,
      );
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    { fromAddress, toAddress, tokenIds, bytes, amounts }: SafeBatchTransferFromArgs,
    params?: WriteParameters,
  ) {
    const sft = this.partition('sft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    const _tokenIds = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const _amounts = amounts.map((a) => BigInt(a));

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.safeBatchTransferFrom(
        [from as Hex, to as Hex, _tokenIds, _amounts, bytes as Hex],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const safeBatchTransferFrom = asCallableClass(SafeBatchTransferFrom);
