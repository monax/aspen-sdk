import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction } from 'ethers';
import { Address, ChainId, extractEventsFromLogs, isSameAddress, ZERO_ADDRESS } from '../..';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
import type { Signerish, SourcedOverrides, TokenId, TokenStandard } from '../types';
import { FeatureSet } from './features';

export const IssuerFeatures = [
  // NFT
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3',
  // SFT
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3',
] as const;

export type IssuerFeatures = (typeof IssuerFeatures)[number];

export type IssueArgs = {
  receiver: Address;
  tokenId?: TokenId;
  quantity: BigNumberish;
  tokenURI?: string;
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

export class Issuer extends FeatureSet<IssuerFeatures> {
  constructor(base: CollectionContract) {
    super(base, IssuerFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const issue = partitioner({
      nft: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3',
      ],
      sft: [
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV2',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3',
      ],
    });

    return { issue };
  });

  async issue(signer: Signerish, args: IssueArgs, overrides: SourcedOverrides = {}): Promise<ContractTransaction> {
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
    overrides: SourcedOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId);
    const { sft } = this.getPartition('issue');

    try {
      if (sft) {
        const tx = await sft.connectWith(signer).issue(receiver, tokenId, quantity, overrides);
        return tx;
      }
    } catch (err) {
      const args = { receiver, tokenId, quantity };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'issue' });
  }

  protected async issueERC721(
    signer: Signerish,
    { receiver, quantity, tokenURI }: IssueArgs,
    overrides: SourcedOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft } = this.getPartition('issue');

    try {
      if (nft) {
        const iNft = nft.connectWith(signer);
        let tx: ContractTransaction;
        if (tokenURI !== undefined) {
          tx = await iNft.issueWithTokenURI(receiver, tokenURI, overrides);
        } else {
          tx = await iNft.issue(receiver, quantity, overrides);
        }
        return tx;
      }
    } catch (err) {
      const args = { receiver, quantity };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'issue' });
  }

  async estimateGas(signer: Signerish, args: IssueArgs, overrides: SourcedOverrides = {}): Promise<BigNumber> {
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
    overrides: SourcedOverrides = {},
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId);
    const { sft } = this.getPartition('issue');

    try {
      if (sft) {
        const gas = await sft.connectWith(signer).estimateGas.issue(receiver, tokenId, quantity, overrides);
        return gas;
      }
    } catch (err) {
      const args = { receiver, tokenId, quantity };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'issue' });
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receiver, quantity, tokenURI }: IssueArgs,
    overrides: SourcedOverrides = {},
  ): Promise<BigNumber> {
    const { nft } = this.getPartition('issue');

    try {
      if (nft) {
        const iNft = nft.connectWith(signer);
        let gas: BigNumber;
        if (tokenURI !== undefined) {
          gas = await iNft.estimateGas.issueWithTokenURI(receiver, tokenURI, overrides);
        } else {
          gas = await iNft.estimateGas.issue(receiver, quantity, overrides);
        }
        return gas;
      }
    } catch (err) {
      const args = { receiver, quantity };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'issue' });
  }

  protected async validateArgs({ receiver, quantity, tokenURI }: IssueArgs) {
    if (isSameAddress(receiver, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('Receiver cannot be an empty address'));
    }

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (tokenURI !== undefined) {
          throw new SdkError(
            SdkErrorCode.INVALID_DATA,
            undefined,
            new Error('TokenURI is not supported for ERC1155 tokens'),
          );
        }
        break;

      case 'ERC721':
        if (tokenURI !== undefined && !BigNumber.from(quantity).eq(1)) {
          throw new SdkError(
            SdkErrorCode.INVALID_DATA,
            undefined,
            new Error('Quantity can is not supported when tokenURI is present'),
          );
        }
        break;
    }
  }

  async parseLogs(receipt: ContractReceipt): Promise<IssuedToken[]> {
    const { nft, sft } = this.getPartition('issue');
    const { chainId, address } = this.base;
    const issueTokens: IssuedToken[] = [];

    try {
      if (nft) {
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
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receipt }, err as Error);
    }

    return issueTokens;
  }
}
