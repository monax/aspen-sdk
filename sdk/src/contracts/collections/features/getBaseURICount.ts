import { CollectionContract, ReadParameters } from '../..';
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

export type GetBaseURICountCallArgs = [params?: ReadParameters];
export type GetBaseURICountResponse = bigint;

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

  async GetBaseURICount(params?: ReadParameters): Promise<GetBaseURICountResponse> {
    const v1 = this.partition('v1');

    try {
      const indices = await this.reader(this.abi(v1)).read.getBaseURICount(params);
      return indices;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getBaseURICount = asCallableClass(GetBaseURICount);
