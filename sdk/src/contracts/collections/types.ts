import type { Provider } from '@ethersproject/providers';
import type {
  ICedarAgreementV0,
  ICedarAgreementV1,
  ICedarFeaturesV0,
  ICedarLazyMintV0,
  ICedarMetadataV1,
  ICedarNFTIssuanceV0,
  ICedarNFTIssuanceV1,
  ICedarNFTIssuanceV2,
  ICedarNFTIssuanceV3,
  ICedarNFTIssuanceV4,
  ICedarNFTMetadataV1,
  ICedarPausableV0,
  ICedarPremintV0,
  ICedarSFTIssuanceV0,
  ICedarSFTIssuanceV1,
  ICedarSFTIssuanceV2,
  ICedarSFTIssuanceV3,
  ICedarSFTMetadataV1,
  ICedarSplitPaymentV0,
  ICedarUpdateBaseURIV0,
  ICedarUpgradeBaseURIV0,
  ICedarVersionedV0,
  ICedarVersionedV1,
  ICedarVersionedV2,
  IERC1155SupplyV0,
  IERC1155SupplyV1,
  IERC1155V0,
  IERC2981V0,
  IERC721V0,
  IMulticallableV0,
  INFTSupplyV0,
  IPrimarySaleV0,
  IPrimarySaleV1,
  IPublicAgreementV0,
  // IPublicAgreementV1,
  IPublicMetadataV0,
  IPublicNFTIssuanceV0,
  // IPublicNFTIssuanceV1,
  // IPublicOwnableV0,
  IPublicPrimarySaleV1,
  IPublicRoyaltyV0,
  IPublicSFTIssuanceV0,
  // IPublicSFTIssuanceV1,
  IPublicUpdateBaseURIV0,
  IRoyaltyV0,
  ISFTSupplyV0,
} from '../generated';
import type { BigNumber, Signer } from 'ethers';
import type { CollectionMetaImageType, CollectionMetaLinkType } from './constants';
import {FeatureInterface} from "./features";
import {ChainId} from "../network";
import {Address} from "../address";
import {Signerish} from "../providers";

