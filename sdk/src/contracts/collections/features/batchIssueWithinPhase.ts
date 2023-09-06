import { Address, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { BatchIssueArgs, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type BatchIssueWithinPhaseCallArgs = [signer: Signerish, args: BatchIssueArgs, overrides?: WriteOverrides];
export type BatchIssueWithinPhaseResponse = ContractTransaction;

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
    signer: Signerish,
    args: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.batchIssueWithinPhaseERC1155(signer, args as Required<BatchIssueArgs>, overrides);
      case 'ERC721':
        return await this.batchIssueWithinPhaseERC721(signer, args, overrides);
    }
  }

  protected async batchIssueWithinPhaseERC1155(
    signer: Signerish,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const tokenIdsBN = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await sft.connectWith(signer).batchIssueWithinPhase(wallets, tokenIdsBN, quantities, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async batchIssueWithinPhaseERC721(
    signer: Signerish,
    { receivers, quantities }: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft.connectWith(signer).batchIssueWithinPhase(wallets, quantities, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  async estimateGas(signer: Signerish, args: BatchIssueArgs, overrides: WriteOverrides = {}): Promise<BigNumber> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(signer, args as Required<BatchIssueArgs>, overrides);
      case 'ERC721':
        return await this.estimateGasERC721(signer, args, overrides);
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const tokenIdsBN = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await sft
        .connectWith(signer)
        .estimateGas.batchIssueWithinPhase(wallets, tokenIdsBN, quantities, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receivers, quantities }: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await nft.connectWith(signer).estimateGas.batchIssueWithinPhase(wallets, quantities, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  async populateTransaction(args: BatchIssueArgs, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args as Required<BatchIssueArgs>, overrides);
      case 'ERC721':
        return await this.populateTransactionERC721(args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const tokenIdsBN = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await sft
        .connectReadOnly()
        .populateTransaction.batchIssueWithinPhase(wallets, tokenIdsBN, quantities, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async populateTransactionERC721(
    { receivers, quantities }: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft.connectReadOnly().populateTransaction.batchIssueWithinPhase(wallets, quantities, overrides);
      return tx;
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