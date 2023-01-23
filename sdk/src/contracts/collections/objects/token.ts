import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Address, ClaimConditionsState } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { Signerish } from '../types';

export class Token {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: BigNumber | string | null = null) {
    if (!this.base.tokenStandard || !['ERC721', 'ERC1155'].includes(this.base.tokenStandard)) {
      throw new SdkError(SdkErrorCode.UNSUPPORTED_TOKEN_STANDARD, 'input', {
        tokenStandard: this.base.tokenStandard,
      });
    }

    if (base.tokenStandard === 'ERC1155') {
      this.tokenId = this.base.requireTokenId(tokenId);
    }
  }

  // getUri() {
  //   // implement
  // }

  async totalSupply(): Promise<BigNumber> {
    return this.base.standard.getTokenSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    return this.base.standard.exists(this.tokenId);
  }

  // setMaxTotalSupply() {
  //   // @todo
  // }

  async claim(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    conditions: ClaimConditionsState,
  ): Promise<ContractTransaction> {
    return this.base.claim.claim(
      signer,
      receiver,
      this.tokenId,
      quantity,
      conditions.currency,
      conditions.pricePerToken,
      conditions.allowlistStatus.proofs,
      conditions.allowlistStatus.proofMaxQuantityPerTransaction,
    );
  }

  async verifyClaim(receiver: Address, quantity: number, conditions: ClaimConditionsState): Promise<boolean> {
    return this.base.claim.verify(
      conditions.activeClaimConditionId,
      receiver,
      this.tokenId,
      quantity,
      conditions.currency,
      conditions.pricePerToken,
      true,
    );
  }

  async estimateGas(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    conditions: ClaimConditionsState,
  ): Promise<BigNumber> {
    return this.base.claim.estimateGas(
      signer,
      receiver,
      this.tokenId,
      quantity,
      conditions.currency,
      conditions.pricePerToken,
      conditions.allowlistStatus.proofs,
      conditions.allowlistStatus.proofMaxQuantityPerTransaction,
    );
  }

  async getClaimConditions(userAddress: Address): Promise<ClaimConditionsState> {
    const a = await this.base.conditions.getState(userAddress, this.tokenId);

    return a;
  }

  // issue() {
  //   // @todo
  // }

  // issueWithTokenURI() {
  //   // @todo
  // }

  // setClaimConditions() {
  //   // @todo
  // }
  // setPermantentTokenURI() {
  //   // @todo
  // }
  // setTokenURI() {
  //   // @todo
  // }
}
