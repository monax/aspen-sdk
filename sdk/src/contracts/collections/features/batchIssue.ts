import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, ZERO_ADDRESS_BRANDED } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, TokenId, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type BatchIssueCallArgs = [signer: Signerish, args: BatchIssueArgs, overrides?: WriteOverrides];
export type BatchIssueResponse = ContractTransaction;

export type BatchIssueArgs = {
  receivers: Addressish[];
  tokenIds?: TokenId[];
  quantities: BigNumberish[];
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

  async batchIssue(
    signer: Signerish,
    args: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.batchIssueERC1155(signer, args as Required<BatchIssueArgs>, overrides);
      case 'ERC721':
        return await this.batchIssueERC721(signer, args, overrides);
    }
  }

  protected async batchIssueERC1155(
    signer: Signerish,
    { receivers, tokenIds, quantities }: Required<BatchIssueArgs>,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const tokenIdsBN = tokenIds.map((t) => this.base.requireTokenId(t, this.functionName));
    const sft = this.partition('sft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await sft.connectWith(signer).batchIssue(wallets, tokenIdsBN, quantities, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, tokenIds, quantities });
    }
  }

  protected async batchIssueERC721(
    signer: Signerish,
    { receivers, quantities }: BatchIssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft.connectWith(signer).batchIssue(wallets, quantities, overrides);
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
      const estimate = await sft.connectWith(signer).estimateGas.batchIssue(wallets, tokenIdsBN, quantities, overrides);
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
      const estimate = await nft.connectWith(signer).estimateGas.batchIssue(wallets, quantities, overrides);
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
      const tx = await sft.connectReadOnly().populateTransaction.batchIssue(wallets, tokenIdsBN, quantities, overrides);
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
      const tx = await nft.connectReadOnly().populateTransaction.batchIssue(wallets, quantities, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receivers, quantities });
    }
  }

  protected async validateArgs({ receivers }: BatchIssueArgs) {
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));
    if (wallets.includes(ZERO_ADDRESS_BRANDED)) {
      throw new SdkError(
        SdkErrorCode.INVALID_DATA,
        { receivers },
        new Error('Receivers cannot include an empty address'),
      );
    }
  }
}

export const batchIssue = asCallableClass(BatchIssue);
