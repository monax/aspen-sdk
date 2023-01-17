import { parse } from '../../../utils/schema.js';
import { Address } from '../../address.js';
import { CollectionContract } from '../collections';
import { Features } from '../features.js';

// TODO: reinstate when released
const handledFeatures = ['ownable/IOwnable.sol:IPublicOwnableV0'] as const;

type HandledFeature = (typeof handledFeatures)[number];
export class Ownable extends Features<HandledFeature> {
  constructor(base: CollectionContract) {
    super(base, handledFeatures);
  }
  /**
   * This function returns the owner of the contract.
   * @returns Address | null
   */
  async getOwner(): Promise<Address | null> {
    const interfaces = this.base.interfaces;

    if (interfaces['ownable/IOwnable.sol:IPublicOwnableV0']) {
      try {
        const iOwnable = interfaces['ownable/IOwnable.sol:IPublicOwnableV0'].connectReadOnly();
        const ownerAddress = await iOwnable.owner();
        return parse(Address, ownerAddress);
      } catch (err) {
        this.base.error('Failed to load getOwner', err, 'ownable.getOwner');
      }
    }

    return null;
  }
}
