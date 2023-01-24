import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { FeatureSet } from '../features';

export type RoyaltyInfo = {
  recipient: Address;
  basisPoints: number;
};

const handledFeatures = ['royalties/IRoyalty.sol:IRoyaltyV0', 'royalties/IRoyalty.sol:IPublicRoyaltyV0'] as const;

type HandledFeature = (typeof handledFeatures)[number];
export class Royalties extends FeatureSet<HandledFeature> {
  constructor(base: CollectionContract) {
    super(base, handledFeatures);
  }
  /**
   * @returns True if the contract supports royalties interface
   */
  get supported(): boolean {
    const features = this.base.interfaces;

    return !!(features['royalties/IRoyalty.sol:IRoyaltyV0'] || features['royalties/IRoyalty.sol:IPublicRoyaltyV0']);
  }

  /**
   * This function returns the default royalty info on a contract
   * @returns RoyaltyInfo | null
   */
  async getDefaultRoyaltyInfo(): Promise<RoyaltyInfo | null> {
    const interfaces = this.base.interfaces;

    if (interfaces['royalties/IRoyalty.sol:IRoyaltyV0']) {
      try {
        const iRoyalty = interfaces['royalties/IRoyalty.sol:IRoyaltyV0'].connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      } catch {}
    } else if (interfaces['royalties/IRoyalty.sol:IPublicRoyaltyV0']) {
      try {
        const iRoyalty = interfaces['royalties/IRoyalty.sol:IPublicRoyaltyV0'].connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      } catch {}
    }

    return null;
  }
}
