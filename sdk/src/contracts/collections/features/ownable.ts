import { Address } from '../../address';
import { Features } from '../features';

// TODO: reinstate when released
export class Ownable extends Features {
  /**
   * @returns True if the contract supports royalties interface
   */
  get supported(): boolean {
    const features = this.base.interfaces;
    return false;
    // return features.IPublicOwnableV0 ? true : false;
  }

  /**
   * This function returns returns the owner of the contract.
   * @returns Address | null
   */
  async getOwner(): Promise<Address | null> {
    const interfaces = this.base.interfaces;

    // if (interfaces.IPublicOwnableV0) {
    //   try {
    //     const iOwnable = interfaces.IPublicOwnableV0.connectReadOnly();
    //     const ownerAddress = await iOwnable.owner();
    //     return parse(Address, ownerAddress);
    //   } catch (err) {
    //     this.base.error('Failed to load getOwner', err, 'ownable.getOwner');
    //   }
    // }

    return null;
  }
}
