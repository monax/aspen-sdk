import { Address, Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const BatchIssueFunctions = {
  nft: 'batchIssue(address[],uint256[])[]',
  sft: 'batchIssue(address[],uint256[],uint256[])[]',
} as const;

const BatchIssuePartitions = {
  nft: [...FeatureFunctionsMap[BatchIssueFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BatchIssueFunctions.sft].drop],
};
type BatchIssuePartitions = typeof BatchIssuePartitions;

const BatchIssueInterfaces = Object.values(BatchIssuePartitions).flat();
type BatchIssueInterfaces = (typeof BatchIssueInterfaces)[number];

export type BatchIssueCallArgs = [walletClient: Signer, args: BatchIssueArgs, params?: WriteParameters];
export type BatchIssueResponse = GetTransactionReceiptReturnType;

export type BatchIssueArgs = {
  receivers: Addressish[];
  tokenIds?: bigint[];
  quantities: bigint[];
};

export class BatchIssue extends ContractFunction<
  BatchIssueInterfaces,
  BatchIssuePartitions,
  BatchIssueCallArgs,
  BatchIssueResponse
> {
  readonly functionName = 'batchIssue';

  constructor(base: CollectionContract) {
    super(base, BatchIssueInterfaces, BatchIssuePartitions, BatchIssueFunctions);
  }

  execute(...args: BatchIssueCallArgs): Promise<BatchIssueResponse> {
    return this.batchIssue(...args);
  }

  async batchIssue(walletClient: Signer, args: BatchIssueArgs, params?: WriteParameters): Promise<BatchIssueResponse> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.batchIssueERC1155(walletClient, args as Required<BatchIssueArgs>, params);
      case 'ERC721':
        return await this.batchIssueERC721(walletClient, args, params);
    }
  }

  protected async batchIssueERC1155(
    walletClient: Signer,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    params?: WriteParameters,
  ): Promise<BatchIssueResponse> {
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.batchIssue(
        [wallets as Hex[], tokenIds, quantities],
        params,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async batchIssueERC721(
    walletClient: Signer,
    { receivers, quantities }: BatchIssueArgs,
    params?: WriteParameters,
  ): Promise<BatchIssueResponse> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssue([wallets as Hex[], quantities], params);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  async estimateGas(walletClient: Signer, args: BatchIssueArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(walletClient, args as Required<BatchIssueArgs>, params);
      case 'ERC721':
        return await this.estimateGasERC721(walletClient, args, params);
    }
  }

  protected async estimateGasERC1155(
    walletClient: Signer,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    params?: WriteParameters,
  ): Promise<bigint> {
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await this.reader(this.abi(sft)).estimateGas.batchIssue(
        [wallets as Hex[], tokenIds, quantities],
        {
          account: walletClient.account,
          ...params,
        },
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async estimateGasERC721(
    walletClient: Signer,
    { receivers, quantities }: BatchIssueArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.batchIssue([wallets as Hex[], quantities], {
        account: walletClient.account,
        ...params,
      });
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  async populateTransaction(args: BatchIssueArgs, params?: WriteParameters): Promise<string> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args as Required<BatchIssueArgs>, params);
      case 'ERC721':
        return await this.populateTransactionERC721(args, params);
    }
  }

  protected async populateTransactionERC1155(
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    params?: WriteParameters,
  ): Promise<string> {
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.batchIssue(
        [wallets as Hex[], tokenIds, quantities],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async populateTransactionERC721(
    { receivers, quantities }: BatchIssueArgs,
    params?: WriteParameters,
  ): Promise<string> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssue([wallets as Hex[], quantities], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  protected async validateArgs({ receivers }: BatchIssueArgs) {
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));
    if (wallets.includes(ZERO_ADDRESS as Address)) {
      throw new SdkError(
        SdkErrorCode.INVALID_DATA,
        { receivers },
        new Error('Receivers cannot include an empty address'),
      );
    }
  }
}

export const batchIssue = asCallableClass(BatchIssue);
