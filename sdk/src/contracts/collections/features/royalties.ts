import { Address } from '../../address';
import { parse } from '../../../schema';
import { Features } from '../features';

export type RoyaltyInfo = {
  recipient: Address;
  basisPoints: number;
};

export class Royalties extends Features {
  /**
   * @returns True if the contract supports royalties interface
   */
  get supported(): boolean {
    const features = this.base.interfaces;

    return !!(features.IRoyaltyV0 || features.IPublicRoyaltyV0);
  }

  /**
   * This function returns the default royalty info on a contract
   * @returns RoyaltyInfo | null
   */
  async getDefaultRoyaltyInfo(): Promise<RoyaltyInfo | null> {
    const interfaces = this.base.interfaces;

    if (interfaces.IRoyaltyV0) {
      try {
        const iRoyalty = interfaces.IRoyaltyV0.connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      } catch {}
    } else if (interfaces.IPublicRoyaltyV0) {
      try {
        const iRoyalty = interfaces.IPublicRoyaltyV0.connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      } catch {}
    }

    return null;
  }
}
