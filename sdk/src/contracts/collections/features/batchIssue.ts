import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Address, Addressish, asAddress, extractEventsFromLogs, IssuedToken, ZERO_ADDRESS_BRANDED } from '../..';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
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
    const tokenIdsBN = await Promise.all(tokenIds.map((t) => this.base.requireTokenId(t, this.functionName)));
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
    const tokenIdsBN = await Promise.all(tokenIds.map((t) => this.base.requireTokenId(t, this.functionName)));
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
    const tokenIdsBN = await Promise.all(tokenIds.map((t) => this.base.requireTokenId(t, this.functionName)));
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

  // TODO
  async parseReceiptLogs(receipt: ContractReceipt): Promise<IssuedToken[]> {
    const { nft, sft } = this.partitions;
    const { chainId, address } = this.base;
    const batchIssueTokens: IssuedToken[] = [];

    try {
      if (nft) {
        // TODO
        const nftEvents = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2');
        const contract = nftEvents.connectReadOnly();

        batchIssueTokens.push(
          ...extractEventsFromLogs(contract.filters.TokensIssued(), contract.interface, receipt.logs)
            .map(({ startTokenId, issuer, receiver, quantity }) => {
              const events: IssuedToken[] = [];
              for (const tokenId of bnRange(startTokenId, quantity)) {
                events.push({
                  chainId,
                  address,
                  tokenId,
                  standard: 'ERC721',
                  issuer: parse(Address, issuer),
                  receiver: parse(Address, receiver),
                  tokenURI: null,
                  quantity: One,
                });
              }
              return events;
            })
            .flat(),
        );

        batchIssueTokens.push(
          ...extractEventsFromLogs(contract.filters.TokenIssued(), contract.interface, receipt.logs).map(
            ({ tokenId, issuer, receiver, tokenURI }) => {
              const event: IssuedToken = {
                chainId,
                address,
                tokenId,
                standard: 'ERC721',
                issuer: parse(Address, issuer),
                receiver: parse(Address, receiver),
                tokenURI: tokenURI,
                quantity: One,
              };
              return event;
            },
          ),
        );
      } else if (sft) {
        // TODO
        const sftEvents = this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3');
        const contract = sftEvents.connectReadOnly();

        batchIssueTokens.push(
          ...extractEventsFromLogs(contract.filters.TokensIssued(), contract.interface, receipt.logs).map(
            ({ tokenId, claimer, receiver, quantityClaimed }) => {
              const event: IssuedToken = {
                chainId,
                address,
                tokenId,
                standard: 'ERC1155',
                issuer: parse(Address, claimer),
                receiver: parse(Address, receiver),
                tokenURI: null,
                quantity: quantityClaimed,
              };
              return event;
            },
          ),
        );
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.INVALID_DATA, { receipt });
    }

    return batchIssueTokens;
  }
}

export const batchIssue = asCallableClass(BatchIssue);
