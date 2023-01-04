import { resolveIpfsUrl } from '@/utils/ipfs';
import type { ContractVerificationType } from '@monax/aspen-spec';
import { ICedarNFTMetadataV1, ICedarSFTMetadataV1, IPublicMetadataV0__factory } from '@monax/pando/dist/types';
import axios from 'axios';
import { ethers } from 'ethers';
import { BaseFeature } from '../BaseFeature';
import { CollectionMetaImageType } from '../constants';
import type { CollectionMetadata, TokenMetadata } from '../types';

export class Metadata extends BaseFeature {
  private _uri: string | null = null;
  private _metadata: CollectionMetadata | null = null;

  /**
   * @returns always returns true - very optimistic yay :)
   */
  get supported(): boolean {
    return true;
  }

  /**
   * Get cached uri value
   *
   * @returns If present, it should be either IPFS (99.99%) or normal URL
   */
  get uri(): string | null {
    return this._uri;
  }

  /**
   * Get cached metadata value
   */
  get metadata(): CollectionMetadata | null {
    return this._metadata;
  }

  async loadContractMetadataUri(forceUpdate = false): Promise<string | null> {
    if (this._uri === null || forceUpdate) {
      try {
        // NOTE: we don't want to explicitly check if the contract supports this interface
        // because this way we can support contracts deployed by other parties
        // as the signature is standardized across the community
        const iMetadata = IPublicMetadataV0__factory.connect(this.base.address, this.base.provider);
        this._uri = await iMetadata.contractURI();
      } catch {}
    }

    return this._uri;
  }

  async loadContractMetadata(forceUpdate = false): Promise<CollectionMetadata | null> {
    await this.loadContractMetadataUri(forceUpdate);

    if ((this._metadata === null || forceUpdate) && this._uri) {
      this._metadata = await Metadata.getCollectionMetadataFromUri(this._uri);
    }

    return this._metadata;
  }

  static async getCollectionMetadataFromUri(collectionIpfsUri: string): Promise<CollectionMetadata | null> {
    try {
      const url = resolveIpfsUrl(collectionIpfsUri);
      const meta = await axios.get(url).then((r) => r.data);

      return Metadata.resolveCollectionIpfsUris(meta);
    } catch {}

    return null;
  }

  static resolveCollectionIpfsUris(collectionMeta: CollectionMetadata): CollectionMetadata {
    const newMeta: CollectionMetadata = { ...collectionMeta };

    if (newMeta.image) {
      newMeta.image = resolveIpfsUrl(newMeta.image);
    }

    if (newMeta.images) {
      let imageType: keyof typeof CollectionMetaImageType;

      const images = { ...newMeta.images };
      for (imageType in CollectionMetaImageType) {
        if (images[imageType]) {
          images[imageType] = resolveIpfsUrl(images[imageType] as string);
        }
      }
      newMeta.images = images;
    }

    return newMeta;
  }

  async getTokenUri(tokenId: string): Promise<string | null> {
    let uri: string | null = null;

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        uri = await this.getTokenUriERC1155(tokenId);
        break;
      case 'ERC721':
        uri = await this.getTokenUriERC721(tokenId);
        break;
    }

    return uri;
  }

  async getTokenMetadata(tokenId: string): Promise<{ uri: string | null; metadata: TokenMetadata | null }> {
    let uri: string | null = null;
    let metadata: TokenMetadata | null = null;

    try {
      uri = await this.getTokenUri(tokenId);

      if (uri) {
        metadata = await Metadata.getTokenMetadataFromUri(uri);
      }
    } catch (err) {
      this.base.error('Failed to get token metadata', err, 'getTokenMetadata', { tokenId });
    }

    return { uri, metadata };
  }

  protected async getTokenUriERC1155(tokenId: string): Promise<string | null> {
    try {
      const interfaces = this.base.interfaces;
      let iSft: ICedarSFTMetadataV1 | ethers.Contract;

      if (interfaces.ICedarSFTMetadataV1) {
        iSft = interfaces.ICedarSFTMetadataV1.connectReadOnly();
      } else {
        const abi = ['function uri(uint256 _tokenId) external view returns (string memory)'];
        iSft = new ethers.Contract(this.base.address, abi, this.base.provider);
      }

      return await iSft.uri(tokenId);
    } catch (err) {
      this.base.error('Failed to get token metadata', err, 'getTokenUriERC1155', { tokenId });
    }

    return null;
  }

  protected async getTokenUriERC721(tokenId: string): Promise<string | null> {
    try {
      const interfaces = this.base.interfaces;
      let iNft: ICedarNFTMetadataV1 | ethers.Contract;

      if (interfaces.ICedarNFTMetadataV1) {
        iNft = interfaces.ICedarNFTMetadataV1.connectReadOnly();
      } else {
        const abi = ['function tokenURI(uint256 _tokenId) external view returns (string memory)'];
        iNft = new ethers.Contract(this.base.address, abi, this.base.provider);
      }

      return await iNft.tokenURI(tokenId);
    } catch (err) {
      this.base.error('Failed to get token metadata', err, 'getTokenUriERC721', { tokenId });
    }

    return null;
  }

  static async getTokenMetadataFromUri(tokenIpfsUri: string): Promise<TokenMetadata | null> {
    try {
      const url = resolveIpfsUrl(tokenIpfsUri);
      const meta = await axios.get(url).then((r) => r.data);

      return Metadata.resolveTokenIpfsUris(meta);
    } catch {}

    return null;
  }

  static resolveTokenIpfsUris(tokenMeta: TokenMetadata): TokenMetadata {
    const newMeta: TokenMetadata = { ...tokenMeta };

    if (newMeta.image) {
      newMeta.image = resolveIpfsUrl(newMeta.image);
    }
    if (newMeta.image_ipfs) {
      newMeta.image_ipfs = resolveIpfsUrl(newMeta.image_ipfs);
    }

    return newMeta;
  }

  getVerifications(): ContractVerificationType[] {
    const interfaces = this.base.interfaces;

    return interfaces.ICedarFeaturesV0 ? ['aspen-minted'] : [];
  }
}
