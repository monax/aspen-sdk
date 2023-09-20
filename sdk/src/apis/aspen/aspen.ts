// Warning: generated code - changes will be lost on regeneration

import {
  Address,
  BigIntToString,
  BooleanToString,
  ChainIdToString,
  DateFromISODateString,
  DiscordId,
  Duration,
  Hex,
  IntegerToString,
  NumberToString,
  StringInteger,
  TokenStringIdentifier,
  TransactionHash,
  U256ToString,
  UInt256ToString,
  UUIDFromString,
} from '@monaxlabs/phloem/dist/types';
import 'ethers';
import * as t from 'io-ts';

export type ChainType = 'mainnet' | 'testnet' | 'local';

export const ChainType = t.union([t.literal('mainnet'), t.literal('testnet'), t.literal('local')]);

export type Marketplace = 'opensea' | 'blur';

export const Marketplace = t.union([t.literal('opensea'), t.literal('blur')]);

export type Blockchain = 'ETHEREUM' | 'POLYGON' | 'PALM' | 'CANTO';

export const Blockchain = t.union([t.literal('ETHEREUM'), t.literal('POLYGON'), t.literal('PALM'), t.literal('CANTO')]);

export type ImageMimeType =
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/svg+xml'
  | 'image/avif'
  | 'image/webp';

export const ImageMimeType = t.union([
  t.literal('image/jpeg'),
  t.literal('image/jpeg'),
  t.literal('image/png'),
  t.literal('image/gif'),
  t.literal('image/svg+xml'),
  t.literal('image/avif'),
  t.literal('image/webp'),
]);

export type AudioMimeType = 'audio/mpeg' | 'audio/wav' | 'audio/ogg';

export const AudioMimeType = t.union([t.literal('audio/mpeg'), t.literal('audio/wav'), t.literal('audio/ogg')]);

export type VideoMimeType = 'video/mp4' | 'video/webm' | 'video/ogg';

export const VideoMimeType = t.union([t.literal('video/mp4'), t.literal('video/webm'), t.literal('video/ogg')]);

export type TextMimeType =
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/json'
  | 'application/pdf'
  | 'text/markdown'
  | 'text/plain'
  | 'text/html';

export const TextMimeType = t.union([
  t.literal('application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
  t.literal('application/json'),
  t.literal('application/pdf'),
  t.literal('text/markdown'),
  t.literal('text/plain'),
  t.literal('text/html'),
]);

export type DocumentMimeType =
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/json'
  | 'application/pdf'
  | 'text/markdown'
  | 'text/plain'
  | 'text/html'
  | 'image/jpeg'
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/svg+xml'
  | 'image/avif'
  | 'image/webp';

export const DocumentMimeType = t.union([
  t.literal('application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
  t.literal('application/json'),
  t.literal('application/pdf'),
  t.literal('text/markdown'),
  t.literal('text/plain'),
  t.literal('text/html'),
  t.literal('image/jpeg'),
  t.literal('image/jpeg'),
  t.literal('image/png'),
  t.literal('image/gif'),
  t.literal('image/svg+xml'),
  t.literal('image/avif'),
  t.literal('image/webp'),
]);

export interface CurrencyAmount {
  amount: t.TypeOf<typeof BigIntToString>;
  currency: t.TypeOf<typeof Address>;
}

export const CurrencyAmount = t.exact(
  t.type({
    amount: BigIntToString,
    currency: Address,
  }),
);

export interface ErrorResponse {
  message: string;
}

export const ErrorResponse = t.exact(
  t.type({
    message: t.string,
  }),
);

export interface MultipartFileData {
  filePath: string;
  fileName: string;
  extension: string;
  encoding: string;
  mimeType: string;
  fileSize: number;
}

export const MultipartFileData = t.exact(
  t.type({
    filePath: t.string,
    fileName: t.string,
    extension: t.string,
    encoding: t.string,
    mimeType: t.string,
    fileSize: t.number,
  }),
);

export interface EthereumTransactionTemplate {
  chainId: t.TypeOf<typeof ChainIdToString>;
  data: t.TypeOf<typeof Hex>;
  to: t.TypeOf<typeof Address>;
  value: t.TypeOf<typeof Hex>;
}

export const EthereumTransactionTemplate = t.exact(
  t.type({
    chainId: ChainIdToString,
    data: Hex,
    to: Address,
    value: Hex,
  }),
);

/** IPFS hash for the file */
export type IpfsHash = string;

/** IPFS hash for the file */
export const IpfsHash = t.string;

export interface UploadIpfsFileResponse {
  hash: t.TypeOf<typeof IpfsHash>;
}

export const UploadIpfsFileResponse = t.exact(
  t.type({
    hash: IpfsHash,
  }),
);

export interface NftCollection {
  id: string;
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  name: string;
  description: string;
  imageUrl: string;
  bannerUrl: string | null;
  totalSupply: number;
  deployedByAddress: t.TypeOf<typeof Address>;
  deployedViaContract: boolean;
  type?: string | null;
}

export const NftCollection = t.exact(
  t.intersection([
    t.type({
      id: t.string,
      chainId: ChainIdToString,
      contractAddress: Address,
      name: t.string,
      description: t.string,
      imageUrl: t.string,
      bannerUrl: t.union([t.string, t.null]),
      totalSupply: t.number,
      deployedByAddress: Address,
      deployedViaContract: t.boolean,
    }),
    t.partial({
      type: t.union([t.string, t.null]),
    }),
  ]),
);

export interface NftCollectionStorefront {
  nftCollection: t.TypeOf<typeof NftCollection>;
  storefrontId?: t.TypeOf<typeof UUIDFromString> | null;
}

export const NftCollectionStorefront = t.exact(
  t.intersection([
    t.type({
      nftCollection: NftCollection,
    }),
    t.partial({
      storefrontId: t.union([UUIDFromString, t.null]),
    }),
  ]),
);

export type NftCollectionStorefronts = Array<t.TypeOf<typeof NftCollectionStorefront>>;

export const NftCollectionStorefronts = t.array(NftCollectionStorefront);

export interface OwnedNftCollection {
  id: string;
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  name: string;
  imageUrl: string;
  totalSupply: number;
  ownedAssetCount: number | null;
  type?: string | null;
}

export const OwnedNftCollection = t.exact(
  t.intersection([
    t.type({
      id: t.string,
      chainId: ChainIdToString,
      contractAddress: Address,
      name: t.string,
      imageUrl: t.string,
      totalSupply: t.number,
      ownedAssetCount: t.union([t.number, t.null]),
    }),
    t.partial({
      type: t.union([t.string, t.null]),
    }),
  ]),
);

export interface OwnedNftCollectionStorefront {
  nftCollection: t.TypeOf<typeof OwnedNftCollection>;
  storefrontId?: t.TypeOf<typeof UUIDFromString> | null;
  storefrontSlug?: string | null;
}

export const OwnedNftCollectionStorefront = t.exact(
  t.intersection([
    t.type({
      nftCollection: OwnedNftCollection,
    }),
    t.partial({
      storefrontId: t.union([UUIDFromString, t.null]),
      storefrontSlug: t.union([t.string, t.null]),
    }),
  ]),
);

export type OwnedNftCollectionStorefronts = Array<t.TypeOf<typeof OwnedNftCollectionStorefront>>;

export const OwnedNftCollectionStorefronts = t.array(OwnedNftCollectionStorefront);

export type ContractVerificationType = 'aspen-minted' | 'aspen-partner' | 'os-verified';

export const ContractVerificationType = t.union([
  t.literal('aspen-minted'),
  t.literal('aspen-partner'),
  t.literal('os-verified'),
]);

export type NftMetadataAttributeValue = (string | null) | (number | null) | (boolean | null);

export const NftMetadataAttributeValue = t.union([
  t.union([t.string, t.null]),
  t.union([t.number, t.null]),
  t.union([t.boolean, t.null]),
]);

export type NftMetadataAttribute = {
  trait_type: string | null;
  value: t.TypeOf<typeof NftMetadataAttributeValue>;
} & Record<string, t.TypeOf<typeof NftMetadataAttributeValue>>;

export const NftMetadataAttribute = t.intersection([
  t.exact(
    t.type({
      trait_type: t.union([t.string, t.null]),
      value: NftMetadataAttributeValue,
    }),
  ),
  t.record(t.string, NftMetadataAttributeValue),
]);

export interface NftMetadata {
  name: string;
  description?: string | null;
  image: string;
  imagePreview?: string;
  blurhash?: string | null;
  audio?: string | null;
  video?: string | null;
  attributes?: Array<t.TypeOf<typeof NftMetadataAttribute>> | null;
}

export const NftMetadata = t.exact(
  t.intersection([
    t.type({
      name: t.string,
      image: t.string,
    }),
    t.partial({
      description: t.union([t.string, t.null]),
      imagePreview: t.string,
      blurhash: t.union([t.string, t.null]),
      audio: t.union([t.string, t.null]),
      video: t.union([t.string, t.null]),
      attributes: t.union([t.array(NftMetadataAttribute), t.null]),
    }),
  ]),
);

export type ERC20Contract = 'WETH9' | 'DAI' | 'USDC' | 'APN';

export const ERC20Contract = t.union([t.literal('WETH9'), t.literal('DAI'), t.literal('USDC'), t.literal('APN')]);

export type NftEventType = 'transfer' | 'sale' | 'minted';

export const NftEventType = t.union([t.literal('transfer'), t.literal('sale'), t.literal('minted')]);

export interface NftEvent {
  type: t.TypeOf<typeof NftEventType>;
  fromAddress?: t.TypeOf<typeof Address>;
  toAddress: t.TypeOf<typeof Address>;
  transactionHash: string;
  date: string;
  value?: string;
  quantity?: number;
}

export const NftEvent = t.exact(
  t.intersection([
    t.type({
      type: NftEventType,
      toAddress: Address,
      transactionHash: t.string,
      date: t.string,
    }),
    t.partial({
      fromAddress: Address,
      value: t.string,
      quantity: t.number,
    }),
  ]),
);

export interface Nft {
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  owner?: t.TypeOf<typeof Address>;
  contractName?: string;
  tokenId: string;
  name: string;
  verifications: Array<t.TypeOf<typeof ContractVerificationType>>;
  metadata: t.TypeOf<typeof NftMetadata>;
  /** If this token has multiple supply, eg ERC1155 */
  multiple: boolean;
}

export const Nft = t.exact(
  t.intersection([
    t.type({
      chainId: ChainIdToString,
      contractAddress: Address,
      tokenId: t.string,
      name: t.string,
      verifications: t.array(ContractVerificationType),
      metadata: NftMetadata,
      /** If this token has multiple supply, eg ERC1155 */
      multiple: t.boolean,
    }),
    t.partial({
      owner: Address,
      contractName: t.string,
    }),
  ]),
);

export interface QueriedWalletBalance {
  address: t.TypeOf<typeof Address>;
  quantity: number;
}

export const QueriedWalletBalance = t.exact(
  t.type({
    address: Address,
    quantity: t.number,
  }),
);

export type UserNft = t.TypeOf<typeof Nft> & {
  queriedWalletBalances: Array<t.TypeOf<typeof QueriedWalletBalance>>;
};

export const UserNft = t.intersection([
  Nft,
  t.exact(
    t.type({
      queriedWalletBalances: t.array(QueriedWalletBalance),
    }),
  ),
]);

export interface NftAcquisitionKey {
  chainId: t.TypeOf<typeof ChainIdToString>;
  blockHash: t.TypeOf<typeof Hex>;
  transactionHash: t.TypeOf<typeof TransactionHash>;
  logIndex: number;
}

export const NftAcquisitionKey = t.exact(
  t.type({
    chainId: ChainIdToString,
    blockHash: Hex,
    transactionHash: TransactionHash,
    logIndex: t.number,
  }),
);

export type NftRoyaltyStatus =
  | 'CLEAN'
  | 'NOT_PAID'
  | 'APPEAL_PENDING_PREPAYMENT'
  | 'APPEAL_PENDING_ADJUDICATION'
  | 'APPEAL_REJECTED';

export const NftRoyaltyStatus = t.union([
  t.literal('CLEAN'),
  t.literal('NOT_PAID'),
  t.literal('APPEAL_PENDING_PREPAYMENT'),
  t.literal('APPEAL_PENDING_ADJUDICATION'),
  t.literal('APPEAL_REJECTED'),
]);

export interface RoyaltyInfo {
  previousHolder: t.TypeOf<typeof Address>;
  acquirer: t.TypeOf<typeof Address>;
  royaltyStatus: t.TypeOf<typeof NftRoyaltyStatus>;
  expectedRoyaltyPayment?: t.TypeOf<typeof CurrencyAmount>;
  receivedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  recoupedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  unrecoupedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  appealPrepaymentSettlementInstructions?: Array<t.TypeOf<typeof EthereumTransactionTemplate>>;
}

export const RoyaltyInfo = t.exact(
  t.intersection([
    t.type({
      previousHolder: Address,
      acquirer: Address,
      royaltyStatus: NftRoyaltyStatus,
      receivedRoyaltyPayment: CurrencyAmount,
      recoupedRoyaltyPayment: CurrencyAmount,
      unrecoupedRoyaltyPayment: CurrencyAmount,
    }),
    t.partial({
      expectedRoyaltyPayment: CurrencyAmount,
      appealPrepaymentSettlementInstructions: t.array(EthereumTransactionTemplate),
    }),
  ]),
);

export interface NftAcquisition {
  nft: t.TypeOf<typeof Nft>;
  key: t.TypeOf<typeof NftAcquisitionKey>;
  previousHolder: t.TypeOf<typeof Address>;
  acquirer: t.TypeOf<typeof Address>;
  royaltyStatus: t.TypeOf<typeof NftRoyaltyStatus>;
  expectedRoyaltyPayment?: t.TypeOf<typeof CurrencyAmount>;
  receivedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  recoupedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  unrecoupedRoyaltyPayment: t.TypeOf<typeof CurrencyAmount>;
  appealPrepaymentSettlementInstructions?: Array<t.TypeOf<typeof EthereumTransactionTemplate>>;
}

export const NftAcquisition = t.exact(
  t.intersection([
    t.type({
      nft: Nft,
      key: NftAcquisitionKey,
      previousHolder: Address,
      acquirer: Address,
      royaltyStatus: NftRoyaltyStatus,
      receivedRoyaltyPayment: CurrencyAmount,
      recoupedRoyaltyPayment: CurrencyAmount,
      unrecoupedRoyaltyPayment: CurrencyAmount,
    }),
    t.partial({
      expectedRoyaltyPayment: CurrencyAmount,
      appealPrepaymentSettlementInstructions: t.array(EthereumTransactionTemplate),
    }),
  ]),
);

export interface GetUserNftsResponse {
  cursor: string;
  userNfts: Array<t.TypeOf<typeof UserNft>>;
}

export const GetUserNftsResponse = t.exact(
  t.type({
    cursor: t.string,
    userNfts: t.array(UserNft),
  }),
);

export interface GetNftsResponse {
  cursor: string;
  nfts: Array<t.TypeOf<typeof Nft>>;
}

export const GetNftsResponse = t.exact(
  t.type({
    cursor: t.string,
    nfts: t.array(Nft),
  }),
);

export type GetNftResponse = t.TypeOf<typeof Nft>;

export const GetNftResponse = Nft;

export interface GetAdjacentNftsResponse {
  previous?: t.TypeOf<typeof Nft>;
  next?: t.TypeOf<typeof Nft>;
}

export const GetAdjacentNftsResponse = t.exact(
  t.partial({
    previous: Nft,
    next: Nft,
  }),
);

export interface GetNftEventsResponse {
  events: Array<t.TypeOf<typeof NftEvent>>;
}

export const GetNftEventsResponse = t.exact(
  t.type({
    events: t.array(NftEvent),
  }),
);

export interface NftChainMetadata {
  name: string;
  description?: string | null;
  external_url?: string;
  image?: string;
  image_ipfs?: string;
  animation_url?: string;
  attributes?: Array<t.TypeOf<typeof NftMetadataAttribute>> | null;
}

export const NftChainMetadata = t.exact(
  t.intersection([
    t.type({
      name: t.string,
    }),
    t.partial({
      description: t.union([t.string, t.null]),
      external_url: t.string,
      image: t.string,
      image_ipfs: t.string,
      animation_url: t.string,
      attributes: t.union([t.array(NftMetadataAttribute), t.null]),
    }),
  ]),
);

export type GetNftsByTokenListRequest = Array<t.TypeOf<typeof TokenStringIdentifier>>;

export const GetNftsByTokenListRequest = t.array(TokenStringIdentifier);

export type GetNftsByTokenListResponse = Array<t.TypeOf<typeof Nft>>;

export const GetNftsByTokenListResponse = t.array(Nft);

export type FiatCurrencies = 'USD';

export const FiatCurrencies = t.literal('USD');

export interface Phase {
  /** The phase name */
  name: string;
  headerText: string | null;
  bannerButtonText: string | null;
  /** The timestamp for when the phase will begin */
  startTimestamp: t.TypeOf<typeof DateFromISODateString>;
  /** The maximum that can be claimed by any wallet during the phase */
  maxClaimableSupply: t.TypeOf<typeof UInt256ToString>;
  /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
  pricePerToken: t.TypeOf<typeof UInt256ToString>;
  /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
  currency: t.TypeOf<typeof Address>;
  fiatPricePerToken: t.TypeOf<typeof NumberToString> | null;
  fiatCurrency: t.TypeOf<typeof FiatCurrencies> | null;
  allowlistId: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum number of NFTs that can be claimed by any wallet in one transaction */
  quantityLimitPerTransaction: t.TypeOf<typeof UInt256ToString>;
  /** The amount of time that must be waiting by any one wallet in between claim transactions */
  waitTimeInSecondsBetweenClaims: t.TypeOf<typeof UInt256ToString>;
  /** date when the phase was last updated */
  updatedAt: t.TypeOf<typeof DateFromISODateString> | null;
}

export const Phase = t.exact(
  t.type({
    /** The phase name */
    name: t.string,
    headerText: t.union([t.string, t.null]),
    bannerButtonText: t.union([t.string, t.null]),
    /** The timestamp for when the phase will begin */
    startTimestamp: DateFromISODateString,
    /** The maximum that can be claimed by any wallet during the phase */
    maxClaimableSupply: UInt256ToString,
    /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
    pricePerToken: UInt256ToString,
    /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
    currency: Address,
    fiatPricePerToken: t.union([NumberToString, t.null]),
    fiatCurrency: t.union([FiatCurrencies, t.null]),
    allowlistId: t.union([UUIDFromString, t.null]),
    /** The maximum number of NFTs that can be claimed by any wallet in one transaction */
    quantityLimitPerTransaction: UInt256ToString,
    /** The amount of time that must be waiting by any one wallet in between claim transactions */
    waitTimeInSecondsBetweenClaims: UInt256ToString,
    /** date when the phase was last updated */
    updatedAt: t.union([DateFromISODateString, t.null]),
  }),
);

export interface PublicPhase {
  /** The phase name */
  name: string;
  headerText: string | null;
  bannerButtonText: string | null;
  /** The timestamp for when the phase will begin */
  startTimestamp: t.TypeOf<typeof DateFromISODateString>;
  /** The maximum that can be claimed by any wallet during the phase */
  maxClaimableSupply: t.TypeOf<typeof UInt256ToString>;
  /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
  pricePerToken: t.TypeOf<typeof UInt256ToString>;
  /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
  currency: t.TypeOf<typeof Address>;
  fiatPricePerToken: t.TypeOf<typeof NumberToString> | null;
  fiatCurrency: t.TypeOf<typeof FiatCurrencies> | null;
  allowlistId: t.TypeOf<typeof UUIDFromString> | null;
}

export const PublicPhase = t.exact(
  t.type({
    /** The phase name */
    name: t.string,
    headerText: t.union([t.string, t.null]),
    bannerButtonText: t.union([t.string, t.null]),
    /** The timestamp for when the phase will begin */
    startTimestamp: DateFromISODateString,
    /** The maximum that can be claimed by any wallet during the phase */
    maxClaimableSupply: UInt256ToString,
    /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
    pricePerToken: UInt256ToString,
    /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
    currency: Address,
    fiatPricePerToken: t.union([NumberToString, t.null]),
    fiatCurrency: t.union([FiatCurrencies, t.null]),
    allowlistId: t.union([UUIDFromString, t.null]),
  }),
);

export interface EditPhase {
  /** The phase name */
  name: string;
  headerText: string | null;
  bannerButtonText: string | null;
  /** The timestamp for when the phase will begin */
  startTimestamp: t.TypeOf<typeof DateFromISODateString>;
  /** The maximum that can be claimed by any wallet during the phase */
  maxClaimableSupply: t.TypeOf<typeof UInt256ToString>;
  /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
  pricePerToken: t.TypeOf<typeof UInt256ToString>;
  /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
  currency: t.TypeOf<typeof Address>;
  fiatPricePerToken: t.TypeOf<typeof NumberToString> | null;
  fiatCurrency: t.TypeOf<typeof FiatCurrencies> | null;
  allowlistId: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum number of NFTs that can be claimed by any wallet in one transaction */
  quantityLimitPerTransaction: t.TypeOf<typeof UInt256ToString>;
  /** The amount of time that must be waiting by any one wallet in between claim transactions */
  waitTimeInSecondsBetweenClaims: t.TypeOf<typeof UInt256ToString>;
}

export const EditPhase = t.exact(
  t.type({
    /** The phase name */
    name: t.string,
    headerText: t.union([t.string, t.null]),
    bannerButtonText: t.union([t.string, t.null]),
    /** The timestamp for when the phase will begin */
    startTimestamp: DateFromISODateString,
    /** The maximum that can be claimed by any wallet during the phase */
    maxClaimableSupply: UInt256ToString,
    /** The price per token in "bignumber" format (meaning the really big number; if in doubt use ethers.parse) */
    pricePerToken: UInt256ToString,
    /** The currency that will be used to derive the price (must be a contract address or "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" if the native token) */
    currency: Address,
    fiatPricePerToken: t.union([NumberToString, t.null]),
    fiatCurrency: t.union([FiatCurrencies, t.null]),
    allowlistId: t.union([UUIDFromString, t.null]),
    /** The maximum number of NFTs that can be claimed by any wallet in one transaction */
    quantityLimitPerTransaction: UInt256ToString,
    /** The amount of time that must be waiting by any one wallet in between claim transactions */
    waitTimeInSecondsBetweenClaims: UInt256ToString,
  }),
);

export interface Phaseset {
  /** Phaseset ID */
  id: t.TypeOf<typeof UUIDFromString>;
  /** Storefront phaseset belongs to */
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  phases: Array<t.TypeOf<typeof Phase>>;
}

export const Phaseset = t.exact(
  t.type({
    /** Phaseset ID */
    id: UUIDFromString,
    /** Storefront phaseset belongs to */
    storefrontId: UUIDFromString,
    phases: t.array(Phase),
  }),
);

export interface EditPhaseset {
  phases: Array<t.TypeOf<typeof EditPhase>>;
}

export const EditPhaseset = t.exact(
  t.type({
    phases: t.array(EditPhase),
  }),
);

export interface AllowlistEntry {
  /** The address added to the allowlist */
  address: t.TypeOf<typeof Address>;
  /** The number of tokens the address may claim */
  amount: t.TypeOf<typeof UInt256ToString>;
}

export const AllowlistEntry = t.exact(
  t.type({
    /** The address added to the allowlist */
    address: Address,
    /** The number of tokens the address may claim */
    amount: UInt256ToString,
  }),
);

export type AllowlistEntries = Array<t.TypeOf<typeof AllowlistEntry>>;

export const AllowlistEntries = t.array(AllowlistEntry);

export interface Allowlist {
  /** The allowlist id */
  id: t.TypeOf<typeof UUIDFromString>;
  /** The root of the calculated merkle tree for the allowlist */
  merkleRoot: string;
  entries: t.TypeOf<typeof AllowlistEntries>;
}

export const Allowlist = t.exact(
  t.type({
    /** The allowlist id */
    id: UUIDFromString,
    /** The root of the calculated merkle tree for the allowlist */
    merkleRoot: t.string,
    entries: AllowlistEntries,
  }),
);

export interface EditAllowlist {
  entries: t.TypeOf<typeof AllowlistEntries>;
}

export const EditAllowlist = t.exact(
  t.type({
    entries: AllowlistEntries,
  }),
);

export type TokenDisplayType = 'boost_number' | 'boost_percentage' | 'number' | 'date';

export const TokenDisplayType = t.union([
  t.literal('boost_number'),
  t.literal('boost_percentage'),
  t.literal('number'),
  t.literal('date'),
]);

export interface TokenAttribute {
  /** The "Name" of the trait */
  trait_type: string;
  value: string | number | boolean;
  display_type?: t.TypeOf<typeof TokenDisplayType>;
}

export const TokenAttribute = t.exact(
  t.intersection([
    t.type({
      /** The "Name" of the trait */
      trait_type: t.string,
      value: t.union([t.string, t.number, t.boolean]),
    }),
    t.partial({
      display_type: TokenDisplayType,
    }),
  ]),
);

export type TokenAttributes = Array<t.TypeOf<typeof TokenAttribute>>;

export const TokenAttributes = t.array(TokenAttribute);

export interface TokenMetadata {
  /** Token name */
  name: string;
  /** Token description */
  description: string;
  attributes: t.TypeOf<typeof TokenAttributes>;
  image?: string | null;
  animation_url?: string | null;
  image_data?: string | null;
  external_url?: string | null;
  background_color?: t.TypeOf<typeof Hex> | null;
}

export const TokenMetadata = t.exact(
  t.intersection([
    t.type({
      /** Token name */
      name: t.string,
      /** Token description */
      description: t.string,
      attributes: TokenAttributes,
    }),
    t.partial({
      image: t.union([t.string, t.null]),
      animation_url: t.union([t.string, t.null]),
      image_data: t.union([t.string, t.null]),
      external_url: t.union([t.string, t.null]),
      background_color: t.union([Hex, t.null]),
    }),
  ]),
);

export interface TokenDefinition {
  /** Unique identifier for the token */
  id: t.TypeOf<typeof UUIDFromString>;
  tokenId?: t.TypeOf<typeof UInt256ToString> | null;
  /** date when the token definition was last updated */
  updatedAt: t.TypeOf<typeof DateFromISODateString>;
  /** Token name */
  name: string;
  /** Token description */
  description: string;
  attributes: t.TypeOf<typeof TokenAttributes>;
  maxSupply?: t.TypeOf<typeof UInt256ToString> | null;
  phasesetId?: t.TypeOf<typeof UUIDFromString> | null;
  image?: string | null;
  animationUrl?: string | null;
  imageMimeType?: string | null;
  animationUrlMimeType?: string | null;
  blurhash?: string | null;
  imageData?: string | null;
  externalUrl?: string | null;
  backgroundColor?: t.TypeOf<typeof Hex> | null;
}

export const TokenDefinition = t.exact(
  t.intersection([
    t.type({
      /** Unique identifier for the token */
      id: UUIDFromString,
      /** date when the token definition was last updated */
      updatedAt: DateFromISODateString,
      /** Token name */
      name: t.string,
      /** Token description */
      description: t.string,
      attributes: TokenAttributes,
    }),
    t.partial({
      tokenId: t.union([UInt256ToString, t.null]),
      maxSupply: t.union([UInt256ToString, t.null]),
      phasesetId: t.union([UUIDFromString, t.null]),
      image: t.union([t.string, t.null]),
      animationUrl: t.union([t.string, t.null]),
      imageMimeType: t.union([t.string, t.null]),
      animationUrlMimeType: t.union([t.string, t.null]),
      blurhash: t.union([t.string, t.null]),
      imageData: t.union([t.string, t.null]),
      externalUrl: t.union([t.string, t.null]),
      backgroundColor: t.union([Hex, t.null]),
    }),
  ]),
);

export interface PublicTokenMetadata {
  /** Token name */
  name: string;
  /** Token description */
  description: string;
  attributes: t.TypeOf<typeof TokenAttributes>;
  maxSupply?: t.TypeOf<typeof UInt256ToString> | null;
  phasesetId?: t.TypeOf<typeof UUIDFromString> | null;
  /** URI of the token's image */
  image: string;
  animationUrl?: string | null;
  imageMimeType?: string | null;
  animationUrlMimeType?: string | null;
  blurhash?: string | null;
  imageData?: string | null;
  externalUrl?: string | null;
  backgroundColor?: t.TypeOf<typeof Hex> | null;
}

export const PublicTokenMetadata = t.exact(
  t.intersection([
    t.type({
      /** Token name */
      name: t.string,
      /** Token description */
      description: t.string,
      attributes: TokenAttributes,
      /** URI of the token's image */
      image: t.string,
    }),
    t.partial({
      maxSupply: t.union([UInt256ToString, t.null]),
      phasesetId: t.union([UUIDFromString, t.null]),
      animationUrl: t.union([t.string, t.null]),
      imageMimeType: t.union([t.string, t.null]),
      animationUrlMimeType: t.union([t.string, t.null]),
      blurhash: t.union([t.string, t.null]),
      imageData: t.union([t.string, t.null]),
      externalUrl: t.union([t.string, t.null]),
      backgroundColor: t.union([Hex, t.null]),
    }),
  ]),
);

export interface PublicToken {
  tokenId: string;
  metadata: t.TypeOf<typeof PublicTokenMetadata>;
  phases: Array<t.TypeOf<typeof PublicPhase>>;
}

export const PublicToken = t.exact(
  t.type({
    tokenId: t.string,
    metadata: PublicTokenMetadata,
    phases: t.array(PublicPhase),
  }),
);

export interface EditTokenDefinition {
  tokenId?: t.TypeOf<typeof UInt256ToString> | null;
  /** Token name */
  name: string;
  /** Token description */
  description: string;
  attributes: t.TypeOf<typeof TokenAttributes>;
  maxSupply?: t.TypeOf<typeof UInt256ToString> | null;
  phasesetId?: t.TypeOf<typeof UUIDFromString> | null;
  image?: string | null;
  animationUrl?: string | null;
  imageMimeType?: string | null;
  animationUrlMimeType?: string | null;
  blurhash?: string | null;
  imageData?: string | null;
  externalUrl?: string | null;
  backgroundColor?: t.TypeOf<typeof Hex> | null;
}

export const EditTokenDefinition = t.exact(
  t.intersection([
    t.type({
      /** Token name */
      name: t.string,
      /** Token description */
      description: t.string,
      attributes: TokenAttributes,
    }),
    t.partial({
      tokenId: t.union([UInt256ToString, t.null]),
      maxSupply: t.union([UInt256ToString, t.null]),
      phasesetId: t.union([UUIDFromString, t.null]),
      image: t.union([t.string, t.null]),
      animationUrl: t.union([t.string, t.null]),
      imageMimeType: t.union([t.string, t.null]),
      animationUrlMimeType: t.union([t.string, t.null]),
      blurhash: t.union([t.string, t.null]),
      imageData: t.union([t.string, t.null]),
      externalUrl: t.union([t.string, t.null]),
      backgroundColor: t.union([Hex, t.null]),
    }),
  ]),
);

export type TokenDefinitions = Array<t.TypeOf<typeof TokenDefinition>>;

export const TokenDefinitions = t.array(TokenDefinition);

export interface TokenForTokenset {
  /** unique identifier within the aspen system for the token */
  id: t.TypeOf<typeof UUIDFromString>;
  /** on chain id of the token; an integer */
  tokenId: t.TypeOf<typeof UInt256ToString>;
  maxSupply?: t.TypeOf<typeof UInt256ToString> | null;
  /** the phaseset id for this token, only relevant for ERC1155 tokens */
  phasesetId?: t.TypeOf<typeof UUIDFromString> | null;
  /** date when the token was last updated */
  updatedAt: t.TypeOf<typeof DateFromISODateString>;
}

export const TokenForTokenset = t.exact(
  t.intersection([
    t.type({
      /** unique identifier within the aspen system for the token */
      id: UUIDFromString,
      /** on chain id of the token; an integer */
      tokenId: UInt256ToString,
      /** date when the token was last updated */
      updatedAt: DateFromISODateString,
    }),
    t.partial({
      maxSupply: t.union([UInt256ToString, t.null]),
      /** the phaseset id for this token, only relevant for ERC1155 tokens */
      phasesetId: t.union([UUIDFromString, t.null]),
    }),
  ]),
);

export type TokensForTokenset = Array<t.TypeOf<typeof TokenForTokenset>>;

export const TokensForTokenset = t.array(TokenForTokenset);

export interface Tokenset {
  /** Tokenset ID */
  id: t.TypeOf<typeof UUIDFromString>;
  /** Storefront ID */
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  placeholderId?: t.TypeOf<typeof UUIDFromString> | null;
  placeholderRootHash?: string | null;
  tokens: t.TypeOf<typeof TokensForTokenset>;
  tokensRootHash?: string | null;
}

export const Tokenset = t.exact(
  t.intersection([
    t.type({
      /** Tokenset ID */
      id: UUIDFromString,
      /** Storefront ID */
      storefrontId: UUIDFromString,
      tokens: TokensForTokenset,
    }),
    t.partial({
      placeholderId: t.union([UUIDFromString, t.null]),
      placeholderRootHash: t.union([t.string, t.null]),
      tokensRootHash: t.union([t.string, t.null]),
    }),
  ]),
);

export type CreateOrUpdateTokenDefinitionRequest =
  | t.TypeOf<typeof TokenDefinition>
  | t.TypeOf<typeof EditTokenDefinition>;

export const CreateOrUpdateTokenDefinitionRequest = t.union([TokenDefinition, EditTokenDefinition]);

export interface GetTokensResponse {
  total: number;
  items: Array<t.TypeOf<typeof TokenDefinition>>;
}

export const GetTokensResponse = t.exact(
  t.type({
    total: t.number,
    items: t.array(TokenDefinition),
  }),
);

export type GetTokensetPlaceholderResponse = t.TypeOf<typeof TokenDefinition> | null;

export const GetTokensetPlaceholderResponse = t.union([TokenDefinition, t.null]);

export type ReportsKind = 'AllTokens' | 'EligibleEmailAddresses' | 'EligibleDiscordUserIds';

export const ReportsKind = t.union([
  t.literal('AllTokens'),
  t.literal('EligibleEmailAddresses'),
  t.literal('EligibleDiscordUserIds'),
]);

export type AvailableReports = Array<t.TypeOf<typeof ReportsKind>>;

export const AvailableReports = t.array(ReportsKind);

export type IntegrationKind = 'DISCORD' | 'WEBHOOK';

export const IntegrationKind = t.union([t.literal('DISCORD'), t.literal('WEBHOOK')]);

export interface DiscordIntegrationConfig {
  discordRoleId: string;
  discordGuildId: string;
  discordLink: string;
}

export const DiscordIntegrationConfig = t.exact(
  t.type({
    discordRoleId: t.string,
    discordGuildId: t.string,
    discordLink: t.string,
  }),
);

export interface DiscordIntegration {
  kind: 'DISCORD';
  config: t.TypeOf<typeof DiscordIntegrationConfig>;
}

export const DiscordIntegration = t.exact(
  t.type({
    kind: t.literal('DISCORD'),
    config: DiscordIntegrationConfig,
  }),
);

export interface WebhookIntegrationConfig {
  webhookId: t.TypeOf<typeof UUIDFromString>;
}

export const WebhookIntegrationConfig = t.exact(
  t.type({
    webhookId: UUIDFromString,
  }),
);

export interface WebhookIntegration {
  kind: 'WEBHOOK';
  config: t.TypeOf<typeof WebhookIntegrationConfig>;
}

export const WebhookIntegration = t.exact(
  t.type({
    kind: t.literal('WEBHOOK'),
    config: WebhookIntegrationConfig,
  }),
);

export type Integration = t.TypeOf<typeof DiscordIntegration> | t.TypeOf<typeof WebhookIntegration>;

export const Integration = t.union([DiscordIntegration, WebhookIntegration]);

export interface Conditions {
  minTokensHeld: number;
  minRoyaltyCleanTokensHeld: number;
  needTermsAccepted: boolean;
  needEmailDisclosed: boolean;
  needSubscriptionId: t.TypeOf<typeof UUIDFromString> | null;
}

export const Conditions = t.exact(
  t.type({
    minTokensHeld: t.number,
    minRoyaltyCleanTokensHeld: t.number,
    needTermsAccepted: t.boolean,
    needEmailDisclosed: t.boolean,
    needSubscriptionId: t.union([UUIDFromString, t.null]),
  }),
);

export type MembershipListStatus = 'ACTIVE' | 'INACTIVE';

export const MembershipListStatus = t.union([t.literal('ACTIVE'), t.literal('INACTIVE')]);

export interface MembershipListOverview {
  id: number;
  name: string;
  status: t.TypeOf<typeof MembershipListStatus>;
  freezeAt: t.TypeOf<typeof DateFromISODateString> | null;
  lastSyncedAt: t.TypeOf<typeof DateFromISODateString> | null;
  lastSyncEligibleHoldingsCount: number;
  availableReports: Array<t.TypeOf<typeof ReportsKind>>;
  displayOrder: number;
}

export const MembershipListOverview = t.exact(
  t.type({
    id: t.number,
    name: t.string,
    status: MembershipListStatus,
    freezeAt: t.union([DateFromISODateString, t.null]),
    lastSyncedAt: t.union([DateFromISODateString, t.null]),
    lastSyncEligibleHoldingsCount: t.number,
    availableReports: t.array(ReportsKind),
    displayOrder: t.number,
  }),
);

export type MembershipListsOverview = Array<t.TypeOf<typeof MembershipListOverview>>;

export const MembershipListsOverview = t.array(MembershipListOverview);

export interface StorefrontMembershipListOverview {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  name: string;
  lists: t.TypeOf<typeof MembershipListsOverview>;
}

export const StorefrontMembershipListOverview = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    name: t.string,
    lists: MembershipListsOverview,
  }),
);

