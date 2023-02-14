import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction } from './features';

const BurnFunctions = {
  nft: 'burn(uint256)[]',
  sft: 'burn(address,uint256,uint256)[]',
} as const;

const BurnPartitions = {
  nft: [...FeatureFunctionsMap[BurnFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BurnFunctions.sft].drop],
  // 'burn' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type BurnPartitions = typeof BurnPartitions;

const BurnInterfaces = Object.values(BurnPartitions).flat();
type BurnInterfaces = (typeof BurnInterfaces)[number];

export type BurnCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  wallet?: Addressish,
  amount?: BigNumberish,
  overrides?: SourcedOverrides,
];
export type BurnResponse = ContractTransaction;

export class Burn extends ContractFunction<BurnInterfaces, BurnPartitions, BurnCallArgs, BurnResponse> {
  readonly functionName = 'burn';

  constructor(base: CollectionContract) {
    super(base, BurnInterfaces, BurnPartitions, BurnFunctions);
  }

  call(...args: BurnCallArgs): Promise<BurnResponse> {
    return this.burn(...args);
  }

  async burn(
    signer: Signerish,
    tokenId: BigNumberish,
    wallet?: Addressish,
    amount?: BigNumberish,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const account = await asAddress(wallet || '');
          const tx = sft.connectWith(signer).burn(account, tokenId, amount || 0);
          return tx;
        }

        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const tx = nft.connectWith(signer).burn(tokenId, overrides);
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    tokenId: BigNumberish,
    wallet?: Addressish,
    amount?: BigNumberish,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const account = await asAddress(wallet || '');
          const estimate = sft.connectWith(signer).estimateGas.burn(account, tokenId, amount || 0);
          return estimate;
        }

        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const estimate = nft.connectWith(signer).estimateGas.burn(tokenId, overrides);
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
