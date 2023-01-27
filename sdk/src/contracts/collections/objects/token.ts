import { BigNumber } from 'ethers';
import { Address, ClaimConditionsState, TokenId } from '../..';
import { CollectionContract } from '../collections';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: TokenId) {
    super(base);

    this.tokenId = this.base.requireTokenId(tokenId);
  }

  // getUri() {
  //   // implement
  // }

  async totalSupply(): Promise<BigNumber> {
    return this.base.standard.getTokenSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    const exists = await this.base.standard.exists(this.tokenId || null);
    return exists;
  }

  // setMaxTotalSupply() {
  //   // @todo
  // }

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
