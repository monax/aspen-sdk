import { BigNumber } from 'ethers';
import { Address, ClaimConditionsState, TokenId } from '../..';
import { CollectionContract } from '../collections';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: TokenId) {
    super(base);

    this.tokenId = this.base.requireTokenId(tokenId);
  }

  async getUri(): Promise<string> {
    const id = this.base.requireTokenId(this.tokenId).toString();
    return await this.base.metadata.getTokenUri(id);
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.base.standard.getTokenSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    return await this.base.standard.exists(this.tokenId || null);
  }

  // setMaxTotalSupply() {
  //   // @todo
  // }

  async getClaimConditions(userAddress: Address): Promise<ClaimConditionsState> {
    return await this.base.conditions.getState(userAddress, this.tokenId);
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
