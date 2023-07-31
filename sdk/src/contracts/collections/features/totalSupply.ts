import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const TotalSupplyFunctions = {
  nft: 'totalSupply()[uint256]',
  sft: 'totalSupply(uint256)[uint256]',
} as const;

const TotalSupplyPartitions = {
  nftCatch: ['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3' as const],
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
  execute(...args: TotalSupplyCallArgs): Promise<TotalSupplyResponse> {
    return this.totalSupply(...args);
  }

  async totalSupply(tokenId?: BigNumberish | null, overrides: CallOverrides = {}): Promise<BigNumber> {
    const { nft: nftV1, nftCatch, sft } = this.partitions;
    const nft = nftCatch ? this.base.assumeFeature('issuance/INFTSupply.sol:IPublicNFTSupplyV0') : nftV1;

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

    this.notSupported();
  }
}

export const totalSupply = asCallableClass(TotalSupply);