export type StorefrontsMembershipListOverview = Array<t.TypeOf<typeof StorefrontMembershipListOverview>>;

export const StorefrontsMembershipListOverview = t.array(StorefrontMembershipListOverview);

export interface MembershipListConfig {
  subscription?: {
    /** CTA Text to display when the user has no eligible subscription */
    subscribeCTAText?: string | null;
    /** CTA Text to display when the user is eligible to extend their subscription */
    extendSubscriptionCTAText?: string | null;
    /** Subscription title text to display */
    titleText?: string | null;
    /** The text to display for the duration unit */
    optionsDurationUnitText?: string | null;
    /** The maximum number of single duration options to display */
    optionsDurationMaxIndividual?: number | null;
    /** The maximum number of grouped duration options to display */
    optionsDurationMaxGrouped?: number | null;
  } | null;
  discord?: {
    /** Benefit tag text to display */
    benefitTagText?: string | null;
    /** Text to display when the user is eligible for the membership but has not yet been added to the discord server */
    membershipPendingText?: string | null;
    /** Text to display when the user is eligible for the membership and has been added to the discord server */
    membershipActiveText?: string | null;
  } | null;
}

export const MembershipListConfig = t.exact(
  t.partial({
    subscription: t.union([
      t.exact(
        t.partial({
          /** CTA Text to display when the user has no eligible subscription */
          subscribeCTAText: t.union([t.string, t.null]),
          /** CTA Text to display when the user is eligible to extend their subscription */
          extendSubscriptionCTAText: t.union([t.string, t.null]),
          /** Subscription title text to display */
          titleText: t.union([t.string, t.null]),
          /** The text to display for the duration unit */
          optionsDurationUnitText: t.union([t.string, t.null]),
          /** The maximum number of single duration options to display */
          optionsDurationMaxIndividual: t.union([t.number, t.null]),
          /** The maximum number of grouped duration options to display */
          optionsDurationMaxGrouped: t.union([t.number, t.null]),
        }),
      ),
      t.null,
    ]),
    discord: t.union([
      t.exact(
        t.partial({
          /** Benefit tag text to display */
          benefitTagText: t.union([t.string, t.null]),
          /** Text to display when the user is eligible for the membership but has not yet been added to the discord server */
          membershipPendingText: t.union([t.string, t.null]),
          /** Text to display when the user is eligible for the membership and has been added to the discord server */
          membershipActiveText: t.union([t.string, t.null]),
        }),
      ),
      t.null,
    ]),
  }),
);

export interface MembershipList {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  name: string;
  description: string | null;
  displayOrder: number;
  image: string | null;
  status: t.TypeOf<typeof MembershipListStatus>;
  freezeAt: t.TypeOf<typeof DateFromISODateString> | null;
  integrations: Array<t.TypeOf<typeof Integration>>;
  conditions: t.TypeOf<typeof Conditions>;
  config: t.TypeOf<typeof MembershipListConfig>;
}

export const MembershipList = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    name: t.string,
    description: t.union([t.string, t.null]),
    displayOrder: t.number,
    image: t.union([t.string, t.null]),
    status: MembershipListStatus,
    freezeAt: t.union([DateFromISODateString, t.null]),
    integrations: t.array(Integration),
    conditions: Conditions,
    config: MembershipListConfig,
  }),
);

export type MembershipLists = Array<t.TypeOf<typeof MembershipList>>;

export const MembershipLists = t.array(MembershipList);

export interface MembershipListResponse {
  listId: number;
  listName: string;
}

export const MembershipListResponse = t.exact(
  t.type({
    listId: t.number,
    listName: t.string,
  }),
);

export interface MembershipListUserDiscordStatusResponse {
  isMemberOfServer: boolean;
}

export const MembershipListUserDiscordStatusResponse = t.exact(
  t.type({
    isMemberOfServer: t.boolean,
  }),
);

export type ImportCollectionStatus = 'Pending' | 'In Progress' | 'Complete' | 'Failed';

export const ImportCollectionStatus = t.union([
  t.literal('Pending'),
  t.literal('In Progress'),
  t.literal('Complete'),
  t.literal('Failed'),
]);

export interface ImportCollectionInfo {
  status: t.TypeOf<typeof ImportCollectionStatus>;
  error?: string | null;
}

export const ImportCollectionInfo = t.exact(
  t.intersection([
    t.type({
      status: ImportCollectionStatus,
    }),
    t.partial({
      error: t.union([t.string, t.null]),
    }),
  ]),
);

export interface ClaimProof {
  /** the address of the owner or administrator of the on chain contract that will signed the proof */
  collectionOwnerOrAdmin: t.TypeOf<typeof Address>;
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  /** the id of the organization that owns the collection + storefront */
  organizationId: t.TypeOf<typeof UUIDFromString>;
}

export const ClaimProof = t.exact(
  t.type({
    /** the address of the owner or administrator of the on chain contract that will signed the proof */
    collectionOwnerOrAdmin: Address,
    chainId: ChainIdToString,
    contractAddress: Address,
    /** the id of the organization that owns the collection + storefront */
    organizationId: UUIDFromString,
  }),
);

export interface ClaimProofForCollection {
  claim: t.TypeOf<typeof ClaimProof>;
  signedProof: string;
}

export const ClaimProofForCollection = t.exact(
  t.type({
    claim: ClaimProof,
    signedProof: t.string,
  }),
);

export interface ClaimProofForCollectionResponse {
  /** The identifier of the storefront */
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  secondarySaleBasisPoints: number;
  secondarySalePayee: t.TypeOf<typeof Address> | null;
}

export const ClaimProofForCollectionResponse = t.exact(
  t.type({
    /** The identifier of the storefront */
    storefrontId: UUIDFromString,
    secondarySaleBasisPoints: t.number,
    secondarySalePayee: t.union([Address, t.null]),
  }),
);

export interface PublicInvoice {
  lineItems: Array<{
    title: string;
    description: string;
    descriptionInfo: string;
    price: t.TypeOf<typeof UInt256ToString>;
    precision: number;
    currency: t.TypeOf<typeof Address>;
  }>;
  total: {
    price: t.TypeOf<typeof UInt256ToString>;
    precision: number;
    currency: t.TypeOf<typeof Address>;
  };
  chainId: t.TypeOf<typeof ChainIdToString>;
}

export const PublicInvoice = t.exact(
  t.type({
    lineItems: t.array(
      t.exact(
        t.type({
          title: t.string,
          description: t.string,
          descriptionInfo: t.string,
          price: UInt256ToString,
          precision: t.number,
          currency: Address,
        }),
      ),
    ),
    total: t.exact(
      t.type({
        price: UInt256ToString,
        precision: t.number,
        currency: Address,
      }),
    ),
    chainId: ChainIdToString,
  }),
);

export interface RaiseClaimInvoiceBody {
  ownerAddress: t.TypeOf<typeof Address>;
  coupon?: string;
}

export const RaiseClaimInvoiceBody = t.exact(
  t.intersection([
    t.type({
      ownerAddress: Address,
    }),
    t.partial({
      coupon: t.string,
    }),
  ]),
);

export interface RaiseClaimInvoiceResponse {
  publicInvoice: t.TypeOf<typeof PublicInvoice> | null;
  txTemplates: Array<t.TypeOf<typeof EthereumTransactionTemplate>>;
}

export const RaiseClaimInvoiceResponse = t.exact(
  t.type({
    publicInvoice: t.union([PublicInvoice, t.null]),
    txTemplates: t.array(EthereumTransactionTemplate),
  }),
);

export interface ClaimCollectionTermsStatus {
  url: string;
  accepted: boolean;
}

export const ClaimCollectionTermsStatus = t.exact(
  t.type({
    url: t.string,
    accepted: t.boolean,
  }),
);

export interface AcceptClaimCollectionTermsResponse {
  url: string;
}

export const AcceptClaimCollectionTermsResponse = t.exact(
  t.type({
    url: t.string,
  }),
);

export interface ClaimCollectionStatusResponse {
  invoiceSettled: boolean | null;
  importInfo: t.TypeOf<typeof ImportCollectionInfo> | null;
}

export const ClaimCollectionStatusResponse = t.exact(
  t.type({
    invoiceSettled: t.union([t.boolean, t.null]),
    importInfo: t.union([ImportCollectionInfo, t.null]),
  }),
);

export type ContractTokenStandard = ('ERC20' | 'ERC721' | 'ERC1155') | null;

export const ContractTokenStandard = t.union([
  t.union([t.literal('ERC20'), t.literal('ERC721'), t.literal('ERC1155')]),
  t.null,
]);

export type ContractVerifications = Array<t.TypeOf<typeof ContractVerificationType>>;

export const ContractVerifications = t.array(ContractVerificationType);

export type StorefrontByUUID = t.TypeOf<typeof UUIDFromString>;

export const StorefrontByUUID = UUIDFromString;

export type StorefrontCategory =
  | 'Music'
  | 'Gaming'
  | 'Metaverse'
  | 'PFP'
  | 'Art'
  | 'Generative Art'
  | 'Photography'
  | 'Access Pass'
  | 'Utility'
  | 'Collectible'
  | 'Video';

export const StorefrontCategory = t.union([
  t.literal('Music'),
  t.literal('Gaming'),
  t.literal('Metaverse'),
  t.literal('PFP'),
  t.literal('Art'),
  t.literal('Generative Art'),
  t.literal('Photography'),
  t.literal('Access Pass'),
  t.literal('Utility'),
  t.literal('Collectible'),
  t.literal('Video'),
]);

export type StorefrontCategories = Array<t.TypeOf<typeof StorefrontCategory>>;

export const StorefrontCategories = t.array(StorefrontCategory);

export type StorefrontMediaType = 'Image' | 'Video' | 'Audio' | 'Documents' | 'Other';

export const StorefrontMediaType = t.union([
  t.literal('Image'),
  t.literal('Video'),
  t.literal('Audio'),
  t.literal('Documents'),
  t.literal('Other'),
]);

export type StorefrontFreeDistributionMode = 'None' | 'TokenPerPad';

export const StorefrontFreeDistributionMode = t.union([t.literal('None'), t.literal('TokenPerPad')]);

export type StorefrontCurrencyOption = 'Crypto' | 'Fiat' | 'FiatAndCrypto';

export const StorefrontCurrencyOption = t.union([t.literal('Crypto'), t.literal('Fiat'), t.literal('FiatAndCrypto')]);

export type StorefrontContractType = 'ERC721' | 'ERC1155';

export const StorefrontContractType = t.union([t.literal('ERC721'), t.literal('ERC1155')]);

export interface AmountRecipient {
  /** the relayers address */
  address: t.TypeOf<typeof Address>;
  /** the share to send to the address in whole percentages */
  share: number;
}

export const AmountRecipient = t.exact(
  t.type({
    /** the relayers address */
    address: Address,
    /** the share to send to the address in whole percentages */
    share: t.number,
  }),
);

export type AmountRecipients = Array<t.TypeOf<typeof AmountRecipient>>;

export const AmountRecipients = t.array(AmountRecipient);

export interface AdSpaceImage {
  type: 'image';
  config: {
    url: string;
    title: string;
    content: string;
    cta: string;
    redirect: string;
    mediaPosition: 'left' | 'right';
  };
}

export const AdSpaceImage = t.exact(
  t.type({
    type: t.literal('image'),
    config: t.exact(
      t.type({
        url: t.string,
        title: t.string,
        content: t.string,
        cta: t.string,
        redirect: t.string,
        mediaPosition: t.union([t.literal('left'), t.literal('right')]),
      }),
    ),
  }),
);

export interface AdSpaceVideo {
  type: 'video';
  config: {
    url: string;
    title: string;
    content: string;
    cta: string;
    redirect: string;
    poster?: string;
    mediaPosition: 'left' | 'right';
  };
}

export const AdSpaceVideo = t.exact(
  t.type({
    type: t.literal('video'),
    config: t.exact(
      t.intersection([
        t.type({
          url: t.string,
          title: t.string,
          content: t.string,
          cta: t.string,
          redirect: t.string,
          mediaPosition: t.union([t.literal('left'), t.literal('right')]),
        }),
        t.partial({
          poster: t.string,
        }),
      ]),
    ),
  }),
);

export type AdSpaceTemplates = 'image' | 'video';

export const AdSpaceTemplates = t.union([t.literal('image'), t.literal('video')]);

export type AdSpaceContent = t.TypeOf<typeof AdSpaceImage> | t.TypeOf<typeof AdSpaceVideo>;

export const AdSpaceContent = t.union([AdSpaceImage, AdSpaceVideo]);

