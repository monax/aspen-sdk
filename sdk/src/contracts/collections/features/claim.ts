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
import { Features } from '../features';
import type { Signerish } from '../types.js';

export const ClaimFeatures = [
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

export type ClaimFeatures = (typeof ClaimFeatures)[number];

export class Claim extends Features<ClaimFeatures> {
  constructor(base: CollectionContract) {
    super(base, ClaimFeatures);
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

  /**
   * Claim a number of tokens from the Collection contract
   *
   * @param signer
   * @param receiver The address of the wallet that will receive the claimed tokens
   * @param tokenId Token Id - required for ERC1155, ignored by ERC721
   * @param quantity Quantity - in ERC1155 it'll be scoped to the token; in ERC721 this signifies the number of claimed tokens
   * @param currency Currency / ERC20 Token address or a predefined value for native currency
   * @param pricePerToken Price per token in wei
   * @param proofs An array of proofs for allowlisting
   * @param proofMaxQuantityPerTransaction Additional allowlisting proof variable
   * @returns Contract Transaction
   */
  async claim(
    signer: Signerish,
    receiver: Address,
    tokenId: BigNumberish | null = null,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[] = [],
    proofMaxQuantityPerTransaction: BigNumberish = 0,
  ): Promise<ContractTransaction> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = this.base.requireTokenId(tokenId);

        return this.claimERC1155(
          signer,
          receiver,
          tokenId,
          quantity,
          currency,
          pricePerToken,
          proofs,
          proofMaxQuantityPerTransaction,
        );
      case 'ERC721':
        return this.claimERC721(
          signer,
          receiver,
          quantity,
          currency,
          pricePerToken,
          proofs,
          proofMaxQuantityPerTransaction,
        );
    }

    throw new SdkError(SdkErrorCode.UNSUPPORTED_TOKEN_STANDARD, 'feature', {
      feature: 'claim',
      tokenStandard: this.base.tokenStandard,
    });
  }

  protected async claimERC1155(
    signer: Signerish,
    receiver: Address,
    tokenId: BigNumber,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<ContractTransaction> {
    const { sft } = this.getPartition('claim');
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
    }

    try {
      const overrides: PayableOverrides = {};
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
    }
  }

  protected async claimERC721(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<ContractTransaction> {
    const { nft } = this.getPartition('claim');
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
    }

    try {
      const overrides: PayableOverrides = {};
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
    }
  }

  async estimateGas(
    signer: Signerish,
    receiver: Address,
    tokenId: BigNumberish | null = null,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        tokenId = this.base.requireTokenId(tokenId);

        return this.estimateGasERC1155(
          signer,
          receiver,
          tokenId,
          quantity,
          currency,
          pricePerToken,
          proofs,
          proofMaxQuantityPerTransaction,
        );
      }
      case 'ERC721': {
        return this.estimateGasERC721(
          signer,
          receiver,
          quantity,
          currency,
          pricePerToken,
          proofs,
          proofMaxQuantityPerTransaction,
        );
      }
    }

    throw new SdkError(SdkErrorCode.UNSUPPORTED_TOKEN_STANDARD, 'feature', {
      feature: 'claim',
      tokenStandard: this.base.tokenStandard,
    });
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    receiver: Address,
    tokenId: BigNumber,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber> {
    const { sft } = this.getPartition('claim');
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
    }

    try {
      const overrides: PayableOverrides = {};
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber> {
    const { nft } = this.getPartition('claim');
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
    }

    try {
      const overrides: PayableOverrides = {};
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
    }
  }

  /**
   * Use this function to verify that the claimant actually meets the claim conditions
   * It's a 'read' function so it won't expend any gas
   *
   * @param conditionId
   * @param receiver
   * @param tokenId
   * @param quantity
   * @param currency
   * @param pricePerToken
   * @param verifyMaxQuantityPerTransaction
   * @returns boolean
   */
  async verify(
    conditionId: number,
    receiver: Address,
    tokenId: BigNumberish | null = null,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = this.base.requireTokenId(tokenId);

        return await this.verifyERC1155(
          conditionId,
          receiver,
          tokenId,
          quantity,
          currency,
          pricePerToken,
          verifyMaxQuantityPerTransaction,
        );
      case 'ERC721':
        return await this.verifyERC721(
          conditionId,
          receiver,
          quantity,
          currency,
          pricePerToken,
          verifyMaxQuantityPerTransaction,
        );
    }

    return false;
  }

  protected async verifyERC1155(
    conditionId: number,
    receiver: Address,
    tokenId: BigNumberish,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    const { sft } = this.getPartition('claim');
    if (!sft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
    }

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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
    }
  }

  protected async verifyERC721(
    conditionId: number,
    receiver: Address,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    const { nft } = this.getPartition('claim');
    if (!nft) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'claim' });
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
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', args, err as Error);
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

    const chainId = await this.base.getChainId();

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
      throw new SdkError(SdkErrorCode.INVALID_DATA, 'input', { receipt });
      // this.base.error('Failed to get claimed tokens', err, 'getClaimedTokenAssets', { receipt });
    }

    return tokens;
  }
}
