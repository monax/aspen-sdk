import axios from 'axios';
import { ethers } from 'ethers';
import { CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { ICedarNFTMetadataV1, ICedarSFTMetadataV1, IPublicMetadataV0__factory } from '../../generated';
import { CollectionMetaImageType } from '../constants';
import { FeatureSet } from '../features';
import type { CollectionMetadata, ContractVerificationType, TokenMetadata } from '../types';

// TODO...
const handledFeatures = ['metadata/IContractMetadata.sol:ICedarMetadataV1'] as const;

type HandledFeature = (typeof handledFeatures)[number];

export class Metadata extends FeatureSet<HandledFeature> {
  constructor(base: CollectionContract) {
    super(base, handledFeatures);
  }
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

      if (interfaces['metadata/IContractMetadata.sol:ICedarMetadataV1']) {
        iSft = interfaces['metadata/IContractMetadata.sol:ICedarMetadataV1'].connectReadOnly();
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

      if (interfaces['metadata/IContractMetadata.sol:ICedarMetadataV1']) {
        iNft = interfaces['metadata/IContractMetadata.sol:ICedarMetadataV1'].connectReadOnly();
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

    return newMeta;
  }

  getVerifications(): ContractVerificationType[] {
    const interfaces = this.base.interfaces;

    return interfaces['IAspenFeatures.sol:ICedarFeaturesV0'] || interfaces['ICedarFeatures.sol:ICedarFeaturesV0']
      ? ['aspen-minted']
      : [];
  }
}
