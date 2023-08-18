import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetSmallestTokenIdFunctions = {
  v1: 'getSmallestTokenId()[uint8]',
} as const;

const GetSmallestTokenIdPartitions = {
  v1: [...FeatureFunctionsMap[GetSmallestTokenIdFunctions.v1].drop],
};
type GetSmallestTokenIdPartitions = typeof GetSmallestTokenIdPartitions;

const GetSmallestTokenIdInterfaces = Object.values(GetSmallestTokenIdPartitions).flat();
type GetSmallestTokenIdInterfaces = (typeof GetSmallestTokenIdInterfaces)[number];

export type GetSmallestTokenIdCallArgs = [params?: ReadParameters];
export type GetSmallestTokenIdResponse = number;

export class GetSmallestTokenId extends ContractFunction<
  GetSmallestTokenIdInterfaces,
  GetSmallestTokenIdPartitions,
  GetSmallestTokenIdCallArgs,
  GetSmallestTokenIdResponse
> {
  readonly functionName = 'getSmallestTokenId';

  constructor(base: CollectionContract) {
    super(base, GetSmallestTokenIdInterfaces, GetSmallestTokenIdPartitions, GetSmallestTokenIdFunctions);
  }

  /** Get the number of unique tokens in the collection */
  execute(...args: GetSmallestTokenIdCallArgs): Promise<GetSmallestTokenIdResponse> {
    return this.getSmallestTokenId(...args);
  }

  async getSmallestTokenId(params?: ReadParameters): Promise<number> {
    const v1 = this.partition('v1');

    try {
      const smallestId = await this.reader(this.abi(v1)).read.getSmallestTokenId(params);
      return smallestId;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getSmallestTokenId = asCallableClass(GetSmallestTokenId);
