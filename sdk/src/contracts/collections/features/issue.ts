import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Address, Addressish, asAddress, ChainId, extractEventsFromLogs, isSameAddress, ZERO_ADDRESS } from '../..';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
import type { Signerish, TokenId, TokenStandard, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IssueFunctions = {
  nft: 'issue(address,uint256)[]',
  sft: 'issue(address,uint256,uint256)[]',
} as const;

const IssuePartitions = {
  nft: [...FeatureFunctionsMap[IssueFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[IssueFunctions.sft].drop],
};
type IssuePartitions = typeof IssuePartitions;

const IssueInterfaces = Object.values(IssuePartitions).flat();
type IssueInterfaces = (typeof IssueInterfaces)[number];

export type IssueCallArgs = [signer: Signerish, args: IssueArgs, overrides?: WriteOverrides];
export type IssueResponse = ContractTransaction;

export type IssueArgs = {
  receiver: Addressish;
  tokenId?: TokenId;
  quantity: BigNumberish;
};

export type IssuedToken = {
  chainId: ChainId;
  address: Address;
  tokenId: BigNumber;
  standard: TokenStandard;
  issuer: Address;
  receiver: Address;
  quantity: BigNumber;
  tokenURI: string | null;
};

export class Issue extends ContractFunction<IssueInterfaces, IssuePartitions, IssueCallArgs, IssueResponse> {
  readonly functionName = 'issue';

  constructor(base: CollectionContract) {
    super(base, IssueInterfaces, IssuePartitions, IssueFunctions);
  }

  execute(...args: IssueCallArgs): Promise<IssueResponse> {
    return this.issue(...args);
  }

  async issue(signer: Signerish, args: IssueArgs, overrides: WriteOverrides = {}): Promise<ContractTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.issueERC1155(signer, args, overrides);
      case 'ERC721':
        return this.issueERC721(signer, args, overrides);
    }
  }

  protected async issueERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await sft.connectWith(signer).issue(wallet, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async issueERC721(
    signer: Signerish,
    { receiver, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await nft.connectWith(signer).issue(wallet, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async estimateGas(signer: Signerish, args: IssueArgs, overrides: WriteOverrides = {}): Promise<BigNumber> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.estimateGasERC1155(signer, args, overrides);
      case 'ERC721':
        return this.estimateGasERC721(signer, args, overrides);
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
      const gas = await sft.connectWith(signer).estimateGas.issue(wallet, tokenId, quantity, overrides);
      return gas;
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
      const gas = await nft.connectWith(signer).estimateGas.issue(wallet, quantity, overrides);
      return gas;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async populateTransaction(
    signer: Signerish,
    args: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.populateTransactionERC1155(signer, args, overrides);
      case 'ERC721':
        return this.populateTransactionERC721(signer, args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await sft.connectWith(signer).populateTransaction.issue(wallet, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async populateTransactionERC721(
    signer: Signerish,
    { receiver, quantity }: IssueArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const tx = await nft.connectWith(signer).populateTransaction.issue(wallet, quantity, overrides);
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
    const issueTokens: IssuedToken[] = [];

    try {
      if (nft) {
        // @todo
        const nftEvents = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2');
        const contract = nftEvents.connectReadOnly();

        issueTokens.push(
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

        issueTokens.push(
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
        // @todo
        const sftEvents = this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3');
        const contract = sftEvents.connectReadOnly();

        issueTokens.push(
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

    return issueTokens;
  }
}

export const issue = asCallableClass(Issue);
