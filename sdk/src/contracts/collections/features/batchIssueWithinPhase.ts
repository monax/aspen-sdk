import { Address, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { BatchIssueArgs, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const BatchIssueWithinPhaseFunctions = {
  nft: 'batchIssueWithinPhase(address[],uint256[])[]',
  sft: 'batchIssueWithinPhase(address[],uint256[],uint256[])[]',
} as const;

const BatchIssueWithinPhasePartitions = {
  nft: [...FeatureFunctionsMap[BatchIssueWithinPhaseFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BatchIssueWithinPhaseFunctions.sft].drop],
};
type BatchIssueWithinPhasePartitions = typeof BatchIssueWithinPhasePartitions;

const BatchIssueWithinPhaseInterfaces = Object.values(BatchIssueWithinPhasePartitions).flat();
type BatchIssueWithinPhaseInterfaces = (typeof BatchIssueWithinPhaseInterfaces)[number];

export type BatchIssueWithinPhaseCallArgs = [walletClient: Signer, args: BatchIssueArgs, params?: WriteParameters];
export type BatchIssueWithinPhaseResponse = GetTransactionReceiptReturnType;

export class BatchIssueWithinPhase extends ContractFunction<
  BatchIssueWithinPhaseInterfaces,
  BatchIssueWithinPhasePartitions,
  BatchIssueWithinPhaseCallArgs,
  BatchIssueWithinPhaseResponse
> {
  readonly functionName = 'batchIssueWithinPhase';

  constructor(base: CollectionContract) {
    super(base, BatchIssueWithinPhaseInterfaces, BatchIssueWithinPhasePartitions, BatchIssueWithinPhaseFunctions);
  }

  execute(...args: BatchIssueWithinPhaseCallArgs): Promise<BatchIssueWithinPhaseResponse> {
    return this.batchIssueWithinPhase(...args);
  }

  async batchIssueWithinPhase(
    walletClient: Signer,
    args: BatchIssueArgs,
    params?: WriteParameters,
  ): Promise<BatchIssueWithinPhaseResponse> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.batchIssueWithinPhaseERC1155(walletClient, args as Required<BatchIssueArgs>, params);
      case 'ERC721':
        return await this.batchIssueWithinPhaseERC721(walletClient, args, params);
    }
  }

  protected async batchIssueWithinPhaseERC1155(
    walletClient: Signer,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    params?: WriteParameters,
  ): Promise<BatchIssueWithinPhaseResponse> {
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.batchIssueWithinPhase(
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

  protected async batchIssueWithinPhaseERC721(
    walletClient: Signer,
    { receivers, quantities }: BatchIssueArgs,
    params?: WriteParameters,
  ): Promise<BatchIssueWithinPhaseResponse> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithinPhase(
        [wallets as Hex[], quantities],
        params,
      );
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
      const estimate = await this.reader(this.abi(sft)).estimateGas.batchIssueWithinPhase(
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
      const estimate = await this.reader(this.abi(nft)).estimateGas.batchIssueWithinPhase(
        [wallets as Hex[], quantities],
        {
          account: walletClient.account,
          ...params,
        },
      );
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
      const { request } = await this.reader(this.abi(sft)).simulate.batchIssueWithinPhase(
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
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithinPhase(
        [wallets as Hex[], quantities],
        params,
      );
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

export const batchIssueWithinPhase = asCallableClass(BatchIssueWithinPhase);
