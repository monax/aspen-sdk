import axios from 'axios';
import { ContractTransaction, ethers } from 'ethers';
import { CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { CollectionMetaImageType } from '../constants';
import { SdkError, SdkErrorCode } from '../errors';
import type { CollectionMetadata, Signerish, SourcedOverrides } from '../types';
import { ContractFunction } from './features';

export const MetadataFeatures = [
  'metadata/IContractMetadata.sol:ICedarMetadataV0',
  'metadata/IContractMetadata.sol:ICedarMetadataV1',
  'metadata/IContractMetadata.sol:IPublicMetadataV0',
  'metadata/IContractMetadata.sol:IRestrictedMetadataV0',
  'metadata/IContractMetadata.sol:IRestrictedMetadataV1',
  'metadata/IContractMetadata.sol:IRestrictedMetadataV2',
] as const;

export type MetadataFeatures = (typeof MetadataFeatures)[number];

export class Metadata extends ContractFunction<MetadataFeatures> {
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
    const collection = partitioner({
      v0: ['metadata/IContractMetadata.sol:ICedarMetadataV0', 'metadata/IContractMetadata.sol:ICedarMetadataV1'],
      p0: ['metadata/IContractMetadata.sol:IPublicMetadataV0'],
      r0: [
        'metadata/IContractMetadata.sol:IRestrictedMetadataV0',
        'metadata/IContractMetadata.sol:IRestrictedMetadataV1',
      ],
      r1: ['metadata/IContractMetadata.sol:IRestrictedMetadataV2'],
    });

    return { collection };
  });

  async name(): Promise<string> {
    try {
      const abi = ['function name() external returns (string)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      return await contract.name();
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }

  async symbol(): Promise<string> {
    try {
      const abi = ['function symbol() external returns (string)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      return await contract.symbol();
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }

  async getTokenNameAndSymbol(): Promise<{ name: string; symbol: string }> {
    const [name, symbol] = await Promise.all([this.name(), this.symbol()]);
    return { name, symbol };
  }

  async setTokenNameAndSymbol(
    signer: Signerish,
    name: string,
    symbol: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { r1 } = this.getPartition('collection');

    try {
      if (r1) {
        const tx = r1.connectWith(signer).setTokenNameAndSymbol(name, symbol, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'setTokenNameAndSymbol' });
  }

  async getContractUri(): Promise<string> {
    const { v0, p0 } = this.getPartition('collection');
    const factory = v0 ?? p0 ?? this.base.assumeFeature('metadata/IContractMetadata.sol:IPublicMetadataV0');

    try {
      const uri = await factory.connectReadOnly().contractURI();
      return uri;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }

  async setContractUri(signer: Signerish, uri: string, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const { r0, r1 } = this.getPartition('collection');
    const factory = r0 ?? r1;

    try {
      if (factory) {
        const tx = await factory.connectWith(signer).setContractURI(uri, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { uri }, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'contractUri', function: 'setUri' });
  }

  async getContractMetadata(): Promise<{ uri: string; metadata: CollectionMetadata }> {
    const uri = await this.getContractUri();
    const metadata = await Metadata.getMetadataFromUri(uri);

    return { uri, metadata };
  }

  static async getMetadataFromUri(ipfsUri: string): Promise<CollectionMetadata> {
    try {
      const url = resolveIpfsUrl(ipfsUri, IPFS_GATEWAY_PREFIX);
      const meta = await axios.get(url).then((r) => r.data);

      return resolveCollectionIpfsUris(meta);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new SdkError(SdkErrorCode.WEB_REQUEST_FAILED, { ipfsUri }, err);
      } else {
        throw new SdkError(SdkErrorCode.UNKNOWN_ERROR, { ipfsUri }, err as Error);
      }
    }
  }
}

const resolveCollectionIpfsUris = (collectionMeta: CollectionMetadata): CollectionMetadata => {
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
};
