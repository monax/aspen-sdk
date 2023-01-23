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
