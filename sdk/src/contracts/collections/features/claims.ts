import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PayableOverrides } from 'ethers';
import {
  Address,
  ICedarNFTIssuanceV0__factory,
  ICedarSFTIssuanceV0__factory,
  isSameAddress,
  NATIVE_TOKEN,
  TokenAsset,
  TokenAssetMetadata,
} from '../..';
import type { TokensClaimedEventObject as ERC721TokensClaimedEventObject } from '../../generated/issuance/ICedarNFTIssuance.sol/ICedarNFTIssuanceV4.js';
import type { TokensClaimedEventObject as ERC1155TokensClaimedEventObject } from '../../generated/issuance/ICedarSFTIssuance.sol/ICedarSFTIssuanceV2.js';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from '../features';
import type { Signerish, TokenId } from '../types';

export const ClaimsFeatures = [
  // NFT
  // 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV0', // very old
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2',
  // SFT
  // 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0', // very old
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
] as const;

export type ClaimsFeatures = (typeof ClaimsFeatures)[number];

export type ClaimArgs = {
  conditionId: number;
  receiver: Address;
  tokenId?: TokenId;
  quantity: BigNumberish;
  currency: Address;
  pricePerToken: BigNumberish;
  proofs: string[];
  proofMaxQuantityPerTransaction: BigNumberish;
};

export class Claims extends FeatureSet<ClaimsFeatures> {
  constructor(base: CollectionContract) {
    super(base, ClaimsFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const claim = partitioner({
      nft: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2',
      ],
      sft: [
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
      ],
    });

    return { claim };
  });

  async claim(signer: Signerish, args: ClaimArgs, overrides: PayableOverrides = {}): Promise<ContractTransaction> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.claimERC1155(signer, args, overrides);
      case 'ERC721':
        return this.claimERC721(signer, args, overrides);
    }
  }

  protected async claimERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<ContractTransaction> {
    const { sft } = this.getPartition('claim')(this.base.interfaces);
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }
    tokenId = this.base.requireTokenId(tokenId);

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = await sft.connectWith(signer);
      const tx = await iSft.claim(
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async claimERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft } = this.getPartition('claim')(this.base.interfaces);
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      const tx = await iNft.claim(
        receiver,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  async estimateGas(signer: Signerish, args: ClaimArgs, overrides: PayableOverrides = {}): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        return this.estimateGasERC1155(signer, args, overrides);
      }
      case 'ERC721': {
        return this.estimateGasERC721(signer, args, overrides);
      }
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<BigNumber> {
    const { sft } = this.getPartition('claim')(this.base.interfaces);
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }
    tokenId = this.base.requireTokenId(tokenId);

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = sft.connectWith(signer);
      return await iSft.estimateGas.claim(
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<BigNumber> {
    const { nft } = this.getPartition('claim')(this.base.interfaces);
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      return await iNft.estimateGas.claim(
        receiver,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  /**
   * Use this function to verify that the claimant actually meets the claim conditions
   * It's a 'read' function so it won't expend any gas
   */
  async verify(args: ClaimArgs, verifyMaxQuantityPerTransaction = true): Promise<boolean> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.verifyERC1155(args, verifyMaxQuantityPerTransaction);
      case 'ERC721':
        return await this.verifyERC721(args, verifyMaxQuantityPerTransaction);
    }

    return false;
  }

  protected async verifyERC1155(
    { conditionId, receiver, tokenId, quantity, currency, pricePerToken }: ClaimArgs,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    const { sft } = this.getPartition('claim')(this.base.interfaces);
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }
    tokenId = this.base.requireTokenId(tokenId);

    try {
      const iSft = sft.connectReadOnly();
      await iSft.verifyClaim(
        conditionId,
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        verifyMaxQuantityPerTransaction,
      );

      return true;
    } catch (err) {
      const args = {
        conditionId,
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        verifyMaxQuantityPerTransaction,
      };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async verifyERC721(
    { conditionId, receiver, quantity, currency, pricePerToken }: ClaimArgs,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    const { nft } = this.getPartition('claim')(this.base.interfaces);
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'claim' });
    }

    try {
      const iNft = nft.connectReadOnly();
      await iNft.verifyClaim(conditionId, receiver, quantity, currency, pricePerToken, verifyMaxQuantityPerTransaction);

      return true;
    } catch (err) {
      const args = {
        conditionId,
        receiver,
        quantity,
        currency,
        pricePerToken,
        verifyMaxQuantityPerTransaction,
      };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  /**
   * Get the metadata for all claimed tokens from the events in a contract receipt
   *
   * @param receipt
   * @returns Tokens metadata
   */
  async parseClaimReceipt(receipt: ContractReceipt): Promise<TokenAssetMetadata[]> {
    if (!receipt.events) return [];

    let tokens: TokenAssetMetadata[] = [];
    const tokenAssets: TokenAsset[] = [];

    const chainId = this.base.chainId;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          const iSft = ICedarSFTIssuanceV0__factory.createInterface();
          const topic1155 = iSft.getEventTopic('TokensClaimed');
          const event1155 = receipt.logs.find((log) => log.topics[0] === topic1155);
          if (event1155) {
            const { tokenId, quantityClaimed } = iSft.decodeEventLog(
              'TokensClaimed',
              event1155.data,
              event1155.topics,
            ) as unknown as ERC1155TokensClaimedEventObject;

            tokenAssets.push({
              chainId,
              contractAddress: this.base.address,
              tokenId: tokenId.toString(),
              standard: 'ERC1155',
              quantity: quantityClaimed,
            });
          }
          break;

        case 'ERC721':
          const iNft = ICedarNFTIssuanceV0__factory.createInterface();
          const topic721 = iNft.getEventTopic('TokensClaimed');
          const event721 = receipt.logs.find((log) => log.topics[0] === topic721);
          if (event721) {
            const { startTokenId, quantityClaimed } = iNft.decodeEventLog(
              'TokensClaimed',
              event721.data,
              event721.topics,
            ) as unknown as ERC721TokensClaimedEventObject;

            const lastTokenId = startTokenId.add(quantityClaimed).sub(1);

            for (let tokenId = startTokenId; tokenId.lte(lastTokenId); tokenId = tokenId.add(1)) {
              tokenAssets.push({
                chainId,
                contractAddress: this.base.address,
                tokenId: tokenId.toString(),
                standard: 'ERC721',
                quantity: BigNumber.from(1),
              });
            }
          }

          break;
      }

      tokens = await Promise.all(
        tokenAssets.map<Promise<TokenAssetMetadata>>(async (asset) => {
          const { uri, metadata } = await this.base.metadata.getTokenMetadata(asset.tokenId);
          return { asset, uri, metadata };
        }),
      );
    } catch (err) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receipt }, err as Error);
    }

    return tokens;
  }
}
