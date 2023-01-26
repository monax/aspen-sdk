import { BigNumber } from 'ethers';
import { Address, ClaimConditionsState, TokenId } from '../..';
import { CollectionContract } from '../collections';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: TokenId) {
    super(base);

    this.tokenId = this.tokenId = this.base.tokenStandard === 'ERC1155' ? this.base.requireTokenId(tokenId) : tokenId;
  }

  // getUri() {
  //   // implement
  // }

  async totalSupply(): Promise<BigNumber> {
    return this.base.standard.getTokenSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    return this.base.standard.exists(this.tokenId || null);
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
