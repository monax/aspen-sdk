import axios from 'axios';
import { CollectionContract, CollectionMetadata, CollectionMetaImageType, OperationStatus } from '..';
import { IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { SdkError, SdkErrorCode } from '../errors';
import { ContractObject } from './object';

export class Collection extends ContractObject {
  public constructor(protected readonly base: CollectionContract) {
    super(base);
  }

  async getMetadata(): Promise<OperationStatus<{ uri: string; metadata: CollectionMetadata }>> {
    return await this.run(async () => {
      const uri = await this.base.contractUri();
      const metadata = await Collection.getMetadataFromUri(uri);

      return { uri, metadata };
    });
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
