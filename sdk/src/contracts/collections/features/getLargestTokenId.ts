import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetLargestTokenIdFunctions = {
  v1: 'getLargestTokenId()[uint256]',
} as const;

const GetLargestTokenIdPartitions = {
  v1: [...FeatureFunctionsMap[GetLargestTokenIdFunctions.v1].drop],
};
type GetLargestTokenIdPartitions = typeof GetLargestTokenIdPartitions;

const GetLargestTokenIdInterfaces = Object.values(GetLargestTokenIdPartitions).flat();
type GetLargestTokenIdInterfaces = (typeof GetLargestTokenIdInterfaces)[number];

export type GetLargestTokenIdCallArgs = [overrides?: SourcedOverrides];
export type GetLargestTokenIdResponse = BigNumber;

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
  call(...args: GetLargestTokenIdCallArgs): Promise<GetLargestTokenIdResponse> {
    return this.getLargestTokenId(...args);
  }

  async getLargestTokenId(overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const largestId = await v1.connectReadOnly().getLargestTokenId(overrides);
      return largestId;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
