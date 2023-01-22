import { parse } from '../../../utils/schema';
import { Address } from '../../address';
import { CollectionContract } from '../collections';
import { FeatureSet } from '../features';

// TODO: reinstate when released
const handledFeatures = ['ownable/IOwnable.sol:IPublicOwnableV0'] as const;

type HandledFeature = (typeof handledFeatures)[number];
export class Ownable extends FeatureSet<HandledFeature> {
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
