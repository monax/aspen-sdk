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
  chargebackWithdrawal,
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
  getBaseURICount,
  getBaseURIIndices,
  getChargebackProtectionPeriod,
  getClaimConditionById,
  getClaimConditions,
  getClaimData,
  getClaimPauseStatus,
  getClaimPaymentDetails,
  getDefaultRoyaltyInfo,
  getIssueBufferSizeForAddressAndToken,
  getLargestTokenId,
  getOperatorRestriction,
  getPlatformFees,
  getPrimarySaleRecipient,
  getRoleAdmin,
  getRoyaltyInfoForToken,
  getSmallestTokenId,
  getTermsDetails,
  getTransferTimesForToken,
  getUserClaimConditions,
  grantRole,
  hasAcceptedTerms,
  hasAcceptedTermsVersion,
  hasRole,
  implementationName,
  implementationVersion,
  isAspenFeatures,
  isAspenFeaturesV1,
  issue,
  issueWithinPhase,
  issueWithinPhaseWithTokenUri,
  issueWithTokenUri,
  lazyMint,
  multicall,
  name,
  owner,
  ownerOf,
  renounceRole,
  revokeRole,
  royaltyInfo,
  safeTransferFrom,
  setClaimConditions,
  setClaimPauseStatus,
  setContractUri,
  setDefaultRoyaltyInfo,
  setMaxTotalSupply,
  setMaxWalletClaimCount,
  setOperatorFilterer,
  setOperatorRestriction,
  setOwner,
  setPermanentTokenUri,
  setPlatformFees,
  setPrimarySaleRecipient,
  setRoyaltyInfoForToken,
  setSaleRecipientForToken,
  setTermsActivation,
  setTermsRequired,
  setTermsUri,
  setTokenNameAndSymbol,
  setTokenUri,
  setWalletClaimCount,
  supportedFeatureCodes,
  supportedFeatures,
  supportsInterface,
  symbol,
  tokenUri,
  totalSupply,
  updateBaseUri,
  updateChargebackProtectionPeriod,
  verifyClaim,
} from './features';
import { FeatureCodesMap } from './features/feature-codes.gen';
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
  readonly isAspenFeaturesV1 = isAspenFeaturesV1(this);
  readonly supportsInterface = supportsInterface(this);
  readonly supportedFeatures = supportedFeatures(this);
  readonly supportedFeatureCodes = supportedFeatureCodes(this);
  readonly implementationName = implementationName(this);
  readonly implementationVersion = implementationVersion(this);
  readonly owner = owner(this);
  readonly setOwner = setOwner(this);
  readonly grantRole = grantRole(this);
  readonly revokeRole = revokeRole(this);
  readonly renounceRole = renounceRole(this);
  readonly hasRole = hasRole(this);
  readonly getRoleAdmin = getRoleAdmin(this);

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
  readonly setTermsRequired = setTermsRequired(this);
  readonly setTermsUri = setTermsUri(this);

  // Token
  readonly exists = exists(this);
  readonly ownerOf = ownerOf(this);
  readonly balanceOf = balanceOf(this);
  readonly tokenUri = tokenUri(this);
  readonly setTokenUri = setTokenUri(this);
  readonly setPermanentTokenUri = setPermanentTokenUri(this);
  readonly getBaseURIIndices = getBaseURIIndices(this);
  readonly getBaseURICount = getBaseURICount(this);
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
  readonly setWalletClaimCount = setWalletClaimCount(this);
  readonly getClaimConditions = getClaimConditions(this);
  readonly getClaimData = getClaimData(this);
  readonly getClaimPaymentDetails = getClaimPaymentDetails(this);

  // Burn
  readonly burn = burn(this);

  // Issue
  readonly issue = issue(this);
  readonly issueWithTokenUri = issueWithTokenUri(this);
  readonly issueWithinPhase = issueWithinPhase(this);
  readonly issueWithinPhaseWithTokenUri = issueWithinPhaseWithTokenUri(this);
  readonly chargebackWithdrawal = chargebackWithdrawal(this);
  readonly updateChargebackProtectionPeriod = updateChargebackProtectionPeriod(this);
  readonly getTransferTimesForToken = getTransferTimesForToken(this);
  readonly getIssueBufferSizeForAddressAndToken = getIssueBufferSizeForAddressAndToken(this);
  readonly getChargebackProtectionPeriod = getChargebackProtectionPeriod(this);

  // Royalties
  readonly royaltyInfo = royaltyInfo(this);
  readonly getDefaultRoyaltyInfo = getDefaultRoyaltyInfo(this);
  readonly setDefaultRoyaltyInfo = setDefaultRoyaltyInfo(this);
  readonly getRoyaltyInfoForToken = getRoyaltyInfoForToken(this);
  readonly setRoyaltyInfoForToken = setRoyaltyInfoForToken(this);

  // Platform fee
  readonly getPlatformFees = getPlatformFees(this);
  readonly setPlatformFees = setPlatformFees(this);
  readonly setSaleRecipientForToken = setSaleRecipientForToken(this);

  // Royalties
  readonly getPrimarySaleRecipient = getPrimarySaleRecipient(this);
  readonly setPrimarySaleRecipient = setPrimarySaleRecipient(this);

  // Operator filterer
  readonly setOperatorRestriction = setOperatorRestriction(this);
  readonly getOperatorRestriction = getOperatorRestriction(this);
  readonly setOperatorFilterer = setOperatorFilterer(this);

  static setDebugHandler(handler: DebugHandler | undefined) {
    CollectionContract._debugHandler = handler;
  }

  static async from(
    provider: Provider,
    collectionAddress: Addressish,
    withExperimental = false,
  ): Promise<CollectionContract> {
    try {
      const { chainId } = await provider.getNetwork();
      const chain = parse(ChainId, chainId);
      const address = await asAddress(collectionAddress);

      try {
        const iFeaturesV1 = FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV1', address, provider);
        const codes = await iFeaturesV1.connectReadOnly().supportedFeatureCodes();
        const features = codes.map((code) => FeatureCodesMap[code.toHexString() as keyof typeof FeatureCodesMap]);
        return new CollectionContract(provider, chain, address, features, withExperimental);
      } catch {}

      try {
        const iFeaturesV0 = FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV0', address, provider);
        const features = await iFeaturesV0.connectReadOnly().supportedFeatures();
        return new CollectionContract(provider, chain, address, features, withExperimental);
      } catch {}
    } catch {}

    throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_FEATURES);
  }

  constructor(provider: Provider, chain: ChainId, address: Address, features: string[], withExperimental = false) {
    this.chainId = chain;
    this.address = address;
    this._provider = provider;

    this._supportedFeaturesList = extractKnownSupportedFeatures(features, withExperimental);
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
