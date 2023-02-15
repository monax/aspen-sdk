import { CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetSmallestTokenIdFunctions = {
  v1: 'getSmallestTokenId()[uint8]',
} as const;

const GetSmallestTokenIdPartitions = {
  v1: [...FeatureFunctionsMap[GetSmallestTokenIdFunctions.v1].drop],
};
type GetSmallestTokenIdPartitions = typeof GetSmallestTokenIdPartitions;

const GetSmallestTokenIdInterfaces = Object.values(GetSmallestTokenIdPartitions).flat();
type GetSmallestTokenIdInterfaces = (typeof GetSmallestTokenIdInterfaces)[number];

export type GetSmallestTokenIdCallArgs = [overrides?: CallOverrides];
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
  call(...args: GetSmallestTokenIdCallArgs): Promise<GetSmallestTokenIdResponse> {
    return this.getSmallestTokenId(...args);
  }

  async getSmallestTokenId(overrides: CallOverrides = {}): Promise<number> {
    const v1 = this.partition('v1');

    try {
      const smallestId = await v1.connectReadOnly().getSmallestTokenId(overrides);
      return smallestId;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
