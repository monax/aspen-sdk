import { BigNumber } from 'ethers';
import { Address, ChainId } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { TokenStandard } from '../types';
import { ClaimArgs } from './claim';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const VerifyClaimPartitions = {
  nft: [...FeatureFunctionsMap['verifyClaim(uint256,address,uint256,address,uint256,bool)[]'].drop],
  sft: [...FeatureFunctionsMap['verifyClaim(uint256,address,uint256,uint256,address,uint256,bool)[]'].drop],
};
type VerifyClaimPartitions = typeof VerifyClaimPartitions;

const VerifyClaimInterfaces = Object.values(VerifyClaimPartitions).flat();
type VerifyClaimInterfaces = (typeof VerifyClaimInterfaces)[number];

export type VerifyClaimCallArgs = [args: ClaimArgs, verifyMaxQuantity?: boolean];
export type VerifyClaimResponse = boolean;

export type ClaimedToken = {
  chainId: ChainId;
  address: string;
  tokenId: BigNumber;
  standard: TokenStandard;
  receiver: Address;
  quantity: BigNumber;
};

export class Claim extends ContractFunction<
  VerifyClaimInterfaces,
  VerifyClaimPartitions,
  VerifyClaimCallArgs,
  VerifyClaimResponse
> {
  constructor(base: CollectionContract) {
    super('claim', base, VerifyClaimInterfaces, VerifyClaimPartitions);
  }

  call(...args: VerifyClaimCallArgs): Promise<VerifyClaimResponse> {
    return this.verifyClaim(...args);
  }

  /**
   * Use this function to verify that the claimant actually meets the claim conditions
   */
  async verifyClaim(args: ClaimArgs, verifyMaxQuantity = true): Promise<boolean> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.verifyERC1155(args, verifyMaxQuantity);
      case 'ERC721':
        return await this.verifyERC721(args, verifyMaxQuantity);
    }
  }

  protected async verifyERC1155(
    { conditionId, receiver, tokenId, quantity, currency, pricePerToken }: ClaimArgs,
    verifyMaxQuantityPerTransaction: boolean,
  ): Promise<boolean> {
    tokenId = this.base.requireTokenId(tokenId);
    const sft = this.partition('sft');

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
      // @todo - we should return false if it's normal revert
      // that signals that the claimant doesn't meet the requirements
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
    const nft = this.partition('nft');

    try {
      const iNft = nft.connectReadOnly();
      await iNft.verifyClaim(conditionId, receiver, quantity, currency, pricePerToken, verifyMaxQuantityPerTransaction);

      return true;
    } catch (err) {
      // @todo - we should return false if it's normal revert
      // that signals that the claimant doesn't meet the requirements
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
}
