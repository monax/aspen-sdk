import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
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

export type GetClaimDataCallArgs = [tokenId: BigNumberish | null, overrides?: CallOverrides];
export type GetClaimDataResponse = CollectionClaimData;

export type CollectionClaimData = {
  nextTokenIdToMint: BigNumber;
  maxTotalSupply: BigNumber;
  maxWalletClaimCount: BigNumber;
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

  async getClaimData(tokenId: BigNumberish | null, overrides: CallOverrides = {}): Promise<CollectionClaimData> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const claimData = await sft.connectReadOnly().getClaimData(tokenId, overrides);
            return claimData;
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const claimData = await nft.connectReadOnly().getClaimData(overrides);
            return claimData;
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