export type AdSpaces = Array<t.TypeOf<typeof AdSpaceContent>>;

export const AdSpaces = t.array(AdSpaceContent);

export interface Linkset {
  website?: string | null;
  blog?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  lens?: string | null;
  mastadon?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  vimeo?: string | null;
  tiktok?: string | null;
  twitch?: string | null;
  spotify?: string | null;
  soundcloud?: string | null;
  behance?: string | null;
  dribbble?: string | null;
  discord?: string | null;
  telegram?: string | null;
}

export const Linkset = t.exact(
  t.partial({
    website: t.union([t.string, t.null]),
    blog: t.union([t.string, t.null]),
    twitter: t.union([t.string, t.null]),
    linkedin: t.union([t.string, t.null]),
    facebook: t.union([t.string, t.null]),
    lens: t.union([t.string, t.null]),
    mastadon: t.union([t.string, t.null]),
    instagram: t.union([t.string, t.null]),
    youtube: t.union([t.string, t.null]),
    vimeo: t.union([t.string, t.null]),
    tiktok: t.union([t.string, t.null]),
    twitch: t.union([t.string, t.null]),
    spotify: t.union([t.string, t.null]),
    soundcloud: t.union([t.string, t.null]),
    behance: t.union([t.string, t.null]),
    dribbble: t.union([t.string, t.null]),
    discord: t.union([t.string, t.null]),
    telegram: t.union([t.string, t.null]),
  }),
);

export interface TokenAttributeSummary {
  traitType: string;
  value: string;
  count: number;
}

export const TokenAttributeSummary = t.exact(
  t.type({
    traitType: t.string,
    value: t.string,
    count: t.number,
  }),
);

export interface StorefrontMedia {
  logoImage?: string | null;
  bannerImage?: string | null;
}

export const StorefrontMedia = t.exact(
  t.partial({
    logoImage: t.union([t.string, t.null]),
    bannerImage: t.union([t.string, t.null]),
  }),
);

export interface CreatorInformation {
  /** Creators name */
  name: string;
  biography?: string | null;
  links?: t.TypeOf<typeof Linkset> | null;
}

export const CreatorInformation = t.exact(
  t.intersection([
    t.type({
      /** Creators name */
      name: t.string,
    }),
    t.partial({
      biography: t.union([t.string, t.null]),
      links: t.union([Linkset, t.null]),
    }),
  ]),
);

export interface StorefrontEmailCapture {
  enabled: boolean;
  mandatory: boolean;
}

export const StorefrontEmailCapture = t.exact(
  t.type({
    enabled: t.boolean,
    mandatory: t.boolean,
  }),
);

export interface PatchStorefront {
  chainId?: t.TypeOf<typeof ChainIdToString> | null;
  /** The contract address of the collection; will be null until it is deployed */
  address?: t.TypeOf<typeof Address> | null;
  /** The storefront name */
  name?: string;
  /** The storefront slug */
  slug?: string | null;
  /** The collection's symbol; note very few systems actually utilize this */
  symbol?: string | null;
  /** The description of the storefront */
  description?: string | null;
  /** Whether or not this is a test storefront */
  isTestStorefront?: boolean;
  /** The URI of the terms (if any) that control the storefront */
  userTerms?: string | null;
  /** Whether or not the user must agree to the terms before interacting with the contract */
  userTermsRequired?: boolean;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion?: number | null;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints?: number | null;
  /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
  secondarySalePayee?: t.TypeOf<typeof Address> | null;
  secondarySaleRecipients?: t.TypeOf<typeof AmountRecipients> | null;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled?: boolean;
  contractType?: t.TypeOf<typeof StorefrontContractType> | null;
  freeDistributionMode?: t.TypeOf<typeof StorefrontFreeDistributionMode> | null;
  currencyOption?: t.TypeOf<typeof StorefrontCurrencyOption> | null;
  media?: t.TypeOf<typeof StorefrontMedia> | null;
  links?: t.TypeOf<typeof Linkset> | null;
  mediaType?: t.TypeOf<typeof StorefrontMediaType> | null;
  /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
  draftTokensetId?: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
  maxClaimPerWallet?: t.TypeOf<typeof UInt256ToString> | null;
  /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
  draftPhasesetId?: t.TypeOf<typeof UUIDFromString> | null;
  /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
  primarySalePayee?: t.TypeOf<typeof Address> | null;
  primarySaleRecipients?: t.TypeOf<typeof AmountRecipients> | null;
  published?: boolean;
  /** The storefront allows royalties status to be appealed */
  royaltiesCanAppeal?: boolean;
  /** The storefront allows royalties to be paidback */
  royaltiesCanPayback?: boolean;
  deployerOrOwnerWallet?: t.TypeOf<typeof Address> | null;
  emailCapture?: t.TypeOf<typeof StorefrontEmailCapture> | null;
  adSpaces?: t.TypeOf<typeof AdSpaces>;
  /** Whether or not the storefront has a placeholder token */
  hasPlaceholder?: boolean;
}

export const PatchStorefront = t.exact(
  t.partial({
    chainId: t.union([ChainIdToString, t.null]),
    /** The contract address of the collection; will be null until it is deployed */
    address: t.union([Address, t.null]),
    /** The storefront name */
    name: t.string,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    /** The collection's symbol; note very few systems actually utilize this */
    symbol: t.union([t.string, t.null]),
    /** The description of the storefront */
    description: t.union([t.string, t.null]),
    /** Whether or not this is a test storefront */
    isTestStorefront: t.boolean,
    /** The URI of the terms (if any) that control the storefront */
    userTerms: t.union([t.string, t.null]),
    /** Whether or not the user must agree to the terms before interacting with the contract */
    userTermsRequired: t.boolean,
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
    secondarySalePayee: t.union([Address, t.null]),
    secondarySaleRecipients: t.union([AmountRecipients, t.null]),
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    contractType: t.union([StorefrontContractType, t.null]),
    freeDistributionMode: t.union([StorefrontFreeDistributionMode, t.null]),
    currencyOption: t.union([StorefrontCurrencyOption, t.null]),
    media: t.union([StorefrontMedia, t.null]),
    links: t.union([Linkset, t.null]),
    mediaType: t.union([StorefrontMediaType, t.null]),
    /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
    draftTokensetId: t.union([UUIDFromString, t.null]),
    /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
    maxClaimPerWallet: t.union([UInt256ToString, t.null]),
    /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
    draftPhasesetId: t.union([UUIDFromString, t.null]),
    /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
    primarySalePayee: t.union([Address, t.null]),
    primarySaleRecipients: t.union([AmountRecipients, t.null]),
    published: t.boolean,
    /** The storefront allows royalties status to be appealed */
    royaltiesCanAppeal: t.boolean,
    /** The storefront allows royalties to be paidback */
    royaltiesCanPayback: t.boolean,
    deployerOrOwnerWallet: t.union([Address, t.null]),
    emailCapture: t.union([StorefrontEmailCapture, t.null]),
    adSpaces: AdSpaces,
    /** Whether or not the storefront has a placeholder token */
    hasPlaceholder: t.boolean,
  }),
);

export interface EditStorefront {
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  /** The contract address of the collection; will be null until it is deployed */
  address: t.TypeOf<typeof Address> | null;
  /** The storefront name */
  name: string;
  /** The storefront slug */
  slug: string | null;
  /** The collection's symbol; note very few systems actually utilize this */
  symbol: string | null;
  /** The description of the storefront */
  description: string | null;
  /** Whether or not this is a test storefront */
  isTestStorefront: boolean;
  /** The URI of the terms (if any) that control the storefront */
  userTerms: string | null;
  /** Whether or not the user must agree to the terms before interacting with the contract */
  userTermsRequired: boolean;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion: number | null;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints: number | null;
  /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
  secondarySalePayee: t.TypeOf<typeof Address> | null;
  secondarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled: boolean;
  contractType: t.TypeOf<typeof StorefrontContractType> | null;
  freeDistributionMode: t.TypeOf<typeof StorefrontFreeDistributionMode> | null;
  currencyOption: t.TypeOf<typeof StorefrontCurrencyOption> | null;
  media: t.TypeOf<typeof StorefrontMedia> | null;
  links: t.TypeOf<typeof Linkset> | null;
  mediaType: t.TypeOf<typeof StorefrontMediaType> | null;
  /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
  draftTokensetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
  maxClaimPerWallet: t.TypeOf<typeof UInt256ToString> | null;
  /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
  draftPhasesetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
  primarySalePayee: t.TypeOf<typeof Address> | null;
  primarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  published: boolean;
  /** The storefront allows royalties status to be appealed */
  royaltiesCanAppeal: boolean;
  /** The storefront allows royalties to be paidback */
  royaltiesCanPayback: boolean;
  deployerOrOwnerWallet: t.TypeOf<typeof Address> | null;
  emailCapture: t.TypeOf<typeof StorefrontEmailCapture> | null;
  adSpaces: t.TypeOf<typeof AdSpaces>;
  /** Whether or not the storefront has a placeholder token */
  hasPlaceholder: boolean;
}

export const EditStorefront = t.exact(
  t.type({
    chainId: t.union([ChainIdToString, t.null]),
    /** The contract address of the collection; will be null until it is deployed */
    address: t.union([Address, t.null]),
    /** The storefront name */
    name: t.string,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    /** The collection's symbol; note very few systems actually utilize this */
    symbol: t.union([t.string, t.null]),
    /** The description of the storefront */
    description: t.union([t.string, t.null]),
    /** Whether or not this is a test storefront */
    isTestStorefront: t.boolean,
    /** The URI of the terms (if any) that control the storefront */
    userTerms: t.union([t.string, t.null]),
    /** Whether or not the user must agree to the terms before interacting with the contract */
    userTermsRequired: t.boolean,
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
    secondarySalePayee: t.union([Address, t.null]),
    secondarySaleRecipients: t.union([AmountRecipients, t.null]),
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    contractType: t.union([StorefrontContractType, t.null]),
    freeDistributionMode: t.union([StorefrontFreeDistributionMode, t.null]),
    currencyOption: t.union([StorefrontCurrencyOption, t.null]),
    media: t.union([StorefrontMedia, t.null]),
    links: t.union([Linkset, t.null]),
    mediaType: t.union([StorefrontMediaType, t.null]),
    /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
    draftTokensetId: t.union([UUIDFromString, t.null]),
    /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
    maxClaimPerWallet: t.union([UInt256ToString, t.null]),
    /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
    draftPhasesetId: t.union([UUIDFromString, t.null]),
    /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
    primarySalePayee: t.union([Address, t.null]),
    primarySaleRecipients: t.union([AmountRecipients, t.null]),
    published: t.boolean,
    /** The storefront allows royalties status to be appealed */
    royaltiesCanAppeal: t.boolean,
    /** The storefront allows royalties to be paidback */
    royaltiesCanPayback: t.boolean,
    deployerOrOwnerWallet: t.union([Address, t.null]),
    emailCapture: t.union([StorefrontEmailCapture, t.null]),
    adSpaces: AdSpaces,
    /** Whether or not the storefront has a placeholder token */
    hasPlaceholder: t.boolean,
  }),
);

export interface Storefront {
  /** The identifier of the storefront */
  id: t.TypeOf<typeof UUIDFromString>;
  /** the id of the user that will own the storefront */
  organizationId: t.TypeOf<typeof UUIDFromString>;
  claimProof: t.TypeOf<typeof ClaimProofForCollection> | null;
  mintedOnAspen: boolean;
  /** The id of the tokenset for the collection */
  tokensetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The id of the phaseset for the collection */
  phasesetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The time when the storefront was created. */
  createdAt: t.TypeOf<typeof DateFromISODateString>;
  importInfo: t.TypeOf<typeof ImportCollectionInfo> | null;
  claimInvoiceId: t.TypeOf<typeof IntegerToString> | null;
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  /** The contract address of the collection; will be null until it is deployed */
  address: t.TypeOf<typeof Address> | null;
  /** The storefront name */
  name: string;
  /** The storefront slug */
  slug: string | null;
  /** The collection's symbol; note very few systems actually utilize this */
  symbol: string | null;
  /** The description of the storefront */
  description: string | null;
  /** Whether or not this is a test storefront */
  isTestStorefront: boolean;
  /** The URI of the terms (if any) that control the storefront */
  userTerms: string | null;
  /** Whether or not the user must agree to the terms before interacting with the contract */
  userTermsRequired: boolean;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion: number | null;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints: number | null;
  /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
  secondarySalePayee: t.TypeOf<typeof Address> | null;
  secondarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled: boolean;
  contractType: t.TypeOf<typeof StorefrontContractType> | null;
  freeDistributionMode: t.TypeOf<typeof StorefrontFreeDistributionMode> | null;
  currencyOption: t.TypeOf<typeof StorefrontCurrencyOption> | null;
  media: t.TypeOf<typeof StorefrontMedia> | null;
  links: t.TypeOf<typeof Linkset> | null;
  mediaType: t.TypeOf<typeof StorefrontMediaType> | null;
  /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
  draftTokensetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
  maxClaimPerWallet: t.TypeOf<typeof UInt256ToString> | null;
  /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
  draftPhasesetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
  primarySalePayee: t.TypeOf<typeof Address> | null;
  primarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  published: boolean;
  /** The storefront allows royalties status to be appealed */
  royaltiesCanAppeal: boolean;
  /** The storefront allows royalties to be paidback */
  royaltiesCanPayback: boolean;
  deployerOrOwnerWallet: t.TypeOf<typeof Address> | null;
  emailCapture: t.TypeOf<typeof StorefrontEmailCapture> | null;
  adSpaces: t.TypeOf<typeof AdSpaces>;
  /** Whether or not the storefront has a placeholder token */
  hasPlaceholder: boolean;
}

export const Storefront = t.exact(
  t.type({
    /** The identifier of the storefront */
    id: UUIDFromString,
    /** the id of the user that will own the storefront */
    organizationId: UUIDFromString,
    claimProof: t.union([ClaimProofForCollection, t.null]),
    mintedOnAspen: t.boolean,
    /** The id of the tokenset for the collection */
    tokensetId: t.union([UUIDFromString, t.null]),
    /** The id of the phaseset for the collection */
    phasesetId: t.union([UUIDFromString, t.null]),
    /** The time when the storefront was created. */
    createdAt: DateFromISODateString,
    importInfo: t.union([ImportCollectionInfo, t.null]),
    claimInvoiceId: t.union([IntegerToString, t.null]),
    chainId: t.union([ChainIdToString, t.null]),
    /** The contract address of the collection; will be null until it is deployed */
    address: t.union([Address, t.null]),
    /** The storefront name */
    name: t.string,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    /** The collection's symbol; note very few systems actually utilize this */
    symbol: t.union([t.string, t.null]),
    /** The description of the storefront */
    description: t.union([t.string, t.null]),
    /** Whether or not this is a test storefront */
    isTestStorefront: t.boolean,
    /** The URI of the terms (if any) that control the storefront */
    userTerms: t.union([t.string, t.null]),
    /** Whether or not the user must agree to the terms before interacting with the contract */
    userTermsRequired: t.boolean,
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
    secondarySalePayee: t.union([Address, t.null]),
    secondarySaleRecipients: t.union([AmountRecipients, t.null]),
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    contractType: t.union([StorefrontContractType, t.null]),
    freeDistributionMode: t.union([StorefrontFreeDistributionMode, t.null]),
    currencyOption: t.union([StorefrontCurrencyOption, t.null]),
    media: t.union([StorefrontMedia, t.null]),
    links: t.union([Linkset, t.null]),
    mediaType: t.union([StorefrontMediaType, t.null]),
    /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
    draftTokensetId: t.union([UUIDFromString, t.null]),
    /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
    maxClaimPerWallet: t.union([UInt256ToString, t.null]),
    /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
    draftPhasesetId: t.union([UUIDFromString, t.null]),
    /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
    primarySalePayee: t.union([Address, t.null]),
    primarySaleRecipients: t.union([AmountRecipients, t.null]),
    published: t.boolean,
    /** The storefront allows royalties status to be appealed */
    royaltiesCanAppeal: t.boolean,
    /** The storefront allows royalties to be paidback */
    royaltiesCanPayback: t.boolean,
    deployerOrOwnerWallet: t.union([Address, t.null]),
    emailCapture: t.union([StorefrontEmailCapture, t.null]),
    adSpaces: AdSpaces,
    /** Whether or not the storefront has a placeholder token */
    hasPlaceholder: t.boolean,
  }),
);

export interface DeployedStorefront {
  /** The identifier of the storefront */
  id: t.TypeOf<typeof UUIDFromString>;
  /** the id of the user that will own the storefront */
  organizationId: t.TypeOf<typeof UUIDFromString>;
  claimProof: t.TypeOf<typeof ClaimProofForCollection> | null;
  mintedOnAspen: boolean;
  /** The id of the tokenset for the collection */
  tokensetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The id of the phaseset for the collection */
  phasesetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The time when the storefront was created. */
  createdAt: t.TypeOf<typeof DateFromISODateString>;
  importInfo: t.TypeOf<typeof ImportCollectionInfo> | null;
  claimInvoiceId: t.TypeOf<typeof IntegerToString> | null;
  chainId: t.TypeOf<typeof ChainIdToString>;
  /** The contract address of the collection; will be null until it is deployed */
  address: t.TypeOf<typeof Address>;
  /** The storefront name */
  name: string;
  /** The storefront slug */
  slug: string | null;
  /** The collection's symbol; note very few systems actually utilize this */
  symbol: string | null;
  /** The description of the storefront */
  description: string | null;
  /** Whether or not this is a test storefront */
  isTestStorefront: boolean;
  /** The URI of the terms (if any) that control the storefront */
  userTerms: string | null;
  /** Whether or not the user must agree to the terms before interacting with the contract */
  userTermsRequired: boolean;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion: number | null;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints: number | null;
  /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
  secondarySalePayee: t.TypeOf<typeof Address> | null;
  secondarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled: boolean;
  contractType: t.TypeOf<typeof StorefrontContractType> | null;
  freeDistributionMode: t.TypeOf<typeof StorefrontFreeDistributionMode> | null;
  currencyOption: t.TypeOf<typeof StorefrontCurrencyOption> | null;
  media: t.TypeOf<typeof StorefrontMedia> | null;
  links: t.TypeOf<typeof Linkset> | null;
  mediaType: t.TypeOf<typeof StorefrontMediaType> | null;
  /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
  draftTokensetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
  maxClaimPerWallet: t.TypeOf<typeof UInt256ToString> | null;
  /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
  draftPhasesetId: t.TypeOf<typeof UUIDFromString> | null;
  /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
  primarySalePayee: t.TypeOf<typeof Address> | null;
  primarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  published: boolean;
  /** The storefront allows royalties status to be appealed */
  royaltiesCanAppeal: boolean;
  /** The storefront allows royalties to be paidback */
  royaltiesCanPayback: boolean;
  deployerOrOwnerWallet: t.TypeOf<typeof Address> | null;
  emailCapture: t.TypeOf<typeof StorefrontEmailCapture> | null;
  adSpaces: t.TypeOf<typeof AdSpaces>;
  /** Whether or not the storefront has a placeholder token */
  hasPlaceholder: boolean;
}

export const DeployedStorefront = t.exact(
  t.type({
    /** The identifier of the storefront */
    id: UUIDFromString,
    /** the id of the user that will own the storefront */
    organizationId: UUIDFromString,
    claimProof: t.union([ClaimProofForCollection, t.null]),
    mintedOnAspen: t.boolean,
    /** The id of the tokenset for the collection */
    tokensetId: t.union([UUIDFromString, t.null]),
    /** The id of the phaseset for the collection */
    phasesetId: t.union([UUIDFromString, t.null]),
    /** The time when the storefront was created. */
    createdAt: DateFromISODateString,
    importInfo: t.union([ImportCollectionInfo, t.null]),
    claimInvoiceId: t.union([IntegerToString, t.null]),
    chainId: ChainIdToString,
    /** The contract address of the collection; will be null until it is deployed */
    address: Address,
    /** The storefront name */
    name: t.string,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    /** The collection's symbol; note very few systems actually utilize this */
    symbol: t.union([t.string, t.null]),
    /** The description of the storefront */
    description: t.union([t.string, t.null]),
    /** Whether or not this is a test storefront */
    isTestStorefront: t.boolean,
    /** The URI of the terms (if any) that control the storefront */
    userTerms: t.union([t.string, t.null]),
    /** Whether or not the user must agree to the terms before interacting with the contract */
    userTermsRequired: t.boolean,
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
    secondarySalePayee: t.union([Address, t.null]),
    secondarySaleRecipients: t.union([AmountRecipients, t.null]),
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    contractType: t.union([StorefrontContractType, t.null]),
    freeDistributionMode: t.union([StorefrontFreeDistributionMode, t.null]),
    currencyOption: t.union([StorefrontCurrencyOption, t.null]),
    media: t.union([StorefrontMedia, t.null]),
    links: t.union([Linkset, t.null]),
    mediaType: t.union([StorefrontMediaType, t.null]),
    /** The id of the draft tokenset for the collection; only usable after the collection is deployed */
    draftTokensetId: t.union([UUIDFromString, t.null]),
    /** The maximum amount of tokens that a single wallet can claim, set to 0 for no limit */
    maxClaimPerWallet: t.union([UInt256ToString, t.null]),
    /** The id of the draft phaseset for the collection; only usable after the collection is deployed */
    draftPhasesetId: t.union([UUIDFromString, t.null]),
    /** The payee that will receive the fees from the primary sale; if a payment splitter is used then the address of the payment splitter should be put here; else put a single payee */
    primarySalePayee: t.union([Address, t.null]),
    primarySaleRecipients: t.union([AmountRecipients, t.null]),
    published: t.boolean,
    /** The storefront allows royalties status to be appealed */
    royaltiesCanAppeal: t.boolean,
    /** The storefront allows royalties to be paidback */
    royaltiesCanPayback: t.boolean,
    deployerOrOwnerWallet: t.union([Address, t.null]),
    emailCapture: t.union([StorefrontEmailCapture, t.null]),
    adSpaces: AdSpaces,
    /** Whether or not the storefront has a placeholder token */
    hasPlaceholder: t.boolean,
  }),
);

export type RoyaltiesEnabledStorefront = t.TypeOf<typeof DeployedStorefront>;

export const RoyaltiesEnabledStorefront = DeployedStorefront;

export interface PublicStorefront {
  /** The identifier of the storefront */
  id: t.TypeOf<typeof UUIDFromString>;
  mintedOnAspen: boolean;
  /** The storefront name */
  name: string;
  /** The collection's symbol; note very few systems actually utilize this */
  symbol: string | null;
  /** The description of the storefront */
  description: string | null;
  /** the id of the user that will own the storefront */
  organizationId: t.TypeOf<typeof UUIDFromString>;
  /** The storefront slug */
  slug: string | null;
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  /** The contract address of the collection; will be null until it is deployed */
  address: t.TypeOf<typeof Address> | null;
  links: t.TypeOf<typeof Linkset> | null;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled: boolean;
  /** The id of the tokenset for the collection */
  tokensetId: t.TypeOf<typeof UUIDFromString> | null;
  contractType: t.TypeOf<typeof StorefrontContractType> | null;
  /** The id of the phaseset for the collection */
  phasesetId: t.TypeOf<typeof UUIDFromString> | null;
  tokens: Array<t.TypeOf<typeof PublicToken>>;
  freeDistributionMode: t.TypeOf<typeof StorefrontFreeDistributionMode> | null;
  currencyOption: t.TypeOf<typeof StorefrontCurrencyOption> | null;
  phases: Array<t.TypeOf<typeof PublicPhase>>;
  media: t.TypeOf<typeof StorefrontMedia> | null;
  emailCapture: t.TypeOf<typeof StorefrontEmailCapture> | null;
  tokenAttributeSummaries: Array<t.TypeOf<typeof TokenAttributeSummary>>;
  /** The name of the storefront's organization */
  organizationName: string;
  organizationStripeAccount: string | null;
  /** The storefront allows royalties to be paidback */
  royaltiesCanPayback: boolean;
  /** The storefront allows royalties status to be appealed */
  royaltiesCanAppeal: boolean;
  /** The time when the storefront was created. */
  createdAt: t.TypeOf<typeof DateFromISODateString>;
  importInfo: t.TypeOf<typeof ImportCollectionInfo> | null;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints: number | null;
  /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
  secondarySalePayee: t.TypeOf<typeof Address> | null;
  secondarySaleRecipients: t.TypeOf<typeof AmountRecipients> | null;
  adSpaces: t.TypeOf<typeof AdSpaces>;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion: number | null;
  placeholderToken: t.TypeOf<typeof TokenDefinition> | null;
  /** The maximum number of tokenIds used; if a 1155 is used then this will not relate to the number of individual tokens under each token idea */
  uniqueTokens: t.TypeOf<typeof U256ToString> | null;
}

