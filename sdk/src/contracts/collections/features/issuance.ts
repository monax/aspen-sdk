import { add } from 'date-fns';
import {
  BigNumber,
  BigNumberish,
  constants,
  ContractReceipt,
  ContractTransaction,
  ethers,
  PayableOverrides,
} from 'ethers';
import {
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
  IERC1155SupplyV2,
  IPublicNFTIssuanceV0,
  IPublicNFTIssuanceV1,
  IPublicNFTIssuanceV2,
  IPublicSFTIssuanceV0,
  IPublicSFTIssuanceV1,
  IPublicSFTIssuanceV2,
  ISFTSupplyV0,
} from '../../generated';
import type { TokensClaimedEventObject as ERC721TokensClaimedEventObject } from '../../generated/issuance/ICedarNFTIssuance.sol/ICedarNFTIssuanceV4.js';
import type { TokensClaimedEventObject as ERC1155TokensClaimedEventObject } from '../../generated/issuance/ICedarSFTIssuance.sol/ICedarSFTIssuanceV2.js';
import { Address, isSameAddress, NATIVE_TOKEN, ZERO_BYTES32 } from '../../index.js';
import { Features } from '../features.js';
import { max, min } from '../number.js';
import type {
  ActiveClaimConditions,
  CollectionUserClaimConditions,
  CollectionUserClaimState,
  Signerish,
  TokenAsset,
  TokenAssetMetadata,
  UserClaimConditions,
} from '../types.js';

// FIXME[Silas]: global constant errors break stack traces. Subclass Error with a string constant code instead.
//   Also makes it easier to add error context. Possible inspiration: https://github.com/monax/platform/blob/main/pkg/api/src/services/errors.ts
//   I have inlined this for now, leaving original definition here
// export const TokenIdRequiredError = new Error('Token is required for ERC1155 contracts!');

function ensureERC1155TokenId(tokenId: BigNumberish | null): BigNumberish {
  const TokenIdRequiredError = new Error('Token is required for ERC1155 contracts!');
  if (tokenId === null || tokenId === undefined) {
    throw TokenIdRequiredError;
  }
  return tokenId;
}

// Reasonably large number to compare with
const SUPPLY_THRESHOLD = constants.MaxInt256;

export class Issuance extends Features {
  /**
   * @returns True if the contract supports Issuance interface
   */

  get supported(): boolean {
    const features = this.base.interfaces;
    return !!(
      features['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'] ||
      features['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2'] ||
      features['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'] ||
      features['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'] ||
      features['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'] ||
      features['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'] ||
      features['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'] ||
      features['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'] ||
      features['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'] ||
      features['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'] ||
      features['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'] ||
      features['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'] ||
      features['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']
    );
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
      this.base.error('Failed to get claimed tokens', err, 'getClaimedTokenAssets', { receipt });
    }

