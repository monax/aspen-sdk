import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetClaimDataFunctions = {
  nft: 'getClaimData()[uint256,uint256,uint256]',
  sft: 'getClaimData(uint256)[uint256,uint256,uint256]',
} as const;

const GetClaimDataPartitions = {
  nft: [...FeatureFunctionsMap[GetClaimDataFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[GetClaimDataFunctions.sft].drop],
};
type GetClaimDataPartitions = typeof GetClaimDataPartitions;

const GetClaimDataInterfaces = Object.values(GetClaimDataPartitions).flat();
type GetClaimDataInterfaces = (typeof GetClaimDataInterfaces)[number];

export type GetClaimDataCallArgs = [tokenId: bigint | null, params?: ReadParameters];
export type GetClaimDataResponse = CollectionClaimData;

export type CollectionClaimData = {
  nextTokenIdToMint: bigint;
  maxTotalSupply: bigint;
  maxWalletClaimCount: bigint;
};

export class GetClaimData extends ContractFunction<
  GetClaimDataInterfaces,
  GetClaimDataPartitions,
  GetClaimDataCallArgs,
  GetClaimDataResponse
> {
  readonly functionName = 'getClaimData';

  constructor(base: CollectionContract) {
    super(base, GetClaimDataInterfaces, GetClaimDataPartitions, GetClaimDataFunctions);
  }

  execute(...args: GetClaimDataCallArgs): Promise<GetClaimDataResponse> {
    return this.getClaimData(...args);
  }

  async getClaimData(tokenId: bigint | null, params?: ReadParameters): Promise<CollectionClaimData> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const claimData = await this.reader(this.abi(sft)).read.getClaimData([tokenId], params);
            return {
              nextTokenIdToMint: claimData[0],
              maxTotalSupply: claimData[1],
              maxWalletClaimCount: claimData[2],
            };
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const claimData = await this.reader(this.abi(nft)).read.getClaimData(params);
            return {
              nextTokenIdToMint: claimData[0],
              maxTotalSupply: claimData[1],
              maxWalletClaimCount: claimData[2],
            };
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getClaimData = asCallableClass(GetClaimData);