export const PublicStorefront = t.exact(
  t.type({
    /** The identifier of the storefront */
    id: UUIDFromString,
    mintedOnAspen: t.boolean,
    /** The storefront name */
    name: t.string,
    /** The collection's symbol; note very few systems actually utilize this */
    symbol: t.union([t.string, t.null]),
    /** The description of the storefront */
    description: t.union([t.string, t.null]),
    /** the id of the user that will own the storefront */
    organizationId: UUIDFromString,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    chainId: t.union([ChainIdToString, t.null]),
    /** The contract address of the collection; will be null until it is deployed */
    address: t.union([Address, t.null]),
    links: t.union([Linkset, t.null]),
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    /** The id of the tokenset for the collection */
    tokensetId: t.union([UUIDFromString, t.null]),
    contractType: t.union([StorefrontContractType, t.null]),
    /** The id of the phaseset for the collection */
    phasesetId: t.union([UUIDFromString, t.null]),
    tokens: t.array(PublicToken),
    freeDistributionMode: t.union([StorefrontFreeDistributionMode, t.null]),
    currencyOption: t.union([StorefrontCurrencyOption, t.null]),
    phases: t.array(PublicPhase),
    media: t.union([StorefrontMedia, t.null]),
    emailCapture: t.union([StorefrontEmailCapture, t.null]),
    tokenAttributeSummaries: t.array(TokenAttributeSummary),
    /** The name of the storefront's organization */
    organizationName: t.string,
    organizationStripeAccount: t.union([t.string, t.null]),
    /** The storefront allows royalties to be paidback */
    royaltiesCanPayback: t.boolean,
    /** The storefront allows royalties status to be appealed */
    royaltiesCanAppeal: t.boolean,
    /** The time when the storefront was created. */
    createdAt: DateFromISODateString,
    importInfo: t.union([ImportCollectionInfo, t.null]),
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    /** The payee that will receive any royalties associated with secondary sales of the storefront; if a payment splitter is used then the address of the splitter should be put here; else put a single payee */
    secondarySalePayee: t.union([Address, t.null]),
    secondarySaleRecipients: t.union([AmountRecipients, t.null]),
    adSpaces: AdSpaces,
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
    placeholderToken: t.union([TokenDefinition, t.null]),
    /** The maximum number of tokenIds used; if a 1155 is used then this will not relate to the number of individual tokens under each token idea */
    uniqueTokens: t.union([U256ToString, t.null]),
  }),
);

export interface FeaturedStorefront {
  /** The identifier of the storefront */
  id: t.TypeOf<typeof UUIDFromString>;
  /** The storefront name */
  name: string;
  /** The storefront slug */
  slug: string | null;
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  /** The URI of the terms (if any) that control the storefront */
  userTerms: string | null;
  /** Whether or not the user must agree to the terms before interacting with the contract */
  userTermsRequired: boolean;
  /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
  secondarySaleBasisPoints: number | null;
  media: t.TypeOf<typeof StorefrontMedia> | null;
}

export const FeaturedStorefront = t.exact(
  t.type({
    /** The identifier of the storefront */
    id: UUIDFromString,
    /** The storefront name */
    name: t.string,
    /** The storefront slug */
    slug: t.union([t.string, t.null]),
    chainId: t.union([ChainIdToString, t.null]),
    /** The URI of the terms (if any) that control the storefront */
    userTerms: t.union([t.string, t.null]),
    /** Whether or not the user must agree to the terms before interacting with the contract */
    userTermsRequired: t.boolean,
    /** If the storefront will use royalties then the basis points for those royalties (not the percentage with a decimal) should be placed here */
    secondarySaleBasisPoints: t.union([t.number, t.null]),
    media: t.union([StorefrontMedia, t.null]),
  }),
);

export interface CreateStorefront {
  /** the id of the user that will own the storefront */
  organizationId: t.TypeOf<typeof UUIDFromString>;
  /** The storefront name */
  name: string;
  /** Whether or not this is a test storefront */
  isTestStorefront: boolean;
}

export const CreateStorefront = t.exact(
  t.type({
    /** the id of the user that will own the storefront */
    organizationId: UUIDFromString,
    /** The storefront name */
    name: t.string,
    /** Whether or not this is a test storefront */
    isTestStorefront: t.boolean,
  }),
);

export type FeaturedStorefronts = Array<t.TypeOf<typeof FeaturedStorefront>>;

export const FeaturedStorefronts = t.array(FeaturedStorefront);

export type Storefronts = Array<t.TypeOf<typeof Storefront>>;

export const Storefronts = t.array(Storefront);

export interface RoyaltyStatistics {
  /** The last time the statistics (`fractionPaid`, etc.) were updated for this storefront. Date is in ISO format. */
  updatedAt: t.TypeOf<typeof DateFromISODateString>;
  fractionPaid: number;
  received: t.TypeOf<typeof BigIntToString>;
  recouped: t.TypeOf<typeof BigIntToString>;
  outstanding: t.TypeOf<typeof BigIntToString>;
  leaked: t.TypeOf<typeof BigIntToString>;
  activeTokens: number;
  cleanActiveTokens: number;
}

export const RoyaltyStatistics = t.exact(
  t.type({
    /** The last time the statistics (`fractionPaid`, etc.) were updated for this storefront. Date is in ISO format. */
    updatedAt: DateFromISODateString,
    fractionPaid: t.number,
    received: BigIntToString,
    recouped: BigIntToString,
    outstanding: BigIntToString,
    leaked: BigIntToString,
    activeTokens: t.number,
    cleanActiveTokens: t.number,
  }),
);

export interface StorefrontRoyaltyStats {
  storefront: t.TypeOf<typeof RoyaltiesEnabledStorefront>;
  statistics: t.TypeOf<typeof RoyaltyStatistics>;
}

export const StorefrontRoyaltyStats = t.exact(
  t.type({
    storefront: RoyaltiesEnabledStorefront,
    statistics: RoyaltyStatistics,
  }),
);

export type RoyaltiesStats = Array<t.TypeOf<typeof StorefrontRoyaltyStats>>;

export const RoyaltiesStats = t.array(StorefrontRoyaltyStats);

export interface ClaimProofForAddress {
  merkleProof: Array<string>;
  maximumAmountProof: t.TypeOf<typeof UInt256ToString>;
}

export const ClaimProofForAddress = t.exact(
  t.type({
    merkleProof: t.array(t.string),
    maximumAmountProof: UInt256ToString,
  }),
);

/** Is the address allowlisted? */
export type Listed = boolean;

/** Is the address allowlisted? */
export const Listed = t.boolean;

export type StorefrontMediaFileType =
  | 'logoImage'
  | 'bannerImage'
  | 'adSpaceImage'
  | 'adSpaceVideoPoster'
  | 'redeemImage'
  | 'membershipListImage';

export const StorefrontMediaFileType = t.union([
  t.literal('logoImage'),
  t.literal('bannerImage'),
  t.literal('adSpaceImage'),
  t.literal('adSpaceVideoPoster'),
  t.literal('redeemImage'),
  t.literal('membershipListImage'),
]);

export type StorefrontFileType =
  | 'logoImage'
  | 'bannerImage'
  | 'adSpaceImage'
  | 'adSpaceVideoPoster'
  | 'redeemImage'
  | 'membershipListImage';

export const StorefrontFileType = t.union([
  t.literal('logoImage'),
  t.literal('bannerImage'),
  t.literal('adSpaceImage'),
  t.literal('adSpaceVideoPoster'),
  t.literal('redeemImage'),
  t.literal('membershipListImage'),
]);

export interface UploadedStorefrontFile {
  type: t.TypeOf<typeof StorefrontFileType>;
  url: string;
}

export const UploadedStorefrontFile = t.exact(
  t.type({
    type: StorefrontFileType,
    url: t.string,
  }),
);

export type UploadedStorefrontFileResponse = t.TypeOf<typeof UploadedStorefrontFile>;

export const UploadedStorefrontFileResponse = UploadedStorefrontFile;

export interface UploadStorefrontFileBody {
  type: t.TypeOf<typeof StorefrontFileType>;
  file: t.TypeOf<typeof MultipartFileData>;
}

export const UploadStorefrontFileBody = t.exact(
  t.type({
    type: StorefrontFileType,
    file: MultipartFileData,
  }),
);

export type CollectionModification =
  | 'Published'
  | 'TokensetUpdated'
  | 'PhasesetUpdated'
  | 'CollectionInformationUpdated'
  | 'Multicall'
  | 'AspenContract';

export const CollectionModification = t.union([
  t.literal('Published'),
  t.literal('TokensetUpdated'),
  t.literal('PhasesetUpdated'),
  t.literal('CollectionInformationUpdated'),
  t.literal('Multicall'),
  t.literal('AspenContract'),
]);

export interface CollectionHistoryEntry {
  transactionHash: string;
  changeNotes: {
    type: t.TypeOf<typeof CollectionModification>;
    notes: string;
  };
  data?: Record<string, unknown> | null;
}

export const CollectionHistoryEntry = t.exact(
  t.intersection([
    t.type({
      transactionHash: t.string,
      changeNotes: t.exact(
        t.type({
          type: CollectionModification,
          notes: t.string,
        }),
      ),
    }),
    t.partial({
      data: t.union([t.record(t.string, t.unknown), t.null]),
    }),
  ]),
);

export type CollectionHistoryEntries = Array<t.TypeOf<typeof CollectionHistoryEntry>>;

export const CollectionHistoryEntries = t.array(CollectionHistoryEntry);

export interface BaseCollectionInfo {
  name: string;
  description: string | null;
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  contractAddress: t.TypeOf<typeof Address> | null;
  storefrontId: t.TypeOf<typeof UUIDFromString> | null;
  storefrontSlug: string | null;
  logo: string | null;
  banner: string | null;
  verifications: t.TypeOf<typeof ContractVerifications>;
  creator: string | null;
  enabled: boolean;
  /** Whether or not trading is enabled for this storefront */
  marketplaceEnabled: boolean;
  emailCapture: {
    enabled: boolean;
    mandatory: boolean;
  } | null;
  /** Version of TermsRegistry used by non-Aspen collections */
  userTermsRegistryVersion: number | null;
}

export const BaseCollectionInfo = t.exact(
  t.type({
    name: t.string,
    description: t.union([t.string, t.null]),
    chainId: t.union([ChainIdToString, t.null]),
    contractAddress: t.union([Address, t.null]),
    storefrontId: t.union([UUIDFromString, t.null]),
    storefrontSlug: t.union([t.string, t.null]),
    logo: t.union([t.string, t.null]),
    banner: t.union([t.string, t.null]),
    verifications: ContractVerifications,
    creator: t.union([t.string, t.null]),
    enabled: t.boolean,
    /** Whether or not trading is enabled for this storefront */
    marketplaceEnabled: t.boolean,
    emailCapture: t.union([
      t.exact(
        t.type({
          enabled: t.boolean,
          mandatory: t.boolean,
        }),
      ),
      t.null,
    ]),
    /** Version of TermsRegistry used by non-Aspen collections */
    userTermsRegistryVersion: t.union([t.number, t.null]),
  }),
);

export interface NumericCondition {
  satisfied: boolean;
  metadata: {
    required: t.TypeOf<typeof IntegerToString>;
    actual: t.TypeOf<typeof IntegerToString>;
  };
}

export const NumericCondition = t.exact(
  t.type({
    satisfied: t.boolean,
    metadata: t.exact(
      t.type({
        required: IntegerToString,
        actual: IntegerToString,
      }),
    ),
  }),
);

export interface BooleanCondition {
  satisfied: boolean;
}

export const BooleanCondition = t.exact(
  t.type({
    satisfied: t.boolean,
  }),
);

export interface SubscribedCondition {
  satisfied: boolean;
  metadata: {
    subscriptionId: t.TypeOf<typeof UUIDFromString>;
  };
}

export const SubscribedCondition = t.exact(
  t.type({
    satisfied: t.boolean,
    metadata: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
  }),
);

export interface StorefrontMembership {
  conditions: {
    tokensHeld: t.TypeOf<typeof NumericCondition> | null;
    royaltyCleanTokensHeld: t.TypeOf<typeof NumericCondition> | null;
    emailDisclosed: t.TypeOf<typeof BooleanCondition> | null;
    subscribed: t.TypeOf<typeof SubscribedCondition> | null;
  };
  name: string;
  listId: number;
  displayOrder: number;
  description: string | null;
  image: string | null;
  utility: {
    discord?: {
      discordLink: string;
    } | null;
  };
  config: t.TypeOf<typeof MembershipListConfig>;
}

export const StorefrontMembership = t.exact(
  t.type({
    conditions: t.exact(
      t.type({
        tokensHeld: t.union([NumericCondition, t.null]),
        royaltyCleanTokensHeld: t.union([NumericCondition, t.null]),
        emailDisclosed: t.union([BooleanCondition, t.null]),
        subscribed: t.union([SubscribedCondition, t.null]),
      }),
    ),
    name: t.string,
    listId: t.number,
    displayOrder: t.number,
    description: t.union([t.string, t.null]),
    image: t.union([t.string, t.null]),
    utility: t.exact(
      t.partial({
        discord: t.union([
          t.exact(
            t.type({
              discordLink: t.string,
            }),
          ),
          t.null,
        ]),
      }),
    ),
    config: MembershipListConfig,
  }),
);

export type StorefrontMemberships = Array<t.TypeOf<typeof StorefrontMembership>>;

export const StorefrontMemberships = t.array(StorefrontMembership);

export interface StorefrontMembershipListDisplayOrder {
  listId: number;
  displayOrder: number;
}

export const StorefrontMembershipListDisplayOrder = t.exact(
  t.type({
    listId: t.number,
    displayOrder: t.number,
  }),
);

export type UpdateStorefrontMembershipListDisplayOrderRequest = Array<
  t.TypeOf<typeof StorefrontMembershipListDisplayOrder>
>;

export const UpdateStorefrontMembershipListDisplayOrderRequest = t.array(StorefrontMembershipListDisplayOrder);

export type RedeemableTokenId = t.TypeOf<typeof UInt256ToString> | '--anyToken--' | '--noToken--';

export const RedeemableTokenId = t.union([UInt256ToString, t.literal('--anyToken--'), t.literal('--noToken--')]);

export interface OneTimePad {
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  redeemableTokenId?: t.TypeOf<typeof RedeemableTokenId>;
  pad: string;
  issuanceId?: string;
  droppedAt?: string | null;
  emailAddress?: string | null;
}

export const OneTimePad = t.exact(
  t.intersection([
    t.type({
      chainId: ChainIdToString,
      contractAddress: Address,
      pad: t.string,
    }),
    t.partial({
      redeemableTokenId: RedeemableTokenId,
      issuanceId: t.string,
      droppedAt: t.union([t.string, t.null]),
      emailAddress: t.union([t.string, t.null]),
    }),
  ]),
);

export interface RedeemNftDropOneTimePadRequest {
  receiverAddress: t.TypeOf<typeof Address>;
  /** The quantity of NFTs to issue */
  quantityToIssue: number;
  /** The optional tokenId to issue for ERC1155 */
  tokenId?: number;
  /** The optional token URI */
  tokenUri?: string;
  pad: string;
}

export const RedeemNftDropOneTimePadRequest = t.exact(
  t.intersection([
    t.type({
      receiverAddress: Address,
      /** The quantity of NFTs to issue */
      quantityToIssue: t.number,
      pad: t.string,
    }),
    t.partial({
      /** The optional tokenId to issue for ERC1155 */
      tokenId: t.number,
      /** The optional token URI */
      tokenUri: t.string,
    }),
  ]),
);

export interface NftDropStorefrontStats {
  totalPads: number;
  redeemedPads: number;
}

export const NftDropStorefrontStats = t.exact(
  t.type({
    totalPads: t.number,
    redeemedPads: t.number,
  }),
);

export interface NftDropStorefront {
  storefront: t.TypeOf<typeof Storefront>;
  stats: t.TypeOf<typeof NftDropStorefrontStats>;
}

export const NftDropStorefront = t.exact(
  t.type({
    storefront: Storefront,
    stats: NftDropStorefrontStats,
  }),
);

export interface NftDropStorefrontPad {
  pad: string;
  redeemableTokenId: t.TypeOf<typeof RedeemableTokenId>;
  droppedAt?: string | null;
  emailAddress?: string | null;
}

export const NftDropStorefrontPad = t.exact(
  t.intersection([
    t.type({
      pad: t.string,
      redeemableTokenId: RedeemableTokenId,
    }),
    t.partial({
      droppedAt: t.union([t.string, t.null]),
      emailAddress: t.union([t.string, t.null]),
    }),
  ]),
);

export interface NftDropStorefrontListResponse {
  data: Array<t.TypeOf<typeof NftDropStorefront>>;
}

export const NftDropStorefrontListResponse = t.exact(
  t.type({
    data: t.array(NftDropStorefront),
  }),
);

export interface NftDropStorefrontPadsResponse {
  total: number;
  items: Array<t.TypeOf<typeof NftDropStorefrontPad>>;
}

export const NftDropStorefrontPadsResponse = t.exact(
  t.type({
    total: t.number,
    items: t.array(NftDropStorefrontPad),
  }),
);

export interface GenerateOneTimePadsResponse {
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  existingPads: number;
  padsCreated: number;
  padsDeleted: number;
}

export const GenerateOneTimePadsResponse = t.exact(
  t.type({
    chainId: ChainIdToString,
    contractAddress: Address,
    existingPads: t.number,
    padsCreated: t.number,
    padsDeleted: t.number,
  }),
);

export interface SendRequestNftDropEmailRequest {
  email: string;
  reCaptchaToken: string;
  clientFingerprint: string;
}

export const SendRequestNftDropEmailRequest = t.exact(
  t.type({
    email: t.string,
    reCaptchaToken: t.string,
    clientFingerprint: t.string,
  }),
);

export interface NftDropCTA {
  title: string;
  redirectUrl: string;
}

export const NftDropCTA = t.exact(
  t.type({
    title: t.string,
    redirectUrl: t.string,
  }),
);

export type MemberRoles = 'ADMIN' | 'MEMBER' | 'READONLY';

export const MemberRoles = t.union([t.literal('ADMIN'), t.literal('MEMBER'), t.literal('READONLY')]);

export interface OrganizationInformation {
  organizationId: t.TypeOf<typeof UUIDFromString>;
  role: t.TypeOf<typeof MemberRoles>;
  organizationName: string;
}

export const OrganizationInformation = t.exact(
  t.type({
    organizationId: UUIDFromString,
    role: MemberRoles,
    organizationName: t.string,
  }),
);

export type Organizations = Array<t.TypeOf<typeof OrganizationInformation>>;

export const Organizations = t.array(OrganizationInformation);

export interface WalletInformation {
  address: t.TypeOf<typeof Address>;
  displayOrder?: number;
}

export const WalletInformation = t.exact(
  t.intersection([
    t.type({
      address: Address,
    }),
    t.partial({
      displayOrder: t.number,
    }),
  ]),
);

export interface MemberInformation {
  userId: t.TypeOf<typeof UUIDFromString>;
  name?: string;
  role: t.TypeOf<typeof MemberRoles>;
  wallets?: Array<t.TypeOf<typeof WalletInformation>>;
}

export const MemberInformation = t.exact(
  t.intersection([
    t.type({
      userId: UUIDFromString,
      role: MemberRoles,
    }),
    t.partial({
      name: t.string,
      wallets: t.array(WalletInformation),
    }),
  ]),
);

export interface Invitation {
  invitationCode?: t.TypeOf<typeof UUIDFromString>;
  userId: t.TypeOf<typeof UUIDFromString> | null;
  userAddress: t.TypeOf<typeof Address> | null;
  userEmail: string | null;
  role: t.TypeOf<typeof MemberRoles>;
}

export const Invitation = t.exact(
  t.intersection([
    t.type({
      userId: t.union([UUIDFromString, t.null]),
      userAddress: t.union([Address, t.null]),
      userEmail: t.union([t.string, t.null]),
      role: MemberRoles,
    }),
    t.partial({
      invitationCode: UUIDFromString,
    }),
  ]),
);

export interface Organization {
  id: t.TypeOf<typeof UUIDFromString>;
  name: string;
  information: t.TypeOf<typeof CreatorInformation> | null;
  members: Array<t.TypeOf<typeof MemberInformation>>;
  invitees: Array<t.TypeOf<typeof Invitation>>;
  storefronts: Array<t.TypeOf<typeof UUIDFromString>>;
  reservoirWallet: t.TypeOf<typeof Address> | null;
  stripeAccount?: string | null;
}

export const Organization = t.exact(
  t.intersection([
    t.type({
      id: UUIDFromString,
      name: t.string,
      information: t.union([CreatorInformation, t.null]),
      members: t.array(MemberInformation),
      invitees: t.array(Invitation),
      storefronts: t.array(UUIDFromString),
      reservoirWallet: t.union([Address, t.null]),
    }),
    t.partial({
      stripeAccount: t.union([t.string, t.null]),
    }),
  ]),
);

export interface CreateOrganization {
  name: string;
  information: t.TypeOf<typeof CreatorInformation> | null;
  members: Array<t.TypeOf<typeof MemberInformation>>;
}

export const CreateOrganization = t.exact(
  t.type({
    name: t.string,
    information: t.union([CreatorInformation, t.null]),
    members: t.array(MemberInformation),
  }),
);

export interface CreateGasWalletResponse {
  reservoirWallet: string | null;
}

export const CreateGasWalletResponse = t.exact(
  t.type({
    reservoirWallet: t.union([t.string, t.null]),
  }),
);

export interface UpdateOrganizationNameRequest {
  name: string;
}

export const UpdateOrganizationNameRequest = t.exact(
  t.type({
    name: t.string,
  }),
);

export interface GetOrganizationRequest {
  requesterRole: t.TypeOf<typeof MemberRoles>;
  organization: t.TypeOf<typeof Organization>;
}

export const GetOrganizationRequest = t.exact(
  t.type({
    requesterRole: MemberRoles,
    organization: Organization,
  }),
);

export interface UserInvitation {
  invitationCode: t.TypeOf<typeof UUIDFromString>;
  organizationId: t.TypeOf<typeof UUIDFromString>;
  organizationName: string;
  role: t.TypeOf<typeof MemberRoles>;
}

export const UserInvitation = t.exact(
  t.type({
    invitationCode: UUIDFromString,
    organizationId: UUIDFromString,
    organizationName: t.string,
    role: MemberRoles,
  }),
);

export type UserInvitations = Array<t.TypeOf<typeof UserInvitation>>;

export const UserInvitations = t.array(UserInvitation);

export interface JobStatus {
  status: 'success' | 'error';
  message: string | null;
}

export const JobStatus = t.exact(
  t.type({
    status: t.union([t.literal('success'), t.literal('error')]),
    message: t.union([t.string, t.null]),
  }),
);

export interface ConnectStripeAccountBody {
  code: string;
}

export const ConnectStripeAccountBody = t.exact(
  t.type({
    code: t.string,
  }),
);

export interface DisconnectStripeAccountBody {
  stripeUserId: string;
}

export const DisconnectStripeAccountBody = t.exact(
  t.type({
    stripeUserId: t.string,
  }),
);

export type GassedBy = 'USER' | 'PLATFORM';

export const GassedBy = t.union([t.literal('USER'), t.literal('PLATFORM')]);

export type TransactionStatus = 'READY' | 'PENDING' | 'COMPLETE' | 'ERROR';

export const TransactionStatus = t.union([
  t.literal('READY'),
  t.literal('PENDING'),
  t.literal('COMPLETE'),
  t.literal('ERROR'),
]);

export interface RelayerPermission {
  /** the chain the permission relates to */
  chain: t.TypeOf<typeof ChainIdToString>;
  gassedBy: t.TypeOf<typeof GassedBy>;
}

export const RelayerPermission = t.exact(
  t.type({
    /** the chain the permission relates to */
    chain: ChainIdToString,
    gassedBy: GassedBy,
  }),
);

export interface RelayPool {
  /** the organization that controls the relay pool */
  organizationId: t.TypeOf<typeof UUIDFromString>;
  /** the address that users will top up */
  reservoir: t.TypeOf<typeof Address>;
  /** the number of signature relayers requested */
  relayerLimit: number;
  relayers: Array<t.TypeOf<typeof Address>>;
  permissions: Array<t.TypeOf<typeof RelayerPermission>>;
}

export const RelayPool = t.exact(
  t.type({
    /** the organization that controls the relay pool */
    organizationId: UUIDFromString,
    /** the address that users will top up */
    reservoir: Address,
    /** the number of signature relayers requested */
    relayerLimit: t.number,
    relayers: t.array(Address),
    permissions: t.array(RelayerPermission),
  }),
);

export interface TransactionRelay {
  /** the chain the permission relates to */
  chainId: t.TypeOf<typeof ChainIdToString>;
  /** the contract address the transaction relates to; if null will be a deploy */
  contractAddress: t.TypeOf<typeof Address>;
  /** the raw transaction in unsigned bytes form; passed as a string */
  transaction: string;
}

export const TransactionRelay = t.exact(
  t.type({
    /** the chain the permission relates to */
    chainId: ChainIdToString,
    /** the contract address the transaction relates to; if null will be a deploy */
    contractAddress: Address,
    /** the raw transaction in unsigned bytes form; passed as a string */
    transaction: t.string,
  }),
);

