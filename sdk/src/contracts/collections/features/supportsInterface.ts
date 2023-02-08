import { BytesLike } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SupportsInterfacePartitions = {
  v1: [...FeatureFunctionsMap['supportsInterface(bytes4)[bool]'].drop],
};
type SupportsInterfacePartitions = typeof SupportsInterfacePartitions;

const SupportsInterfaceInterfaces = Object.values(SupportsInterfacePartitions).flat();
type SupportsInterfaceInterfaces = (typeof SupportsInterfaceInterfaces)[number];

export type SupportsInterfaceCallArgs = [interfaceId: BytesLike, overrides?: SourcedOverrides];
export type SupportsInterfaceResponse = boolean;

export class SupportsInterface extends ContractFunction<
  SupportsInterfaceInterfaces,
  SupportsInterfacePartitions,
  SupportsInterfaceCallArgs,
  SupportsInterfaceResponse
> {
  readonly functionName = 'supportsInterface';

  constructor(base: CollectionContract) {
    super(base, SupportsInterfaceInterfaces, SupportsInterfacePartitions);
  }

  call(...args: SupportsInterfaceCallArgs): Promise<SupportsInterfaceResponse> {
    return this.supportsInterface(...args);
  }

  async supportsInterface(interfaceId: BytesLike, overrides?: SourcedOverrides): Promise<boolean> {
    const v1 = this.partition('v1');

    try {
      const supported = await v1.connectReadOnly().supportsInterface(interfaceId, overrides);
      return supported;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }
}
