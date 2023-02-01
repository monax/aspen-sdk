import axios from 'axios';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract, IPFS_GATEWAY_PREFIX, Signerish, SourcedOverrides, TokenMetadata } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const TokenUriFeatures = [
  // tokenUri
  // 'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV0', // very old
  'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV1',
  'metadata/INFTMetadata.sol:IAspenNFTMetadataV1',
  'metadata/INFTMetadata.sol:ICedarNFTMetadataV1',

  // uri
  // 'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV0', // very old
  'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV1',
  'metadata/ISFTMetadata.sol:IAspenSFTMetadataV1',
  'metadata/ISFTMetadata.sol:ICedarSFTMetadataV1',

  // upgradeBaseURI
  // 'baseURI/ICedarUpgradeBaseURI.sol:ICedarUpgradeBaseURIV0', // very old

  // getBaseURIIndices & updateBaseURI
  'baseURI/IUpdateBaseURI.sol:ICedarUpdateBaseURIV0',
  'baseURI/ICedarUpdateBaseURI.sol:ICedarUpdateBaseURIV0',
  'baseURI/IUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0',
  'baseURI/IUpdateBaseURI.sol:IRestrictedUpdateBaseURIV1',
  'baseURI/ICedarUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0',
  'baseURI/IUpdateBaseURI.sol:IPublicUpdateBaseURIV0',
  'baseURI/ICedarUpdateBaseURI.sol:IPublicUpdateBaseURIV0',

  // setTokenUri & setPermantentTokenURI
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3',
] as const;

export type TokenUriFeatures = (typeof TokenUriFeatures)[number];

export class TokenUri extends FeatureSet<TokenUriFeatures> {
  constructor(base: CollectionContract) {
    super(base, TokenUriFeatures);
  }

  /**
   * @returns always returns true - very optimistic yay :)
   */
  get supported(): boolean {
    return true;
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const uri = partitioner({
      nftV0: [
        'metadata/INFTMetadata.sol:ICedarNFTMetadataV1',
        'metadata/INFTMetadata.sol:IAspenNFTMetadataV1',
        'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV1',
      ],
      sftV0: [
        'metadata/ISFTMetadata.sol:ICedarSFTMetadataV1',
        'metadata/ISFTMetadata.sol:IAspenSFTMetadataV1',
        'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV1',
      ],
      baseUriV0: [
        'baseURI/IUpdateBaseURI.sol:ICedarUpdateBaseURIV0',
        'baseURI/ICedarUpdateBaseURI.sol:ICedarUpdateBaseURIV0',
      ],
      baseUriP0: [
        'baseURI/IUpdateBaseURI.sol:IPublicUpdateBaseURIV0',
        'baseURI/ICedarUpdateBaseURI.sol:IPublicUpdateBaseURIV0',
      ],
      baseUriR0: [
        'baseURI/IUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0',
        'baseURI/IUpdateBaseURI.sol:IRestrictedUpdateBaseURIV1',
        'baseURI/ICedarUpdateBaseURI.sol:IRestrictedUpdateBaseURIV0',
      ],
      setUriV0: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
      ],
      setUriNftR0: [
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
      ],
      setUriNftR1: ['issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3'],
      setUriSftR0: ['issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3'],
    });

    return { uri };
  });

  async getTokenUri(tokenId: BigNumberish): Promise<string> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getTokenUriERC1155(tokenId);
      case 'ERC721':
        return await this.getTokenUriERC721(tokenId);
    }
  }

  protected async getTokenUriERC1155(tokenId: BigNumberish): Promise<string> {
    const { sftV0 } = this.getPartition('uri');
    const factory = sftV0 ?? this.base.assumeFeature('metadata/ISFTMetadata.sol:IAspenSFTMetadataV1');

    try {
      const uri = await factory.connectReadOnly().uri(tokenId);
      return uri;
    } catch (err) {
      console.log(err);
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { tokenId }, err as Error);
    }
  }

  protected async getTokenUriERC721(tokenId: BigNumberish): Promise<string> {
    const { nftV0 } = this.getPartition('uri');
    const factory = nftV0 ?? this.base.assumeFeature('metadata/INFTMetadata.sol:IAspenNFTMetadataV1');

    try {
      const uri = await factory.connectReadOnly().tokenURI(tokenId);
      return uri;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { tokenId }, err as Error);
    }
  }

  async getBaseURIIndices(): Promise<BigNumber[]> {
    const { baseUriV0, baseUriP0 } = this.getPartition('uri');
    const factory = baseUriV0 ?? baseUriP0;

    try {
      if (factory) {
        const indices = await factory.connectReadOnly().getBaseURIIndices();
        return indices;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'tokenUri', function: 'getBaseURIIndices' });
  }

  /** ADMIN role is required */
  async setTokenURI(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { setUriV0, setUriNftR0, setUriNftR1, setUriSftR0 } = this.getPartition('uri');
    const factory = setUriV0 ?? setUriNftR0 ?? setUriNftR1 ?? setUriSftR0;

    try {
      if (factory) {
        const tx = await factory.connectWith(signer).setTokenURI(tokenId, tokenUri, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'tokenUri', function: 'setTokenURI' });
  }

  /** ADMIN role is required */
  async setPermantentTokenURI(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { setUriNftR1, setUriSftR0 } = this.getPartition('uri');
    const factory = setUriNftR1 ?? setUriSftR0;

    try {
      if (factory) {
        const tx = await factory.connectWith(signer).setPermantentTokenURI(tokenId, tokenUri, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'tokenUri', function: 'setPermantentTokenURI' });
  }

  /** MINTER role is required */
  async updateBaseURI(
    signer: Signerish,
    baseURIIndex: BigNumberish,
    baseUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { baseUriV0, baseUriR0 } = this.getPartition('uri');
    const factory = baseUriV0 ?? baseUriR0;

    try {
      if (factory) {
        const tx = await factory.connectWith(signer).updateBaseURI(baseURIIndex, baseUri, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'tokenUri', function: 'updateBaseURI' });
  }

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
        throw new SdkError(SdkErrorCode.UNKNOWN_ERROR, undefined, err as Error);
      }
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
