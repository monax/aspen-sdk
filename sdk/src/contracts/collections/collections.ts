import { Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { parse } from '../../utils';
import { Address, Addressish, asAddress } from '../address';
import { ChainId } from '../network';
import { SdkError, SdkErrorCode } from './errors';
import {
  acceptTerms,
  acceptTermsFor,
  acceptTermsForMany,
  acceptTermsWithSignature,
  balanceOf,
  burn,
  claim,
  ContractFunctionId,
  ContractFunctionIds,
  contractUri,
  ERC1155StandardInterfaces,
  ERC721StandardInterfaces,
  exists,
  extractKnownSupportedFeatures,
  FeatureFunctionId,
  FeatureInterface,
  FeatureInterfaceId,
  getBaseURIIndices,
  getClaimConditionById,
  getClaimPauseStatus,
  getDefaultRoyaltyInfo,
  getLargestTokenId,
  getPlatformFeeInfo,
  getPrimarySaleRecipient,
  getRoyaltyInfoForToken,
  getSmallestTokenId,
  getTermsDetails,
  getUserClaimConditions,
  hasAcceptedTerms,
  hasAcceptedTermsVersion,
  implementationName,
  implementationVersion,
  isAspenFeatures,
  issue,
  issueWithTokenUri,
  lazyMint,
  multicall,
  name,
  owner,
  ownerOf,
  royaltyInfo,
  safeTransferFrom,
  setClaimConditions,
  setClaimPauseStatus,
  setContractUri,
  setDefaultRoyaltyInfo,
  setMaxTotalSupply,
  setMaxWalletClaimCount,
  setOperatorFiltererStatus,
  setOwner,
  setPermanentTokenUri,
  setPlatformFeeInfo,
  setPrimarySaleRecipient,
  setRoyaltyInfoForToken,
  setTermsActivation,
  setTermsUri,
  setTokenNameAndSymbol,
  setTokenUri,
  supportedFeatures,
  supportsInterface,
  symbol,
  tokenUri,
  totalSupply,
  updateBaseUri,
  verifyClaim,
} from './features';

import type { CollectionInfo, DebugHandler, TokenId, TokenStandard } from './types';

export const DefaultDebugHandler = (collection: CollectionInfo, action: string, ...data: unknown[]) => {
  console.debug(`Collection Contract ${collection.chainId} # ${collection.address} -> ${action}`, ...data);
};

export type FeatureInterfaces = { -readonly [K in FeatureInterfaceId]: FeatureInterface<K> };

export class CollectionContract {
  private static _debugHandler: DebugHandler | undefined;

  private _supportedFeaturesList: FeatureInterfaceId[] = [];
  private _interfaces: Partial<FeatureInterfaces>;
  private _tokenStandard: TokenStandard;
  private readonly _provider: Provider;

  readonly chainId: ChainId;
  readonly address: Address;

  //////
  // Contract Functions
  //////

  // Contract
  readonly isAspenFeatures = isAspenFeatures(this);
  readonly supportsInterface = supportsInterface(this);
  readonly supportedFeatures = supportedFeatures(this);
  readonly implementationName = implementationName(this);
  readonly implementationVersion = implementationVersion(this);
  readonly owner = owner(this);
  readonly setOwner = setOwner(this);

  // Collection
  readonly name = name(this);
  readonly symbol = symbol(this);
  readonly contractUri = contractUri(this);
  readonly setContractUri = setContractUri(this);
  readonly setTokenNameAndSymbol = setTokenNameAndSymbol(this);

  // Multicall
  readonly multicall = multicall(this);

  // Terms
  readonly acceptTerms = acceptTerms(this);
  readonly acceptTermsFor = acceptTermsFor(this);
  readonly acceptTermsForMany = acceptTermsForMany(this);
  readonly acceptTermsWithSignature = acceptTermsWithSignature(this);
  readonly getTermsDetails = getTermsDetails(this);
  readonly hasAcceptedTerms = hasAcceptedTerms(this);
  readonly hasAcceptedTermsVersion = hasAcceptedTermsVersion(this);
  readonly setTermsActivation = setTermsActivation(this);
  readonly setTermsUri = setTermsUri(this);

  // Token
  readonly exists = exists(this);
  readonly ownerOf = ownerOf(this);
  readonly balanceOf = balanceOf(this);
  readonly tokenUri = tokenUri(this);
  readonly setTokenUri = setTokenUri(this);
  readonly setPermanentTokenUri = setPermanentTokenUri(this);
  readonly getBaseURIIndices = getBaseURIIndices(this);
  readonly updateBaseUri = updateBaseUri(this);
  readonly safeTransferFrom = safeTransferFrom(this);

  // Supply
  readonly totalSupply = totalSupply(this);
  readonly setMaxTotalSupply = setMaxTotalSupply(this);
  readonly getSmallestTokenId = getSmallestTokenId(this);
  readonly getLargestTokenId = getLargestTokenId(this);

  // Mint
  readonly lazyMint = lazyMint(this);

  // Claim
  readonly claim = claim(this);
  readonly verifyClaim = verifyClaim(this);
  readonly getClaimConditionById = getClaimConditionById(this);
  readonly getUserClaimConditions = getUserClaimConditions(this);
  readonly setClaimConditions = setClaimConditions(this);
  readonly getClaimPauseStatus = getClaimPauseStatus(this);
  readonly setClaimPauseStatus = setClaimPauseStatus(this);
  readonly setMaxWalletClaimCount = setMaxWalletClaimCount(this);

  // Burn
  readonly burn = burn(this);

  // Issue
  readonly issue = issue(this);
  readonly issueWithTokenUri = issueWithTokenUri(this);

  // Royalties
  readonly royaltyInfo = royaltyInfo(this);
  readonly getDefaultRoyaltyInfo = getDefaultRoyaltyInfo(this);
  readonly setDefaultRoyaltyInfo = setDefaultRoyaltyInfo(this);
  readonly getRoyaltyInfoForToken = getRoyaltyInfoForToken(this);
  readonly setRoyaltyInfoForToken = setRoyaltyInfoForToken(this);

  // Platform fee
  readonly getPlatformFeeInfo = getPlatformFeeInfo(this);
  readonly setPlatformFeeInfo = setPlatformFeeInfo(this);

  // Royalties
  readonly getPrimarySaleRecipient = getPrimarySaleRecipient(this);
  readonly setPrimarySaleRecipient = setPrimarySaleRecipient(this);

  // Operator filterer
  readonly setOperatorFiltererStatus = setOperatorFiltererStatus(this);

  static setDebugHandler(handler: DebugHandler | undefined) {
    CollectionContract._debugHandler = handler;
  }

  static async from(provider: Provider, collectionAddress: Addressish): Promise<CollectionContract> {
    try {
      const { chainId } = await provider.getNetwork();
      const chain = parse(ChainId, chainId);
      const address = await asAddress(collectionAddress);

      const iFeatures = FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV0', address, provider);
      const features = await iFeatures.connectReadOnly().supportedFeatures();

      return new CollectionContract(provider, chain, address, features);
    } catch (err) {
      throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_FEATURES, undefined, err as Error);
    }
  }

  constructor(provider: Provider, chain: ChainId, address: Address, features: string[]) {
    this.chainId = chain;
    this.address = address;
    this._provider = provider;

    this._supportedFeaturesList = extractKnownSupportedFeatures(features);
    this._interfaces = this.getInterfaces();
    this.debug('Loaded supported features', this._supportedFeaturesList);

    this._tokenStandard = CollectionContract.detectStandard(this._supportedFeaturesList);
    this.debug('Token standard set to', this.tokenStandard);
  }

  get supportedFeaturesList(): string[] {
    return this._supportedFeaturesList;
  }

  /**
   * @returns An object with mapped interface factories
   */
  get interfaces(): Partial<FeatureInterfaces> {
    return this._interfaces;
  }

  get tokenStandard(): TokenStandard {
    return this._tokenStandard;
  }

  get provider(): Provider {
    return this._provider;
  }

  assumeFeature<T extends FeatureInterfaceId>(feature: T): FeatureInterface<T> {
    return FeatureInterface.fromFeature(feature, this.address, this._provider);
  }

  protected getInterfaces(): Partial<FeatureInterfaces> {
    const interfaces = {} as Record<FeatureInterfaceId, FeatureInterface<FeatureInterfaceId>>;
    for (const feature of this._supportedFeaturesList) {
      interfaces[feature] = this.assumeFeature(feature);
    }

    return interfaces;
  }

  static detectStandard(features: FeatureInterfaceId[]): TokenStandard {
    if (features.some((f) => ERC721StandardInterfaces.includes(f))) return 'ERC721';
    if (features.some((f) => ERC1155StandardInterfaces.includes(f))) return 'ERC1155';

    throw new SdkError(SdkErrorCode.EMPTY_TOKEN_STANDARD);
  }

  debug(message: string, ...data: unknown[]) {
    if (CollectionContract._debugHandler) {
      const collection: CollectionInfo = {
        chainId: this.chainId,
        address: this.address,
        tokenStandard: this.tokenStandard,
      };
      CollectionContract._debugHandler(collection, message, ...data);
    }
  }

  getFunctionsProps<
    K extends 'supported' | 'handledFeatures' | 'handledFunctions',
    R = K extends 'supported'
      ? boolean
      : K extends 'handledFeatures'
      ? FeatureInterfaceId[]
      : K extends 'handledFunctions'
      ? Record<string, FeatureFunctionId>
      : never,
  >(property: K): Record<ContractFunctionId, R> {
    return ContractFunctionIds.reduce<Record<ContractFunctionId, R>>((acc, func) => {
      acc[func] = this[func][property] as R;
      return acc;
    }, {} as Record<ContractFunctionId, R>);
  }

  //////
  /// Helper functions
  //////

  requireTokenId(tokenId: TokenId, functionName?: string): BigNumber {
    if (tokenId === null || tokenId === undefined) {
      throw new SdkError(SdkErrorCode.TOKEN_ID_REQUIRED, { tokenId, functionName });
    }

    try {
      return BigNumber.from(tokenId);
    } catch (err) {
      const error = new Error('Invalid value for BigNumber');
      throw new SdkError(SdkErrorCode.INVALID_DATA, { tokenId, functionName }, error);
    }
  }

  rejectTokenId(tokenId: TokenId, functionName?: string): asserts tokenId is null | undefined {
    if (tokenId !== null && tokenId !== undefined) {
      throw new SdkError(SdkErrorCode.TOKEN_ID_REJECTED, { tokenId, functionName });
    }
  }
}
