import { ContractTransaction, ethers } from 'ethers';
import { CollectionContract, Signerish, SourcedOverrides } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const PauseFeatures = [
  'pausable/ICedarPausable.sol:ICedarPausableV0',
  'pausable/ICedarPausable.sol:ICedarPausableV1',
  'pausable/ICedarPausable.sol:IRestrictedPausableV0',
  'pausable/IPausable.sol:ICedarPausableV0',
  'pausable/IPausable.sol:ICedarPausableV1',
  'pausable/IPausable.sol:IRestrictedPausableV0',
  'pausable/IPausable.sol:IRestrictedPausableV1',
] as const;

export type PauseFeatures = (typeof PauseFeatures)[number];

export class Pause extends FeatureSet<PauseFeatures> {
  constructor(base: CollectionContract) {
    super(base, PauseFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const pause = partitioner({
      v0: ['pausable/IPausable.sol:ICedarPausableV0', 'pausable/ICedarPausable.sol:ICedarPausableV0'],
      v1: [
        'pausable/IPausable.sol:ICedarPausableV1',
        'pausable/IPausable.sol:IRestrictedPausableV0',
        'pausable/IPausable.sol:IRestrictedPausableV1',
        'pausable/ICedarPausable.sol:ICedarPausableV1',
        'pausable/ICedarPausable.sol:IRestrictedPausableV0',
      ],
    });

    return { pause };
  });

  async getClaimPauseStatus(): Promise<boolean> {
    try {
      if (this.supported) {
        const abi = ['function claimIsPaused() public view returns (bool)'];
        const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
        const paused = await contract.claimIsPaused();
        return paused;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'pause', function: 'getClaimPauseStatus' });
  }

  async setClaimPauseStatus(
    signer: Signerish,
    pauseStatus: boolean,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, v1 } = this.getPartition('pause');

    try {
      if (v1) {
        const tx = await v1.connectWith(signer).setClaimPauseStatus(pauseStatus, overrides);
        return tx;
      } else if (v0) {
        const tx = await (pauseStatus
          ? v0.connectWith(signer).pauseClaims(overrides)
          : v0.connectWith(signer).unpauseClaims(overrides));
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'pause', function: 'setClaimPauseStatus' });
  }
}
