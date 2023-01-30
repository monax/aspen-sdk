import axios from 'axios';
import { ethers } from 'ethers';
import { CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { IPublicMetadataV0__factory } from '../../generated';
import { CollectionMetaImageType } from '../constants';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from '../features';
import type { CollectionMetadata, TokenMetadata } from '../types';

export const MetadataFeatures = [
  'metadata/IContractMetadata.sol:ICedarMetadataV1',
  'metadata/IContractMetadata.sol:IPublicMetadataV0',
  // 'metadata/IContractMetadata.sol:IRestrictedMetadataV0',
  // 'metadata/IContractMetadata.sol:IRestrictedMetadataV1',
  // 'metadata/IContractMetadata.sol:IRestrictedMetadataV2',
  'metadata/INFTMetadata.sol:IAspenNFTMetadataV1',
  'metadata/INFTMetadata.sol:ICedarNFTMetadataV1',
  'metadata/ISFTMetadata.sol:IAspenSFTMetadataV1',
  'metadata/ISFTMetadata.sol:ICedarSFTMetadataV1',
] as const;

export type MetadataFeatures = (typeof MetadataFeatures)[number];

export class Metadata extends FeatureSet<MetadataFeatures> {
  private _uri: string | null = null;
  private _metadata: CollectionMetadata | null = null;

  constructor(base: CollectionContract) {
    super(base, MetadataFeatures);
  }

  /**
   * @returns always returns true - very optimistic yay :)
   */
  get supported(): boolean {
    return true;
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const get = partitioner({
      contractV0: [
        'metadata/IContractMetadata.sol:ICedarMetadataV1',
        'metadata/IContractMetadata.sol:IPublicMetadataV0',
      ],
      nftV0: ['metadata/INFTMetadata.sol:ICedarNFTMetadataV1', 'metadata/INFTMetadata.sol:IAspenNFTMetadataV1'],
      sftV0: ['metadata/ISFTMetadata.sol:ICedarSFTMetadataV1', 'metadata/ISFTMetadata.sol:IAspenSFTMetadataV1'],
    });

    return { get };
  });

  /**
   * Get cached contract URI value
   *
   * @returns If present, it should be either IPFS (99.99%) or normal URL
   */
  get uri(): string | null {
    return this._uri;
  }

  /**
   * Get cached contract metadata value
   */
  get metadata(): CollectionMetadata | null {
    return this._metadata;
  }

  async loadContractMetadataUri(forceUpdate = false): Promise<string | null> {
    if (this._uri === null || forceUpdate) {
      try {
        const { contractV0 } = this.getPartition('get')(this.base.interfaces);
        if (contractV0) {
          const iMetadata = contractV0.connectReadOnly();
          this._uri = await iMetadata.contractURI();
        } else {
          // NOTE: we don't want to explicitly check if the contract supports this interface
          // because this way we can support contracts deployed by other parties
          // as the signature is standardized across the community
          const iMetadata = IPublicMetadataV0__factory.connect(this.base.address, this.base.provider);
          this._uri = await iMetadata.contractURI();
        }
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
      const url = resolveIpfsUrl(collectionIpfsUri, IPFS_GATEWAY_PREFIX);
      const meta = await axios.get(url).then((r) => r.data);

      return Metadata.resolveCollectionIpfsUris(meta);
    } catch {}

    return null;
  }

  static resolveCollectionIpfsUris(collectionMeta: CollectionMetadata): CollectionMetadata {
    const newMeta: CollectionMetadata = { ...collectionMeta };

    if (newMeta.image) {
      newMeta.image = resolveIpfsUrl(newMeta.image, IPFS_GATEWAY_PREFIX);
    }

    if (newMeta.images) {
      let imageType: keyof typeof CollectionMetaImageType;

      const images = { ...newMeta.images };
      for (imageType in CollectionMetaImageType) {
        if (images[imageType]) {
          images[imageType] = resolveIpfsUrl(images[imageType] || '', IPFS_GATEWAY_PREFIX);
        }
      }
      newMeta.images = images;
    }

    return newMeta;
  }

  async getTokenUri(tokenId: string): Promise<string> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getTokenUriERC1155(tokenId);
      case 'ERC721':
        return await this.getTokenUriERC721(tokenId);
    }
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
      throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_METADATA, { tokenId }, err as Error);
    }

    return { uri, metadata };
  }

  protected async getTokenUriERC1155(tokenId: string): Promise<string> {
    try {
      const { sftV0 } = this.getPartition('get')(this.base.interfaces);
      if (sftV0) {
        const iSft = sftV0.connectReadOnly();
        return await iSft.uri(tokenId);
      } else {
        const abi = ['function uri(uint256 _tokenId) external view returns (string memory)'];
        const iSft = new ethers.Contract(this.base.address, abi, this.base.provider);
        return await iSft.uri(tokenId);
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_METADATA, { tokenId }, err as Error);
    }
  }

  protected async getTokenUriERC721(tokenId: string): Promise<string> {
    try {
      const { nftV0 } = this.getPartition('get')(this.base.interfaces);
      if (nftV0) {
        const iNft = nftV0.connectReadOnly();
        return await iNft.tokenURI(tokenId);
      } else {
        const abi = ['function tokenURI(uint256 _tokenId) external view returns (string memory)'];
        const iNft = new ethers.Contract(this.base.address, abi, this.base.provider);
        return await iNft.tokenURI(tokenId);
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_METADATA, { tokenId }, err as Error);
    }
  }

  static async getTokenMetadataFromUri(tokenIpfsUri: string): Promise<TokenMetadata | null> {
    try {
      const url = resolveIpfsUrl(tokenIpfsUri, IPFS_GATEWAY_PREFIX);
      const meta = await axios.get(url).then((r) => r.data);

      return Metadata.resolveTokenIpfsUris(meta);
    } catch {}

    return null;
  }

  static resolveTokenIpfsUris(tokenMeta: TokenMetadata): TokenMetadata {
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
  }
}
