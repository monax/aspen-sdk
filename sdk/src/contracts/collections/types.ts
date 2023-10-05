import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address, ChainId } from '@monaxlabs/phloem/dist/types';
import {
  Account,
  CallParameters,
  Chain,
  Hex,
  PublicClient,
  SimulateContractParameters,
  Transport,
  WalletClient,
} from 'viem';
import { Prettify, UnionOmit } from 'viem/_types/types/utils';
import { AllowlistStatus } from '../index';
import type { CollectionMetaImageType, CollectionMetaLinkType } from './constants';
import { SdkError } from './errors';
import { UserClaimConditions } from './features';

export type TokenId = BigIntish | null | undefined;

export type RequiredTokenId = number | bigint;

export type TokenStandard = 'ERC721' | 'ERC1155';

export type MetadataKind = 'collection';

export type BytesLike = string | Uint8Array;

export type BigIntish = string | number | bigint;

export type Signer = WalletClient<Transport, Chain, Account>;
export type Provider = PublicClient<Transport, Chain>;

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

// TODO - use spec for parsing
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
  quantity: bigint;
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
  availableQuantity: bigint;
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
  | { termsRequired: true; termsLink: string; termsAccepted: boolean }
  | { termsRequired: false; termsLink: string; termsAccepted: boolean }
  | { termsRequired: false; termsLink: null; termsAccepted: false }
) & {
  userAddress: Address;
};

export type ReadParameters = CallParameters;

export type WriteParameters = UnionOmit<PayableParameters, 'value'>;

export type PayableParameters = Prettify<
  UnionOmit<SimulateContractParameters, 'abi' | 'address' | 'args' | 'functionName'>
> & { value: bigint };

export type CollectionContractClaimCondition = {
  startTimestamp: number;
  maxClaimableSupply: bigint;
  supplyClaimed: bigint;
  quantityLimitPerTransaction: bigint;
  waitTimeInSecondsBetweenClaims: number;
  merkleRoot: string;
  pricePerToken: bigint;
  currency: Address;
  phaseId: string;
};

export type CollectionContractClaimConditionOnChain = {
  startTimestamp: bigint;
  maxClaimableSupply: bigint;
  supplyClaimed: bigint;
  quantityLimitPerTransaction: bigint;
  waitTimeInSecondsBetweenClaims: bigint;
  merkleRoot: Hex;
  pricePerToken: bigint;
  currency: Hex;
  phaseId: string;
};

export const claimConditionsFromChain = (
  condition: CollectionContractClaimConditionOnChain,
): CollectionContractClaimCondition => {
  return {
    startTimestamp: Number(condition.startTimestamp),
    maxClaimableSupply: condition.maxClaimableSupply,
    supplyClaimed: condition.supplyClaimed,
    quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
    waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
    merkleRoot: condition.merkleRoot,
    pricePerToken: condition.pricePerToken,
    currency: parse(Address, condition.currency),
    phaseId: condition.phaseId ?? null,
  };
};
export const claimConditionsForChain = (
  condition: CollectionContractClaimCondition,
): CollectionContractClaimConditionOnChain => {
  return {
    startTimestamp: BigInt(condition.startTimestamp),
    maxClaimableSupply: condition.maxClaimableSupply,
    supplyClaimed: condition.supplyClaimed,
    quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
    waitTimeInSecondsBetweenClaims: BigInt(condition.waitTimeInSecondsBetweenClaims),
    merkleRoot: condition.merkleRoot as Hex,
    pricePerToken: condition.pricePerToken,
    currency: condition.currency as Hex,
    phaseId: condition.phaseId ?? null,
  };
};
