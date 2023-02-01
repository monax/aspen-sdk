import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import {
  Address,
  ClaimConditionsState,
  CollectionContractClaimCondition,
  OperationStatus,
  Signerish,
  SourcedOverrides,
} from '../..';
import { CollectionContract } from '../collections';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: BigNumberish) {
    super(base);
  }

  async getUri(): Promise<string> {
    return await this.base.tokenUri.getTokenUri(this.tokenId);
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.base.standard.getTokenSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    return await this.base.standard.exists(this.tokenId);
  }

  async getClaimConditions(userAddress: Address): Promise<ClaimConditionsState> {
    return await this.base.conditions.getState(userAddress, this.tokenId);
  }

  async setTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.tokenUri.setTokenURI(signer, this.tokenId, tokenUri, overrides);
    });
  }

  async setPermantentTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.tokenUri.setPermantentTokenURI(signer, this.tokenId, tokenUri, overrides);
    });
  }

  async setMaxTotalSupply(
    signer: Signerish,
    totalSupply: BigNumberish,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.standard.setMaxTotalSupply(signer, totalSupply, this.tokenId, overrides);
    });
  }

  async setClaimConditions(
    signer: Signerish,
    conditions: CollectionContractClaimCondition[],
    resetClaimEligibility: boolean,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      const args = { conditions, resetClaimEligibility, tokenId: this.tokenId };
      return await this.base.conditions.set(signer, args, overrides);
    });
  }
}