export interface TransactionState {
  status: t.TypeOf<typeof TransactionStatus>;
  relayerAddress: t.TypeOf<typeof Address> | null;
  chainId: t.TypeOf<typeof ChainIdToString> | null;
  contractAddress: t.TypeOf<typeof Address> | null;
  transactionHash: string | null;
  blockNumber: t.TypeOf<typeof UInt256ToString> | null;
  blockHash: string | null;
  gasAmount: t.TypeOf<typeof UInt256ToString> | null;
  gasCost: t.TypeOf<typeof UInt256ToString> | null;
  fees: t.TypeOf<typeof UInt256ToString> | null;
}

export const TransactionState = t.exact(
  t.type({
    status: TransactionStatus,
    relayerAddress: t.union([Address, t.null]),
    chainId: t.union([ChainIdToString, t.null]),
    contractAddress: t.union([Address, t.null]),
    transactionHash: t.union([t.string, t.null]),
    blockNumber: t.union([UInt256ToString, t.null]),
    blockHash: t.union([t.string, t.null]),
    gasAmount: t.union([UInt256ToString, t.null]),
    gasCost: t.union([UInt256ToString, t.null]),
    fees: t.union([UInt256ToString, t.null]),
  }),
);

export interface RelayedTransaction {
  /** the transactions id within the platform */
  id: t.TypeOf<typeof UUIDFromString>;
  relayer: t.TypeOf<typeof Address> | null;
  state: t.TypeOf<typeof TransactionState>;
  /** the raw transaction in unsigned bytes form; passed as a string */
  transaction: string;
}

export const RelayedTransaction = t.exact(
  t.type({
    /** the transactions id within the platform */
    id: UUIDFromString,
    relayer: t.union([Address, t.null]),
    state: TransactionState,
    /** the raw transaction in unsigned bytes form; passed as a string */
    transaction: t.string,
  }),
);

export type RelayedTransactions = Array<t.TypeOf<typeof RelayedTransaction>>;

export const RelayedTransactions = t.array(RelayedTransaction);

export interface TokenIssuance {
  /** the address to send the token to */
  destinationAddress?: t.TypeOf<typeof Address>;
  /** the email address to send the token to; use if the address is not known; if both the address and email are given, the email will be ignored */
  destinationEmail?: string;
  /** the id of the storefront */
  storefront: t.TypeOf<typeof UUIDFromString>;
  /** the token ID to issue; only applicable if the contract is an ERC-1155 */
  tokenID?: t.TypeOf<typeof UInt256ToString>;
  /** the amount of tokens to share; only applicable if the contract is an ERC-1155 */
  amount?: t.TypeOf<typeof UInt256ToString>;
  tokenData?: t.TypeOf<typeof TokenDefinition> | null;
}

export const TokenIssuance = t.exact(
  t.intersection([
    t.type({
      /** the id of the storefront */
      storefront: UUIDFromString,
    }),
    t.partial({
      /** the address to send the token to */
      destinationAddress: Address,
      /** the email address to send the token to; use if the address is not known; if both the address and email are given, the email will be ignored */
      destinationEmail: t.string,
      /** the token ID to issue; only applicable if the contract is an ERC-1155 */
      tokenID: UInt256ToString,
      /** the amount of tokens to share; only applicable if the contract is an ERC-1155 */
      amount: UInt256ToString,
      tokenData: t.union([TokenDefinition, t.null]),
    }),
  ]),
);

export interface IssuedToken {
  /** the issuance id */
  id: t.TypeOf<typeof UUIDFromString>;
  /** the chain the permission relates to */
  chainId: t.TypeOf<typeof ChainIdToString>;
  /** the address of the contract issuing from */
  contractAddress: t.TypeOf<typeof Address>;
  tokenID: t.TypeOf<typeof UInt256ToString> | null;
  amount: t.TypeOf<typeof UInt256ToString> | null;
  state: t.TypeOf<typeof TransactionState>;
}

export const IssuedToken = t.exact(
  t.type({
    /** the issuance id */
    id: UUIDFromString,
    /** the chain the permission relates to */
    chainId: ChainIdToString,
    /** the address of the contract issuing from */
    contractAddress: Address,
    tokenID: t.union([UInt256ToString, t.null]),
    amount: t.union([UInt256ToString, t.null]),
    state: TransactionState,
  }),
);

export type IssuedTokens = Array<t.TypeOf<typeof IssuedToken>>;

export const IssuedTokens = t.array(IssuedToken);

export interface RoyaltyRules {
  bps: number;
  receiver: t.TypeOf<typeof Address>;
  canPayback: boolean;
  canAppeal: boolean;
}

export const RoyaltyRules = t.exact(
  t.type({
    bps: t.number,
    receiver: Address,
    canPayback: t.boolean,
    canAppeal: t.boolean,
  }),
);

export interface RoyaltiesAppealCollectorClaims {
  excuse: string;
  transactionHashes: Array<t.TypeOf<typeof TransactionHash>>;
}

export const RoyaltiesAppealCollectorClaims = t.exact(
  t.type({
    excuse: t.string,
    transactionHashes: t.array(TransactionHash),
  }),
);

export interface CreateRoyaltiesAppealBody {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  prepayment: t.TypeOf<typeof CurrencyAmount>;
  collectorClaims: t.TypeOf<typeof RoyaltiesAppealCollectorClaims>;
}

export const CreateRoyaltiesAppealBody = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    prepayment: CurrencyAmount,
    collectorClaims: RoyaltiesAppealCollectorClaims,
  }),
);

export type GetRoyaltiesSettlementOptionsResponse = Array<t.TypeOf<typeof CurrencyAmount>>;

export const GetRoyaltiesSettlementOptionsResponse = t.array(CurrencyAmount);

export type GetRoyaltiesSettlementInstructionsResponse = Array<t.TypeOf<typeof EthereumTransactionTemplate>>;

export const GetRoyaltiesSettlementInstructionsResponse = t.array(EthereumTransactionTemplate);

export type NftAcquisitionKeys = Array<t.TypeOf<typeof NftAcquisitionKey>>;

export const NftAcquisitionKeys = t.array(NftAcquisitionKey);

export interface RoyaltiesInAppAppealsConfiguration {
  venue: 'inApp';
}

export const RoyaltiesInAppAppealsConfiguration = t.exact(
  t.type({
    venue: t.literal('inApp'),
  }),
);

export interface RoyaltiesDiscordAppealsConfiguration {
  venue: 'discord';
  config: {
    guildId: t.TypeOf<typeof DiscordId>;
    channelCategory: t.TypeOf<typeof DiscordId>;
    membersWhoCanResolve: Array<t.TypeOf<typeof DiscordId>>;
    membersToAdd: Array<t.TypeOf<typeof DiscordId>>;
    channelPrefix: string;
    roomPermissions: {
      attachFiles: boolean;
      embedLinks: boolean;
      addReactions: boolean;
    };
  };
}

export const RoyaltiesDiscordAppealsConfiguration = t.exact(
  t.type({
    venue: t.literal('discord'),
    config: t.exact(
      t.type({
        guildId: DiscordId,
        channelCategory: DiscordId,
        membersWhoCanResolve: t.array(DiscordId),
        membersToAdd: t.array(DiscordId),
        channelPrefix: t.string,
        roomPermissions: t.exact(
          t.type({
            attachFiles: t.boolean,
            embedLinks: t.boolean,
            addReactions: t.boolean,
          }),
        ),
      }),
    ),
  }),
);

export interface RoyaltiesAppealsConfiguration {
  inApp?: t.TypeOf<typeof RoyaltiesInAppAppealsConfiguration> | null;
  discord?: t.TypeOf<typeof RoyaltiesDiscordAppealsConfiguration> | null;
}

export const RoyaltiesAppealsConfiguration = t.exact(
  t.partial({
    inApp: t.union([RoyaltiesInAppAppealsConfiguration, t.null]),
    discord: t.union([RoyaltiesDiscordAppealsConfiguration, t.null]),
  }),
);

export type AppealsStatus = 'accepted' | 'pending' | 'rejected' | 'withdrawn';

export const AppealsStatus = t.union([
  t.literal('accepted'),
  t.literal('pending'),
  t.literal('rejected'),
  t.literal('withdrawn'),
]);

export type RoyaltiesAppealsVenue = 'inApp' | 'discord';

export const RoyaltiesAppealsVenue = t.union([t.literal('inApp'), t.literal('discord')]);

export type RoyaltiesChangedEventSource = 'onChain' | 'userEntry';

export const RoyaltiesChangedEventSource = t.union([t.literal('onChain'), t.literal('userEntry')]);

export interface RoyaltiesChangedEvent {
  timestamp: t.TypeOf<typeof DateFromISODateString>;
  amount: number;
  recipient: t.TypeOf<typeof Address>;
  source: t.TypeOf<typeof RoyaltiesChangedEventSource>;
}

export const RoyaltiesChangedEvent = t.exact(
  t.type({
    timestamp: DateFromISODateString,
    amount: t.number,
    recipient: Address,
    source: RoyaltiesChangedEventSource,
  }),
);

export interface RoyaltiesConfiguration {
  canPayback: boolean;
  canAppeal: boolean;
  appealsVenue: t.TypeOf<typeof RoyaltiesAppealsVenue> | null;
  appealsConfigs: t.TypeOf<typeof RoyaltiesAppealsConfiguration>;
  safeAddresses: Array<t.TypeOf<typeof Address>>;
  royaltiesChangedEvents: Array<t.TypeOf<typeof RoyaltiesChangedEvent>>;
}

export const RoyaltiesConfiguration = t.exact(
  t.type({
    canPayback: t.boolean,
    canAppeal: t.boolean,
    appealsVenue: t.union([RoyaltiesAppealsVenue, t.null]),
    appealsConfigs: RoyaltiesAppealsConfiguration,
    safeAddresses: t.array(Address),
    royaltiesChangedEvents: t.array(RoyaltiesChangedEvent),
  }),
);

export interface SubscriptionPaymentDetails {
  recipient: t.TypeOf<typeof Address>;
  token: t.TypeOf<typeof Address>;
  amount: t.TypeOf<typeof StringInteger>;
  chainId: t.TypeOf<typeof ChainIdToString>;
}

export const SubscriptionPaymentDetails = t.exact(
  t.type({
    recipient: Address,
    token: Address,
    amount: StringInteger,
    chainId: ChainIdToString,
  }),
);

export interface Subscription {
  id: t.TypeOf<typeof UUIDFromString>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  name: string;
  duration: t.TypeOf<typeof Duration>;
  payments: t.TypeOf<typeof SubscriptionPaymentDetails>;
}

export const Subscription = t.exact(
  t.type({
    id: UUIDFromString,
    storefrontId: UUIDFromString,
    name: t.string,
    duration: Duration,
    payments: SubscriptionPaymentDetails,
  }),
);

export type SubscriptionService = 'discord';

export const SubscriptionService = t.literal('discord');

export type Subscriptions = Array<t.TypeOf<typeof Subscription>>;

export const Subscriptions = t.array(Subscription);

export type SubscriptionReleaseStatus = 'PRIVATE' | 'PUBLISHED';

export const SubscriptionReleaseStatus = t.union([t.literal('PRIVATE'), t.literal('PUBLISHED')]);

export interface StorefrontData {
  id: t.TypeOf<typeof UUIDFromString>;
  name: string;
  contractAddress: t.TypeOf<typeof Address>;
  chainId: t.TypeOf<typeof ChainIdToString>;
}

export const StorefrontData = t.exact(
  t.type({
    id: UUIDFromString,
    name: t.string,
    contractAddress: Address,
    chainId: ChainIdToString,
  }),
);

export type DetailedSubscription = t.TypeOf<typeof Subscription> & {
  subscribers: number | null;
  invoiceAmountTotal: t.TypeOf<typeof UInt256ToString>;
  subscribedHolderCount: number;
  releaseStatus: t.TypeOf<typeof SubscriptionReleaseStatus>;
};

export const DetailedSubscription = t.intersection([
  Subscription,
  t.exact(
    t.type({
      subscribers: t.union([t.number, t.null]),
      invoiceAmountTotal: UInt256ToString,
      subscribedHolderCount: t.number,
      releaseStatus: SubscriptionReleaseStatus,
    }),
  ),
]);

export type SubscriptionWithStorefrontData = t.TypeOf<typeof DetailedSubscription> & {
  storefrontData: t.TypeOf<typeof StorefrontData>;
};

export const SubscriptionWithStorefrontData = t.intersection([
  DetailedSubscription,
  t.exact(
    t.type({
      storefrontData: StorefrontData,
    }),
  ),
]);

export type SubscriptionsWithStorefrontData = Array<t.TypeOf<typeof SubscriptionWithStorefrontData>>;

export const SubscriptionsWithStorefrontData = t.array(SubscriptionWithStorefrontData);

export type UserSatisfiesSubscriptionRequirementsResponse = boolean;

export const UserSatisfiesSubscriptionRequirementsResponse = t.boolean;

export interface CreateSubscriptionBody {
  name: string;
  duration: t.TypeOf<typeof Duration>;
  payments: t.TypeOf<typeof SubscriptionPaymentDetails>;
}

export const CreateSubscriptionBody = t.exact(
  t.type({
    name: t.string,
    duration: Duration,
    payments: SubscriptionPaymentDetails,
  }),
);

export interface EditSubscription {
  name: string;
  duration: t.TypeOf<typeof Duration>;
  payments: t.TypeOf<typeof SubscriptionPaymentDetails>;
  releaseStatus: t.TypeOf<typeof SubscriptionReleaseStatus>;
}

export const EditSubscription = t.exact(
  t.type({
    name: t.string,
    duration: Duration,
    payments: SubscriptionPaymentDetails,
    releaseStatus: SubscriptionReleaseStatus,
  }),
);

export interface CreateSubscriptionCouponBody {
  /** Coupon name */
  name: string;
  discountPercentage: t.TypeOf<typeof IntegerToString>;
}

export const CreateSubscriptionCouponBody = t.exact(
  t.type({
    /** Coupon name */
    name: t.string,
    discountPercentage: IntegerToString,
  }),
);

export interface DeleteSubscriptionCouponBody {
  /** Coupon name */
  name: string;
}

export const DeleteSubscriptionCouponBody = t.exact(
  t.type({
    /** Coupon name */
    name: t.string,
  }),
);

export interface SubscriptionCouponDefinition {
  name: string;
  discountPercentage: t.TypeOf<typeof IntegerToString>;
  id: t.TypeOf<typeof UUIDFromString>;
}

export const SubscriptionCouponDefinition = t.exact(
  t.type({
    name: t.string,
    discountPercentage: IntegerToString,
    id: UUIDFromString,
  }),
);

export interface GetSubscriptionCouponsResponse {
  coupons: Array<t.TypeOf<typeof SubscriptionCouponDefinition>>;
}

export const GetSubscriptionCouponsResponse = t.exact(
  t.type({
    coupons: t.array(SubscriptionCouponDefinition),
  }),
);

export interface CreateVoucherCampaignBody {
  /** Voucher campaign name */
  name: string;
  /** Voucher duration in ISO 8601 format */
  duration: t.TypeOf<typeof Duration>;
  /** Quantity of vouchers to issue */
  quantity: t.TypeOf<typeof IntegerToString>;
}

export const CreateVoucherCampaignBody = t.exact(
  t.type({
    /** Voucher campaign name */
    name: t.string,
    /** Voucher duration in ISO 8601 format */
    duration: Duration,
    /** Quantity of vouchers to issue */
    quantity: IntegerToString,
  }),
);

export interface VoucherCampaign {
  /** The identifier of the voucher campaign */
  id: t.TypeOf<typeof UUIDFromString>;
  /** The time when the voucher campaign was created */
  createdAt: t.TypeOf<typeof DateFromISODateString>;
  /** Voucher campaign name */
  name: string;
  /** Voucher duration in ISO 8601 format */
  duration: t.TypeOf<typeof Duration>;
  /** Quantity of vouchers issued */
  quantity: t.TypeOf<typeof IntegerToString>;
  /** Quantity of vouchers redeemed */
  redeemed: t.TypeOf<typeof IntegerToString>;
}

export const VoucherCampaign = t.exact(
  t.type({
    /** The identifier of the voucher campaign */
    id: UUIDFromString,
    /** The time when the voucher campaign was created */
    createdAt: DateFromISODateString,
    /** Voucher campaign name */
    name: t.string,
    /** Voucher duration in ISO 8601 format */
    duration: Duration,
    /** Quantity of vouchers issued */
    quantity: IntegerToString,
    /** Quantity of vouchers redeemed */
    redeemed: IntegerToString,
  }),
);

export type VoucherCampaigns = Array<t.TypeOf<typeof VoucherCampaign>>;

export const VoucherCampaigns = t.array(VoucherCampaign);

export interface EditVoucherCampaign {
  /** Voucher campaign name */
  name: string;
}

export const EditVoucherCampaign = t.exact(
  t.type({
    /** Voucher campaign name */
    name: t.string,
  }),
);

export interface Voucher {
  code: string;
  status: 'UNCLAIMED' | 'CLAIMED';
}

export const Voucher = t.exact(
  t.type({
    code: t.string,
    status: t.union([t.literal('UNCLAIMED'), t.literal('CLAIMED')]),
  }),
);

export type Vouchers = Array<t.TypeOf<typeof Voucher>>;

export const Vouchers = t.array(Voucher);

export interface RedeemSubscriptionVoucherBody {
  signature: string;
}

export const RedeemSubscriptionVoucherBody = t.exact(
  t.type({
    signature: t.string,
  }),
);

export type RedeemSubscriptionVoucherResponse = string | null;

export const RedeemSubscriptionVoucherResponse = t.union([t.string, t.null]);

export interface GetSubscriptionSubscriberResponse {
  expiry: t.TypeOf<typeof DateFromISODateString> | null;
}

export const GetSubscriptionSubscriberResponse = t.exact(
  t.type({
    expiry: t.union([DateFromISODateString, t.null]),
  }),
);

export interface RaiseSubscriptionInvoiceBody {
  periods: number;
  couponName?: string | null;
}

export const RaiseSubscriptionInvoiceBody = t.exact(
  t.intersection([
    t.type({
      periods: t.number,
    }),
    t.partial({
      couponName: t.union([t.string, t.null]),
    }),
  ]),
);

export type RaiseSubscriptionInvoiceResponse = Array<t.TypeOf<typeof EthereumTransactionTemplate>>;

export const RaiseSubscriptionInvoiceResponse = t.array(EthereumTransactionTemplate);

export type GetStorefrontIdsForSubscriptionResponse = t.TypeOf<typeof UUIDFromString> | null;

export const GetStorefrontIdsForSubscriptionResponse = t.union([UUIDFromString, t.null]);

export interface SetSubscriptionReleaseStatusBody {
  releaseStatus: t.TypeOf<typeof SubscriptionReleaseStatus>;
}

export const SetSubscriptionReleaseStatusBody = t.exact(
  t.type({
    releaseStatus: SubscriptionReleaseStatus,
  }),
);

export interface SubscriptionCouponInformation {
  name: string;
  discountPercentage: t.TypeOf<typeof IntegerToString>;
}

export const SubscriptionCouponInformation = t.exact(
  t.type({
    name: t.string,
    discountPercentage: IntegerToString,
  }),
);

export interface SubscriptionPaymentInformation {
  transactionHash: string;
  currency: string;
  amount: t.TypeOf<typeof UInt256ToString>;
  accountAddress: t.TypeOf<typeof Address>;
  timestamp: t.TypeOf<typeof DateFromISODateString>;
  period: t.TypeOf<typeof Duration>;
  coupon?: t.TypeOf<typeof SubscriptionCouponInformation>;
}

export const SubscriptionPaymentInformation = t.exact(
  t.intersection([
    t.type({
      transactionHash: t.string,
      currency: t.string,
      amount: UInt256ToString,
      accountAddress: Address,
      timestamp: DateFromISODateString,
      period: Duration,
    }),
    t.partial({
      coupon: SubscriptionCouponInformation,
    }),
  ]),
);

export type SubscriptionPaymentInformations = Array<t.TypeOf<typeof SubscriptionPaymentInformation>>;

export const SubscriptionPaymentInformations = t.array(SubscriptionPaymentInformation);

export interface SubscriptionVouchersReemedInformation {
  timestamp: t.TypeOf<typeof DateFromISODateString>;
  period: t.TypeOf<typeof Duration>;
}

export const SubscriptionVouchersReemedInformation = t.exact(
  t.type({
    timestamp: DateFromISODateString,
    period: Duration,
  }),
);

export type SubscriptionVouchersReemedInformations = Array<t.TypeOf<typeof SubscriptionVouchersReemedInformation>>;

export const SubscriptionVouchersReemedInformations = t.array(SubscriptionVouchersReemedInformation);

export interface GetSubscriptionPaymentsResponse {
  payments: t.TypeOf<typeof SubscriptionPaymentInformations>;
  vouchersReemed: t.TypeOf<typeof SubscriptionVouchersReemedInformations>;
}

export const GetSubscriptionPaymentsResponse = t.exact(
  t.type({
    payments: SubscriptionPaymentInformations,
    vouchersReemed: SubscriptionVouchersReemedInformations,
  }),
);

export interface SubscriptionInvoice {
  invoiceId: number;
  subscriptionId: t.TypeOf<typeof UUIDFromString>;
  createdAt: t.TypeOf<typeof DateFromISODateString>;
  processedAt?: t.TypeOf<typeof DateFromISODateString> | null;
  duration: t.TypeOf<typeof Duration>;
}

export const SubscriptionInvoice = t.exact(
  t.intersection([
    t.type({
      invoiceId: t.number,
      subscriptionId: UUIDFromString,
      createdAt: DateFromISODateString,
      duration: Duration,
    }),
    t.partial({
      processedAt: t.union([DateFromISODateString, t.null]),
    }),
  ]),
);

export interface GetUserSubscriptionInvoicesResponse {
  invoices: Array<t.TypeOf<typeof SubscriptionInvoice>>;
}

export const GetUserSubscriptionInvoicesResponse = t.exact(
  t.type({
    invoices: t.array(SubscriptionInvoice),
  }),
);

export type BeehiveJobStatus = 'running' | 'completed' | 'errored' | 'unknown';

export const BeehiveJobStatus = t.union([
  t.literal('running'),
  t.literal('completed'),
  t.literal('errored'),
  t.literal('unknown'),
]);

export type BeehiveRoutingTag =
  | 'appealssetup'
  | 'calcLeak721'
  | 'collectionimport'
  | 'discordnotification'
  | 'email'
  | 'memberships'
  | 'summation'
  | 'publishing'
  | 'testdiscordsetup'
  | 'webhooks'
  | 'stripeproductsync'
  | 'royaltiesstats'
  | 'stripereceiver';

export const BeehiveRoutingTag = t.union([
  t.literal('appealssetup'),
  t.literal('calcLeak721'),
  t.literal('collectionimport'),
  t.literal('discordnotification'),
  t.literal('email'),
  t.literal('memberships'),
  t.literal('summation'),
  t.literal('publishing'),
  t.literal('testdiscordsetup'),
  t.literal('webhooks'),
  t.literal('stripeproductsync'),
  t.literal('royaltiesstats'),
  t.literal('stripereceiver'),
]);

export interface BeehiveJob {
  /** The request ID of the workflow */
  requestId: string;
  routingTag: t.TypeOf<typeof BeehiveRoutingTag>;
  status: t.TypeOf<typeof BeehiveJobStatus>;
}

export const BeehiveJob = t.exact(
  t.type({
    /** The request ID of the workflow */
    requestId: t.string,
    routingTag: BeehiveRoutingTag,
    status: BeehiveJobStatus,
  }),
);

export interface GetUserPortfolioNftsResponse {
  cursor: string;
  nftAcquisitions: Array<t.TypeOf<typeof NftAcquisition>>;
}

export const GetUserPortfolioNftsResponse = t.exact(
  t.type({
    cursor: t.string,
    nftAcquisitions: t.array(NftAcquisition),
  }),
);

export type SegmentUserType = 'creator' | 'collector';

export const SegmentUserType = t.union([t.literal('creator'), t.literal('collector')]);

export type TrackEventProperties = Record<string, unknown>;

export const TrackEventProperties = t.record(t.string, t.unknown);

export interface TrackIdentifyBody {
  anonymousId: string;
}

export const TrackIdentifyBody = t.exact(
  t.type({
    anonymousId: t.string,
  }),
);

export interface TrackEventBody {
  anonymousId: string;
  name: string;
  properties: t.TypeOf<typeof TrackEventProperties>;
  version: string;
  sessionId: number;
}

export const TrackEventBody = t.exact(
  t.type({
    anonymousId: t.string,
    name: t.string,
    properties: TrackEventProperties,
    version: t.string,
    sessionId: t.number,
  }),
);

export type CorrespondenceType = 'newsletter';

export const CorrespondenceType = t.literal('newsletter');

export interface UserCorrespondence {
  storefrontId: t.TypeOf<typeof UUIDFromString> | null;
  type: t.TypeOf<typeof CorrespondenceType>;
}

export const UserCorrespondence = t.exact(
  t.type({
    storefrontId: t.union([UUIDFromString, t.null]),
    type: CorrespondenceType,
  }),
);

export type UserCorrespondenceList = Array<t.TypeOf<typeof UserCorrespondence>>;

export const UserCorrespondenceList = t.array(UserCorrespondence);

export interface CorrespondenceInfo {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  storefrontName: string;
  /** Number of emails sent to the user */
  userCount: t.TypeOf<typeof IntegerToString>;
}