    return tokens;
  }

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
  ): Promise<ContractTransaction | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = ensureERC1155TokenId(tokenId);

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
    tokenId: BigNumberish,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<ContractTransaction | null> {
    try {
      const interfaces = this.base.interfaces;

      let iSftIssuance:
        | ICedarSFTIssuanceV1
        | ICedarSFTIssuanceV2
        | ICedarSFTIssuanceV3
        | IPublicSFTIssuanceV0
        | IPublicSFTIssuanceV1
        | IPublicSFTIssuanceV2
        | null = null;
      if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'].connectWith(signer);
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'].connectWith(signer);
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'].connectWith(signer);
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'].connectWith(signer);
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'].connectWith(signer);
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'].connectWith(signer);
      }

      if (!iSftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
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

  protected getNftIssuance(signer: Signerish) {
    const interfaces = this.base.interfaces;

    let iNftIssuance:
      | ICedarNFTIssuanceV1
      | ICedarNFTIssuanceV2
      | ICedarNFTIssuanceV3
      | ICedarNFTIssuanceV4
      | IPublicNFTIssuanceV0
      | IPublicNFTIssuanceV1
      | IPublicNFTIssuanceV2
      | null = null;

    if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'].connectWith(signer);
    } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']) {
      iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'].connectWith(signer);
    }

    return iNftIssuance;
  }

  protected getSftIssuance(signer: Signerish) {
    const interfaces = this.base.interfaces;

    let iSftIssuance:
      | ICedarSFTIssuanceV1
      | ICedarSFTIssuanceV2
      | ICedarSFTIssuanceV3
      | IPublicSFTIssuanceV0
      | IPublicSFTIssuanceV1
      | IPublicSFTIssuanceV2
      | null = null;

    if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'].connectWith(signer);
    } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'].connectWith(signer);
    } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'].connectWith(signer);
    } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'].connectWith(signer);
    } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'].connectWith(signer);
    } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']) {
      iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'].connectWith(signer);
    }

    return iSftIssuance;
  }

  protected async claimERC721(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<ContractTransaction | null> {
    try {
      const iNftIssuance = this.getNftIssuance(signer);
      if (!iNftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
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
    tokenId: BigNumberish | null = null,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        tokenId = ensureERC1155TokenId(tokenId);
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
    tokenId: BigNumberish,
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber | null> {
    try {
      tokenId = ensureERC1155TokenId(tokenId);

      const iSftIssuance = this.getSftIssuance(signer);
      if (!iSftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
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
    quantity: BigNumberish,
    currency: Address,
    pricePerToken: BigNumberish,
    proofs: string[],
    proofMaxQuantityPerTransaction: BigNumberish,
  ): Promise<BigNumber | null> {
    try {
      const iNftIssuance = this.getNftIssuance(signer);
      if (!iNftIssuance) return null;

      const overrides: PayableOverrides = {};
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
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
    tokenId: BigNumberish | null = null,
    quantity: number,
    currency: Address,
    pricePerToken: BigNumber,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    if (!this.supported) return false;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = ensureERC1155TokenId(tokenId);

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
    tokenId: BigNumberish,
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
        | IPublicSFTIssuanceV2
        | null = null;

      if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'].connectReadOnly();
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'].connectReadOnly();
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'].connectReadOnly();
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'].connectReadOnly();
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'].connectReadOnly();
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']) {
        iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'].connectReadOnly();
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
        | IPublicNFTIssuanceV2
        | null = null;

      if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'].connectReadOnly();
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']) {
        iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'].connectReadOnly();
      }

      if (!iNftIssuance) return false;

      // this internal try catches the revert error
      // which is a signal that the claim conditions aren't met
      // FIXME[Silas]: This is throwing away the custom errors. They should be decoded and returned using `decodeCustomError`
      //  from errors.ts.
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
  async getActiveClaimConditions(tokenId: BigNumberish | null = null): Promise<ActiveClaimConditions | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = ensureERC1155TokenId(tokenId);
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
    const allowlistEnabled = phase.merkleRoot !== ZERO_BYTES32;
    const isAllowlisted = allowlistEnabled && merkleProofs.length > 0;

    // NOTE: in old contracts allowlisted addresses can only mint once in a phase
    const oneTimeAllowlistClaimUsed =
      allowlistEnabled &&
      userClaimInfo.lastClaimTimestamp > phase.startTimestamp &&
      userClaimInfo.walletClaimedCountInPhase === null;

    const remainingSupply =
      respectRemainingSupply && claimInfo.maxTotalSupply.eq(0)
        ? Infinity
        : claimInfo.maxTotalSupply.sub(claimInfo.tokenSupply);

    const phaseClaimableSupply = phase.maxClaimableSupply.gt(0)
      ? phase.maxClaimableSupply.sub(phase.supplyClaimed)
      : Infinity;

    const remainingWalletAllocation = claimInfo.maxWalletClaimCount.gt(0)
      ? claimInfo.maxWalletClaimCount.sub(userClaimInfo.walletClaimCount || 0)
      : Infinity;

    const allowlistRemainingAllocation = oneTimeAllowlistClaimUsed
      ? 0
      : allowlistEnabled && isAllowlisted && userClaimInfo.walletClaimedCountInPhase !== null
      ? proofMaxQuantityPerTransaction - userClaimInfo.walletClaimedCountInPhase.toNumber()
      : Infinity;

    const availableQuantity = max(
      0, // making sure it's not negative
      min(
        remainingSupply,
        phaseClaimableSupply,
        remainingWalletAllocation,
        allowlistRemainingAllocation,
        phase.quantityLimitPerTransaction,
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
    tokenId: BigNumberish | null = null,
  ): Promise<UserClaimConditions | null> {
    if (!this.supported) return null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getUserClaimConditionsERC1155(userAddress, ensureERC1155TokenId(tokenId));
      case 'ERC721':
        return this.getUserClaimConditionsERC721(userAddress);
    }

    return null;
  }

  protected async getActiveClaimConditionsERC721(): Promise<ActiveClaimConditions | null> {
    try {
      const interfaces = this.base.interfaces;

      if (
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']
      ) {
        let iNftIssuance: ICedarNFTIssuanceV1 | ICedarNFTIssuanceV2 | null = null;
        if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2'].connectReadOnly();
        }

        if (!iNftIssuance) return null;

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.getERC721TokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3']) {
        const iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'].connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.getERC721TokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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
      } else if (
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']
      ) {
        let iNftIssuance:
          | ICedarNFTIssuanceV4
          | IPublicNFTIssuanceV0
          | IPublicNFTIssuanceV1
          | IPublicNFTIssuanceV2
          | null = null;

        if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'].connectReadOnly();
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

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_THRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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

      if (
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']
      ) {
        let iNftIssuance: ICedarNFTIssuanceV1 | ICedarNFTIssuanceV2 | null = null;

        if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2'].connectReadOnly();
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
      } else if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3']) {
        const iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'].connectReadOnly();

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
      } else if (
        interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'] ||
        interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']
      ) {
        let iNftIssuance:
          | ICedarNFTIssuanceV4
          | IPublicNFTIssuanceV0
          | IPublicNFTIssuanceV1
          | IPublicNFTIssuanceV2
          | null = null;

        if (interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2']) {
          iNftIssuance = interfaces['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'].connectReadOnly();
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

  protected async getActiveClaimConditionsERC1155(tokenId: BigNumberish): Promise<ActiveClaimConditions | null> {
    try {
      const interfaces = this.base.interfaces;
      const tokenIdBn = BigNumber.from(tokenId);

      if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1']) {
        const iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'].connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.getERC1155TokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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
      } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2']) {
        const iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'].connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.getERC1155TokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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
      } else if (
        interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']
      ) {
        let iSftIssuance:
          | ICedarSFTIssuanceV3
          | IPublicSFTIssuanceV0
          | IPublicSFTIssuanceV1
          | IPublicSFTIssuanceV2
          | null = null;
        if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'].connectReadOnly();
        }

        if (!iSftIssuance) return null;

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_THRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
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
    tokenId: BigNumberish,
  ): Promise<UserClaimConditions | null> {
    if (this.base.tokenStandard != 'ERC1155') return null;

    try {
      const interfaces = this.base.interfaces;
      const tokenIdBn = BigNumber.from(tokenId);

      if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1']) {
        const iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'].connectReadOnly();

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
        interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'] ||
        interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']
      ) {
        let iSftIssuance:
          | ICedarSFTIssuanceV2
          | ICedarSFTIssuanceV3
          | IPublicSFTIssuanceV0
          | IPublicSFTIssuanceV1
          | IPublicSFTIssuanceV2
          | null = null;
        if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1'].connectReadOnly();
        } else if (interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2']) {
          iSftIssuance = interfaces['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'].connectReadOnly();
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
  async getTokenSupply(tokenId: BigNumberish | null = null): Promise<BigNumber> {
    if (!this.supported) return BigNumber.from(0);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getERC1155TokenSupply(ensureERC1155TokenId(tokenId));
    }

    return BigNumber.from(0);
  }

  protected async getERC1155TokenSupply(tokenId: BigNumberish): Promise<BigNumber> {
    if (!this.supported || this.base.tokenStandard !== 'ERC1155') return BigNumber.from(0);

    try {
      const interfaces = this.base.interfaces;
      let iSft: ISFTSupplyV0 | IERC1155SupplyV0 | IERC1155SupplyV1 | IERC1155SupplyV2 | ethers.Contract;

      if (interfaces['issuance/ISFTSupply.sol:ISFTSupplyV0']) {
        iSft = interfaces['issuance/ISFTSupply.sol:ISFTSupplyV0'].connectReadOnly();
      } else if (interfaces['standard/IERC1155.sol:IERC1155SupplyV0']) {
        iSft = interfaces['standard/IERC1155.sol:IERC1155SupplyV0'].connectReadOnly();
      } else if (interfaces['standard/IERC1155.sol:IERC1155SupplyV1']) {
        iSft = interfaces['standard/IERC1155.sol:IERC1155SupplyV1'].connectReadOnly();
      } else if (interfaces['standard/IERC1155.sol:IERC1155SupplyV2']) {
        iSft = interfaces['standard/IERC1155.sol:IERC1155SupplyV2'].connectReadOnly();
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
      let iSftIssuance: ISFTSupplyV0 | IERC1155SupplyV1 | IERC1155SupplyV2 | null = null;

      if (interfaces['issuance/ISFTSupply.sol:ISFTSupplyV0']) {
        iSftIssuance = interfaces['issuance/ISFTSupply.sol:ISFTSupplyV0'].connectReadOnly();
      } else if (interfaces['standard/IERC1155.sol:IERC1155SupplyV1']) {
        iSftIssuance = interfaces['standard/IERC1155.sol:IERC1155SupplyV1'].connectReadOnly();
      } else if (interfaces['standard/IERC1155.sol:IERC1155SupplyV2']) {
        iSftIssuance = interfaces['standard/IERC1155.sol:IERC1155SupplyV2'].connectReadOnly();
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
      if (interfaces['issuance/INFTSupply.sol:INFTSupplyV0']) {
        const iNft = interfaces['issuance/INFTSupply.sol:INFTSupplyV0'].connectReadOnly();
        return await iNft.totalSupply();
      }
    } catch (err) {
      this.base.error('Failed to get token count', err, 'getERC721TokensCount');
    }

    return BigNumber.from(0);
  }
}
