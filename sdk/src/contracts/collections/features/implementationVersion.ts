import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ImplementationVersionFunctions = {
  v1: 'minorVersion()[uint256,uint256]',
  v2: 'implementationVersion()[uint256,uint256,uint256]',
} as const;

const ImplementationVersionPartitions = {
  v1: [...FeatureFunctionsMap[ImplementationVersionFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[ImplementationVersionFunctions.v2].drop],
};
type ImplementationVersionPartitions = typeof ImplementationVersionPartitions;

const ImplementationVersionInterfaces = Object.values(ImplementationVersionPartitions).flat();
type ImplementationVersionInterfaces = (typeof ImplementationVersionInterfaces)[number];

export type ImplementationVersionCallArgs = [params?: ReadParameters];
export type ImplementationVersionResponse = AspenContractVersion;

export type AspenContractVersion = {
  major: bigint;
  minor: bigint;
  patch: bigint;
};

export class ImplementationVersion extends ContractFunction<
  ImplementationVersionInterfaces,
  ImplementationVersionPartitions,
  ImplementationVersionCallArgs,
  ImplementationVersionResponse
> {
  readonly functionName = 'implementationVersion';

  constructor(base: CollectionContract) {
    super(base, ImplementationVersionInterfaces, ImplementationVersionPartitions, ImplementationVersionFunctions);
  }

  execute(...args: ImplementationVersionCallArgs): Promise<ImplementationVersionResponse> {
    return this.implementationVersion(...args);
  }

  async implementationVersion(params?: ReadParameters): Promise<AspenContractVersion> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const [major, minor, patch] = await this.reader(this.abi(v2)).read.implementationVersion(params);
        return { major, minor, patch };
      } else if (v1) {
        const [minor, patch] = await this.reader(this.abi(v1)).read.minorVersion(params);
        return { major: BigInt(0), minor, patch };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const implementationVersion = asCallableClass(ImplementationVersion);
