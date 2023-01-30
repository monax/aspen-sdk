import { Provider } from '@ethersproject/abstract-provider';
import type { BigNumber, BigNumberish, Signer } from 'ethers';
import { AllowlistStatus } from '../../apis/publishing/index';
import { Address, ChainId } from '../index';
import type { CollectionMetaImageType, CollectionMetaLinkType } from './constants';
import { SdkError } from './errors';

export type TokenId = BigNumberish | null | undefined;

export type Signerish = Signer | Provider;

export type TokenStandard = 'ERC721' | 'ERC1155';

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

// Combines all conditions
export type ClaimConditionsState = UserClaimConditions &
  Omit<ActiveClaimConditions, 'activeClaimCondition'> &
  CollectionContractClaimCondition & { allowlistStatus: AllowlistStatus };

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
  availableQuantity: BigNumber;
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

export type DebugHandler = (collection: CollectionInfo, message: string, ...optionalParams: unknown[]) => void;

export type OperationStatus<T> =
  | {
      success: true;
      result: T;
      error: null;
    }
  | {
      success: false;
      result: null;
      error: SdkError;
    };
