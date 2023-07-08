import { BigNumber, ContractReceipt, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Address, asAddress, extractEventsFromLogs, isSameAddress, IssueArgs, IssuedToken, ZERO_ADDRESS } from '../..';
import { parse } from '@monaxlabs/phloem/dist/schema';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IssueWithinPhaseFunctions = {
  nft: 'issueWithinPhase(address,uint256)[]',
  sft: 'issueWithinPhase(address,uint256,uint256)[]',
} as const;

const IssueWithinPhasePartitions = {
  nft: [...FeatureFunctionsMap[IssueWithinPhaseFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[IssueWithinPhaseFunctions.sft].drop],
};
type IssueWithinPhasePartitions = typeof IssueWithinPhasePartitions;

const IssueWithinPhaseInterfaces = Object.values(IssueWithinPhasePartitions).flat();
type IssueWithinPhaseInterfaces = (typeof IssueWithinPhaseInterfaces)[number];

export type IssueWithinPhaseCallArgs = [signer: Signerish, args: IssueArgs, overrides?: WriteOverrides];
export type IssueWithinPhaseResponse = ContractTransaction;

export class IssueWithinPhase extends ContractFunction<
  IssueWithinPhaseInterfaces,
  IssueWithinPhasePartitions,
  IssueWithinPhaseCallArgs,
  IssueWithinPhaseResponse
> {
  readonly functionName = 'issueWithinPhase';

  constructor(base: CollectionContract) {
    super(base, IssueWithinPhaseInterfaces, IssueWithinPhasePartitions, IssueWithinPhaseFunctions);
  }

  execute(...args: IssueWithinPhaseCallArgs): Promise<IssueWithinPhaseResponse> {
    return this.issueWithinPhase(...args);
  }

  async issueWithinPhase(
    signer: Signerish,
    args: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.issueWithinPhaseERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.issueWithinPhaseERC721(signer, args, overrides);
    }
  }

  protected async issueWithinPhaseERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await sft.connectWith(signer).issueWithinPhase(wallet, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async issueWithinPhaseERC721(
    signer: Signerish,
    { receiver, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await nft.connectWith(signer).issueWithinPhase(wallet, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async estimateGas(signer: Signerish, args: IssueArgs, overrides: WriteOverrides = {}): Promise<BigNumber> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.estimateGasERC721(signer, args, overrides);
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const estimate = await sft.connectWith(signer).estimateGas.issueWithinPhase(wallet, tokenId, quantity, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receiver, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const estimate = await nft.connectWith(signer).estimateGas.issueWithinPhase(wallet, quantity, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async populateTransaction(args: IssueArgs, overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args, overrides);
      case 'ERC721':
        return await this.populateTransactionERC721(args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    { receiver, tokenId, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await sft.connectReadOnly().populateTransaction.issueWithinPhase(wallet, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async populateTransactionERC721(
    { receiver, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await nft.connectReadOnly().populateTransaction.issueWithinPhase(wallet, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  protected async validateArgs({ receiver }: IssueArgs) {
    const wallet = await asAddress(receiver);
    if (isSameAddress(wallet, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receiver }, new Error('Receiver cannot be an empty address'));
    }
  }

  async parseReceiptLogs(receipt: ContractReceipt): Promise<IssuedToken[]> {
    const { nft, sft } = this.partitions;
    const { chainId, address } = this.base;
    const issueWithinPhaseTokens: IssuedToken[] = [];

    try {
      if (nft) {
        const contract = nft.connectReadOnly();

        issueWithinPhaseTokens.push(
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

        issueWithinPhaseTokens.push(
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
        const contract = sft.connectReadOnly();

        issueWithinPhaseTokens.push(
          ...extractEventsFromLogs(contract.filters.TokensIssued(), contract.interface, receipt.logs).map(
            ({ tokenId, issuer, receiver, quantityClaimed }) => {
              const event: IssuedToken = {
                chainId,
                address,
                tokenId,
                standard: 'ERC1155',
                issuer: parse(Address, issuer),
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

    return issueWithinPhaseTokens;
  }
}

export const issueWithinPhase = asCallableClass(IssueWithinPhase);
