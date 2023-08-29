import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract, ReadParameters, TokenId } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction, asCallableClass } from './features';

const BalanceOfFunctions = {
  nft: 'balanceOf(address)[uint256]',
  sft: 'balanceOf(address,uint256)[uint256]',
} as const;

const BalanceOfPartitions = {
  nft: [...FeatureFunctionsMap[BalanceOfFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BalanceOfFunctions.sft].drop],
  // 'balanceOf' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type BalanceOfPartitions = typeof BalanceOfPartitions;

const BalanceOfInterfaces = Object.values(BalanceOfPartitions).flat();
type BalanceOfInterfaces = (typeof BalanceOfInterfaces)[number];

export type BalanceOfCallArgs = [address: Addressish, tokenId: TokenId, params?: ReadParameters];
export type BalanceOfResponse = bigint;

export class BalanceOf extends ContractFunction<
  BalanceOfInterfaces,
  BalanceOfPartitions,
  BalanceOfCallArgs,
  BalanceOfResponse
> {
  readonly functionName = 'balanceOf';

  constructor(base: CollectionContract) {
    super(base, BalanceOfInterfaces, BalanceOfPartitions, BalanceOfFunctions);
  }

  /** Get the token supply owned by a wallet [ERC721: across the collection] [ERC1155: for specific token] */
  execute(...args: BalanceOfCallArgs): Promise<BalanceOfResponse> {
    return this.balanceOf(...args);
  }

  async balanceOf(address: Addressish, tokenId: TokenId = null, params?: ReadParameters): Promise<BalanceOfResponse> {
    const wallet = await asAddress(address);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155V2');
          const balance = await this.reader(this.abi(sft)).read.balanceOf([wallet as Hex, tokenId], params);
          return balance;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const balance = await this.reader(this.abi(nft)).read.balanceOf([wallet as Hex], params);
          return balance;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { address, tokenId });
    }
  }
}

export const balanceOf = asCallableClass(BalanceOf);
