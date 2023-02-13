import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { Zero } from '../number';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const ImplementationVersionPartitions = {
  v1: [...FeatureFunctionsMap['minorVersion()[uint256,uint256]'].drop],
  v2: [...FeatureFunctionsMap['implementationVersion()[uint256,uint256,uint256]'].drop],
};
type ImplementationVersionPartitions = typeof ImplementationVersionPartitions;

const ImplementationVersionInterfaces = Object.values(ImplementationVersionPartitions).flat();
type ImplementationVersionInterfaces = (typeof ImplementationVersionInterfaces)[number];

export type ImplementationVersionCallArgs = [overrides?: SourcedOverrides];
export type ImplementationVersionResponse = AspenContractVersion;

export type AspenContractVersion = {
  major: BigNumber;
  minor: BigNumber;
  patch: BigNumber;
};

export class ImplementationVersion extends ContractFunction<
  ImplementationVersionInterfaces,
  ImplementationVersionPartitions,
  ImplementationVersionCallArgs,
  ImplementationVersionResponse
> {
  readonly functionName = 'implementationVersion';

  constructor(base: CollectionContract) {
    super(base, ImplementationVersionInterfaces, ImplementationVersionPartitions);
  }

  call(...args: ImplementationVersionCallArgs): Promise<ImplementationVersionResponse> {
    return this.implementationVersion(...args);
  }

  async implementationVersion(overrides?: SourcedOverrides): Promise<AspenContractVersion> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const version = await v2.connectReadOnly().implementationVersion(overrides);
        return version;
      } else if (v1) {
        const { minor, patch } = await v1.connectReadOnly().minorVersion(overrides);
        return { major: Zero, minor, patch };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
