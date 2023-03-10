import { Provider } from '@ethersproject/abstract-provider';
import type { BigNumber, BigNumberish, Overrides, Signer } from 'ethers';
import { PromiseOrValue } from '../generated/common';
import { Address, AllowlistStatus, ChainId } from '../index';
import type { CollectionMetaImageType, CollectionMetaLinkType } from './constants';
import { SdkError } from './errors';
import { UserClaimConditions } from './features';

export type TokenId = BigNumberish | null | undefined;

export type Signerish = Signer | Provider;

export type TokenStandard = 'ERC721' | 'ERC1155';

export type WriteOverrides = Overrides & { from?: PromiseOrValue<string> };

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

// @todo - use spec for parsing
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

export type ClaimConditionsState = UserClaimConditions &
  UserClaimRestrictions & { allowlist: AllowlistStatus; phaseId: string | null };

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

export type UserClaimRestrictions = {
  availableQuantity: BigNumber;
  canClaimTokens: boolean;
  canMintAfter: Date;
  claimState: CollectionUserClaimState;
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

export type TermsState = (
  | { termsActivated: true; termsLink: string; termsAccepted: boolean }
  | { termsActivated: false; termsLink: null; termsAccepted: false }
) & {
  userAddress: Address;
};
