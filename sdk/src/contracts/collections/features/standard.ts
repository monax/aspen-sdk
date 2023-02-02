import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Signerish, SourcedOverrides, TokenStandard } from '..';
import { parse } from '../../../utils';
import { Address, Addressish, asAddress } from '../../address';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { One, Zero } from '../number';
import { FeatureSet } from './features';

export const StandardFeatures = [
  // ERC1155
  'standard/IERC1155.sol:IERC1155SupplyV0',
  'standard/IERC1155.sol:IERC1155SupplyV1',
  'standard/IERC1155.sol:IERC1155SupplyV2',
  'standard/IERC1155.sol:IERC1155V0',
  'standard/IERC1155.sol:IERC1155V1',
  'issuance/ISFTSupply.sol:ISFTSupplyV0',
  'issuance/ISFTSupply.sol:ISFTSupplyV1',
  'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV0',
  'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV1',
  'issuance/ISFTLimitSupply.sol:ISFTLimitSupplyV0',
  // ERC721
  'standard/IERC721.sol:IERC721V0',
  'standard/IERC721.sol:IERC721V1',
  'issuance/INFTSupply.sol:INFTSupplyV0',
  'issuance/INFTSupply.sol:INFTSupplyV1',
  'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV0',
  'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV1',
  'issuance/INFTLimitSupply.sol:INFTLimitSupplyV0',
] as const;

export type StandardFeatures = (typeof StandardFeatures)[number];

export class Standard extends FeatureSet<StandardFeatures> {
  constructor(base: CollectionContract) {
    super(base, StandardFeatures);
  }

  getPartition = this.makeGetPartition((partitioner) => {
    const standard = partitioner({
      sft: [
        'standard/IERC1155.sol:IERC1155SupplyV0',
        'standard/IERC1155.sol:IERC1155SupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV2',
        'standard/IERC1155.sol:IERC1155V0',
        'standard/IERC1155.sol:IERC1155V1',
      ],
      sftSupply: [
        'issuance/ISFTSupply.sol:ISFTSupplyV0',
        'issuance/ISFTSupply.sol:ISFTSupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV0',
        'standard/IERC1155.sol:IERC1155SupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV2',
      ],
      sftR0: [
        'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV0',
        'issuance/ISFTLimitSupply.sol:IRestrictedSFTLimitSupplyV1',
        'issuance/ISFTLimitSupply.sol:ISFTLimitSupplyV0',
      ],
      nft: ['standard/IERC721.sol:IERC721V0', 'standard/IERC721.sol:IERC721V1'],
      nftSupply: ['issuance/INFTSupply.sol:INFTSupplyV0', 'issuance/INFTSupply.sol:INFTSupplyV1'],
      nftR0: [
        'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV0',
        'issuance/INFTLimitSupply.sol:IRestrictedNFTLimitSupplyV1',
        'issuance/INFTLimitSupply.sol:INFTLimitSupplyV0',
      ],
      smallestToken: ['issuance/INFTSupply.sol:INFTSupplyV1', 'issuance/ISFTSupply.sol:ISFTSupplyV1'],
      largestToken: [
        'issuance/ISFTSupply.sol:ISFTSupplyV0',
        'issuance/ISFTSupply.sol:ISFTSupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV2',
      ],
    });

    return { standard };
  });

  getStandard(): TokenStandard {
    const { sft, sftSupply, nft, nftSupply } = this.getPartition('standard');

    if (nft || nftSupply) return 'ERC721';
    if (sft || sftSupply) return 'ERC1155';

    throw new SdkError(SdkErrorCode.EMPTY_TOKEN_STANDARD);
  }

  async balanceOf(address: Addressish, tokenId: BigNumberish | null): Promise<BigNumber> {
    const { nft, sft } = this.getPartition('standard');

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId);
        const balance = await sft.connectReadOnly().balanceOf(asAddress(address), tokenId);
        return balance;
      } else if (nft) {
        const balance = await nft.connectReadOnly().balanceOf(asAddress(address));
        return balance;
      }
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, { address, tokenId }, err as Error);
      }
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard', function: 'ownerOf' });
  }

  async ownerOf(tokenId: BigNumberish): Promise<Address> {
    const { nft } = this.getPartition('standard');

    try {
      if (nft) {
        const owner = await nft.connectReadOnly().ownerOf(tokenId);
        return parse(Address, owner);
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { tokenId }, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard', function: 'ownerOf' });
  }

  async exists(tokenId: BigNumberish): Promise<boolean> {
    tokenId = this.base.requireTokenId(tokenId);
    const { sftSupply, nftSupply } = this.getPartition('standard');

    try {
      if (sftSupply) {
        const exists = await sftSupply.connectReadOnly().exists(tokenId);
        return exists;
      } else if (nftSupply) {
        const exists = await nftSupply.connectReadOnly().exists(tokenId);
        return exists;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { tokenId }, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard' });
  }

  /**
   * @returns Number of unique token ids (doesn't take into consideration burnt tokens)
   */
  async getTokensCount(): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getERC1155TokensCount();
      case 'ERC721':
        return this.getERC721TokensCount();
    }
  }

  protected async getERC1155TokensCount(): Promise<BigNumber> {
    const { largestToken, smallestToken } = this.getPartition('standard');

    try {
      if (largestToken) {
        let smallest = 0;
        if (smallestToken) {
          smallest = await smallestToken.connectReadOnly().getSmallestTokenId();
        }
        const iSft = largestToken.connectReadOnly();
        return (await iSft.getLargestTokenId()).add(1 - smallest);
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard' });
  }

  protected async getERC721TokensCount(): Promise<BigNumber> {
    const { nftSupply } = this.getPartition('standard');

    try {
      if (nftSupply) {
        const count = await nftSupply.connectReadOnly().totalSupply();
        return count;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard' });
  }

  async getSmallestTokenId(): Promise<number> {
    const { smallestToken } = this.getPartition('standard');

    try {
      if (smallestToken) {
        const smallest = await smallestToken.connectReadOnly().getSmallestTokenId();
        return smallest;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    return 0;
  }

  /**
   * @returns Number of tokens in supply (0 or 1 for ERC721 tokens)
   */
  async getTokenSupply(tokenId: BigNumberish): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getERC1155TokenSupply(tokenId);
      case 'ERC721':
        return this.getERC721TokenSupply(tokenId);
    }
  }

  protected async getERC1155TokenSupply(tokenId: BigNumberish): Promise<BigNumber> {
    const { sftSupply } = this.getPartition('standard');

    try {
      if (sftSupply) {
        const supply = await sftSupply.connectReadOnly().totalSupply(tokenId);
        return supply;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard' });
  }

  protected async getERC721TokenSupply(tokenId: BigNumberish): Promise<BigNumber> {
    const exists = await this.exists(tokenId);
    return exists ? One : Zero;
  }

  async setMaxTotalSupply(
    signer: Signerish,
    totalSupply: BigNumberish,
    tokenId: BigNumberish | null,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { sftR0, nftR0 } = this.getPartition('standard');

    try {
      if (sftR0) {
        tokenId = this.base.requireTokenId(tokenId);
        const tx = await sftR0.connectWith(signer).setMaxTotalSupply(tokenId, totalSupply, overrides);
        return tx;
      } else if (nftR0) {
        const tx = await nftR0.connectWith(signer).setMaxTotalSupply(totalSupply, overrides);
        return tx;
      }
    } catch (err) {
      const error = SdkError.is(err) ? err : new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      throw error;
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'standard' });
  }
}
