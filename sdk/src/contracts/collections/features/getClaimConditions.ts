import { claimConditionsFromChain, CollectionContract, CollectionContractClaimCondition, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetClaimConditionsFunctions = {
  nft: 'getClaimConditions()[tuple[]]',
  sft: 'getClaimConditions(uint256)[tuple[]]',
} as const;

const GetClaimConditionsPartitions = {
  nft: [...FeatureFunctionsMap[GetClaimConditionsFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[GetClaimConditionsFunctions.sft].drop],
};
type GetClaimConditionsPartitions = typeof GetClaimConditionsPartitions;

const GetClaimConditionsInterfaces = Object.values(GetClaimConditionsPartitions).flat();
type GetClaimConditionsInterfaces = (typeof GetClaimConditionsInterfaces)[number];

export type GetClaimConditionsCallArgs = [tokenId: bigint | null, params?: ReadParameters];
export type GetClaimConditionsResponse = CollectionContractClaimCondition[];

export class GetClaimConditions extends ContractFunction<
  GetClaimConditionsInterfaces,
  GetClaimConditionsPartitions,
  GetClaimConditionsCallArgs,
  GetClaimConditionsResponse
> {
  readonly functionName = 'getClaimConditions';

  constructor(base: CollectionContract) {
    super(base, GetClaimConditionsInterfaces, GetClaimConditionsPartitions, GetClaimConditionsFunctions);
  }

  execute(...args: GetClaimConditionsCallArgs): Promise<GetClaimConditionsResponse> {
    return this.getClaimConditions(...args);
  }

  async getClaimConditions(
    tokenId: bigint | null,
    params?: ReadParameters,
  ): Promise<CollectionContractClaimCondition[]> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const conditions = await this.reader(this.abi(sft)).read.getClaimConditions([tokenId], params);
            return conditions.map(claimConditionsFromChain);
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const conditions = await this.reader(this.abi(nft)).read.getClaimConditions(params);
            return conditions.map(claimConditionsFromChain);
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getClaimConditions = asCallableClass(GetClaimConditions);
