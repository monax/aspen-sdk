import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetBaseURIIndicesPartitions = {
  v1: [...FeatureFunctionsMap['getBaseURIIndices()[uint256[]]'].drop],
};
type GetBaseURIIndicesPartitions = typeof GetBaseURIIndicesPartitions;

const GetBaseURIIndicesInterfaces = Object.values(GetBaseURIIndicesPartitions).flat();
type GetBaseURIIndicesInterfaces = (typeof GetBaseURIIndicesInterfaces)[number];

export type GetBaseURIIndicesCallArgs = [overrides?: SourcedOverrides];
export type GetBaseURIIndicesResponse = BigNumber[];

export class GetBaseURIIndices extends ContractFunction<
  GetBaseURIIndicesInterfaces,
  GetBaseURIIndicesPartitions,
  GetBaseURIIndicesCallArgs,
  GetBaseURIIndicesResponse
> {
  readonly functionName = 'getBaseURIIndices';

  constructor(base: CollectionContract) {
    super(base, GetBaseURIIndicesInterfaces, GetBaseURIIndicesPartitions);
  }

  call(...args: GetBaseURIIndicesCallArgs): Promise<GetBaseURIIndicesResponse> {
    return this.getBaseURIIndices(...args);
  }

  async getBaseURIIndices(overrides?: SourcedOverrides): Promise<BigNumber[]> {
    const v1 = this.partition('v1');

    try {
      const indices = await v1.connectReadOnly().getBaseURIIndices(overrides);
      return indices;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
