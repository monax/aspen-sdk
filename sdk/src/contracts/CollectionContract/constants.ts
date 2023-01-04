import {
  ICedarAgreementV0__factory,
  ICedarAgreementV1__factory,
  ICedarFeaturesV0__factory,
  ICedarLazyMintV0__factory,
  ICedarMetadataV1__factory,
  ICedarNFTIssuanceV0__factory,
  ICedarNFTIssuanceV1__factory,
  ICedarNFTIssuanceV2__factory,
  ICedarNFTIssuanceV3__factory,
  ICedarNFTIssuanceV4__factory,
  ICedarNFTMetadataV1__factory,
  ICedarPausableV0__factory,
  ICedarPremintV0__factory,
  ICedarSFTIssuanceV0__factory,
  ICedarSFTIssuanceV1__factory,
  ICedarSFTIssuanceV2__factory,
  ICedarSFTIssuanceV3__factory,
  ICedarSFTMetadataV1__factory,
  ICedarSplitPaymentV0__factory,
  ICedarUpdateBaseURIV0__factory,
  ICedarUpgradeBaseURIV0__factory,
  ICedarVersionedV0__factory,
  ICedarVersionedV1__factory,
  ICedarVersionedV2__factory,
  IERC1155SupplyV0__factory,
  IERC1155SupplyV1__factory,
  IERC1155V0__factory,
  IERC2981V0__factory,
  IERC721V0__factory,
  IMulticallableV0__factory,
  INFTSupplyV0__factory,
  IPrimarySaleV0__factory,
  IPrimarySaleV1__factory,
  IPublicAgreementV0__factory,
  IPublicAgreementV1__factory,
  IPublicMetadataV0__factory,
  IPublicNFTIssuanceV0__factory,
  IPublicNFTIssuanceV1__factory,
  IPublicOwnableV0__factory,
  IPublicPrimarySaleV1__factory,
  IPublicRoyaltyV0__factory,
  IPublicSFTIssuanceV0__factory,
  IPublicSFTIssuanceV1__factory,
  IPublicUpdateBaseURIV0__factory,
  IRoyaltyV0__factory,
  ISFTSupplyV0__factory,
} from '@monax/pando/dist/types';
import type { FeatureInterfaceFactoryMapper } from './types';

export const InterfaceNotLoadedError = new Error('Interface is not loaded');

export const CollectionMetaImageType = {
  banner: 'banner',
} as const;

export const CollectionMetaLinkType = {
  website: 'website',
  twitter: 'twitter',
  discord: 'discord',
  instagram: 'instagram',
  telegram: 'telegram',
  linkedin: 'linkedin',
};

// FIXME[Silas]: generate this and include in pkg/pando dist
export const FeatureInterfaceMap: FeatureInterfaceFactoryMapper = {
  // General
  'ICedarFeatures.sol:ICedarFeaturesV0': ICedarFeaturesV0__factory,
  'ICedarVersioned.sol:ICedarVersionedV0': ICedarVersionedV0__factory,
  'ICedarVersioned.sol:ICedarVersionedV1': ICedarVersionedV1__factory,
  'ICedarVersioned.sol:ICedarVersionedV2': ICedarVersionedV2__factory,
  'IMulticallable.sol:IMulticallableV0': IMulticallableV0__factory,

  // Agreements
  'agreement/ICedarAgreement.sol:ICedarAgreementV0': ICedarAgreementV0__factory,
  'agreement/ICedarAgreement.sol:ICedarAgreementV1': ICedarAgreementV1__factory,
  'agreement/ICedarAgreement.sol:IPublicAgreementV0': IPublicAgreementV0__factory,
  'agreement/ICedarAgreement.sol:IPublicAgreementV1': IPublicAgreementV1__factory,

  // Base URI
  'baseURI/ICedarUpdateBaseURI.sol:ICedarUpdateBaseURIV0': ICedarUpdateBaseURIV0__factory,
  'baseURI/ICedarUpgradeBaseURI.sol:ICedarUpgradeBaseURIV0': ICedarUpgradeBaseURIV0__factory,
  'baseURI/ICedarUpdateBaseURI.sol:IPublicUpdateBaseURIV0': IPublicUpdateBaseURIV0__factory,

  // Issuance
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV0': ICedarNFTIssuanceV0__factory,
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1': ICedarNFTIssuanceV1__factory,
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2': ICedarNFTIssuanceV2__factory,
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3': ICedarNFTIssuanceV3__factory,
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4': ICedarNFTIssuanceV4__factory,
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0': IPublicNFTIssuanceV0__factory,
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1': IPublicNFTIssuanceV1__factory,
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0': ICedarSFTIssuanceV0__factory,
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1': ICedarSFTIssuanceV1__factory,
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2': ICedarSFTIssuanceV2__factory,
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3': ICedarSFTIssuanceV3__factory,
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0': IPublicSFTIssuanceV0__factory,
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1': IPublicSFTIssuanceV1__factory,
  'issuance/ICedarPremint.sol:ICedarPremintV0': ICedarPremintV0__factory,
  'issuance/INFTSupply.sol:INFTSupplyV0': INFTSupplyV0__factory,
  'issuance/ISFTSupply.sol:ISFTSupplyV0': ISFTSupplyV0__factory,

  // Pausable
  'pausable/ICedarPausable.sol:ICedarPausableV0': ICedarPausableV0__factory,

  // Lazy Mint
  'lazymint/ICedarLazyMint.sol:ICedarLazyMintV0': ICedarLazyMintV0__factory,

  // Royalties
  'royalties/IRoyalty.sol:IRoyaltyV0': IRoyaltyV0__factory,
  'royalties/IRoyalty.sol:IPublicRoyaltyV0': IPublicRoyaltyV0__factory,
  'primarysale/IPrimarySale.sol:IPrimarySaleV0': IPrimarySaleV0__factory,
  'primarysale/IPrimarySale.sol:IPrimarySaleV1': IPrimarySaleV1__factory,
  'primarysale/IPrimarySale.sol:IPublicPrimarySaleV1': IPublicPrimarySaleV1__factory,

  // Metadata
  'metadata/IContractMetadata.sol:ICedarMetadataV1': ICedarMetadataV1__factory,
  'metadata/IContractMetadata.sol:IPublicMetadataV0': IPublicMetadataV0__factory,
  'metadata/ICedarNFTMetadata.sol:ICedarNFTMetadataV1': ICedarNFTMetadataV1__factory,
  'metadata/ICedarSFTMetadata.sol:ICedarSFTMetadataV1': ICedarSFTMetadataV1__factory,

  // Split Payment
  'splitpayment/ICedarSplitPayment.sol:ICedarSplitPaymentV0': ICedarSplitPaymentV0__factory,

  // Standards
  'standard/IERC2981.sol:IERC2981V0': IERC2981V0__factory,
  // [2022-11-03] The following are superseded by INFTSupply and ISFTSupply
  'standard/IERC721.sol:IERC721V0': IERC721V0__factory,
  'standard/IERC1155.sol:IERC1155V0': IERC1155V0__factory,
  'standard/IERC1155.sol:IERC1155SupplyV0': IERC1155SupplyV0__factory,
  'standard/IERC1155.sol:IERC1155SupplyV1': IERC1155SupplyV1__factory,

  //Ownable
  'ownable/IOwnable.sol:IPublicOwnableV0': IPublicOwnableV0__factory,
};
