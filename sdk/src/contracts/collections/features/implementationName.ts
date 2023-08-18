import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ImplementationNameFunctions = {
  v1: 'implementationInterfaceName()[string]',
  v2: 'implementationInterfaceId()[string]',
} as const;

const ImplementationNamePartitions = {
  v1: [...FeatureFunctionsMap[ImplementationNameFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[ImplementationNameFunctions.v2].drop],
};
type ImplementationNamePartitions = typeof ImplementationNamePartitions;

const ImplementationNameInterfaces = Object.values(ImplementationNamePartitions).flat();
type ImplementationNameInterfaces = (typeof ImplementationNameInterfaces)[number];

export type ImplementationNameCallArgs = [params?: ReadParameters];
export type ImplementationNameResponse = string;

export class ImplementationName extends ContractFunction<
  ImplementationNameInterfaces,
  ImplementationNamePartitions,
  ImplementationNameCallArgs,
  ImplementationNameResponse
> {
  readonly functionName = 'implementationName';

  constructor(base: CollectionContract) {
    super(base, ImplementationNameInterfaces, ImplementationNamePartitions, ImplementationNameFunctions);
  }

  execute(...args: ImplementationNameCallArgs): Promise<ImplementationNameResponse> {
    return this.implementationName(...args);
  }

  async implementationName(params?: ReadParameters): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const name = await this.reader(this.abi(v2)).read.implementationInterfaceId(params);
        return name;
      } else if (v1) {
        const name = await this.reader(this.abi(v1)).read.implementationInterfaceName(params);
        return name;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const implementationName = asCallableClass(ImplementationName);
