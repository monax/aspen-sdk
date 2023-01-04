import { ZERO_BYTES_FULL } from '@/constants';
import { NATIVE_CURRENCY_ADDRESS } from '@/utils/chain/constants';
import { Address, isSameAddress } from '@monax/aspen-spec';
import { Signerish } from '@monax/pando';
import {
  ERC721EnumerableUpgradeable,
  ERC721EnumerableUpgradeable__factory,
  ICedarNFTIssuanceV0__factory,
  ICedarNFTIssuanceV1,
  ICedarNFTIssuanceV2,
  ICedarNFTIssuanceV3,
  ICedarNFTIssuanceV4,
  ICedarSFTIssuanceV0__factory,
  ICedarSFTIssuanceV1,
  ICedarSFTIssuanceV2,
  ICedarSFTIssuanceV3,
  IERC1155SupplyV0,
  IERC1155SupplyV1,
  INFTSupplyV0,
  IPublicNFTIssuanceV0,
  IPublicNFTIssuanceV1,
  IPublicSFTIssuanceV0,
  IPublicSFTIssuanceV1,
  ISFTSupplyV0,
} from '@monax/pando/dist/types';
import type { TokensClaimedEventObject as ERC721TokensClaimedEventObject } from '@monax/pando/dist/types/artifacts/contracts/cedar/api/issuance/ICedarNFTIssuance.sol/ICedarNFTIssuanceV0';
import type { TokensClaimedEventObject as ERC1155TokensClaimedEventObject } from '@monax/pando/dist/types/artifacts/contracts/cedar/api/issuance/ICedarSFTIssuance.sol/ICedarSFTIssuanceV0';
import { add } from 'date-fns';
import { BigNumber, ContractReceipt, ContractTransaction, ethers, PayableOverrides } from 'ethers';
import { BaseFeature } from '../BaseFeature';
import type {
  ActiveClaimConditions,
  CollectionUserClaimConditions,
  CollectionUserClaimState,
  TokenAsset,
  TokenAssetMetadata,
  UserClaimConditions,
} from '../types';

export const TokenIdRequiredError = new Error('Token is required for ERC1155 contracts!');

// Reasonably large number to compare with
const SUPPLY_TRESHOLD = BigNumber.from(1e9);

export class Issuance extends BaseFeature {
  /**
   * @returns True if the contract supports Issuance interface
   */
  get supported(): boolean {
    const features = this.base.interfaces;
    return features.ICedarNFTIssuanceV1 ||
      features.ICedarNFTIssuanceV2 ||
      features.ICedarNFTIssuanceV3 ||
      features.ICedarNFTIssuanceV4 ||
      features.IPublicNFTIssuanceV0 ||
      features.IPublicNFTIssuanceV1 ||
      features.ICedarSFTIssuanceV1 ||
      features.ICedarSFTIssuanceV2 ||
      features.ICedarSFTIssuanceV3 ||
      features.IPublicSFTIssuanceV0 ||
      features.IPublicSFTIssuanceV1
      ? true
      : false;
  }

  /**
   * Get the metadata for all claimed tokens from the events in a contract receipt
   *
   * @param receipt
   * @returns Tokens metadata
   */
  async getClaimedTokenAssets(receipt: ContractReceipt): Promise<TokenAssetMetadata[]> {
    if (!receipt.events) return [];

    let tokens: TokenAssetMetadata[] = [];
    const tokenAssets: TokenAsset[] = [];

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
              chainId: this.base.chainId,
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
                chainId: this.base.chainId,
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
      this.base.error('Failed to get claimed tokens', err, 'getClaimedTokenAssets', { receipt });
    }