export type FeatureInterfacesMap = {
  ICedarFeaturesV0?: FeatureInterface<ICedarFeaturesV0>;
  ICedarVersionedV0?: FeatureInterface<ICedarVersionedV0>;
  ICedarVersionedV1?: FeatureInterface<ICedarVersionedV1>;
  ICedarVersionedV2?: FeatureInterface<ICedarVersionedV2>;
  IMulticallableV0?: FeatureInterface<IMulticallableV0>;
  ICedarAgreementV0?: FeatureInterface<ICedarAgreementV0>;
  ICedarAgreementV1?: FeatureInterface<ICedarAgreementV1>;
  IPublicAgreementV0?: FeatureInterface<IPublicAgreementV0>;
  // IPublicAgreementV1?: FeatureInterface<IPublicAgreementV1>;
  ICedarUpdateBaseURIV0?: FeatureInterface<ICedarUpdateBaseURIV0>;
  ICedarUpgradeBaseURIV0?: FeatureInterface<ICedarUpgradeBaseURIV0>;
  IPublicUpdateBaseURIV0?: FeatureInterface<IPublicUpdateBaseURIV0>;
  ICedarNFTIssuanceV0?: FeatureInterface<ICedarNFTIssuanceV0>;
  ICedarNFTIssuanceV1?: FeatureInterface<ICedarNFTIssuanceV1>;
  ICedarNFTIssuanceV2?: FeatureInterface<ICedarNFTIssuanceV2>;
  ICedarNFTIssuanceV3?: FeatureInterface<ICedarNFTIssuanceV3>;
  ICedarNFTIssuanceV4?: FeatureInterface<ICedarNFTIssuanceV4>;
  IPublicNFTIssuanceV0?: FeatureInterface<IPublicNFTIssuanceV0>;
  // IPublicNFTIssuanceV1?: FeatureInterface<IPublicNFTIssuanceV1>;
  ICedarSFTIssuanceV0?: FeatureInterface<ICedarSFTIssuanceV0>;
  ICedarSFTIssuanceV1?: FeatureInterface<ICedarSFTIssuanceV1>;
  ICedarSFTIssuanceV2?: FeatureInterface<ICedarSFTIssuanceV2>;
  ICedarSFTIssuanceV3?: FeatureInterface<ICedarSFTIssuanceV3>;
  IPublicSFTIssuanceV0?: FeatureInterface<IPublicSFTIssuanceV0>;
  // IPublicSFTIssuanceV1?: FeatureInterface<IPublicSFTIssuanceV1>;
  ICedarPausableV0?: FeatureInterface<ICedarPausableV0>;
  ICedarPremintV0?: FeatureInterface<ICedarPremintV0>;
  ICedarLazyMintV0?: FeatureInterface<ICedarLazyMintV0>;
  ICedarNFTMetadataV1?: FeatureInterface<ICedarNFTMetadataV1>;
  ICedarSFTMetadataV1?: FeatureInterface<ICedarSFTMetadataV1>;
  ICedarMetadataV1?: FeatureInterface<ICedarMetadataV1>;
  IPublicMetadataV0?: FeatureInterface<IPublicMetadataV0>;
  IRoyaltyV0?: FeatureInterface<IRoyaltyV0>;
  IPublicRoyaltyV0?: FeatureInterface<IPublicRoyaltyV0>;
  IPrimarySaleV0?: FeatureInterface<IPrimarySaleV0>;
  IPrimarySaleV1?: FeatureInterface<IPrimarySaleV1>;
  IPublicPrimarySaleV1?: FeatureInterface<IPublicPrimarySaleV1>;
  ICedarSplitPaymentV0?: FeatureInterface<ICedarSplitPaymentV0>;
  IERC721V0?: FeatureInterface<IERC721V0>;
  INFTSupplyV0?: FeatureInterface<INFTSupplyV0>;
  IERC1155V0?: FeatureInterface<IERC1155V0>;
  IERC1155SupplyV0?: FeatureInterface<IERC1155SupplyV0>;
  IERC1155SupplyV1?: FeatureInterface<IERC1155SupplyV1>;
  ISFTSupplyV0?: FeatureInterface<ISFTSupplyV0>;
  IERC2981V0?: FeatureInterface<IERC2981V0>;
  // IPublicOwnableV0?: FeatureInterface<IPublicOwnableV0>;
};

export type SupportedInterfaces =
  | ICedarFeaturesV0
  | ICedarVersionedV0
  | ICedarVersionedV1
  | ICedarVersionedV2
  | IMulticallableV0
  | ICedarAgreementV0
  | ICedarAgreementV1
  | IPublicAgreementV0
  // | IPublicAgreementV1
  | ICedarUpdateBaseURIV0
  | ICedarUpgradeBaseURIV0
  | IPublicUpdateBaseURIV0
  | ICedarNFTIssuanceV0
  | ICedarNFTIssuanceV1
  | ICedarNFTIssuanceV2
  | ICedarNFTIssuanceV3
  | ICedarNFTIssuanceV4
  | IPublicNFTIssuanceV0
  // | IPublicNFTIssuanceV1
  | ICedarSFTIssuanceV0
  | ICedarSFTIssuanceV1
  | ICedarSFTIssuanceV2
  | ICedarSFTIssuanceV3
  | IPublicSFTIssuanceV0
  // | IPublicSFTIssuanceV1
  | ICedarPausableV0
  | ICedarPremintV0
  | ICedarLazyMintV0
  | ICedarNFTMetadataV1
  | ICedarSFTMetadataV1
  | ICedarMetadataV1
  | IPublicMetadataV0
  | IRoyaltyV0
  | IPublicRoyaltyV0
  | IPrimarySaleV0
  | IPrimarySaleV1
  | IPublicPrimarySaleV1
  | ICedarSplitPaymentV0
  | IERC721V0
  | INFTSupplyV0
  | IERC1155V0
  | IERC1155SupplyV0
  | IERC1155SupplyV1
  | ISFTSupplyV0
  | IERC2981V0
  // | IPublicOwnableV0;

export interface FeatureInterfaceFactory<T> {
  connect(address: string, signerOrProvider: Signer | Provider): T;
}

export type FeatureInterfaceFactoryMapper = {
  [key: string]: FeatureInterfaceFactory<SupportedInterfaces>;
};

