import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract, Signerish, SourcedOverrides } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const RoyaltiesFeatures = [
  'standard/IERC2981.sol:IERC2981V0',
  'royalties/IRoyalty.sol:IRoyaltyV0',
  'royalties/IRoyalty.sol:IPublicRoyaltyV0',
  'royalties/IRoyalty.sol:IRestrictedRoyaltyV0',
  'royalties/IRoyalty.sol:IRestrictedRoyaltyV1',
  'royalties/IRoyalty.sol:IRestrictedRoyaltyV2',
] as const;

export type RoyaltiesFeatures = (typeof RoyaltiesFeatures)[number];

export type DefaultRoyaltyInfo = {
  recipient: Address;
  basisPoints: number;
};

export type RoyaltyInfo = {
  receiver: string;
  royaltyAmount: BigNumber;
};

export class Royalties extends FeatureSet<RoyaltiesFeatures> {
  constructor(base: CollectionContract) {
    super(base, RoyaltiesFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const getInfo = partitioner({
      standard: ['standard/IERC2981.sol:IERC2981V0'],
      v0: ['royalties/IRoyalty.sol:IRoyaltyV0'],
      p0: ['royalties/IRoyalty.sol:IPublicRoyaltyV0'],
      r0: ['royalties/IRoyalty.sol:IRestrictedRoyaltyV0', 'royalties/IRoyalty.sol:IRestrictedRoyaltyV1'],
      r1: ['royalties/IRoyalty.sol:IRestrictedRoyaltyV2'],
    });

    return { getInfo };
  });

  async royaltyInfo(tokenId: BigNumber, salePrice: BigNumber): Promise<RoyaltyInfo> {
    const { standard, v0, p0 } = this.getPartition('getInfo');

    try {
      const factory = standard ?? v0 ?? p0;
      if (factory) {
        const { receiver, royaltyAmount } = await factory.connectReadOnly().royaltyInfo(tokenId, salePrice);
        return { receiver, royaltyAmount };
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'royalties', function: 'royaltyInfo' });
  }

  async getDefaultRoyaltyInfo(): Promise<DefaultRoyaltyInfo> {
    const { p0 } = this.getPartition('getInfo');

    try {
      if (p0) {
        const iRoyalty = p0.connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getDefaultRoyaltyInfo();
        return { recipient: parse(Address, recipient), basisPoints };
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'royalties', function: 'getDefaultRoyaltyInfo' });
  }

  async getRoyaltyInfoForToken(tokenId: BigNumber): Promise<DefaultRoyaltyInfo> {
    const { p0 } = this.getPartition('getInfo');

    try {
      if (p0) {
        const iRoyalty = p0.connectReadOnly();
        const [recipient, basisPoints] = await iRoyalty.getRoyaltyInfoForToken(tokenId);
        return { recipient: parse(Address, recipient), basisPoints };
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, {
      feature: 'royalties',
      function: 'getRoyaltyInfoForToken',
    });
  }

  /** ADMIN role required */
  async setDefaultRoyaltyInfo(
    signer: Signerish,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, r0, r1 } = this.getPartition('getInfo');

    try {
      const factory = v0 ?? r0 ?? r1;
      if (factory) {
        const tx = await factory.connectWith(signer).setDefaultRoyaltyInfo(royaltyRecipient, basisPoints, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'royalties', function: 'setDefaultRoyaltyInfo' });
  }

  /** ADMIN role required */
  async setRoyaltyInfoForToken(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, r0, r1 } = this.getPartition('getInfo');

    try {
      const factory = v0 ?? r0 ?? r1;
      if (factory) {
        const contract = factory.connectWith(signer);
        const tx = await contract.setRoyaltyInfoForToken(tokenId, royaltyRecipient, basisPoints, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, {
      feature: 'royalties',
      function: 'setRoyaltyInfoForToken',
    });
  }
}