export const CorrespondenceInfo = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    storefrontName: t.string,
    /** Number of emails sent to the user */
    userCount: IntegerToString,
  }),
);

export type CorrespondencesInfo = Array<t.TypeOf<typeof CorrespondenceInfo>>;

export const CorrespondencesInfo = t.array(CorrespondenceInfo);

export type StorefrontIds = Array<t.TypeOf<typeof UUIDFromString>>;

export const StorefrontIds = t.array(UUIDFromString);

export interface CorrespondenceItem {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  emails: Array<string>;
}

export const CorrespondenceItem = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    emails: t.array(t.string),
  }),
);

export type CorrespondenceList = Array<t.TypeOf<typeof CorrespondenceItem>>;

export const CorrespondenceList = t.array(CorrespondenceItem);

export interface TokenRange {
  chainId: t.TypeOf<typeof ChainIdToString>;
  contractAddress: t.TypeOf<typeof Address>;
  tokenIdMin: t.TypeOf<typeof BigIntToString>;
  tokenIdMax: t.TypeOf<typeof BigIntToString>;
}

export const TokenRange = t.exact(
  t.type({
    chainId: ChainIdToString,
    contractAddress: Address,
    tokenIdMin: BigIntToString,
    tokenIdMax: BigIntToString,
  }),
);

export interface Redemption {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  redemptionConfigId: t.TypeOf<typeof UUIDFromString>;
  shippingAddress: string | null;
}

export const Redemption = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    redemptionConfigId: UUIDFromString,
    shippingAddress: t.union([t.string, t.null]),
  }),
);

export interface RedemptionConfigPublic {
  id: t.TypeOf<typeof UUIDFromString>;
  redeemed: boolean;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  tokenRange: t.TypeOf<typeof TokenRange> | null;
  name: string | null;
  description: string | null;
  image: string | null;
  requireEmail: boolean;
  requireShippingAddress: boolean;
  webhookId: t.TypeOf<typeof UUIDFromString> | null;
}

export const RedemptionConfigPublic = t.exact(
  t.type({
    id: UUIDFromString,
    redeemed: t.boolean,
    storefrontId: UUIDFromString,
    tokenRange: t.union([TokenRange, t.null]),
    name: t.union([t.string, t.null]),
    description: t.union([t.string, t.null]),
    image: t.union([t.string, t.null]),
    requireEmail: t.boolean,
    requireShippingAddress: t.boolean,
    webhookId: t.union([UUIDFromString, t.null]),
  }),
);

export type RedemptionsConfigPublic = Array<t.TypeOf<typeof RedemptionConfigPublic>>;

export const RedemptionsConfigPublic = t.array(RedemptionConfigPublic);

export interface EditRedemptionConfig {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  tokenRange: t.TypeOf<typeof TokenRange> | null;
  name: string | null;
  description: string | null;
  image: string | null;
  requireEmail: boolean;
  requireShippingAddress: boolean;
  webhookId: t.TypeOf<typeof UUIDFromString> | null;
  subscriptionVoucherCampaignId: t.TypeOf<typeof UUIDFromString> | null;
}

export const EditRedemptionConfig = t.exact(
  t.type({
    storefrontId: UUIDFromString,
    tokenRange: t.union([TokenRange, t.null]),
    name: t.union([t.string, t.null]),
    description: t.union([t.string, t.null]),
    image: t.union([t.string, t.null]),
    requireEmail: t.boolean,
    requireShippingAddress: t.boolean,
    webhookId: t.union([UUIDFromString, t.null]),
    subscriptionVoucherCampaignId: t.union([UUIDFromString, t.null]),
  }),
);

export interface SubscriptionVoucherInfo {
  subscriptionId: t.TypeOf<typeof UUIDFromString>;
  subscriptionVoucherCampaignId: t.TypeOf<typeof UUIDFromString>;
}

export const SubscriptionVoucherInfo = t.exact(
  t.type({
    subscriptionId: UUIDFromString,
    subscriptionVoucherCampaignId: UUIDFromString,
  }),
);

export interface RedemptionConfig {
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  tokenRange: t.TypeOf<typeof TokenRange> | null;
  name: string | null;
  description: string | null;
  image: string | null;
  requireEmail: boolean;
  requireShippingAddress: boolean;
  webhookId: t.TypeOf<typeof UUIDFromString> | null;
  id: t.TypeOf<typeof UUIDFromString>;
  published: boolean;
  subscription?: t.TypeOf<typeof SubscriptionVoucherInfo> | null;
}

export const RedemptionConfig = t.exact(
  t.intersection([
    t.type({
      storefrontId: UUIDFromString,
      tokenRange: t.union([TokenRange, t.null]),
      name: t.union([t.string, t.null]),
      description: t.union([t.string, t.null]),
      image: t.union([t.string, t.null]),
      requireEmail: t.boolean,
      requireShippingAddress: t.boolean,
      webhookId: t.union([UUIDFromString, t.null]),
      id: UUIDFromString,
      published: t.boolean,
    }),
    t.partial({
      subscription: t.union([SubscriptionVoucherInfo, t.null]),
    }),
  ]),
);

export interface EditPublishedRedemptionConfig {
  description: string;
}

export const EditPublishedRedemptionConfig = t.exact(
  t.type({
    description: t.string,
  }),
);

export type RedemptionConfigs = Array<t.TypeOf<typeof RedemptionConfig>>;

export const RedemptionConfigs = t.array(RedemptionConfig);

export interface SubscriptionCreatedEvent {
  eventName: 'SUBSCRIPTION_CREATED';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  duration: t.TypeOf<typeof Duration>;
}

export const SubscriptionCreatedEvent = t.exact(
  t.type({
    eventName: t.literal('SUBSCRIPTION_CREATED'),
    walletAddress: Address,
    storefrontId: UUIDFromString,
    duration: Duration,
  }),
);

export interface SubscriptionExtendedEvent {
  eventName: 'SUBSCRIPTION_EXTENDED';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  duration: t.TypeOf<typeof Duration>;
}

export const SubscriptionExtendedEvent = t.exact(
  t.type({
    eventName: t.literal('SUBSCRIPTION_EXTENDED'),
    walletAddress: Address,
    storefrontId: UUIDFromString,
    duration: Duration,
  }),
);

export interface SubscriptionExpiringEvent {
  eventName: 'SUBSCRIPTION_EXPIRING';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  subscriptionName: string;
  expirationDate: t.TypeOf<typeof DateFromISODateString>;
}

export const SubscriptionExpiringEvent = t.exact(
  t.type({
    eventName: t.literal('SUBSCRIPTION_EXPIRING'),
    walletAddress: Address,
    storefrontId: UUIDFromString,
    subscriptionName: t.string,
    expirationDate: DateFromISODateString,
  }),
);

export interface SubscriptionExpiredEvent {
  eventName: 'SUBSCRIPTION_EXPIRED';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
}

export const SubscriptionExpiredEvent = t.exact(
  t.type({
    eventName: t.literal('SUBSCRIPTION_EXPIRED'),
    walletAddress: Address,
    storefrontId: UUIDFromString,
  }),
);

export interface NftRedemptionEvent {
  eventName: 'NFT_REDEMPTION';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  token: t.TypeOf<typeof TokenStringIdentifier>;
  shippingAddress?: string;
  email?: string;
  requireEmail?: boolean;
  requireShippingAddress?: boolean;
  date?: t.TypeOf<typeof DateFromISODateString>;
  orderId?: string;
}

export const NftRedemptionEvent = t.exact(
  t.intersection([
    t.type({
      eventName: t.literal('NFT_REDEMPTION'),
      walletAddress: Address,
      storefrontId: UUIDFromString,
      token: TokenStringIdentifier,
    }),
    t.partial({
      shippingAddress: t.string,
      email: t.string,
      requireEmail: t.boolean,
      requireShippingAddress: t.boolean,
      date: DateFromISODateString,
      orderId: t.string,
    }),
  ]),
);

export interface PasswordResetEvent {
  eventName: 'PASSWORD_RESET';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: null;
  resetToken: string;
}

export const PasswordResetEvent = t.exact(
  t.type({
    eventName: t.literal('PASSWORD_RESET'),
    walletAddress: Address,
    storefrontId: t.null,
    resetToken: t.string,
  }),
);

export interface MembershipStartedEvent {
  eventName: 'MEMBERSHIP_STARTED';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: null;
  token: t.TypeOf<typeof TokenStringIdentifier>;
  key: string;
}

export const MembershipStartedEvent = t.exact(
  t.type({
    eventName: t.literal('MEMBERSHIP_STARTED'),
    walletAddress: Address,
    storefrontId: t.null,
    token: TokenStringIdentifier,
    key: t.string,
  }),
);

export interface MembershipEndedEvent {
  eventName: 'MEMBERSHIP_ENDED';
  walletAddress: t.TypeOf<typeof Address>;
  storefrontId: null;
  token: t.TypeOf<typeof TokenStringIdentifier>;
  key: string;
}

export const MembershipEndedEvent = t.exact(
  t.type({
    eventName: t.literal('MEMBERSHIP_ENDED'),
    walletAddress: Address,
    storefrontId: t.null,
    token: TokenStringIdentifier,
    key: t.string,
  }),
);

export type NotificationEvent =
  | 'SUBSCRIPTION_CREATED'
  | 'SUBSCRIPTION_EXTENDED'
  | 'SUBSCRIPTION_EXPIRING'
  | 'SUBSCRIPTION_EXPIRED'
  | 'NFT_REDEMPTION'
  | 'PASSWORD_RESET'
  | 'MEMBERSHIP_STARTED'
  | 'MEMBERSHIP_ENDED';

export const NotificationEvent = t.union([
  t.literal('SUBSCRIPTION_CREATED'),
  t.literal('SUBSCRIPTION_EXTENDED'),
  t.literal('SUBSCRIPTION_EXPIRING'),
  t.literal('SUBSCRIPTION_EXPIRED'),
  t.literal('NFT_REDEMPTION'),
  t.literal('PASSWORD_RESET'),
  t.literal('MEMBERSHIP_STARTED'),
  t.literal('MEMBERSHIP_ENDED'),
]);

export type NotificationEventPayload =
  | t.TypeOf<typeof SubscriptionCreatedEvent>
  | t.TypeOf<typeof SubscriptionExtendedEvent>
  | t.TypeOf<typeof SubscriptionExpiringEvent>
  | t.TypeOf<typeof SubscriptionExpiredEvent>
  | t.TypeOf<typeof NftRedemptionEvent>
  | t.TypeOf<typeof PasswordResetEvent>
  | t.TypeOf<typeof MembershipStartedEvent>
  | t.TypeOf<typeof MembershipEndedEvent>;

export const NotificationEventPayload = t.union([
  SubscriptionCreatedEvent,
  SubscriptionExtendedEvent,
  SubscriptionExpiringEvent,
  SubscriptionExpiredEvent,
  NftRedemptionEvent,
  PasswordResetEvent,
  MembershipStartedEvent,
  MembershipEndedEvent,
]);

export type WebhookAuthConfigType = 'BasicAuth' | 'ApiToken' | 'OAuth2' | 'Headers';

export const WebhookAuthConfigType = t.union([
  t.literal('BasicAuth'),
  t.literal('ApiToken'),
  t.literal('OAuth2'),
  t.literal('Headers'),
]);

export type WebhookAuthConfigBasicAuth = {
  type: 'BasicAuth';
  config: {
    username: string;
    password: string;
  };
} | null;

export const WebhookAuthConfigBasicAuth = t.union([
  t.exact(
    t.type({
      type: t.literal('BasicAuth'),
      config: t.exact(
        t.type({
          username: t.string,
          password: t.string,
        }),
      ),
    }),
  ),
  t.null,
]);

export type WebhookAuthConfigToken = {
  type: 'ApiToken';
  config: {
    /** If the URL will allow for a token header, enter the token. */
    apiToken: string;
  };
} | null;

export const WebhookAuthConfigToken = t.union([
  t.exact(
    t.type({
      type: t.literal('ApiToken'),
      config: t.exact(
        t.type({
          /** If the URL will allow for a token header, enter the token. */
          apiToken: t.string,
        }),
      ),
    }),
  ),
  t.null,
]);

export type WebhookAuthConfigOAuth2 = {
  type: 'OAuth2';
  config: {
    /** The URL where we will get the oauth2 token from to use as a bearer token in the header */
    tokenUrl: string;
    /** If the URL will require oauth2 authentication, enter the necessary form entries and values for Aspen to be able to connect with your system. This should be passed as a JSON object with all the information required to be issued an authorization token via a standard oauth2 authentication token. As an example: ```
{
  "grant_type": "client_credentials",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "audience": "YOUR_API_IDENTIFIER"
}
```
 */
    clientCredentials: string;
    /** If the client credentials POSTed to the token URL returns an access_token, it will be stored for use by future calls. */
    accessToken?: string | null;
    /** If the client credentials POSTed to the token URL returns a refresh_token, it will be stored for use by future calls. */
    refreshToken?: string | null;
    expiresAt?: number | null;
    tokenType?: string | null;
  };
} | null;

export const WebhookAuthConfigOAuth2 = t.union([
  t.exact(
    t.type({
      type: t.literal('OAuth2'),
      config: t.exact(
        t.intersection([
          t.type({
            /** The URL where we will get the oauth2 token from to use as a bearer token in the header */
            tokenUrl: t.string,
            /** If the URL will require oauth2 authentication, enter the necessary form entries and values for Aspen to be able to connect with your system. This should be passed as a JSON object with all the information required to be issued an authorization token via a standard oauth2 authentication token. As an example: ```
{
  "grant_type": "client_credentials",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "audience": "YOUR_API_IDENTIFIER"
}
```
 */
            clientCredentials: t.string,
          }),
          t.partial({
            /** If the client credentials POSTed to the token URL returns an access_token, it will be stored for use by future calls. */
            accessToken: t.union([t.string, t.null]),
            /** If the client credentials POSTed to the token URL returns a refresh_token, it will be stored for use by future calls. */
            refreshToken: t.union([t.string, t.null]),
            expiresAt: t.union([t.number, t.null]),
            tokenType: t.union([t.string, t.null]),
          }),
        ]),
      ),
    }),
  ),
  t.null,
]);

export interface CustomHeader {
  /** The name of the header */
  header: string;
  /** The value of the header */
  value: string;
}

export const CustomHeader = t.exact(
  t.type({
    /** The name of the header */
    header: t.string,
    /** The value of the header */
    value: t.string,
  }),
);

export type WebhookAuthConfigCustomHeaders = {
  type: 'Headers';
  config: Array<t.TypeOf<typeof CustomHeader>>;
} | null;

export const WebhookAuthConfigCustomHeaders = t.union([
  t.exact(
    t.type({
      type: t.literal('Headers'),
      config: t.array(CustomHeader),
    }),
  ),
  t.null,
]);

export type WebhookAuthConfig =
  | t.TypeOf<typeof WebhookAuthConfigBasicAuth>
  | t.TypeOf<typeof WebhookAuthConfigToken>
  | t.TypeOf<typeof WebhookAuthConfigOAuth2>
  | t.TypeOf<typeof WebhookAuthConfigCustomHeaders>;

export const WebhookAuthConfig = t.union([
  WebhookAuthConfigBasicAuth,
  WebhookAuthConfigToken,
  WebhookAuthConfigOAuth2,
  WebhookAuthConfigCustomHeaders,
]);

export interface EditWebhook {
  id: t.TypeOf<typeof UUIDFromString>;
  name: string | null;
  url: string | null;
  secret?: string | null;
  isActive: boolean;
  authConfig: t.TypeOf<typeof WebhookAuthConfig> | null;
}

export const EditWebhook = t.exact(
  t.intersection([
    t.type({
      id: UUIDFromString,
      name: t.union([t.string, t.null]),
      url: t.union([t.string, t.null]),
      isActive: t.boolean,
      authConfig: t.union([WebhookAuthConfig, t.null]),
    }),
    t.partial({
      secret: t.union([t.string, t.null]),
    }),
  ]),
);

export type EditWebhooks = Array<t.TypeOf<typeof EditWebhook>>;

export const EditWebhooks = t.array(EditWebhook);

export type Webhook = t.TypeOf<typeof EditWebhook>;

export const Webhook = EditWebhook;

export type Webhooks = Array<t.TypeOf<typeof Webhook>>;

export const Webhooks = t.array(Webhook);

export interface CreateWebhook {
  name: string;
}

export const CreateWebhook = t.exact(
  t.type({
    name: t.string,
  }),
);

export type CreateWebhooks = Array<t.TypeOf<typeof CreateWebhook>>;

export const CreateWebhooks = t.array(CreateWebhook);

export type CreateWebhooksResponse = Array<t.TypeOf<typeof UUIDFromString>>;

export const CreateWebhooksResponse = t.array(UUIDFromString);

export interface TokenCheckoutItem {
  /** Quantity of tokens to issue */
  quantity: t.TypeOf<typeof IntegerToString>;
  tokenId?: string | null;
}

export const TokenCheckoutItem = t.exact(
  t.intersection([
    t.type({
      /** Quantity of tokens to issue */
      quantity: IntegerToString,
    }),
    t.partial({
      tokenId: t.union([t.string, t.null]),
    }),
  ]),
);

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  metadata?: Record<string, string>;
}

export const PaymentIntent = t.exact(
  t.intersection([
    t.type({
      id: t.string,
      clientSecret: t.string,
    }),
    t.partial({
      metadata: t.record(t.string, t.string),
    }),
  ]),
);

export interface PaymentIntentMetadata {
  env: string;
  /** Storefront the tokens belong to */
  storefrontId: t.TypeOf<typeof UUIDFromString>;
  /** The address of the tokens receiver */
  receiverAddress: t.TypeOf<typeof Address>;
  checkoutCart: Array<t.TypeOf<typeof TokenCheckoutItem>>;
}

export const PaymentIntentMetadata = t.exact(
  t.type({
    env: t.string,
    /** Storefront the tokens belong to */
    storefrontId: UUIDFromString,
    /** The address of the tokens receiver */
    receiverAddress: Address,
    checkoutCart: t.array(TokenCheckoutItem),
  }),
);

export type PendingNftIssuancesStatus = 'complete' | 'failed' | 'pending' | 'processing' | 'refunded';

export const PendingNftIssuancesStatus = t.union([
  t.literal('complete'),
  t.literal('failed'),
  t.literal('pending'),
  t.literal('processing'),
  t.literal('refunded'),
]);

export interface StripeIssuanceStatus {
  eventStatus: t.TypeOf<typeof PendingNftIssuancesStatus>;
  quantityIssued: number;
  quantityToIssue: number;
  reason?: string | null;
  tokenId?: string | null;
}

export const StripeIssuanceStatus = t.exact(
  t.intersection([
    t.type({
      eventStatus: PendingNftIssuancesStatus,
      quantityIssued: t.number,
      quantityToIssue: t.number,
    }),
    t.partial({
      reason: t.union([t.string, t.null]),
      tokenId: t.union([t.string, t.null]),
    }),
  ]),
);

export type StripeIssuanceStatusResponse = Array<t.TypeOf<typeof StripeIssuanceStatus>>;

export const StripeIssuanceStatusResponse = t.array(StripeIssuanceStatus);