export type TokenStandard = 'ERC721' | 'ERC1155' | 'ERC20';

export type MetadataKind = 'collection';

export type CollectionMetadataPhase = {
  name?: string;
  start_date?: string;
  token_id?: string | number | null;
  banner_button_text?: string | null;
  header_text?: string | null;
};

export type CollectionCreator = {
  creator_name: string;
  creator_email: string;
};

export type CollectionMetadata = {
  schema?: string | null;
  kind?: MetadataKind;
  name: string;
  description?: string;
  alternative_text?: string;
  image?: string;
  categories?: number[];
  creators?: CollectionCreator[];
  external_link?: string;
  explicit_content?: false;
  images?: { [key in keyof typeof CollectionMetaImageType]?: string };
  links?: { [key in keyof typeof CollectionMetaLinkType]?: string };
  aspen?: {
    mint: {
      phases: CollectionMetadataPhase[];
    };
  };
  // the following are only returned via the API
  terms?: {
    url?: string | null;
    required?: boolean | null;
  };
  advert?: {
    name?: string;
    content?: string;
    cta?: string;
    imageUrl?: string;
    redirectUrl?: string;
  };
  advertVideo?: {
    name?: string;
    content?: string;
    cta?: string;
    videoUrl?: string;
    redirectUrl?: string;
  };
};

// NOTE: NftMetadataAttribute looks very loose on requirements
export type TokenMetadataAttribute = {
  trait_type: string;
  value?: unknown;
};

// NOTE the code in Cedar API slightly differs from what's defined in oas/NftMetadata
export type TokenMetadata = {
  name: string;
  description?: string;
  external_url?: string;
  image?: string;
  image_ipfs?: string;
  animation_url?: string;
  animation_url_ipfs?: string;
  attributes: TokenMetadataAttribute[];
  // TODO: media?
};

export type TokenAsset = {
  chainId: ChainId;
  contractAddress: string;
  tokenId: string;
  standard: TokenStandard;
  quantity: BigNumber;
};

export type TokenAssetMetadata = {
  asset: TokenAsset;
  uri: string | null;
  metadata: TokenMetadata | null;
};

export type CollectionContractClaimCondition = {
  startTimestamp: number;
  maxClaimableSupply: BigNumber;
  supplyClaimed: BigNumber;
  quantityLimitPerTransaction: BigNumber;
  waitTimeInSecondsBetweenClaims: number;
  merkleRoot: string;
  pricePerToken: BigNumber;
  currency: Address;
  isClaimingPaused: boolean;
};

export type ActiveClaimConditions = {
  maxWalletClaimCount: BigNumber;
  tokenSupply: BigNumber;
  maxTotalSupply: BigNumber;
  maxAvailableSupply: BigNumber;
  activeClaimConditionId: number;
  activeClaimCondition: CollectionContractClaimCondition;
};

export type UserClaimConditions = {
  activeClaimConditionId: number;
  walletClaimCount: BigNumber;
  walletClaimedCountInPhase: BigNumber | null;
  lastClaimTimestamp: number;
  nextClaimTimestamp: number;
};

export type CollectionUserClaimState =
  | 'ok'
  | 'unknown'
  | 'paused'
  | 'not-allowlisted'
  | 'no-token-supply'
  | 'minting-throttled'
  | 'claimed-allowlist-allowance'
  | 'claimed-phase-allowance'
  | 'claimed-wallet-allowance';

export type CollectionUserClaimConditions = {
  availableQuantity: number;
  canClaimTokens: boolean;
  canMintAfter: Date;
  claimState: CollectionUserClaimState;
};

export type TermsUserAcceptanceState = {
  termsActivated: boolean;
  termsAccepted: boolean;
  termsLink: string;
  termsVersion: number;
};

export type CollectionInfo = {
  chainId: ChainId | null;
  address: Address;
  tokenStandard: TokenStandard | null;
};

export type CollectionCallData = {
  method: string;
  args?: { [key: string]: unknown };
  signer: Signerish;
  supportedFeatures: string[];
};

export type DebugHandler = (collection: CollectionInfo, message: string, ...optionalParams: unknown[]) => void;

export type ErrorHandler = (
  message: string,
  error: Error,
  collection: CollectionInfo,
  callData: CollectionCallData,
) => void;
