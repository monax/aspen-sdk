import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { FeatureSet } from './features';

import { SdkError, SdkErrorCode } from '../errors';

export type RoyaltyInfo = {
  recipient: Address;
  basisPoints: number;
};

export const RoyaltiesFeatures = [
  'royalties/IRoyalty.sol:IPublicRoyaltyV0',
  // 'royalties/IRoyalty.sol:IRestrictedRoyaltyV0',
  // 'royalties/IRoyalty.sol:IRestrictedRoyaltyV1',
  // 'royalties/IRoyalty.sol:IRestrictedRoyaltyV2',
  'royalties/IRoyalty.sol:IRoyaltyV0',
] as const;

export type RoyaltiesFeatures = (typeof RoyaltiesFeatures)[number];

export class Royalties extends FeatureSet<RoyaltiesFeatures> {
  constructor(base: CollectionContract) {
    super(base, RoyaltiesFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const getInfo = partitioner({
      v0: ['royalties/IRoyalty.sol:IRoyaltyV0', 'royalties/IRoyalty.sol:IPublicRoyaltyV0'],
    });

    return { getInfo };
  });

  /**
   * This function returns the default royalty info on a contract
   * @returns RoyaltyInfo
   */
  async getDefaultRoyaltyInfo(): Promise<RoyaltyInfo> {
    const getInfo = this.getPartition('getInfo')(this.base.interfaces);

    if (getInfo.v0) {
      try {
        const iRoyalty = getInfo.v0.connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      } catch (err) {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    } else {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'royalties' });
    }
  }
}
