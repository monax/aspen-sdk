import { CallOverrides, ContractTransaction } from 'ethers';
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
    const owner = partitioner({
      v0: ['ownable/IOwnable.sol:IOwnableV0'],
      p0: ['ownable/IOwnable.sol:IPublicOwnableV0'],
      r0: ['ownable/IOwnable.sol:IRestrictedOwnableV0'],
    });

    return { owner };
  });

  async getOwner(): Promise<Address> {
    const { v0, p0 } = this.getPartition('owner')(this.base.interfaces);
    const factory = v0 ?? p0;

    try {
      if (factory) {
        const owner = await factory.connectReadOnly().owner();
        return parse(Address, owner);
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'ownable', function: 'getOwner' });
  }

  async setOwner(signer: Signerish, ownerAddress: Address, overrides?: CallOverrides): Promise<ContractTransaction> {
    const { v0, r0 } = this.getPartition('owner')(this.base.interfaces);
    const factory = v0 ?? r0;

    try {
      if (factory) {
        const tx = await factory.connectReadOnly().setOwner(ownerAddress, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'ownable', function: 'setOwner' });
  }
}
