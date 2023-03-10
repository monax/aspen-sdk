import { BytesLike, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SupportsInterfaceFunctions = {
  v1: 'supportsInterface(bytes4)[bool]',
} as const;

const SupportsInterfacePartitions = {
  v1: [...FeatureFunctionsMap[SupportsInterfaceFunctions.v1].drop],
};
type SupportsInterfacePartitions = typeof SupportsInterfacePartitions;

const SupportsInterfaceInterfaces = Object.values(SupportsInterfacePartitions).flat();
type SupportsInterfaceInterfaces = (typeof SupportsInterfaceInterfaces)[number];

export type SupportsInterfaceCallArgs = [interfaceId: BytesLike, overrides?: CallOverrides];
export type SupportsInterfaceResponse = boolean;

export class SupportsInterface extends ContractFunction<
  SupportsInterfaceInterfaces,
  SupportsInterfacePartitions,
  SupportsInterfaceCallArgs,
  SupportsInterfaceResponse
> {
  readonly functionName = 'supportsInterface';

  constructor(base: CollectionContract) {
    super(base, SupportsInterfaceInterfaces, SupportsInterfacePartitions, SupportsInterfaceFunctions);
  }

  execute(...args: SupportsInterfaceCallArgs): Promise<SupportsInterfaceResponse> {
    return this.supportsInterface(...args);
  }

  async supportsInterface(interfaceId: BytesLike, overrides: CallOverrides = {}): Promise<boolean> {
    const v1 = this.partition('v1');

    try {
      const supported = await v1.connectReadOnly().supportsInterface(interfaceId, overrides);
      return supported;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const supportsInterface = asCallableClass(SupportsInterface);
