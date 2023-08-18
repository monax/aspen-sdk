import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IsAspenFeaturesV1Functions = {
  v1: 'isIAspenFeaturesV1()[bool]',
} as const;

const IsAspenFeaturesV1Partitions = {
  v1: [...FeatureFunctionsMap[IsAspenFeaturesV1Functions.v1].drop],
};
type IsAspenFeaturesV1Partitions = typeof IsAspenFeaturesV1Partitions;

const IsAspenFeaturesV1Interfaces = Object.values(IsAspenFeaturesV1Partitions).flat();
type IsAspenFeaturesV1Interfaces = (typeof IsAspenFeaturesV1Interfaces)[number];

export type IsAspenFeaturesV1CallArgs = [params?: ReadParameters];
export type IsAspenFeaturesV1Response = boolean;

export class IsAspenFeaturesV1 extends ContractFunction<
  IsAspenFeaturesV1Interfaces,
  IsAspenFeaturesV1Partitions,
  IsAspenFeaturesV1CallArgs,
  IsAspenFeaturesV1Response
> {
  readonly functionName = 'isAspenFeaturesV1';

  constructor(base: CollectionContract) {
    super(base, IsAspenFeaturesV1Interfaces, IsAspenFeaturesV1Partitions, IsAspenFeaturesV1Functions);
  }

  execute(...args: IsAspenFeaturesV1CallArgs): Promise<IsAspenFeaturesV1Response> {
    return this.isAspenFeaturesV1(...args);
  }

  async isAspenFeaturesV1(params?: ReadParameters): Promise<boolean> {
    const v1 = this.partition('v1');

    try {
      const isAspen = await this.reader(this.abi(v1)).read.isIAspenFeaturesV1(params);
      return isAspen;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const isAspenFeaturesV1 = asCallableClass(IsAspenFeaturesV1);
