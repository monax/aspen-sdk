import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const VersionFeatures = [
  'IAspenVersioned.sol:IAspenVersionedV2',
  'IAspenVersioned.sol:ICedarImplementationVersionedV0',
  'IAspenVersioned.sol:ICedarImplementationVersionedV1',
  'IAspenVersioned.sol:ICedarImplementationVersionedV2',
  'IAspenVersioned.sol:ICedarMinorVersionedV0',
  'IAspenVersioned.sol:ICedarVersionedV0',
  'IAspenVersioned.sol:ICedarVersionedV1',
  'IAspenVersioned.sol:ICedarVersionedV2',
  'ICedarVersioned.sol:ICedarImplementationVersionedV0',
  'ICedarVersioned.sol:ICedarImplementationVersionedV1',
  'ICedarVersioned.sol:ICedarImplementationVersionedV2',
  'ICedarVersioned.sol:ICedarMinorVersionedV0',
  'ICedarVersioned.sol:ICedarVersionedV0',
  'ICedarVersioned.sol:ICedarVersionedV1',
  'ICedarVersioned.sol:ICedarVersionedV2',
] as const;

export type VersionFeatures = (typeof VersionFeatures)[number];

export type AspenContractVersion = {
  major: BigNumber;
  minor: BigNumber;
  patch: BigNumber;
};

export class Version extends FeatureSet<VersionFeatures> {
  constructor(base: CollectionContract) {
    super(base, VersionFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const version = partitioner({
      v0: ['IAspenVersioned.sol:ICedarMinorVersionedV0', 'ICedarVersioned.sol:ICedarMinorVersionedV0'],
      v1: [
        'IAspenVersioned.sol:IAspenVersionedV2',
        'IAspenVersioned.sol:ICedarImplementationVersionedV0',
        'IAspenVersioned.sol:ICedarImplementationVersionedV1',
        'IAspenVersioned.sol:ICedarImplementationVersionedV2',
        'IAspenVersioned.sol:ICedarVersionedV0',
        'IAspenVersioned.sol:ICedarVersionedV1',
        'IAspenVersioned.sol:ICedarVersionedV2',
        'ICedarVersioned.sol:ICedarImplementationVersionedV0',
        'ICedarVersioned.sol:ICedarImplementationVersionedV1',
        'ICedarVersioned.sol:ICedarImplementationVersionedV2',
        'ICedarVersioned.sol:ICedarVersionedV0',
        'ICedarVersioned.sol:ICedarVersionedV1',
        'ICedarVersioned.sol:ICedarVersionedV2',
      ],
    });

    const name = partitioner({
      v0: [
        'IAspenVersioned.sol:ICedarImplementationVersionedV1',
        'IAspenVersioned.sol:ICedarVersionedV1',
        'ICedarVersioned.sol:ICedarImplementationVersionedV1',
        'ICedarVersioned.sol:ICedarVersionedV1',
      ],
      v1: [
        'IAspenVersioned.sol:IAspenVersionedV2',
        'IAspenVersioned.sol:ICedarImplementationVersionedV2',
        'IAspenVersioned.sol:ICedarVersionedV2',
        'ICedarVersioned.sol:ICedarImplementationVersionedV2',
        'ICedarVersioned.sol:ICedarVersionedV2',
      ],
      _: [
        'IAspenVersioned.sol:ICedarImplementationVersionedV0',
        'IAspenVersioned.sol:ICedarMinorVersionedV0',
        'IAspenVersioned.sol:ICedarVersionedV0',
        'ICedarVersioned.sol:ICedarImplementationVersionedV0',
        'ICedarVersioned.sol:ICedarMinorVersionedV0',
        'ICedarVersioned.sol:ICedarVersionedV0',
      ],
    });

    return { version, name };
  });

  async implementationVersion(): Promise<AspenContractVersion> {
    const { v0, v1 } = this.getPartition('version');

    try {
      if (v0) {
        const { minor, patch } = await v0.connectReadOnly().minorVersion();
        return { major: BigNumber.from(0), minor, patch };
      } else if (v1) {
        const version = await v1.connectReadOnly().implementationVersion();
        return version;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'version', function: 'implementationVersion' });
  }

  async implementationName(): Promise<string> {
    const { v0, v1 } = this.getPartition('name');

    try {
      if (v0) {
        const name = await v0.connectReadOnly().implementationInterfaceName();
        return name;
      } else if (v1) {
        const name = await v1.connectReadOnly().implementationInterfaceId();
        return name;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'version', function: 'implementationName' });
  }
}
