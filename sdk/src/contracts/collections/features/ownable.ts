import { ContractTransaction } from 'ethers';
import { parse } from '../../../utils/schema';
import { Address } from '../../address.js';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { Signerish } from '../types.js';
import { FeatureSet } from './features.js';

export const OwnableFeatures = [
  // 'ownable/IOwnable.sol:IOwnableEventV0', // skip
  'ownable/IOwnable.sol:IOwnableV0',
  'ownable/IOwnable.sol:IPublicOwnableV0',
  'ownable/IOwnable.sol:IRestrictedOwnableV0',
] as const;

export type OwnableFeatures = (typeof OwnableFeatures)[number];

export class Ownable extends FeatureSet<OwnableFeatures> {
  constructor(base: CollectionContract) {
    super(base, OwnableFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const getOwner = partitioner({
      v0: ['ownable/IOwnable.sol:IOwnableV0', 'ownable/IOwnable.sol:IPublicOwnableV0'],
      _: ['ownable/IOwnable.sol:IRestrictedOwnableV0'],
    });

    const setOwner = partitioner({
      v0: ['ownable/IOwnable.sol:IOwnableV0', 'ownable/IOwnable.sol:IRestrictedOwnableV0'],
      _: ['ownable/IOwnable.sol:IPublicOwnableV0'],
    });

    return { getOwner, setOwner };
  });

  /**
   * This function returns the owner of the contract.
   * @returns Address | null
   */
  async getOwner(): Promise<Address | null> {
    const getOwner = this.getPartition('getOwner')(this.base.interfaces);

    if (getOwner.v0) {
      try {
        const iOwnable = getOwner.v0.connectReadOnly();
        const ownerAddress = await iOwnable.owner();
        return parse(Address, ownerAddress);
      } catch (err) {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }

    return null;
  }

  /**
   * This function sets the owner of the contract.
   * @returns Address | null
   */
  async setOwner(signer: Signerish, ownerAddress: Address): Promise<ContractTransaction | null> {
    const setOwner = this.getPartition('setOwner')(this.base.interfaces);

    if (setOwner.v0) {
      try {
        const iOwnable = setOwner.v0.connectWith(signer);
        return await iOwnable.setOwner(ownerAddress);
      } catch (err) {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }

    return null;
  }
}
