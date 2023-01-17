import { FeatureInterfaceId } from './features';

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

export const AspenContractInterfaces: FeatureInterfaceId[] = [
  'ICedarFeatures.sol:ICedarFeaturesV0',
  'IAspenFeatures.sol:ICedarFeaturesV0',
  'IAspenFeatures.sol:IAspenFeaturesV0',
];

export const ERC721StandardInterfaces: FeatureInterfaceId[] = [
  'standard/IERC721.sol:IERC721V0',
  'issuance/INFTSupply.sol:INFTSupplyV0',
];

export const ERC1155StandardInterfaces: FeatureInterfaceId[] = [
  'standard/IERC1155.sol:IERC1155V0',
  'standard/IERC1155.sol:IERC1155SupplyV0',
  'standard/IERC1155.sol:IERC1155SupplyV1',
  'issuance/ISFTSupply.sol:ISFTSupplyV0',
];
