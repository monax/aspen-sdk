import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ContractUriFunctions = {
  v1: 'contractURI()[string]',
} as const;

const ContractUriPartitions = {
  v1: [...FeatureFunctionsMap[ContractUriFunctions.v1].drop],
};
type ContractUriPartitions = typeof ContractUriPartitions;

const ContractUriInterfaces = Object.values(ContractUriPartitions).flat();
type ContractUriInterfaces = (typeof ContractUriInterfaces)[number];

export type ContractUriCallArgs = [params?: ReadParameters];
export type ContractUriResponse = string;

export class ContractUri extends ContractFunction<
  ContractUriInterfaces,
  ContractUriPartitions,
  ContractUriCallArgs,
  ContractUriResponse
> {
  readonly functionName = 'contractUri';

  constructor(base: CollectionContract) {
    super(base, ContractUriInterfaces, ContractUriPartitions, ContractUriFunctions);
  }

  execute(...args: ContractUriCallArgs): Promise<ContractUriResponse> {
    return this.contractUri(...args);
  }

  async contractUri(params?: ReadParameters): Promise<ContractUriResponse> {
    const v1 = this.partition('v1');

    try {
      const uri = await this.reader(this.abi(v1)).read.contractURI(params);
      return uri;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const contractUri = asCallableClass(ContractUri);
