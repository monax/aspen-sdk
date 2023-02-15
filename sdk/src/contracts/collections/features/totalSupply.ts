import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const TotalSupplyFunctions = {
  nft: 'totalSupply()[uint256]',
  sft: 'totalSupply(uint256)[uint256]',
} as const;

const TotalSupplyPartitions = {
  nft: [...FeatureFunctionsMap[TotalSupplyFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[TotalSupplyFunctions.sft].drop],
};
type TotalSupplyPartitions = typeof TotalSupplyPartitions;

const TotalSupplyInterfaces = Object.values(TotalSupplyPartitions).flat();
type TotalSupplyInterfaces = (typeof TotalSupplyInterfaces)[number];

export type TotalSupplyCallArgs = [tokenId?: BigNumberish | null, overrides?: CallOverrides];
export type TotalSupplyResponse = BigNumber;

export class TotalSupply extends ContractFunction<
  TotalSupplyInterfaces,
  TotalSupplyPartitions,
  TotalSupplyCallArgs,
  TotalSupplyResponse
> {
  readonly functionName = 'totalSupply';

  constructor(base: CollectionContract) {
    super(base, TotalSupplyInterfaces, TotalSupplyPartitions, TotalSupplyFunctions);
  }

  /** Get the token supply [ERC721: across the collection] [ERC1155: for specific token] */
  call(...args: TotalSupplyCallArgs): Promise<TotalSupplyResponse> {
    return this.totalSupply(...args);
  }

  async totalSupply(tokenId?: BigNumberish | null, overrides: CallOverrides = {}): Promise<BigNumber> {
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
      console.log(err);
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }

    this.notSupported();
  }
}
