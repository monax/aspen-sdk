import { BigNumber, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetBaseURICountFunctions = {
  v1: 'getBaseURICount()[uint256]',
} as const;

const GetBaseURICountPartitions = {
  v1: [...FeatureFunctionsMap[GetBaseURICountFunctions.v1].drop],
};
type GetBaseURICountPartitions = typeof GetBaseURICountPartitions;

const GetBaseURICountInterfaces = Object.values(GetBaseURICountPartitions).flat();
type GetBaseURICountInterfaces = (typeof GetBaseURICountInterfaces)[number];

export type GetBaseURICountCallArgs = [overrides?: CallOverrides];
export type GetBaseURICountResponse = BigNumber;

export class GetBaseURICount extends ContractFunction<
  GetBaseURICountInterfaces,
  GetBaseURICountPartitions,
  GetBaseURICountCallArgs,
  GetBaseURICountResponse
> {
  readonly functionName = 'getBaseURICount';

  constructor(base: CollectionContract) {
    super(base, GetBaseURICountInterfaces, GetBaseURICountPartitions, GetBaseURICountFunctions);
  }

  execute(...args: GetBaseURICountCallArgs): Promise<GetBaseURICountResponse> {
    return this.GetBaseURICount(...args);
  }

  async GetBaseURICount(overrides: CallOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const indices = await v1.connectReadOnly().getBaseURICount(overrides);
      return indices;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getBaseURICount = asCallableClass(GetBaseURICount);