    return tokens;
  }

  /**
   * Claim a number of tokens from the Collection contract
   *
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
    tokenId: string | null = null,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<ContractTransaction | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (!tokenId) throw TokenIdRequiredError;

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

    return null;
  }

  protected async claimERC1155(
    signer: Signerish,
    receiver: Address,
    tokenId: string,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<ContractTransaction | null> {
    try {
      const interfaces = this.base.interfaces;

      let iSftIssuance:
        | ICedarSFTIssuanceV1
        | ICedarSFTIssuanceV2
        | ICedarSFTIssuanceV3
        | IPublicSFTIssuanceV0
        | IPublicSFTIssuanceV1
        | null = null;
      if (interfaces.ICedarSFTIssuanceV1) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV1.connectWith(signer);
      } else if (interfaces.ICedarSFTIssuanceV2) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV2.connectWith(signer);
      } else if (interfaces.ICedarSFTIssuanceV3) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV3.connectWith(signer);
      } else if (interfaces.IPublicSFTIssuanceV0) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV0.connectWith(signer);
      } else if (interfaces.IPublicSFTIssuanceV1) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV1.connectWith(signer);
      }

      if (!iSftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_CURRENCY_ADDRESS)) {
        overrides.value = pricePerToken.mul(quantity);
      }

      const tx = await iSftIssuance.claim(
        receiver,
        BigNumber.from(tokenId),
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
      this.base.error('Failed to claim tokens', err, 'claimERC1155', args, signer);
    }

    return null;
  }

  protected async claimERC721(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<ContractTransaction | null> {
    try {
      const interfaces = this.base.interfaces;

      let iNftIssuance:
        | ICedarNFTIssuanceV1
        | ICedarNFTIssuanceV2
        | ICedarNFTIssuanceV3
        | ICedarNFTIssuanceV4
        | IPublicNFTIssuanceV0
        | IPublicNFTIssuanceV1
        | null = null;

      if (interfaces.ICedarNFTIssuanceV1) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV1.connectWith(signer);
      } else if (interfaces.ICedarNFTIssuanceV2) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV2.connectWith(signer);
      } else if (interfaces.ICedarNFTIssuanceV3) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV3.connectWith(signer);
      } else if (interfaces.ICedarNFTIssuanceV4) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV4.connectWith(signer);
      } else if (interfaces.IPublicNFTIssuanceV0) {
        iNftIssuance = interfaces.IPublicNFTIssuanceV0.connectWith(signer);
      } else if (interfaces.IPublicNFTIssuanceV1) {
        iNftIssuance = interfaces.IPublicNFTIssuanceV1.connectWith(signer);
      }

      if (!iNftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_CURRENCY_ADDRESS)) {
        overrides.value = pricePerToken.mul(quantity);
      }

      const tx = await iNftIssuance.claim(
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
      this.base.error('Failed to claim tokens', err, 'claimERC721', args, signer);
    }

    return null;
  }

  async estimateGasForClaim(
    signer: Signerish,
    receiver: Address,
    tokenId: string | null = null,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<BigNumber | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        if (!tokenId) throw TokenIdRequiredError;
        return this.estimateGasForClaimERC1155(
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
        return this.estimateGasForClaimERC721(
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

    return null;
  }

  protected async estimateGasForClaimERC1155(
    signer: Signerish,
    receiver: Address,
    tokenId: string,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<BigNumber | null> {
    const interfaces = this.base.interfaces;

    try {
      if (!tokenId) throw TokenIdRequiredError;

      let iSftIssuance:
        | ICedarSFTIssuanceV1
        | ICedarSFTIssuanceV2
        | ICedarSFTIssuanceV3
        | IPublicSFTIssuanceV0
        | IPublicSFTIssuanceV1
        | null = null;
      if (interfaces.ICedarSFTIssuanceV1) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV1.connectWith(signer);
      } else if (interfaces.ICedarSFTIssuanceV2) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV2.connectWith(signer);
      } else if (interfaces.ICedarSFTIssuanceV3) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV3.connectWith(signer);
      } else if (interfaces.IPublicSFTIssuanceV0) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV0.connectWith(signer);
      } else if (interfaces.IPublicSFTIssuanceV1) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV1.connectWith(signer);
      }

      if (!iSftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_CURRENCY_ADDRESS)) {
        overrides.value = pricePerToken.mul(quantity);
      }

      return await iSftIssuance.estimateGas.claim(
        receiver,
        BigNumber.from(tokenId),
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      this.base.error('Failed claim ERC1155 gas estimation', err, 'estimateGasForClaimERC1155', args, signer);
    }
    return null;
  }

  protected async estimateGasForClaimERC721(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumber,
    currency: Address,
    pricePerToken: BigNumber,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumber,
  ): Promise<BigNumber | null> {
    const interfaces = this.base.interfaces;

    try {
      let iNftIssuance: ICedarNFTIssuanceV1 | ICedarNFTIssuanceV2 | null = null;
      if (interfaces.ICedarNFTIssuanceV1) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV1.connectWith(signer);
      } else if (interfaces.ICedarNFTIssuanceV2) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV2.connectWith(signer);
      }

      if (!iNftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_CURRENCY_ADDRESS)) {
        overrides.value = pricePerToken.mul(quantity);
      }

      return await iNftIssuance.estimateGas.claim(
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
      this.base.error('Failed claim ERC721 gas estimation', err, 'estimateGasForClaimERC721', args, signer);
    }

    return null;
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
  async verifyClaim(
    conditionId: number,
    receiver: Address,
    tokenId: string | null = null,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    if (!this.supported) return false;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (!tokenId) throw TokenIdRequiredError;

        return await this.verifyClaimERC1155(
          conditionId,
          receiver,
          tokenId,
          quantity,
          currency,
          pricePerToken,
          verifyMaxQuantityPerTransaction,
        );
      case 'ERC721':
        return await this.verifyClaimERC721(
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

  protected async verifyClaimERC1155(
    conditionId: number,
    receiver: Address,
    tokenId: string,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    try {
      const interfaces = this.base.interfaces;

      let iSftIssuance:
        | ICedarSFTIssuanceV1
        | ICedarSFTIssuanceV2
        | ICedarSFTIssuanceV3
        | IPublicSFTIssuanceV0
        | IPublicSFTIssuanceV1
        | null = null;
      if (interfaces.ICedarSFTIssuanceV1) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV1.connectReadOnly();
      } else if (interfaces.ICedarSFTIssuanceV2) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV2.connectReadOnly();
      } else if (interfaces.ICedarSFTIssuanceV3) {
        iSftIssuance = interfaces.ICedarSFTIssuanceV3.connectReadOnly();
      } else if (interfaces.IPublicSFTIssuanceV0) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV0.connectReadOnly();
      } else if (interfaces.IPublicSFTIssuanceV1) {
        iSftIssuance = interfaces.IPublicSFTIssuanceV1.connectReadOnly();
      }

      if (!iSftIssuance) return false;

      // this internal try catches the revert error
      // which is a signal that the claim conditions aren't met
      try {
        await iSftIssuance.verifyClaim(
          conditionId,
          receiver,
          tokenId,
          quantity,
          currency,
          pricePerToken,
          verifyMaxQuantityPerTransaction,
        );

        return true;
      } catch {}
    } catch (err) {
      this.base.error('Failed to verify claim', err, 'verifyClaimERC1155', {
        conditionId,
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        verifyMaxQuantityPerTransaction,
      });
    }

    return false;
  }

  protected async verifyClaimERC721(
    conditionId: number,
    receiver: Address,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    try {
      const interfaces = this.base.interfaces;

      let iNftIssuance:
        | ICedarNFTIssuanceV1
        | ICedarNFTIssuanceV2
        | ICedarNFTIssuanceV3
        | ICedarNFTIssuanceV4
        | IPublicNFTIssuanceV0
        | IPublicNFTIssuanceV1
        | null = null;

      if (interfaces.ICedarNFTIssuanceV1) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV1.connectReadOnly();
      } else if (interfaces.ICedarNFTIssuanceV2) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV2.connectReadOnly();
      } else if (interfaces.ICedarNFTIssuanceV3) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV3.connectReadOnly();
      } else if (interfaces.ICedarNFTIssuanceV4) {
        iNftIssuance = interfaces.ICedarNFTIssuanceV4.connectReadOnly();
      } else if (interfaces.IPublicNFTIssuanceV0) {
        iNftIssuance = interfaces.IPublicNFTIssuanceV0.connectReadOnly();
      } else if (interfaces.IPublicNFTIssuanceV1) {
        iNftIssuance = interfaces.IPublicNFTIssuanceV1.connectReadOnly();
      }

      if (!iNftIssuance) return false;

      // this internal try catches the revert error
      // which is a signal that the claim conditions aren't met
      try {
        await iNftIssuance.verifyClaim(
          conditionId,
          receiver,
          quantity,
          currency,
          pricePerToken,
          verifyMaxQuantityPerTransaction,
        );
        return true;
      } catch {}
    } catch (err) {
      this.base.error('Failed to verify claim', err, 'verifyClaimERC721', {
        conditionId,
        receiver,
        quantity,
        currency,
        pricePerToken,
        verifyMaxQuantityPerTransaction,
      });
    }

    return false;
  }

  /**
   * @param tokenId Optional token id - use for ERC1155 contracts
   * @returns Token or Collection claim conditions
   */
  async getActiveClaimConditions(tokenId: string | null = null): Promise<ActiveClaimConditions | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (!tokenId) throw TokenIdRequiredError;
        return await this.getActiveClaimConditionsERC1155(tokenId);
      case 'ERC721':
        return await this.getActiveClaimConditionsERC721();
    }

    return null;
  }

  /**
   * Apply some logic on the user and token/collection claim conditions
   * to identify whether the user can actually claim and how much
   *
   * @param userClaimInfo user claim conditions
   * @param claimInfo Token or collection claim conditions
   * @param merkleProofs Allowlist proofs
   * @param proofMaxQuantityPerTransaction Allowlist allocation
   * @param respectRemainingSupply Used to support old contracts
   * @returns Extra user claim conditions
   */
  async getUserClaimRestrictions(
    userClaimInfo: UserClaimConditions,
    claimInfo: ActiveClaimConditions,
    merkleProofs: string[],
    proofMaxQuantityPerTransaction: number,
    respectRemainingSupply = true,
  ): Promise<CollectionUserClaimConditions> {
    const phase = claimInfo.activeClaimCondition;
    const allowlistEnabled = phase.merkleRoot !== ZERO_BYTES_FULL;
    const isAllowlisted = allowlistEnabled && merkleProofs.length > 0;

    // NOTE: in old contracts allowlisted addresses can only mint once in a phase
    const oneTimeAllowlistClaimUsed =
      allowlistEnabled &&
      userClaimInfo.lastClaimTimestamp > phase.startTimestamp &&
      userClaimInfo.walletClaimedCountInPhase === null;

    const remainingSupply =
      respectRemainingSupply && claimInfo.maxTotalSupply.eq(0)
        ? Infinity
        : claimInfo.maxTotalSupply.sub(claimInfo.tokenSupply).toNumber();

    const phaseClaimableSupply = phase.maxClaimableSupply.gt(0)
      ? phase.maxClaimableSupply.sub(phase.supplyClaimed).toNumber()
      : Infinity;

    const remainingWalletAllocation = claimInfo.maxWalletClaimCount.gt(0)
      ? claimInfo.maxWalletClaimCount.sub(userClaimInfo.walletClaimCount || 0).toNumber()
      : Infinity;

    const allowlistRemainingAllocation = oneTimeAllowlistClaimUsed
      ? 0
      : allowlistEnabled && isAllowlisted && userClaimInfo.walletClaimedCountInPhase !== null
      ? proofMaxQuantityPerTransaction - userClaimInfo.walletClaimedCountInPhase.toNumber()
      : Infinity;

    const availableQuantity = Math.max(
      0, // making sure it's not negative
      Math.min(
        remainingSupply,
        phaseClaimableSupply,
        remainingWalletAllocation,
        allowlistRemainingAllocation,
        phase.quantityLimitPerTransaction.toNumber(),
      ),
    );

    const canMintAfterSeconds = Math.max(
      0,
      userClaimInfo.lastClaimTimestamp === 0
        ? 0 // adding 3 seconds to prevent early calls to the contract
        : 3 + userClaimInfo.nextClaimTimestamp - Math.floor(new Date().getTime() / 1000),
    );
    const canMintAfter = add(new Date(), { seconds: canMintAfterSeconds });

    let claimState: CollectionUserClaimState = 'ok';
    switch (true) {
      case remainingSupply === 0:
        claimState = 'no-token-supply';
        break;
      case phase.isClaimingPaused:
        claimState = 'paused';
        break;
      case allowlistEnabled && !isAllowlisted:
        claimState = 'not-allowlisted';
        break;
      case canMintAfterSeconds > 0:
        claimState = 'minting-throttled';
        break;
      case allowlistRemainingAllocation === 0:
        claimState = 'claimed-allowlist-allowance';
        break;
      case phaseClaimableSupply === 0:
        claimState = 'claimed-phase-allowance';
        break;
      case remainingWalletAllocation === 0:
        claimState = 'claimed-wallet-allowance';
        break;
    }

    return {
      availableQuantity,
      canClaimTokens: claimState === 'ok',
      canMintAfter,
      claimState,
    };
  }

  /**
   * Get the claim conditions for a given user (wallet address)
   *
   * @param userAddress
   * @param tokenId
   * @returns User claim conditions
   */
  async getUserClaimConditions(
    userAddress: Address,
    tokenId: string | null = null,
  ): Promise<UserClaimConditions | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (!tokenId) throw TokenIdRequiredError;
        return this.getUserClaimConditionsERC1155(userAddress, tokenId);
      case 'ERC721':
        return this.getUserClaimConditionsERC721(userAddress);
    }

    return null;
  }

  protected async getActiveClaimConditionsERC721(): Promise<ActiveClaimConditions | null> {
    try {
      const interfaces = this.base.interfaces;

      if (interfaces.ICedarNFTIssuanceV1 || interfaces.ICedarNFTIssuanceV2) {
        let iNftIssuance: ICedarNFTIssuanceV1 | ICedarNFTIssuanceV2 | null = null;
        if (interfaces.ICedarNFTIssuanceV1) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV1.connectReadOnly();
        } else if (interfaces.ICedarNFTIssuanceV2) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV2.connectReadOnly();
        }

        if (!iNftIssuance) return null;

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.getERC721TokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_TRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: false,
          },
        };
      } else if (interfaces.ICedarNFTIssuanceV3) {
        const iNftIssuance = interfaces.ICedarNFTIssuanceV3.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.getERC721TokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_TRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (interfaces.ICedarNFTIssuanceV4 || interfaces.IPublicNFTIssuanceV0 || interfaces.IPublicNFTIssuanceV1) {
        let iNftIssuance: ICedarNFTIssuanceV4 | IPublicNFTIssuanceV0 | IPublicNFTIssuanceV1 | null = null;

        if (interfaces.ICedarNFTIssuanceV4) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV4.connectReadOnly();
        } else if (interfaces.IPublicNFTIssuanceV0) {
          iNftIssuance = interfaces.IPublicNFTIssuanceV0.connectReadOnly();
        } else if (interfaces.IPublicNFTIssuanceV1) {
          iNftIssuance = interfaces.IPublicNFTIssuanceV1.connectReadOnly();
        }

        if (!iNftIssuance) return null;

        const {
          condition,
          conditionId,
          walletMaxClaimCount,
          isClaimPaused,
          tokenSupply: v1,
          maxTotalSupply: v2,
        } = await iNftIssuance.getActiveClaimConditions();

        // TEMP HACK: to fix the issue where the tokenSupply and maxTotalSupply can be switched
        const [tokenSupply, maxTotalSupply] = v1.lt(v2) ? [v1, v2] : [v2, v1];

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_TRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      }
    } catch (err) {
      this.base.error('Failed to get collection claim conditions', err, 'getCollectionClaimInfoERC721');
    }

    return null;
  }

  protected async getUserClaimConditionsERC721(userAddress: Address): Promise<UserClaimConditions | null> {
    try {
      const interfaces = this.base.interfaces;

      if (interfaces.ICedarNFTIssuanceV1 || interfaces.ICedarNFTIssuanceV2) {
        let iNftIssuance: ICedarNFTIssuanceV1 | ICedarNFTIssuanceV2 | null = null;

        if (interfaces.ICedarNFTIssuanceV1) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV1.connectReadOnly();
        } else if (interfaces.ICedarNFTIssuanceV2) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV2.connectReadOnly();
        }

        if (!iNftIssuance) return null;

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (interfaces.ICedarNFTIssuanceV3) {
        const iNftIssuance = interfaces.ICedarNFTIssuanceV3.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (interfaces.ICedarNFTIssuanceV4 || interfaces.IPublicNFTIssuanceV0 || interfaces.IPublicNFTIssuanceV1) {
        let iNftIssuance: ICedarNFTIssuanceV4 | IPublicNFTIssuanceV0 | IPublicNFTIssuanceV1 | null = null;

        if (interfaces.ICedarNFTIssuanceV4) {
          iNftIssuance = interfaces.ICedarNFTIssuanceV4.connectReadOnly();
        } else if (interfaces.IPublicNFTIssuanceV0) {
          iNftIssuance = interfaces.IPublicNFTIssuanceV0.connectReadOnly();
        } else if (interfaces.IPublicNFTIssuanceV1) {
          iNftIssuance = interfaces.IPublicNFTIssuanceV1.connectReadOnly();
        }

        if (!iNftIssuance) return null;

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      this.base.error('Failed to get user claim conditions', err, 'getUserClaimInfoERC721', { userAddress });
    }

    return null;
  }

  protected async getActiveClaimConditionsERC1155(tokenId: string): Promise<ActiveClaimConditions | null> {
    try {
      const interfaces = this.base.interfaces;
      const tokenIdBn = BigNumber.from(tokenId);

      if (interfaces.ICedarSFTIssuanceV1) {
        const iSftIssuance = interfaces.ICedarSFTIssuanceV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.getERC1155TokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_TRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: false,
          },
        };
      } else if (interfaces.ICedarSFTIssuanceV2) {
        const iSftIssuance = interfaces.ICedarSFTIssuanceV2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.getERC1155TokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_TRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (interfaces.ICedarSFTIssuanceV3) {
        const iSftIssuance = interfaces.ICedarSFTIssuanceV3.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_TRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (interfaces.IPublicSFTIssuanceV0) {
        const iSftIssuance = interfaces.IPublicSFTIssuanceV0.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_TRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (interfaces.IPublicSFTIssuanceV1) {
        const iSftIssuance = interfaces.IPublicSFTIssuanceV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_TRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_TRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      }
    } catch (err) {
      this.base.error('Failed to get token claim conditions', err, 'getCollectionClaimInfoERC1155', { tokenId });
    }

    return null;
  }

  protected async getUserClaimConditionsERC1155(
    userAddress: Address,
    tokenId: string,
  ): Promise<UserClaimConditions | null> {
    if (this.base.tokenStandard != 'ERC1155') return null;

    try {
      const interfaces = this.base.interfaces;
      const tokenIdBn = BigNumber.from(tokenId);

      if (interfaces.ICedarSFTIssuanceV1) {
        const iSftIssuance = interfaces.ICedarSFTIssuanceV1.connectReadOnly();

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await iSftIssuance.getUserClaimConditions(tokenIdBn, userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (
        interfaces.ICedarSFTIssuanceV2 ||
        interfaces.ICedarSFTIssuanceV3 ||
        interfaces.IPublicSFTIssuanceV0 ||
        interfaces.IPublicSFTIssuanceV1
      ) {
        let iSftIssuance:
          | ICedarSFTIssuanceV2
          | ICedarSFTIssuanceV3
          | IPublicSFTIssuanceV0
          | IPublicSFTIssuanceV1
          | null = null;
        if (interfaces.ICedarSFTIssuanceV2) {
          iSftIssuance = interfaces.ICedarSFTIssuanceV2.connectReadOnly();
        } else if (interfaces.ICedarSFTIssuanceV3) {
          iSftIssuance = interfaces.ICedarSFTIssuanceV3.connectReadOnly();
        } else if (interfaces.IPublicSFTIssuanceV0) {
          iSftIssuance = interfaces.IPublicSFTIssuanceV0.connectReadOnly();
        } else if (interfaces.IPublicSFTIssuanceV1) {
          iSftIssuance = interfaces.IPublicSFTIssuanceV1.connectReadOnly();
        }

        if (!iSftIssuance) return null;

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iSftIssuance.getUserClaimConditions(tokenIdBn, userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      this.base.error('Failed to get user claim conditions', err, 'getUserClaimInfoERC1155', { userAddress, tokenId });
    }

    return null;
  }

  /**
   * @returns Number of tokens in supply (ERC1155) (doesn't take into consideration burnt tokens)
   */
  async getTokenSupply(tokenId: string | null = null): Promise<BigNumber> {
    if (!this.supported) return BigNumber.from(0);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        if (!tokenId) throw TokenIdRequiredError;
        return this.getERC1155TokenSupply(tokenId);
    }

    return BigNumber.from(0);
  }

  protected async getERC1155TokenSupply(tokenId: string): Promise<BigNumber> {
    if (!this.supported || this.base.tokenStandard !== 'ERC1155') return BigNumber.from(0);

    try {
      const interfaces = this.base.interfaces;
      let iSft: ISFTSupplyV0 | IERC1155SupplyV1 | IERC1155SupplyV0 | ethers.Contract;

      if (interfaces.ISFTSupplyV0) {
        iSft = interfaces.ISFTSupplyV0.connectReadOnly();
      } else if (interfaces.IERC1155SupplyV1) {
        iSft = interfaces.IERC1155SupplyV1.connectReadOnly();
      } else if (interfaces.IERC1155SupplyV0) {
        iSft = interfaces.IERC1155SupplyV0.connectReadOnly();
      } else {
        const abi = ['function totalSupply(uint256 _tokenId) public view returns (uint256)'];
        iSft = new ethers.Contract(this.base.address, abi, this.base.provider);
      }

      return await iSft.totalSupply(tokenId);
    } catch (err) {
      this.base.error('Failed to get token supply', err, 'getERC1155TokenSupply', { tokenId });
    }

    return BigNumber.from(0);
  }

  /**
   * @returns Number of unique token ids (doesn't take into consideration burnt tokens)
   */
  async getTokensCount(): Promise<BigNumber> {
    if (!this.supported) return BigNumber.from(0);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getERC1155TokensCount();
      case 'ERC721':
        return this.getERC721TokensCount();
    }

    return BigNumber.from(0);
  }

  protected async getERC1155TokensCount(): Promise<BigNumber> {
    if (this.base.tokenStandard !== 'ERC1155') return BigNumber.from(0);

    try {
      const interfaces = this.base.interfaces;
      let iSftIssuance: ISFTSupplyV0 | IERC1155SupplyV1 | null = null;

      if (interfaces.ISFTSupplyV0) {
        iSftIssuance = interfaces.ISFTSupplyV0.connectReadOnly();
      } else if (interfaces.IERC1155SupplyV1) {
        iSftIssuance = interfaces.IERC1155SupplyV1.connectReadOnly();
      }

      if (!iSftIssuance) return BigNumber.from(0);

      const largestTokenId = await iSftIssuance.getLargestTokenId();
      return largestTokenId.add(1);
    } catch (err) {
      this.base.error('Failed to get token count', err, 'getERC1155TokensCount');
    }

    return BigNumber.from(0);
  }

  protected async getERC721TokensCount(): Promise<BigNumber> {
    if (this.base.tokenStandard !== 'ERC721') return BigNumber.from(0);

    try {
      const interfaces = this.base.interfaces;
      let iNft: INFTSupplyV0 | ERC721EnumerableUpgradeable;

      if (interfaces.INFTSupplyV0) {
        iNft = interfaces.INFTSupplyV0.connectReadOnly();
      } else {
        iNft = ERC721EnumerableUpgradeable__factory.connect(this.base.address, this.base.provider);
      }

      return await iNft.totalSupply();
    } catch (err) {
      this.base.error('Failed to get token count', err, 'getERC721TokensCount');
    }

    return BigNumber.from(0);
  }
}
