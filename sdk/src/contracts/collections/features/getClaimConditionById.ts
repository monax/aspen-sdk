import { claimConditionsFromChain, CollectionContract, CollectionContractClaimCondition, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const GetClaimConditionByIdFunctions = {
  nftV2: 'getClaimConditionById(uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32)]',
  sftV2:
    'getClaimConditionById(uint256,uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32)]',
} as const;

const GetClaimConditionByIdPartitions = {
  nftV2: [...FeatureFunctionsMap[GetClaimConditionByIdFunctions.nftV2].drop],
  sftV2: [...FeatureFunctionsMap[GetClaimConditionByIdFunctions.sftV2].drop],
  // 'getClaimConditionById' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type GetClaimConditionByIdPartitions = typeof GetClaimConditionByIdPartitions;

const GetClaimConditionByIdInterfaces = Object.values(GetClaimConditionByIdPartitions).flat();
type GetClaimConditionByIdInterfaces = (typeof GetClaimConditionByIdInterfaces)[number];

export type GetClaimConditionByIdCallArgs = [conditionId: bigint, tokenId: bigint | null, params?: ReadParameters];
export type GetClaimConditionByIdResponse = CollectionContractClaimCondition;

export class GetClaimConditionById extends ContractFunction<
  GetClaimConditionByIdInterfaces,
  GetClaimConditionByIdPartitions,
  GetClaimConditionByIdCallArgs,
  GetClaimConditionByIdResponse
> {
  readonly functionName = 'getClaimConditionById';

  constructor(base: CollectionContract) {
    super(base, GetClaimConditionByIdInterfaces, GetClaimConditionByIdPartitions, GetClaimConditionByIdFunctions);
  }

  execute(...args: GetClaimConditionByIdCallArgs): Promise<GetClaimConditionByIdResponse> {
    return this.getClaimConditionById(...args);
  }

  async getClaimConditionById(
    conditionId: bigint,
    tokenId: bigint | null,
    params?: ReadParameters,
  ): Promise<GetClaimConditionByIdResponse> {
    const { nftV2, sftV2 } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iface = sftV2 ?? this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2');
          const conditionSft = await this.reader(iface.abi).read.getClaimConditionById([tokenId, conditionId], params);
          return claimConditionsFromChain(conditionSft);

        case 'ERC721':
          this.base.rejectTokenId(tokenId, this.functionName);
          const nft = nftV2 ?? this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2');
          const conditionNft = await this.reader(this.abi(nft)).read.getClaimConditionById([conditionId], params);
          return claimConditionsFromChain(conditionNft);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getClaimConditionById = asCallableClass(GetClaimConditionById);
