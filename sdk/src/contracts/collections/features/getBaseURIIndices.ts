import { BigNumber, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetBaseURIIndicesFunctions = {
  v1: 'getBaseURIIndices()[uint256[]]',
} as const;

const GetBaseURIIndicesPartitions = {
  v1: [...FeatureFunctionsMap[GetBaseURIIndicesFunctions.v1].drop],
};
type GetBaseURIIndicesPartitions = typeof GetBaseURIIndicesPartitions;

const GetBaseURIIndicesInterfaces = Object.values(GetBaseURIIndicesPartitions).flat();
type GetBaseURIIndicesInterfaces = (typeof GetBaseURIIndicesInterfaces)[number];

export type GetBaseURIIndicesCallArgs = [overrides?: CallOverrides];
export type GetBaseURIIndicesResponse = BigNumber[];

export class GetBaseURIIndices extends ContractFunction<
  GetBaseURIIndicesInterfaces,
  GetBaseURIIndicesPartitions,
  GetBaseURIIndicesCallArgs,
  GetBaseURIIndicesResponse
> {
  readonly functionName = 'getBaseURIIndices';

  constructor(base: CollectionContract) {
    super(base, GetBaseURIIndicesInterfaces, GetBaseURIIndicesPartitions, GetBaseURIIndicesFunctions);
  }

  call(...args: GetBaseURIIndicesCallArgs): Promise<GetBaseURIIndicesResponse> {
    return this.getBaseURIIndices(...args);
  }

  async getBaseURIIndices(overrides: CallOverrides = {}): Promise<BigNumber[]> {
    const v1 = this.partition('v1');

    try {
      const indices = await v1.connectReadOnly().getBaseURIIndices(overrides);
      return indices;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
