import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContractClaimCondition, OperationStatus, Signerish, SourcedOverrides } from '../..';
import { CollectionContract } from '../collections';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: BigNumberish) {
    super(base);
  }

  async getUri(): Promise<string> {
    return await this.base.tokenUri(this.tokenId);
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.base.totalSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    return await this.base.exists(this.tokenId);
  }

  // async getClaimConditions(userAddress: Address): Promise<ClaimConditionsState> {
  //   return await this.base.conditions.getState(userAddress, this.tokenId);
  // }

  async setTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.setTokenUri(signer, this.tokenId, tokenUri, overrides);
    });
  }

  async setPermantentTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.setPermanentTokenUri(signer, this.tokenId, tokenUri, overrides);
    });
  }

  async setMaxTotalSupply(
    signer: Signerish,
    totalSupply: BigNumberish,
    overrides?: SourcedOverrides,
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.do(async () => {
      return await this.base.setMaxTotalSupply(signer, totalSupply, this.tokenId, overrides);
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
      return await this.base.setClaimConditions(signer, args, overrides);
    });
  }
}

/*
async getMetadata(tokenId: string): Promise<{ uri: string; metadata: TokenMetadata }> {
    const uri = await this.getTokenUri(tokenId);
    const metadata = await TokenUri.getMetadataFromUri(uri);

    return { uri, metadata };
  }

  static async getMetadataFromUri(ipfsUri: string): Promise<TokenMetadata> {
    try {
      const url = resolveIpfsUrl(ipfsUri, IPFS_GATEWAY_PREFIX);
      const meta = await axios.get(url).then((r) => r.data);

      return resolveTokenIpfsUris(meta);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new SdkError(SdkErrorCode.WEB_REQUEST_FAILED, undefined, err);
      } else {
        throw new SdkError(SdkErrorCode.UNKNOWN_ERROR, { ipfsUri }, err as Error);
      }
    }
  }

  const resolveTokenIpfsUris = (tokenMeta: TokenMetadata): TokenMetadata => {
  const newMeta: TokenMetadata = { ...tokenMeta };

  if (newMeta.image) {
    newMeta.image = resolveIpfsUrl(newMeta.image, IPFS_GATEWAY_PREFIX);
  }
  if (newMeta.image_ipfs) {
    newMeta.image_ipfs = resolveIpfsUrl(newMeta.image_ipfs, IPFS_GATEWAY_PREFIX);
  }
  if (newMeta.animation_url) {
    newMeta.animation_url = resolveIpfsUrl(newMeta.animation_url, IPFS_GATEWAY_PREFIX);
  }

  return newMeta;
};

*/
