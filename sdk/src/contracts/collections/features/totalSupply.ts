import { BigNumber, BigNumberish } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const TotalSupplyPartitions = {
  nft: [...FeatureFunctionsMap['totalSupply()[uint256]'].drop],
  sft: [...FeatureFunctionsMap['totalSupply(uint256)[uint256]'].drop],
};
type TotalSupplyPartitions = typeof TotalSupplyPartitions;

const TotalSupplyInterfaces = Object.values(TotalSupplyPartitions).flat();
type TotalSupplyInterfaces = (typeof TotalSupplyInterfaces)[number];

export type TotalSupplyCallArgs = [tokenId?: BigNumberish | null, overrides?: SourcedOverrides];
export type TotalSupplyResponse = BigNumber;

export class TotalSupply extends ContractFunction<
  TotalSupplyInterfaces,
  TotalSupplyPartitions,
  TotalSupplyCallArgs,
  TotalSupplyResponse
> {
  readonly functionName = 'totalSupply';

  constructor(base: CollectionContract) {
    super(base, TotalSupplyInterfaces, TotalSupplyPartitions);
  }

  /** Get the token supply [ERC721: across the collection] [ERC1155: for specific token] */
  call(...args: TotalSupplyCallArgs): Promise<TotalSupplyResponse> {
    return this.totalSupply(...args);
  }

  async totalSupply(tokenId?: BigNumberish | null, overrides?: SourcedOverrides): Promise<BigNumber> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const balance = await sft.connectReadOnly().totalSupply(tokenId, overrides);
        return balance;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const balance = await nft.connectReadOnly().totalSupply(overrides);
        return balance;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
