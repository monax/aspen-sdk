import { BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract, CollectionContractClaimCondition, transformClaimConditions } from '../..';
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

export type GetClaimConditionsCallArgs = [tokenId: BigNumberish | null, overrides?: CallOverrides];
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
    tokenId: BigNumberish | null,
    overrides: CallOverrides = {},
  ): Promise<CollectionContractClaimCondition[]> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const conditions = await sft.connectReadOnly().getClaimConditions(tokenId, overrides);
            return conditions.map(transformClaimConditions);
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const conditions = await nft.connectReadOnly().getClaimConditions(overrides);
            return conditions.map(transformClaimConditions);
          }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getClaimConditions = asCallableClass(GetClaimConditions);
