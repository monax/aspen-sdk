import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetLargestTokenIdFunctions = {
  v1: 'getLargestTokenId()[uint256]',
} as const;

const GetLargestTokenIdPartitions = {
  v1: [...FeatureFunctionsMap[GetLargestTokenIdFunctions.v1].drop],
};
type GetLargestTokenIdPartitions = typeof GetLargestTokenIdPartitions;

const GetLargestTokenIdInterfaces = Object.values(GetLargestTokenIdPartitions).flat();
type GetLargestTokenIdInterfaces = (typeof GetLargestTokenIdInterfaces)[number];

export type GetLargestTokenIdCallArgs = [params?: ReadParameters];
export type GetLargestTokenIdResponse = bigint;

export class GetLargestTokenId extends ContractFunction<
  GetLargestTokenIdInterfaces,
  GetLargestTokenIdPartitions,
  GetLargestTokenIdCallArgs,
  GetLargestTokenIdResponse
> {
  readonly functionName = 'getLargestTokenId';

  constructor(base: CollectionContract) {
    super(base, GetLargestTokenIdInterfaces, GetLargestTokenIdPartitions, GetLargestTokenIdFunctions);
  }

  /** Get the number of unique tokens in the collection */
  execute(...args: GetLargestTokenIdCallArgs): Promise<GetLargestTokenIdResponse> {
    return this.getLargestTokenId(...args);
  }

  async getLargestTokenId(params?: ReadParameters): Promise<bigint> {
    const v1 = this.partition('v1');

    try {
      const largestId = await this.reader(this.abi(v1)).read.getLargestTokenId(params);
      return largestId;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getLargestTokenId = asCallableClass(GetLargestTokenId);
