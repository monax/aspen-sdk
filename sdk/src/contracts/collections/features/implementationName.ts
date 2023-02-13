import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const ImplementationNamePartitions = {
  v1: [...FeatureFunctionsMap['implementationInterfaceName()[string]'].drop],
  v2: [...FeatureFunctionsMap['implementationInterfaceId()[string]'].drop],
};
type ImplementationNamePartitions = typeof ImplementationNamePartitions;

const ImplementationNameInterfaces = Object.values(ImplementationNamePartitions).flat();
type ImplementationNameInterfaces = (typeof ImplementationNameInterfaces)[number];

export type ImplementationNameCallArgs = [overrides?: SourcedOverrides];
export type ImplementationNameResponse = string;

export class ImplementationName extends ContractFunction<
  ImplementationNameInterfaces,
  ImplementationNamePartitions,
  ImplementationNameCallArgs,
  ImplementationNameResponse
> {
  readonly functionName = 'implementationName';

  constructor(base: CollectionContract) {
    super(base, ImplementationNameInterfaces, ImplementationNamePartitions);
  }

  call(...args: ImplementationNameCallArgs): Promise<ImplementationNameResponse> {
    return this.implementationName(...args);
  }

  async implementationName(overrides?: SourcedOverrides): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const name = await v2.connectReadOnly().implementationInterfaceId(overrides);
        return name;
      } else if (v1) {
        const name = await v1.connectReadOnly().implementationInterfaceName(overrides);
        return name;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
