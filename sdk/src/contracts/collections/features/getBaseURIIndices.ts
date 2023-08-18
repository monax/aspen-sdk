import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetBaseURIIndicesFunctions = {
  v1: 'getBaseURIIndices()[uint256[]]',
} as const;

const GetBaseURIIndicesPartitions = {
  v1: [...FeatureFunctionsMap[GetBaseURIIndicesFunctions.v1].drop],
};
type GetBaseURIIndicesPartitions = typeof GetBaseURIIndicesPartitions;

const GetBaseURIIndicesInterfaces = Object.values(GetBaseURIIndicesPartitions).flat();
type GetBaseURIIndicesInterfaces = (typeof GetBaseURIIndicesInterfaces)[number];

export type GetBaseURIIndicesCallArgs = [params?: ReadParameters];
export type GetBaseURIIndicesResponse = readonly bigint[];

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

  execute(...args: GetBaseURIIndicesCallArgs): Promise<GetBaseURIIndicesResponse> {
    return this.getBaseURIIndices(...args);
  }

  async getBaseURIIndices(params?: ReadParameters): Promise<GetBaseURIIndicesResponse> {
    const v1 = this.partition('v1');

    try {
      const indices = await this.reader(this.abi(v1)).read.getBaseURIIndices(params);
      return indices;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getBaseURIIndices = asCallableClass(GetBaseURIIndices);
