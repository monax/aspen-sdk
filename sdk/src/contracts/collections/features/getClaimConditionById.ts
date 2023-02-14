import { BigNumber, BigNumberish } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction } from './features';

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

export type GetClaimConditionByIdCallArgs = [
  conditionId: BigNumberish,
  tokenId: BigNumberish | null,
  overrides?: SourcedOverrides,
];
export type GetClaimConditionByIdResponse = CollectionContractClaimCondition;

export type CollectionContractClaimCondition = {
  startTimestamp: number;
  maxClaimableSupply: BigNumber;
  supplyClaimed: BigNumber;
  quantityLimitPerTransaction: BigNumber;
  waitTimeInSecondsBetweenClaims: number;
  merkleRoot: string;
  pricePerToken: BigNumber;
  currency: Address;
  phaseId: string;
};

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

  call(...args: GetClaimConditionByIdCallArgs): Promise<GetClaimConditionByIdResponse> {
    return this.getClaimConditionById(...args);
  }

  async getClaimConditionById(
    conditionId: BigNumberish,
    tokenId: BigNumberish | null,
    overrides?: SourcedOverrides,
  ): Promise<CollectionContractClaimCondition> {
    const { nftV2, sftV2 } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iface = sftV2 ?? this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2');
          const conditionSft = await iface.connectReadOnly().getClaimConditionById(tokenId, conditionId, overrides);

          return {
            startTimestamp: conditionSft.startTimestamp.toNumber(),
            maxClaimableSupply: conditionSft.maxClaimableSupply,
            supplyClaimed: conditionSft.supplyClaimed,
            quantityLimitPerTransaction: conditionSft.quantityLimitPerTransaction,
            waitTimeInSecondsBetweenClaims: conditionSft.waitTimeInSecondsBetweenClaims.toNumber(),
            merkleRoot: conditionSft.merkleRoot,
            pricePerToken: conditionSft.pricePerToken,
            currency: parse(Address, conditionSft.currency),
            phaseId: conditionSft.phaseId ?? null, // 'phaseId' isn't returned by old interfaces
          };

        case 'ERC721':
          this.base.rejectTokenId(tokenId, this.functionName);
          const nft = nftV2 ?? this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2');
          const conditionNft = await nft.connectReadOnly().getClaimConditionById(conditionId, overrides);

          return {
            startTimestamp: conditionNft.startTimestamp.toNumber(),
            maxClaimableSupply: conditionNft.maxClaimableSupply,
            supplyClaimed: conditionNft.supplyClaimed,
            quantityLimitPerTransaction: conditionNft.quantityLimitPerTransaction,
            waitTimeInSecondsBetweenClaims: conditionNft.waitTimeInSecondsBetweenClaims.toNumber(),
            merkleRoot: conditionNft.merkleRoot,
            pricePerToken: conditionNft.pricePerToken,
            currency: parse(Address, conditionNft.currency),
            phaseId: conditionNft.phaseId ?? null, // 'phaseId' isn't returned by old interfaces
          };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
