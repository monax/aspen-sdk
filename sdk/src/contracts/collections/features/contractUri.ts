import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const ContractUriPartitions = {
  v1: [...FeatureFunctionsMap['contractURI()[string]'].drop],
};
type ContractUriPartitions = typeof ContractUriPartitions;

const ContractUriInterfaces = Object.values(ContractUriPartitions).flat();
type ContractUriInterfaces = (typeof ContractUriInterfaces)[number];

export type ContractUriCallArgs = [overrides?: SourcedOverrides];
export type ContractUriResponse = string;

export class ContractUri extends ContractFunction<
  ContractUriInterfaces,
  ContractUriPartitions,
  ContractUriCallArgs,
  ContractUriResponse
> {
  readonly functionName = 'contractUri';

  constructor(base: CollectionContract) {
    super(base, ContractUriInterfaces, ContractUriPartitions);
  }

  call(...args: ContractUriCallArgs): Promise<ContractUriResponse> {
    return this.contractUri(...args);
  }

  async contractUri(overrides?: SourcedOverrides): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const uri = await v1.connectReadOnly().contractURI(overrides);
      return uri;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
