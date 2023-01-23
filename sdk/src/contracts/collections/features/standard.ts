import { BigNumber, BigNumberish } from 'ethers';
import { TokenStandard } from '..';
import { Addressish, asAddress } from '../../address';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { Features } from '../features';

export const StandardFeatures = [
  // ERC1155
  'standard/IERC1155.sol:IERC1155SupplyV0',
  'standard/IERC1155.sol:IERC1155SupplyV1',
  'standard/IERC1155.sol:IERC1155SupplyV2',
  'standard/IERC1155.sol:IERC1155V0',
  'standard/IERC1155.sol:IERC1155V1',
  'issuance/ISFTSupply.sol:ISFTSupplyV0',
  'issuance/ISFTSupply.sol:ISFTSupplyV1',
  // ERC721
  'standard/IERC721.sol:IERC721V0',
  'standard/IERC721.sol:IERC721V1',
  'issuance/INFTSupply.sol:INFTSupplyV0',
  'issuance/INFTSupply.sol:INFTSupplyV1',
] as const;

export type StandardFeatures = (typeof StandardFeatures)[number];

export class Standard extends Features<StandardFeatures> {
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
      sftSupply: ['issuance/ISFTSupply.sol:ISFTSupplyV0', 'issuance/ISFTSupply.sol:ISFTSupplyV1'],
      nft: ['standard/IERC721.sol:IERC721V0', 'standard/IERC721.sol:IERC721V1'],
      nftSupply: ['issuance/INFTSupply.sol:INFTSupplyV0', 'issuance/INFTSupply.sol:INFTSupplyV1'],
    });

    return { standard };
  });

  getStandard(): TokenStandard | null {
    const { sft, sftSupply, nft, nftSupply } = this.getPartition('standard');

    if (nft || nftSupply) return 'ERC721';
    if (sft || sftSupply) return 'ERC1155';

    return null;
  }

  // Silas, do we want to keep this function?
  // supportsPartition(partition: keyof typeof this.getPartition): boolean {
  //   return Object.values(this.getPartition(partition)).some((f) => Boolean(f));
  // }

  async balanceOf(address: Addressish, tokenId: BigNumberish): Promise<BigNumber> {
    const { sft, sftSupply } = this.getPartition('standard');
    tokenId = this.base.requireTokenId(tokenId);

    // Use supply as a marker interface then assume standard 1155
    const factory = sft ? sft : sftSupply ? this.base.assumeFeature('standard/IERC1155.sol:IERC1155V0') : null;

    if (!factory) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
      // throw new Error(`Contract does not appear to be an ERC1155`);
    }

    return factory.connectReadOnly().balanceOf(asAddress(address), tokenId);
  }

  async exists(tokenId: BigNumberish | null) {
    tokenId = this.base.requireTokenId(tokenId);

    const { sftSupply, nftSupply } = this.getPartition('standard');
    if (this.base.tokenStandard === 'ERC1155' && sftSupply) {
      const iSft = sftSupply.connectReadOnly();
      return iSft.exists(tokenId);
    }
    if (this.base.tokenStandard === 'ERC721' && nftSupply) {
      const iNft = nftSupply.connectReadOnly();
      return iNft.exists(tokenId);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
  }

  /**
   * @returns Number of unique token ids (doesn't take into consideration burnt tokens)
   */
  async getUniqueCount(): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getUniqueERC1155Count();
      case 'ERC721':
        return this.getUniqueERC721Count();
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
  }

  protected async getUniqueERC1155Count(): Promise<BigNumber> {
    const { sftSupply } = this.getPartition('standard');
    if (!sftSupply) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
    }

    try {
      const iSft = sftSupply.connectReadOnly();
      // @todo don't add 1 when getSmallestTokenId != 0
      return (await iSft.getLargestTokenId()).add(1);
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', {}, err as Error);
    }
  }

  // @todo test against WoT
  protected async getUniqueERC721Count(): Promise<BigNumber> {
    const { nftSupply } = this.getPartition('standard');
    if (!nftSupply) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
    }

    try {
      const iNft = nftSupply.connectReadOnly();
      return await iNft.totalSupply();
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', {}, err as Error);
    }
  }

  /**
   * @returns Number of tokens in supply (ERC1155) (doesn't take into consideration burnt tokens)
   */
  async getTokenSupply(tokenId: BigNumberish | null = null): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getERC1155TokenSupply(this.base.requireTokenId(tokenId));
      case 'ERC721':
        return BigNumber.from(0);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
  }

  protected async getERC1155TokenSupply(tokenId: BigNumberish): Promise<BigNumber> {
    const { sftSupply } = this.getPartition('standard');
    if (!sftSupply) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, 'feature', { feature: 'standard' });
    }

    try {
      const iSft = sftSupply.connectReadOnly();
      return await iSft.totalSupply(tokenId);
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, 'chain', {}, err as Error);
    }
  }
}
