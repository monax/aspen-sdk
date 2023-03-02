import axios from 'axios';
import { BigNumber } from 'ethers';
import { CollectionContract, CollectionMetadata, CollectionMetaImageType, OperationStatus, TermsState } from '..';
import { Addressish, asAddress, IPFS_GATEWAY_PREFIX, ZERO_ADDRESS } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { SdkError, SdkErrorCode } from '../errors';
import { ContractObject } from './object';

export class Collection extends ContractObject {
  public constructor(protected readonly base: CollectionContract) {
    super(base);
  }

  /** Get the number of unique tokens in the collection */
  async tokensCount(): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        const offset = this.base.getSmallestTokenId.supported ? await this.base.getSmallestTokenId() : 0;
        const largest = await this.base.getLargestTokenId();
        return largest.add(1 - offset);

      case 'ERC721':
        const uniqueCount = this.base.totalSupply();
        return uniqueCount;
    }
  }

  async getTermsState(walletAddress?: Addressish): Promise<OperationStatus<TermsState>> {
    return await this.run(async () => {
      const userAddress = await asAddress(walletAddress || ZERO_ADDRESS);

      if (
        this.base.acceptTerms.supported &&
        this.base.getTermsDetails.supported &&
        this.base.hasAcceptedTerms.supported
      ) {
        try {
          const details = await this.base.getTermsDetails();
          if (details.termsActivated) {
            const termsAccepted = await this.base.hasAcceptedTerms(userAddress);
            return {
              termsActivated: true,
              termsLink: details.termsLink,
              termsAccepted,
              userAddress,
            };
          }
        } catch (err) {
          throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { walletAddress });
        }
      }

      return {
        termsActivated: false,
        termsLink: null,
        termsAccepted: false,
        userAddress,
      };
    });
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