export const ChainTypeEnum = { mainnet: 'mainnet', testnet: 'testnet', local: 'local' } as const;
export const MarketplaceEnum = { OPENSEA: 'opensea', BLUR: 'blur' } as const;
export const BlockchainEnum = { ETHEREUM: 'ETHEREUM', POLYGON: 'POLYGON', PALM: 'PALM', CANTO: 'CANTO' } as const;
export const ImageMimeTypeEnum = {
  JPG: 'image/jpeg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  AVIF: 'image/avif',
  WEBP: 'image/webp',
} as const;
export const AudioMimeTypeEnum = { MP3: 'audio/mpeg', WAV: 'audio/wav', OGG: 'audio/ogg' } as const;
export const VideoMimeTypeEnum = { MP4: 'video/mp4', WEBM: 'video/webm', OGV: 'video/ogg' } as const;
export const TextMimeTypeEnum = {
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  JSON: 'application/json',
  PDF: 'application/pdf',
  MD: 'text/markdown',
  PLAIN: 'text/plain',
  HTML: 'text/html',
} as const;
export const DocumentMimeTypeEnum = {
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  JSON: 'application/json',
  PDF: 'application/pdf',
  MD: 'text/markdown',
  PLAIN: 'text/plain',
  HTML: 'text/html',
  JPG: 'image/jpeg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  AVIF: 'image/avif',
  WEBP: 'image/webp',
} as const;
export const ContractVerificationTypeEnum = {
  ASPEN_MINTED: 'aspen-minted',
  ASPEN_PARTNER: 'aspen-partner',
  OS_VERIFIED: 'os-verified',
} as const;
export const ERC20ContractEnum = { WETH9: 'WETH9', DAI: 'DAI', USDC: 'USDC', APN: 'APN' } as const;
export const NftEventTypeEnum = { transfer: 'transfer', sale: 'sale', minted: 'minted' } as const;
export const NftRoyaltyStatusEnum = {
  //no royalties due (either fully paid or appeal accepted)
  CLEAN: 'CLEAN',
  //royalty not paid
  NOT_PAID: 'NOT_PAID',
  //royalty not paid and awaiting appeal prepayment
  APPEAL_PENDING_PREPAYMENT: 'APPEAL_PENDING_PREPAYMENT',
  //royalty not paid and awaiting appeal adjudication
  APPEAL_PENDING_ADJUDICATION: 'APPEAL_PENDING_ADJUDICATION',
  //royalty not paid and appeal refused
  APPEAL_REJECTED: 'APPEAL_REJECTED',
} as const;
export const FiatCurrenciesEnum = { USD: 'USD' } as const;
export const TokenDisplayTypeEnum = {
  BOOST_NUMBER: 'boost_number',
  BOOST_PERCENTAGE: 'boost_percentage',
  NUMBER: 'number',
  DATE: 'date',
} as const;
export const ReportsKindEnum = {
  AllTokens: 'AllTokens',
  EligibleEmailAddresses: 'EligibleEmailAddresses',
  EligibleDiscordUserIds: 'EligibleDiscordUserIds',
} as const;
export const IntegrationKindEnum = { DISCORD: 'DISCORD', WEBHOOK: 'WEBHOOK' } as const;
export const MembershipListStatusEnum = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' } as const;
export const ImportCollectionStatusEnum = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete',
  FALIED: 'Failed',
} as const;
export const ContractTokenStandardEnum = { ERC20: 'ERC20', ERC721: 'ERC721', ERC1155: 'ERC1155' } as const;
export const StorefrontCategoryEnum = {
  MUSIC: 'Music',
  GAMING: 'Gaming',
  METAVERSE: 'Metaverse',
  PFP: 'PFP',
  ART: 'Art',
  GENERATIVEART: 'Generative Art',
  PHOTOGRAPHY: 'Photography',
  ACCESSPASS: 'Access Pass',
  UTILITY: 'Utility',
  COLLECTIBLE: 'Collectible',
  VIDEO: 'Video',
} as const;
export const StorefrontMediaTypeEnum = {
  IMAGE: 'Image',
  VIDEO: 'Video',
  AUDIO: 'Audio',
  DOCUMENTS: 'Documents',
  OTHER: 'Other',
} as const;
export const StorefrontFreeDistributionModeEnum = { NONE: 'None', TOKENPERPAD: 'TokenPerPad' } as const;
export const StorefrontCurrencyOptionEnum = { CRYPTO: 'Crypto', FIAT: 'Fiat', FIATANDCRYPTO: 'FiatAndCrypto' } as const;
export const StorefrontContractTypeEnum = { ERC721: 'ERC721', ERC1155: 'ERC1155' } as const;
export const AdSpaceTemplatesEnum = { image: 'image', video: 'video' } as const;
export const StorefrontMediaFileTypeEnum = {
  logoImage: 'logoImage',
  bannerImage: 'bannerImage',
  adSpaceImage: 'adSpaceImage',
  adSpaceVideoPoster: 'adSpaceVideoPoster',
  redeemImage: 'redeemImage',
  membershipListImage: 'membershipListImage',
} as const;
export const StorefrontFileTypeEnum = {
  logoImage: 'logoImage',
  bannerImage: 'bannerImage',
  adSpaceImage: 'adSpaceImage',
  adSpaceVideoPoster: 'adSpaceVideoPoster',
  redeemImage: 'redeemImage',
  membershipListImage: 'membershipListImage',
} as const;
export const CollectionModificationEnum = {
  //Collection contract was published to the chain
  PUBLISHED: 'Published',
  //Tokenset was updated by changing the baseURI on the contract
  TOKENSET: 'TokensetUpdated',
  //Phaseset was updated within the contract
  PHASESET: 'PhasesetUpdated',
  //Other collection information was updated
  COLLECTIONINFO: 'CollectionInformationUpdated',
  //Multiple changes were made to the collection
  MULTICALL: 'Multicall',
  //External contract was called to settings related to the collection
  ASPENCONTRACT: 'AspenContract',
} as const;
export const MemberRolesEnum = { ADMIN: 'ADMIN', MEMBER: 'MEMBER', READONLY: 'READONLY' } as const;
export const GassedByEnum = {
  //used when gassing the relayer wallet is the responsibility of the user
  USER: 'USER',
  //used for enterprise customers when the platform gases the wallet and charges the customers later
  PLATFORM: 'PLATFORM',
} as const;
export const TransactionStatusEnum = {
  //transaction is received but not yet placed into the mempool
  READY: 'READY',
  //transaction has been placed into the mempool
  PENDING: 'PENDING',
  //transaction is complete and placed into a block
  COMPLETE: 'COMPLETE',
  //transaction reverted with an error during execution
  ERROR: 'ERROR',
} as const;
export const AppealsStatusEnum = {
  accepted: 'accepted',
  pending: 'pending',
  rejected: 'rejected',
  withdrawn: 'withdrawn',
} as const;
export const RoyaltiesAppealsVenueEnum = { inApp: 'inApp', discord: 'discord' } as const;
export const RoyaltiesChangedEventSourceEnum = { onChain: 'onChain', userEntry: 'userEntry' } as const;
export const SubscriptionServiceEnum = { discord: 'discord' } as const;
export const SubscriptionReleaseStatusEnum = { PRIVATE: 'PRIVATE', PUBLISHED: 'PUBLISHED' } as const;
export const BeehiveJobStatusEnum = {
  RUNNING: 'running',
  COMPLETED: 'completed',
  ERRORED: 'errored',
  UNKNOWN: 'unknown',
} as const;
export const BeehiveRoutingTagEnum = {
  APPEAL: 'appealssetup',
  LEAKREPORT: 'calcLeak721',
  IMPORT: 'collectionimport',
  DISCORD_NOTIFICATION: 'discordnotification',
  EMAIL: 'email',
  MEMBERSHIPS: 'memberships',
  SUMMATION: 'summation',
  PUBLISH: 'publishing',
  DISCORD_SETUP: 'testdiscordsetup',
  WEBHOOKS: 'webhooks',
  STRIPEPRODUCTSYNC: 'stripeproductsync',
  ROYALTIES_STATS: 'royaltiesstats',
  STRIPERECEIVER: 'stripereceiver',
} as const;
export const SegmentUserTypeEnum = { creator: 'creator', collector: 'collector' } as const;
export const CorrespondenceTypeEnum = { NEWSLETTER: 'newsletter' } as const;
export const NotificationEventEnum = {
  SUBSCRIPTION_CREATED: 'SUBSCRIPTION_CREATED',
  SUBSCRIPTION_EXTENDED: 'SUBSCRIPTION_EXTENDED',
  SUBSCRIPTION_EXPIRING: 'SUBSCRIPTION_EXPIRING',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  NFT_REDEMPTION: 'NFT_REDEMPTION',
  PASSWORD_RESET: 'PASSWORD_RESET',
  MEMBERSHIP_STARTED: 'MEMBERSHIP_STARTED',
  MEMBERSHIP_ENDED: 'MEMBERSHIP_ENDED',
} as const;
export const WebhookAuthConfigTypeEnum = {
  BASIC: 'BasicAuth',
  API_TOKEN: 'ApiToken',
  OAUTH2: 'OAuth2',
  HEADERS: 'Headers',
} as const;
export const PendingNftIssuancesStatusEnum = {
  complete: 'complete',
  failed: 'failed',
  pending: 'pending',
  processing: 'processing',
  refunded: 'refunded',
} as const;
/*API Path Metadata*/
export const pathMeta = {
  uploadFileToIpfs: {
    operationId: 'uploadFileToIpfs',
    url: '/ipfs',
    method: 'post',
    category: 'Ipfs',
    security: [],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: true,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.record(t.string, t.unknown),
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: t.record(t.string, t.unknown),
      }),
    ),
    responseSchema: UploadIpfsFileResponse,
  },
  getOAS: {
    operationId: 'getOAS',
    url: '/oas',
    method: 'get',
    category: 'Meta',
    security: [],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: t.string,
  },
  getOwnedNftCollections: {
    operationId: 'getOwnedNftCollections',
    url: '/nfts-collections-owned',
    method: 'get',
    category: 'NftCollections',
    security: [],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        accountAddresses: t.string,
        chainIds: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['accountAddresses', 'chainIds']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            accountAddresses: t.string,
            chainIds: t.string,
          }),
        ),
      }),
    ),
    responseSchema: OwnedNftCollectionStorefronts,
  },
  getNftCollectionsByContract: {
    operationId: 'getNftCollectionsByContract',
    url: '/nfts-collections-by-contract',
    method: 'get',
    category: 'NftCollections',
    security: [],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['chainId', 'contractAddress']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
          }),
        ),
      }),
    ),
    responseSchema: NftCollectionStorefronts,
  },
  getNftDropOneTimePadStatus: {
    operationId: 'getNftDropOneTimePadStatus',
    url: '/nft-drop/:storefrontId/:pad/status',
    method: 'get',
    category: 'NftDrop',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        pad: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'pad']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            pad: t.string,
          }),
        ),
      }),
    ),
    responseSchema: OneTimePad,
  },
  redeemNftDropOneTimePad: {
    operationId: 'redeemNftDropOneTimePad',
    url: '/nft-drop/:storefrontId/redeem',
    method: 'post',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: RedeemNftDropOneTimePadRequest,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: RedeemNftDropOneTimePadRequest,
      }),
    ),
    responseSchema: OneTimePad,
  },
  getNftDropStorefronts: {
    operationId: 'getNftDropStorefronts',
    url: '/nft-drop/storefronts',
    method: 'get',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: NftDropStorefrontListResponse,
  },
  getNftDropStorefrontPads: {
    operationId: 'getNftDropStorefrontPads',
    url: '/nft-drop/storefronts/:storefrontId/pads',
    method: 'get',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        limit: IntegerToString,
        offset: IntegerToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['limit', 'offset']),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              storefrontId: UUIDFromString,
            }),
            t.partial({
              limit: IntegerToString,
              offset: IntegerToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: NftDropStorefrontPadsResponse,
  },
  downloadNftDropStorefrontCsv: {
    operationId: 'downloadNftDropStorefrontCsv',
    url: '/nft-drop/storefronts/:storefrontId/download/csv',
    method: 'get',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  downloadNftDropStorefrontQrCodes: {
    operationId: 'downloadNftDropStorefrontQrCodes',
    url: '/nft-drop/storefronts/:storefrontId/download/qrcodes',
    method: 'get',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  generateOneTimePads: {
    operationId: 'generateOneTimePads',
    url: '/nft-drop/one-time-pads/:storefrontId/generate',
    method: 'post',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GenerateOneTimePadsResponse,
  },
  sendRequestNftDropEmail: {
    operationId: 'sendRequestNftDropEmail',
    url: '/nft-drop/:chainId/:contractAddress/send-claim-email',
    method: 'post',
    category: 'NftDrop',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: SendRequestNftDropEmailRequest,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
          }),
        ),
        body: SendRequestNftDropEmailRequest,
      }),
    ),
    responseSchema: t.null,
  },
  getAccountNfts: {
    operationId: 'getAccountNfts',
    url: '/nfts-by-account',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.intersection([
        t.type({
          accountAddresses: t.string,
        }),
        t.partial({
          nftChainIds: t.string,
          chainAddresses: t.string,
          collectionIds: t.string,
          verifiedOnly: BooleanToString,
          limit: IntegerToString,
          cursor: t.string,
        }),
      ]),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([
      'accountAddresses',
      'nftChainIds',
      'chainAddresses',
      'collectionIds',
      'verifiedOnly',
      'limit',
      'cursor',
    ]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              accountAddresses: t.string,
            }),
            t.partial({
              nftChainIds: t.string,
              chainAddresses: t.string,
              collectionIds: t.string,
              verifiedOnly: BooleanToString,
              limit: IntegerToString,
              cursor: t.string,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetUserNftsResponse,
  },
  getNftsByContract: {
    operationId: 'getNftsByContract',
    url: '/:chainId/nfts/:contractAddress',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        limit: IntegerToString,
        cursor: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['limit', 'cursor']),
    pathParameters: new Set(['chainId', 'contractAddress']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              chainId: ChainIdToString,
              contractAddress: Address,
            }),
            t.partial({
              limit: IntegerToString,
              cursor: t.string,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetNftsResponse,
  },
  getNft: {
    operationId: 'getNft',
    url: '/:chainId/nfts/:contractAddress/:tokenId',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
        tokenId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
            tokenId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: GetNftResponse,
  },
  getAdjacentNfts: {
    operationId: 'getAdjacentNfts',
    url: '/:chainId/nfts/:contractAddress/:tokenId/adjacent',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
        tokenId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
            tokenId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: GetAdjacentNftsResponse,
  },
  refreshContractNftsMetadata: {
    operationId: 'refreshContractNftsMetadata',
    url: '/:chainId/metadata/:contractAddress/refresh-collection',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  refreshNftMetadata: {
    operationId: 'refreshNftMetadata',
    url: '/:chainId/metadata/:contractAddress/refresh-token/:tokenId',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
        tokenId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
            tokenId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getNftEvents: {
    operationId: 'getNftEvents',
    url: '/:chainId/nfts/:contractAddress/:tokenId/events',
    method: 'get',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
        tokenId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
            tokenId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: GetNftEventsResponse,
  },
  getNftsByTokenList: {
    operationId: 'getNftsByTokenList',
    url: '/nfts-by-token-list',
    method: 'post',
    category: 'Nfts',
    security: [],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: GetNftsByTokenListRequest,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: GetNftsByTokenListRequest,
      }),
    ),
    responseSchema: GetNftsByTokenListResponse,
  },
  getOrganizationsForUser: {
    operationId: 'getOrganizationsForUser',
    url: '/storefronts/organizations',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: Organizations,
  },
  createOrganization: {
    operationId: 'createOrganization',
    url: '/storefronts/organizations',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: CreateOrganization,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: CreateOrganization,
      }),
    ),
    responseSchema: Organization,
  },
  getOrganization: {
    operationId: 'getOrganization',
    url: '/storefronts/organizations/:organizationId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GetOrganizationRequest,
  },
  updateOrganizationInformation: {
    operationId: 'updateOrganizationInformation',
    url: '/storefronts/organizations/:organizationId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreatorInformation,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: CreatorInformation,
      }),
    ),
    responseSchema: t.null,
  },
  removeOrganization: {
    operationId: 'removeOrganization',
    url: '/storefronts/organizations/:organizationId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  updateOrganizationName: {
    operationId: 'updateOrganizationName',
    url: '/storefronts/organization/:organizationId/name',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: UpdateOrganizationNameRequest,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: UpdateOrganizationNameRequest,
      }),
    ),
    responseSchema: t.null,
  },
  inviteUserToOrganization: {
    operationId: 'inviteUserToOrganization',
    url: '/storefronts/organization/:organizationId/invites',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: Invitation,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: Invitation,
      }),
    ),
    responseSchema: Invitation,
  },
  acceptInvitationToOrganization: {
    operationId: 'acceptInvitationToOrganization',
    url: '/storefronts/organization/:organizationId/invites/:inviteId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        inviteId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'inviteId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            inviteId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  removeInvitationFromOrganization: {
    operationId: 'removeInvitationFromOrganization',
    url: '/storefronts/organization/:organizationId/invites/:inviteId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        inviteId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'inviteId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            inviteId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getUserInvitesForOrganizations: {
    operationId: 'getUserInvitesForOrganizations',
    url: '/storefronts/organization/invites',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: UserInvitations,
  },
  updateUserRoleForOrganization: {
    operationId: 'updateUserRoleForOrganization',
    url: '/storefronts/organization/:organizationId/members/:userId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        userId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: MemberInformation,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'userId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            userId: UUIDFromString,
          }),
        ),
        body: MemberInformation,
      }),
    ),
    responseSchema: t.null,
  },
  removeUserFromOrganization: {
    operationId: 'removeUserFromOrganization',
    url: '/storefronts/organization/:organizationId/members/:userId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        userId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'userId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            userId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getWebhooksForOrganization: {
    operationId: 'getWebhooksForOrganization',
    url: '/storefronts/organizations/:organizationId/webhooks',
    method: 'get',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Webhooks,
  },
  createWebhooksForOrganization: {
    operationId: 'createWebhooksForOrganization',
    url: '/storefronts/organizations/:organizationId/webhooks',
    method: 'post',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateWebhooks,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: CreateWebhooks,
      }),
    ),
    responseSchema: CreateWebhooksResponse,
  },
  updateWebhooks: {
    operationId: 'updateWebhooks',
    url: '/storefronts/organizations/:organizationId/webhooks',
    method: 'put',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: EditWebhooks,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: EditWebhooks,
      }),
    ),
    responseSchema: EditWebhooks,
  },
  deleteWebhooksForOrganization: {
    operationId: 'deleteWebhooksForOrganization',
    url: '/storefronts/organizations/:organizationId/webhooks',
    method: 'delete',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getWebhook: {
    operationId: 'getWebhook',
    url: '/storefronts/organizations/webhooks/:webhookId',
    method: 'get',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        webhookId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['webhookId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            webhookId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Webhook,
  },
  updateWebhook: {
    operationId: 'updateWebhook',
    url: '/storefronts/organizations/webhooks/:webhookId',
    method: 'put',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        webhookId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditWebhook,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['webhookId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            webhookId: UUIDFromString,
          }),
        ),
        body: EditWebhook,
      }),
    ),
    responseSchema: EditWebhook,
  },
  deleteWebhook: {
    operationId: 'deleteWebhook',
    url: '/storefronts/organizations/webhooks/:webhookId',
    method: 'delete',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        webhookId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['webhookId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            webhookId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  activateWebhook: {
    operationId: 'activateWebhook',
    url: '/storefronts/organizations/webhooks/:webhookId/activate',
    method: 'put',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        webhookId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['webhookId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            webhookId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Webhook,
  },
  deactivateWebhook: {
    operationId: 'deactivateWebhook',
    url: '/storefronts/organizations/webhooks/:webhookId/deactivate',
    method: 'put',
    category: 'Webhooks',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        webhookId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['webhookId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            webhookId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Webhook,
  },
  createPhaseset: {
    operationId: 'createPhaseset',
    url: '/storefronts/:storefrontId/phaseset',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditPhaseset,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: EditPhaseset,
      }),
    ),
    responseSchema: Phaseset,
  },
  getPhaseset: {
    operationId: 'getPhaseset',
    url: '/storefronts/:storefrontId/phaseset/:phasesetId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        phasesetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'phasesetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            phasesetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Phaseset,
  },
  updatePhaseset: {
    operationId: 'updatePhaseset',
    url: '/storefronts/:storefrontId/phaseset/:phasesetId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        phasesetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditPhaseset,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'phasesetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            phasesetId: UUIDFromString,
          }),
        ),
        body: EditPhaseset,
      }),
    ),
    responseSchema: Phaseset,
  },
  removePhaseset: {
    operationId: 'removePhaseset',
    url: '/storefronts/:storefrontId/phaseset/:phasesetId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        phasesetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'phasesetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            phasesetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  createAllowlist: {
    operationId: 'createAllowlist',
    url: '/storefronts/:storefrontId/allowlist',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditAllowlist,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: EditAllowlist,
      }),
    ),
    responseSchema: Allowlist,
  },
  getAllowlist: {
    operationId: 'getAllowlist',
    url: '/storefronts/:storefrontId/allowlist/:allowlistId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        allowlistId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'allowlistId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            allowlistId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Allowlist,
  },
  updateAllowlist: {
    operationId: 'updateAllowlist',
    url: '/storefronts/:storefrontId/allowlist/:allowlistId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        allowlistId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditAllowlist,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'allowlistId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            allowlistId: UUIDFromString,
          }),
        ),
        body: EditAllowlist,
      }),
    ),
    responseSchema: Allowlist,
  },
  removeAllowlist: {
    operationId: 'removeAllowlist',
    url: '/storefronts/:storefrontId/allowlist/:allowlistId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        allowlistId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'allowlistId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            allowlistId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  publishPhaseset: {
    operationId: 'publishPhaseset',
    url: '/storefronts/:storefrontId/publish-phaseset',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getClaimProofs: {
    operationId: 'getClaimProofs',
    url: '/storefronts/:storefrontId/proof/:address',
    method: 'get',
    category: 'Storefronts',
    security: [],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        address: Address,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        phaseStartTimestamp: DateFromISODateString,
        tokenIndex: UInt256ToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['phaseStartTimestamp', 'tokenIndex']),
    pathParameters: new Set(['storefrontId', 'address']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              storefrontId: UUIDFromString,
              address: Address,
            }),
            t.partial({
              phaseStartTimestamp: DateFromISODateString,
              tokenIndex: UInt256ToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: ClaimProofForAddress,
  },
  isAllowlisted: {
    operationId: 'isAllowlisted',
    url: '/storefronts/:storefrontId/allowlisted/:address',
    method: 'get',
    category: 'Storefronts',
    security: [],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        address: Address,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        tokenIndex: UInt256ToString,
        phaseStartTimestamp: DateFromISODateString,
        amount: UInt256ToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['tokenIndex', 'phaseStartTimestamp', 'amount']),
    pathParameters: new Set(['storefrontId', 'address']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              storefrontId: UUIDFromString,
              address: Address,
            }),
            t.partial({
              tokenIndex: UInt256ToString,
              phaseStartTimestamp: DateFromISODateString,
              amount: UInt256ToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: Listed,
  },
  proxyGet: {
    operationId: 'proxyGet',
    url: '/proxy-get',
    method: 'get',
    category: 'Proxy',
    security: [],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        url: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['url']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            url: t.string,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  proxyHead: {
    operationId: 'proxyHead',
    url: '/proxy-head',
    method: 'get',
    category: 'Proxy',
    security: [],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        url: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['url']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            url: t.string,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  getRelayPoolInfo: {
    operationId: 'getRelayPoolInfo',
    url: '/storefronts/organization/:organizationId/relaypool/info',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RelayPool,
  },
  getAllTransactions: {
    operationId: 'getAllTransactions',
    url: '/storefronts/organization/:organizationId/relaypool/transactions',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RelayedTransactions,
  },
  createTransaction: {
    operationId: 'createTransaction',
    url: '/storefronts/organization/:organizationId/relaypool/transactions',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: TransactionRelay,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: TransactionRelay,
      }),
    ),
    responseSchema: RelayedTransaction,
  },
  getTransaction: {
    operationId: 'getTransaction',
    url: '/storefronts/organization/:organizationId/relaypool/transactions/:transactionId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        transactionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'transactionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            transactionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RelayedTransaction,
  },
  getAllIssuances: {
    operationId: 'getAllIssuances',
    url: '/storefronts/organization/:organizationId/relaypool/issuances',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: IssuedTokens,
  },
  createIssuance: {
    operationId: 'createIssuance',
    url: '/storefronts/organization/:organizationId/relaypool/issuances',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: TokenIssuance,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: TokenIssuance,
      }),
    ),
    responseSchema: IssuedToken,
  },
  getIssuance: {
    operationId: 'getIssuance',
    url: '/storefronts/organization/:organizationId/relaypool/issuances/:issuanceId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        issuanceId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'issuanceId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            issuanceId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: IssuedToken,
  },
  claimCollection: {
    operationId: 'claimCollection',
    url: '/storefronts/claim',
    method: 'post',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: ClaimProofForCollection,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: ClaimProofForCollection,
      }),
    ),
    responseSchema: ClaimProofForCollectionResponse,
  },
  raiseClaimInvoice: {
    operationId: 'raiseClaimInvoice',
    url: '/storefronts/storefront/:storefrontId/claim/invoice',
    method: 'post',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: RaiseClaimInvoiceBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: RaiseClaimInvoiceBody,
      }),
    ),
    responseSchema: RaiseClaimInvoiceResponse,
  },
  triggerImport: {
    operationId: 'triggerImport',
    url: '/storefronts/storefront/:storefrontId/claim/import',
    method: 'post',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: BeehiveJob,
  },
  claimCollectionStatus: {
    operationId: 'claimCollectionStatus',
    url: '/storefronts/storefront/:storefrontId/claim/status',
    method: 'post',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: ClaimCollectionStatusResponse,
  },
  getClaimCollectionTerms: {
    operationId: 'getClaimCollectionTerms',
    url: '/storefronts/storefront/:storefrontId/terms',
    method: 'get',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: ClaimCollectionTermsStatus,
  },
  acceptClaimCollectionTerms: {
    operationId: 'acceptClaimCollectionTerms',
    url: '/storefronts/storefront/:storefrontId/terms',
    method: 'post',
    category: 'StorefrontImports',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: AcceptClaimCollectionTermsResponse,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: AcceptClaimCollectionTermsResponse,
      }),
    ),
    responseSchema: t.null,
  },
  createStorefront: {
    operationId: 'createStorefront',
    url: '/storefronts/storefront',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: CreateStorefront,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: CreateStorefront,
      }),
    ),
    responseSchema: Storefront,
  },
  getStorefronts: {
    operationId: 'getStorefronts',
    url: '/storefronts/storefront',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.partial({
        organizationId: UUIDFromString,
        isDeployed: BooleanToString,
        limit: IntegerToString,
        offset: IntegerToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['organizationId', 'isDeployed', 'limit', 'offset']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.partial({
            organizationId: UUIDFromString,
            isDeployed: BooleanToString,
            limit: IntegerToString,
            offset: IntegerToString,
          }),
        ),
      }),
    ),
    responseSchema: Storefronts,
  },
  getFeaturedStorefronts: {
    operationId: 'getFeaturedStorefronts',
    url: '/storefronts/storefront/featured',
    method: 'get',
    category: 'Storefronts',
    security: [],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: FeaturedStorefronts,
  },
  getStorefrontMemberships: {
    operationId: 'getStorefrontMemberships',
    url: '/storefronts/storefront/memberships',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        accountAddresses: t.string,
        chainIds: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['accountAddresses', 'chainIds']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            accountAddresses: t.string,
            chainIds: t.string,
          }),
        ),
      }),
    ),
    responseSchema: Storefronts,
  },
  updateStorefrontOrganizationId: {
    operationId: 'updateStorefrontOrganizationId',
    url: '/storefronts/storefront/:storefrontId/organization/:organizationId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  updateStorefrontSlug: {
    operationId: 'updateStorefrontSlug',
    url: '/storefronts/storefront/:storefrontId/slug/:slug',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        slug: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'slug']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            slug: t.string,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getStorefront: {
    operationId: 'getStorefront',
    url: '/storefronts/storefront/:storefrontId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Storefront,
  },
  patchStorefront: {
    operationId: 'patchStorefront',
    url: '/storefronts/storefront/:storefrontId',
    method: 'patch',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: PatchStorefront,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: PatchStorefront,
      }),
    ),
    responseSchema: Storefront,
  },
  updateStorefront: {
    operationId: 'updateStorefront',
    url: '/storefronts/storefront/:storefrontId',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditStorefront,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: EditStorefront,
      }),
    ),
    responseSchema: Storefront,
  },
  removeStorefront: {
    operationId: 'removeStorefront',
    url: '/storefronts/storefront/:storefrontId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getStorefrontPublic: {
    operationId: 'getStorefrontPublic',
    url: '/storefronts/storefront/public/:storefrontId',
    method: 'get',
    category: 'Storefronts',
    security: [{ OptionalAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: PublicStorefront,
  },
  getStorefrontPublicChainIdAndAddress: {
    operationId: 'getStorefrontPublicChainIdAndAddress',
    url: '/storefronts/storefront/public/chain/:chainId/address/:address',
    method: 'get',
    category: 'Storefronts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        address: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'address']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            address: Address,
          }),
        ),
      }),
    ),
    responseSchema: PublicStorefront,
  },
  getStorefrontChainIdAndAddress: {
    operationId: 'getStorefrontChainIdAndAddress',
    url: '/storefronts/storefront/chain/:chainId/address/:address',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        address: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'address']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            address: Address,
          }),
        ),
      }),
    ),
    responseSchema: Storefront,
  },
  uploadStorefrontFile: {
    operationId: 'uploadStorefrontFile',
    url: '/storefronts/storefront/:storefrontId/files',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: true,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.record(t.string, t.unknown),
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: t.record(t.string, t.unknown),
      }),
    ),
    responseSchema: UploadedStorefrontFileResponse,
  },
  logStorefrontChainModification: {
    operationId: 'logStorefrontChainModification',
    url: '/storefronts/storefront/:storefrontId/modification',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CollectionHistoryEntry,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: CollectionHistoryEntry,
      }),
    ),
    responseSchema: t.null,
  },
  getBaseCollectionInfo: {
    operationId: 'getBaseCollectionInfo',
    url: '/storefronts/base/:chainId/:contractAddress/info',
    method: 'get',
    category: 'Storefronts',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
          }),
        ),
      }),
    ),
    responseSchema: BaseCollectionInfo,
  },
  getAllRoyaltiesStats: {
    operationId: 'getAllRoyaltiesStats',
    url: '/storefronts/royalties/organization-stats/:organizationId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RoyaltiesStats,
  },
  getStorefrontRoyaltiesStats: {
    operationId: 'getStorefrontRoyaltiesStats',
    url: '/storefronts/royalties/contract-stats/:storefrontId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RoyaltyStatistics,
  },
  downloadRoyaltiesReport: {
    operationId: 'downloadRoyaltiesReport',
    url: '/storefronts/royalties/report/:storefrontId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  getStorefrontMembershipLists: {
    operationId: 'getStorefrontMembershipLists',
    url: '/storefronts/storefront/:storefrontId/memberships',
    method: 'get',
    category: 'Storefronts',
    security: [{ OptionalAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: StorefrontMemberships,
  },
  updateStorefrontMembershipListDisplayOrder: {
    operationId: 'updateStorefrontMembershipListDisplayOrder',
    url: '/storefronts/lists/display-order',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: UpdateStorefrontMembershipListDisplayOrderRequest,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: UpdateStorefrontMembershipListDisplayOrderRequest,
      }),
    ),
    responseSchema: t.null,
  },
  getSubscriptionsByOrganization: {
    operationId: 'getSubscriptionsByOrganization',
    url: '/subscriptions/organization/:organizationId',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: SubscriptionsWithStorefrontData,
  },
  createSubscription: {
    operationId: 'createSubscription',
    url: '/subscriptions/storefront/:storefrontId',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateSubscriptionBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: CreateSubscriptionBody,
      }),
    ),
    responseSchema: Subscription,
  },
  getSubscriptionsByStorefront: {
    operationId: 'getSubscriptionsByStorefront',
    url: '/subscriptions/storefront/:storefrontId',
    method: 'get',
    category: 'Subscription',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Subscriptions,
  },
  getUserSatisfiesSubscriptionRequirements: {
    operationId: 'getUserSatisfiesSubscriptionRequirements',
    url: '/subscriptions/:subscriptionId/user-satisfies-subscription-requirements',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: UserSatisfiesSubscriptionRequirementsResponse,
  },
  getUserSubscriptionInvoices: {
    operationId: 'getUserSubscriptionInvoices',
    url: '/subscriptions/:subscriptionId/user-subscription-invoices',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GetUserSubscriptionInvoicesResponse,
  },
  getSubscription: {
    operationId: 'getSubscription',
    url: '/subscriptions/:subscriptionId',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Subscription,
  },
  updateSubscription: {
    operationId: 'updateSubscription',
    url: '/subscriptions/:subscriptionId/storefront/:storefrontId',
    method: 'put',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditSubscription,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId', 'storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
            storefrontId: UUIDFromString,
          }),
        ),
        body: EditSubscription,
      }),
    ),
    responseSchema: Subscription,
  },
  deleteSubscription: {
    operationId: 'deleteSubscription',
    url: '/subscriptions/:subscriptionId/storefront/:storefrontId',
    method: 'delete',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getSubscriptionSubscriber: {
    operationId: 'getSubscriptionSubscriber',
    url: '/subscriptions/:subscriptionId/subscriber',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        service: SubscriptionService,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['service']),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              subscriptionId: UUIDFromString,
            }),
            t.partial({
              service: SubscriptionService,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetSubscriptionSubscriberResponse,
  },
  getPaymentsForSubscription: {
    operationId: 'getPaymentsForSubscription',
    url: '/subscriptions/:subscriptionId/payments',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GetSubscriptionPaymentsResponse,
  },
  getSubscriptionCoupons: {
    operationId: 'getSubscriptionCoupons',
    url: '/subscriptions/:subscriptionId/coupons',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GetSubscriptionCouponsResponse,
  },
  createSubscriptionCoupon: {
    operationId: 'createSubscriptionCoupon',
    url: '/subscriptions/:subscriptionId/coupons',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateSubscriptionCouponBody,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
        body: CreateSubscriptionCouponBody,
      }),
    ),
    responseSchema: t.null,
  },
  getSubscriptionCouponByName: {
    operationId: 'getSubscriptionCouponByName',
    url: '/subscriptions/:subscriptionId/coupon/:couponName',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
        couponName: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId', 'couponName']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
            couponName: t.string,
          }),
        ),
      }),
    ),
    responseSchema: SubscriptionCouponDefinition,
  },
  deleteSubscriptionCoupon: {
    operationId: 'deleteSubscriptionCoupon',
    url: '/subscriptions/:subscriptionId/coupons/:couponId',
    method: 'delete',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
        couponId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId', 'couponId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
            couponId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  createVoucherCampaign: {
    operationId: 'createVoucherCampaign',
    url: '/subscriptions/:subscriptionId/voucher-campaigns',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateVoucherCampaignBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
        body: CreateVoucherCampaignBody,
      }),
    ),
    responseSchema: VoucherCampaign,
  },
  getVoucherCampaigns: {
    operationId: 'getVoucherCampaigns',
    url: '/subscriptions/:subscriptionId/voucher-campaigns',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: VoucherCampaigns,
  },
  redeemSubscriptionVoucher: {
    operationId: 'redeemSubscriptionVoucher',
    url: '/subscriptions/:subscriptionId/voucher/:voucherId/redeem',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
        voucherId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: RedeemSubscriptionVoucherBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId', 'voucherId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
            voucherId: UUIDFromString,
          }),
        ),
        body: RedeemSubscriptionVoucherBody,
      }),
    ),
    responseSchema: RedeemSubscriptionVoucherResponse,
  },
  raiseSubscriptionInvoice: {
    operationId: 'raiseSubscriptionInvoice',
    url: '/subscriptions/:subscriptionId/invoice',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: RaiseSubscriptionInvoiceBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
        body: RaiseSubscriptionInvoiceBody,
      }),
    ),
    responseSchema: RaiseSubscriptionInvoiceResponse,
  },
  setSubscriptionReleaseStatus: {
    operationId: 'setSubscriptionReleaseStatus',
    url: '/subscriptions/:subscriptionId/release-status',
    method: 'post',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        subscriptionId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: SetSubscriptionReleaseStatusBody,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['subscriptionId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            subscriptionId: UUIDFromString,
          }),
        ),
        body: SetSubscriptionReleaseStatusBody,
      }),
    ),
    responseSchema: t.null,
  },
  updateVoucherCampaign: {
    operationId: 'updateVoucherCampaign',
    url: '/subscriptions/voucher-campaigns/:voucherCampaignId',
    method: 'put',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        voucherCampaignId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditVoucherCampaign,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['voucherCampaignId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            voucherCampaignId: UUIDFromString,
          }),
        ),
        body: EditVoucherCampaign,
      }),
    ),
    responseSchema: VoucherCampaign,
  },
  getVouchers: {
    operationId: 'getVouchers',
    url: '/subscriptions/voucher-campaigns/:voucherCampaignId/vouchers',
    method: 'get',
    category: 'Subscription',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        voucherCampaignId: UUIDFromString,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        limit: IntegerToString,
        offset: IntegerToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['limit', 'offset']),
    pathParameters: new Set(['voucherCampaignId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              voucherCampaignId: UUIDFromString,
            }),
            t.partial({
              limit: IntegerToString,
              offset: IntegerToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: Vouchers,
  },
  createTokenset: {
    operationId: 'createTokenset',
    url: '/storefronts/:storefrontId/tokenset',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Tokenset,
  },
  archiveStorefrontDraftTokenset: {
    operationId: 'archiveStorefrontDraftTokenset',
    url: '/storefronts/:storefrontId/tokenset/archive-draft-tokenset',
    method: 'put',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Tokenset,
  },
  getTokenset: {
    operationId: 'getTokenset',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: Tokenset,
  },
  removeTokenset: {
    operationId: 'removeTokenset',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  createOrUpdateTokensetPlaceholder: {
    operationId: 'createOrUpdateTokensetPlaceholder',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/placeholder',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateOrUpdateTokenDefinitionRequest,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
        body: CreateOrUpdateTokenDefinitionRequest,
      }),
    ),
    responseSchema: TokenDefinition,
  },
  getTokensetPlaceholder: {
    operationId: 'getTokensetPlaceholder',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/placeholder',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: GetTokensetPlaceholderResponse,
  },
  removeTokensetPlaceholder: {
    operationId: 'removeTokensetPlaceholder',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/placeholder',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  createOrUpdateToken: {
    operationId: 'createOrUpdateToken',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/token',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditTokenDefinition,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
        body: EditTokenDefinition,
      }),
    ),
    responseSchema: TokenDefinition,
  },
  getToken: {
    operationId: 'getToken',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/token/:tokenId',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
        tokenId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
            tokenId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: TokenDefinition,
  },
  removeToken: {
    operationId: 'removeToken',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/token/:tokenId',
    method: 'delete',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
        tokenId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId', 'tokenId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
            tokenId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getTokens: {
    operationId: 'getTokens',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/tokens',
    method: 'get',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        limit: IntegerToString,
        offset: IntegerToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['limit', 'offset']),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              storefrontId: UUIDFromString,
              tokensetId: UUIDFromString,
            }),
            t.partial({
              limit: IntegerToString,
              offset: IntegerToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetTokensResponse,
  },
  finalizeTokenset: {
    operationId: 'finalizeTokenset',
    url: '/storefronts/:storefrontId/tokenset/:tokensetId/finalize',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        tokensetId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'tokensetId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            tokensetId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: BeehiveJob,
  },
  publishTokenset: {
    operationId: 'publishTokenset',
    url: '/storefronts/:storefrontId/publish-tokenset',
    method: 'post',
    category: 'Storefronts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  checkJobStatus: {
    operationId: 'checkJobStatus',
    url: '/beehive/:routingTag/:requestId',
    method: 'get',
    category: 'Beehive',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        routingTag: BeehiveRoutingTag,
        requestId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['routingTag', 'requestId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            routingTag: BeehiveRoutingTag,
            requestId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: BeehiveJob,
  },
  getUserNfts: {
    operationId: 'getUserNfts',
    url: '/user-nfts',
    method: 'get',
    category: 'UserNfts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.intersection([
        t.type({
          chainId: ChainIdToString,
        }),
        t.partial({
          chainAddresses: t.string,
          collectionIds: t.string,
          limit: IntegerToString,
          cursor: t.string,
          verifiedOnly: BooleanToString,
        }),
      ]),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['chainId', 'chainAddresses', 'collectionIds', 'limit', 'cursor', 'verifiedOnly']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              chainId: ChainIdToString,
            }),
            t.partial({
              chainAddresses: t.string,
              collectionIds: t.string,
              limit: IntegerToString,
              cursor: t.string,
              verifiedOnly: BooleanToString,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetUserNftsResponse,
  },
  getUserPortfolioNfts: {
    operationId: 'getUserPortfolioNfts',
    url: '/user-portfolio-nfts/:chainId/:storefrontId',
    method: 'get',
    category: 'UserNfts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.exact(
      t.partial({
        limit: IntegerToString,
        cursor: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['limit', 'cursor']),
    pathParameters: new Set(['chainId', 'storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.intersection([
            t.type({
              chainId: ChainIdToString,
              storefrontId: UUIDFromString,
            }),
            t.partial({
              limit: IntegerToString,
              cursor: t.string,
            }),
          ]),
        ),
      }),
    ),
    responseSchema: GetUserPortfolioNftsResponse,
  },
  refreshUserNftMetadata: {
    operationId: 'refreshUserNftMetadata',
    url: '/:chainId/user-nft/refresh-metadata',
    method: 'post',
    category: 'UserNfts',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  removeUserProfile: {
    operationId: 'removeUserProfile',
    url: '/user-profile',
    method: 'delete',
    category: 'UserProfile',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: t.null,
  },
  getContractRoyaltiesInfo: {
    operationId: 'getContractRoyaltiesInfo',
    url: '/royalties/info/:chainId/:contractAddress',
    method: 'get',
    category: 'Royalties',
    security: [{ OptionalAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        contractAddress: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'contractAddress']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            contractAddress: Address,
          }),
        ),
      }),
    ),
    responseSchema: RoyaltyRules,
  },
  createRoyaltiesAppeal: {
    operationId: 'createRoyaltiesAppeal',
    url: '/royalties/appeal/:chainId/:blockHash/:transactionHash/:logIndex',
    method: 'post',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        blockHash: Hex,
        transactionHash: TransactionHash,
        logIndex: NumberToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: CreateRoyaltiesAppealBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'blockHash', 'transactionHash', 'logIndex']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            blockHash: Hex,
            transactionHash: TransactionHash,
            logIndex: NumberToString,
          }),
        ),
        body: CreateRoyaltiesAppealBody,
      }),
    ),
    responseSchema: RoyaltyInfo,
  },
  cancelPendingRoyaltiesAppeal: {
    operationId: 'cancelPendingRoyaltiesAppeal',
    url: '/royalties/appeal/:chainId/:blockHash/:transactionHash/:logIndex',
    method: 'delete',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        chainId: ChainIdToString,
        blockHash: Hex,
        transactionHash: TransactionHash,
        logIndex: NumberToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['chainId', 'blockHash', 'transactionHash', 'logIndex']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            chainId: ChainIdToString,
            blockHash: Hex,
            transactionHash: TransactionHash,
            logIndex: NumberToString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  getRoyaltiesSettlementOptions: {
    operationId: 'getRoyaltiesSettlementOptions',
    url: '/royalties/due',
    method: 'post',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: NftAcquisitionKeys,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: NftAcquisitionKeys,
      }),
    ),
    responseSchema: GetRoyaltiesSettlementOptionsResponse,
  },
  getRoyaltiesSettlementInstructions: {
    operationId: 'getRoyaltiesSettlementInstructions',
    url: '/royalties/invoice/:currency',
    method: 'post',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        currency: Address,
      }),
    ),
    querySchema: t.null,
    bodySchema: NftAcquisitionKeys,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['currency']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            currency: Address,
          }),
        ),
        body: NftAcquisitionKeys,
      }),
    ),
    responseSchema: t.union([GetRoyaltiesSettlementInstructionsResponse, GetRoyaltiesSettlementInstructionsResponse]),
  },
  getRoyaltiesConfiguration: {
    operationId: 'getRoyaltiesConfiguration',
    url: '/royalties/storefronts/:storefrontId/configuration',
    method: 'get',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RoyaltiesConfiguration,
  },
  updateRoyaltiesConfiguration: {
    operationId: 'updateRoyaltiesConfiguration',
    url: '/royalties/storefronts/:storefrontId/configuration',
    method: 'post',
    category: 'Royalties',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: RoyaltiesConfiguration,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: RoyaltiesConfiguration,
      }),
    ),
    responseSchema: RoyaltiesConfiguration,
  },
  trackIdentify: {
    operationId: 'trackIdentify',
    url: '/analytics/track/identify',
    method: 'post',
    category: 'Analytics',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: TrackIdentifyBody,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: TrackIdentifyBody,
      }),
    ),
    responseSchema: t.null,
  },
  trackEvent: {
    operationId: 'trackEvent',
    url: '/analytics/track/event',
    method: 'post',
    category: 'Analytics',
    security: [{ OptionalAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: TrackEventBody,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: TrackEventBody,
      }),
    ),
    responseSchema: t.null,
  },
  subscribeToCorrespondence: {
    operationId: 'subscribeToCorrespondence',
    url: '/storefront-correspondence/subscribe',
    method: 'post',
    category: 'StorefrontCorrespondence',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: UserCorrespondence,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: UserCorrespondence,
      }),
    ),
    responseSchema: t.null,
  },
  unsubscribeFromCorrespondence: {
    operationId: 'unsubscribeFromCorrespondence',
    url: '/storefront-correspondence/unsubscribe',
    method: 'post',
    category: 'StorefrontCorrespondence',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: UserCorrespondence,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: UserCorrespondence,
      }),
    ),
    responseSchema: t.null,
  },
  getUserCorrespondence: {
    operationId: 'getUserCorrespondence',
    url: '/storefront-correspondence/list',
    method: 'get',
    category: 'StorefrontCorrespondence',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: UserCorrespondenceList,
  },
  getStorefrontCorrespondenceInfo: {
    operationId: 'getStorefrontCorrespondenceInfo',
    url: '/storefront-correspondence/info',
    method: 'get',
    category: 'StorefrontCorrespondence',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.partial({
        organizationId: UUIDFromString,
        hasEmailCapture: BooleanToString,
        limit: IntegerToString,
        offset: IntegerToString,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['organizationId', 'hasEmailCapture', 'limit', 'offset']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.partial({
            organizationId: UUIDFromString,
            hasEmailCapture: BooleanToString,
            limit: IntegerToString,
            offset: IntegerToString,
          }),
        ),
      }),
    ),
    responseSchema: CorrespondencesInfo,
  },
  getStorefrontCorrespondenceEmailSummary: {
    operationId: 'getStorefrontCorrespondenceEmailSummary',
    url: '/storefront-correspondence/email-summary',
    method: 'post',
    category: 'StorefrontCorrespondence',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: StorefrontIds,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: StorefrontIds,
      }),
    ),
    responseSchema: CorrespondenceList,
  },
  testDiscordConnection: {
    operationId: 'testDiscordConnection',
    url: '/organization/storefronts/:storefrontId/discord-connection/test',
    method: 'post',
    category: 'Organizations',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: JobStatus,
  },
  createGasWallet: {
    operationId: 'createGasWallet',
    url: '/organization/:organizationId/create-gas-wallet/',
    method: 'post',
    category: 'Organizations',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: CreateGasWalletResponse,
  },
  connectStripeAccount: {
    operationId: 'connectStripeAccount',
    url: '/organization/:organizationId/connect-stripe-account/',
    method: 'post',
    category: 'Organizations',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: ConnectStripeAccountBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: ConnectStripeAccountBody,
      }),
    ),
    responseSchema: Organization,
  },
  disconnectStripeAccount: {
    operationId: 'disconnectStripeAccount',
    url: '/organization/:organizationId/disconnect-stripe-account/',
    method: 'post',
    category: 'Organizations',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: DisconnectStripeAccountBody,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
        body: DisconnectStripeAccountBody,
      }),
    ),
    responseSchema: Organization,
  },
  getStripeAccountName: {
    operationId: 'getStripeAccountName',
    url: '/organization/:organizationId/get-stripe-account-name/:stripeId',
    method: 'get',
    category: 'Organizations',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
        stripeId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId', 'stripeId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
            stripeId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: t.string,
  },
  getStorefrontsMembershipListOverview: {
    operationId: 'getStorefrontsMembershipListOverview',
    url: '/memberships/organizations/:organizationId',
    method: 'get',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        organizationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['organizationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            organizationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: StorefrontsMembershipListOverview,
  },
  createMembershipList: {
    operationId: 'createMembershipList',
    url: '/memberships/storefronts/:storefrontId/lists',
    method: 'post',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: MembershipList,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: MembershipList,
      }),
    ),
    responseSchema: MembershipListResponse,
  },
  getMembershipListsByStorefrontId: {
    operationId: 'getMembershipListsByStorefrontId',
    url: '/memberships/storefronts/:storefrontId/lists',
    method: 'get',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: MembershipLists,
  },
  updateMembershipList: {
    operationId: 'updateMembershipList',
    url: '/memberships/lists/:listId',
    method: 'put',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        listId: IntegerToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: MembershipList,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['listId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            listId: IntegerToString,
          }),
        ),
        body: MembershipList,
      }),
    ),
    responseSchema: MembershipListResponse,
  },
  getMembershipList: {
    operationId: 'getMembershipList',
    url: '/memberships/lists/:listId',
    method: 'get',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        listId: IntegerToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['listId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            listId: IntegerToString,
          }),
        ),
      }),
    ),
    responseSchema: MembershipList,
  },
  downloadMembershipListReport: {
    operationId: 'downloadMembershipListReport',
    url: '/memberships/lists/:listId/reports',
    method: 'post',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: true,
    paramsSchema: t.exact(
      t.type({
        listId: IntegerToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: AvailableReports,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['listId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            listId: IntegerToString,
          }),
        ),
        body: AvailableReports,
      }),
    ),
    responseSchema: t.string,
  },
  getMembershipListAvailableReportKinds: {
    operationId: 'getMembershipListAvailableReportKinds',
    url: '/memberships/lists/reports',
    method: 'post',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: Conditions,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: Conditions,
      }),
    ),
    responseSchema: AvailableReports,
  },
  getMembershipListUserDiscordStatus: {
    operationId: 'getMembershipListUserDiscordStatus',
    url: '/memberships/lists/:listId/user-discord-status',
    method: 'get',
    category: 'Memberships',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        listId: IntegerToString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['listId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            listId: IntegerToString,
          }),
        ),
      }),
    ),
    responseSchema: MembershipListUserDiscordStatusResponse,
  },
  getRedemptionsForToken: {
    operationId: 'getRedemptionsForToken',
    url: '/redemptions/:token',
    method: 'get',
    category: 'Redemptions',
    security: [],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        token: TokenStringIdentifier,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['token']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            token: TokenStringIdentifier,
          }),
        ),
      }),
    ),
    responseSchema: RedemptionsConfigPublic,
  },
  redeemToken: {
    operationId: 'redeemToken',
    url: '/redemptions/:token/redeem',
    method: 'post',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        token: TokenStringIdentifier,
      }),
    ),
    querySchema: t.null,
    bodySchema: Redemption,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['token']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            token: TokenStringIdentifier,
          }),
        ),
        body: Redemption,
      }),
    ),
    responseSchema: t.null,
  },
  getRedemptionConfigurations: {
    operationId: 'getRedemptionConfigurations',
    url: '/redemptions/storefronts/:storefrontId/configuration',
    method: 'get',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: RedemptionConfigs,
  },
  createRedemptionConfiguration: {
    operationId: 'createRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration',
    method: 'post',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditRedemptionConfig,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
          }),
        ),
        body: EditRedemptionConfig,
      }),
    ),
    responseSchema: RedemptionConfig,
  },
  updateRedemptionConfiguration: {
    operationId: 'updateRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration/:configurationId',
    method: 'put',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        configurationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditRedemptionConfig,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'configurationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            configurationId: UUIDFromString,
          }),
        ),
        body: EditRedemptionConfig,
      }),
    ),
    responseSchema: RedemptionConfig,
  },
  deleteRedemptionConfiguration: {
    operationId: 'deleteRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration/:configurationId',
    method: 'delete',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        configurationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'configurationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            configurationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  updatePublishedRedemptionConfiguration: {
    operationId: 'updatePublishedRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration/:configurationId/published',
    method: 'put',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        configurationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: EditPublishedRedemptionConfig,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'configurationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            configurationId: UUIDFromString,
          }),
        ),
        body: EditPublishedRedemptionConfig,
      }),
    ),
    responseSchema: EditPublishedRedemptionConfig,
  },
  publishRedemptionConfiguration: {
    operationId: 'publishRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration/:configurationId/publish',
    method: 'post',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        configurationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'configurationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            configurationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  unpublishRedemptionConfiguration: {
    operationId: 'unpublishRedemptionConfiguration',
    url: '/redemptions/storefronts/:storefrontId/configuration/:configurationId/unpublish',
    method: 'post',
    category: 'Redemptions',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        storefrontId: UUIDFromString,
        configurationId: UUIDFromString,
      }),
    ),
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set(['storefrontId', 'configurationId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            storefrontId: UUIDFromString,
            configurationId: UUIDFromString,
          }),
        ),
      }),
    ),
    responseSchema: t.null,
  },
  createPaymentIntent: {
    operationId: 'createPaymentIntent',
    url: '/stripe/payment-intents',
    method: 'post',
    category: 'Stripe',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: PaymentIntentMetadata,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        body: PaymentIntentMetadata,
      }),
    ),
    responseSchema: PaymentIntent,
  },
  updatePaymentIntent: {
    operationId: 'updatePaymentIntent',
    url: '/stripe/payment-intents/:paymentIntentId',
    method: 'post',
    category: 'Stripe',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: true,
    hasBody: true,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.exact(
      t.type({
        paymentIntentId: t.string,
      }),
    ),
    querySchema: t.null,
    bodySchema: PaymentIntentMetadata,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set([]),
    pathParameters: new Set(['paymentIntentId']),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            paymentIntentId: t.string,
          }),
        ),
        body: PaymentIntentMetadata,
      }),
    ),
    responseSchema: PaymentIntent,
  },
  stripeReceiver: {
    operationId: 'stripeReceiver',
    url: '/stripe/receiver',
    method: 'post',
    category: 'Stripe',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: false,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.null,
    bodySchema: t.null,
    hasRequest: false,
    hasResponse: false,
    queryParameters: new Set([]),
    pathParameters: new Set([]),
    requestSchema: t.exact(t.type({})),
    responseSchema: t.null,
  },
  stripeIssuanceStatus: {
    operationId: 'stripeIssuanceStatus',
    url: '/stripe/issuance-status',
    method: 'get',
    category: 'Stripe',
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
    hasQuery: true,
    hasParams: false,
    hasBody: false,
    isBodyFormData: false,
    hasBinaryResponse: false,
    paramsSchema: t.null,
    querySchema: t.exact(
      t.type({
        paymentIntentId: t.string,
      }),
    ),
    bodySchema: t.null,
    hasRequest: true,
    hasResponse: true,
    queryParameters: new Set(['paymentIntentId']),
    pathParameters: new Set([]),
    requestSchema: t.exact(
      t.type({
        parameters: t.exact(
          t.type({
            paymentIntentId: t.string,
          }),
        ),
      }),
    ),
    responseSchema: StripeIssuanceStatusResponse,
  },
} as const;

export type pathMeta = typeof pathMeta;
