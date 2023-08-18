import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address, Addressish, asAddress, ChainId } from '@monaxlabs/phloem/dist/types';
import { Abi, getContract, GetContractReturnType, Hex, numberToHex, PublicClient } from 'viem';
import { SdkError, SdkErrorCode } from './errors';
import {
  acceptTerms,
  acceptTermsFor,
  acceptTermsForMany,
  acceptTermsWithSignature,
  approve,
  balanceOf,
  balanceOfBatch,
  batchIssue,
  batchIssueWithinPhase,
  batchIssueWithinPhaseWithTokenUri,
  batchIssueWithTokenUri,
  burn,
  burnBatch,
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
  isApproved,
  isApprovedForAll,
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
  safeBatchTransferFrom,
  safeTransferFrom,
  setApprovalForAll,
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
  transferFrom,
  updateBaseUri,
  updateChargebackProtectionPeriod,
  verifyClaim,
} from './features';
import { FeatureCodesMap } from './features/feature-codes.gen';
import type { CollectionInfo, DebugHandler, Provider, TokenId, TokenStandard } from './types';

export const DefaultDebugHandler = (collection: CollectionInfo, action: string, ...data: unknown[]) => {
  console.debug(`Collection Contract ${collection.chainId} # ${collection.address} -> ${action}`, ...data);
};

export type FeatureInterfaces = { -readonly [K in FeatureInterfaceId]: FeatureInterface<K> };

export class CollectionContract {
  private static _debugHandler: DebugHandler | undefined;

  private _supportedFeaturesList: FeatureInterfaceId[] = [];
  private _interfaces: Partial<FeatureInterfaces>;
  private _tokenStandard: TokenStandard;
  private readonly _publicClient: PublicClient;

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
  readonly balanceOfBatch = balanceOfBatch(this);
  readonly tokenUri = tokenUri(this);
  readonly setTokenUri = setTokenUri(this);
  readonly setPermanentTokenUri = setPermanentTokenUri(this);
  readonly getBaseURIIndices = getBaseURIIndices(this);
  readonly getBaseURICount = getBaseURICount(this);
  readonly updateBaseUri = updateBaseUri(this);
  readonly transferFrom = transferFrom(this);
  readonly safeTransferFrom = safeTransferFrom(this);
  readonly safeBatchTransferFrom = safeBatchTransferFrom(this);

  // Approve
  readonly approve = approve(this);
  readonly isApproved = isApproved(this);
  readonly setApprovalForAll = setApprovalForAll(this);
  readonly isApprovedForAll = isApprovedForAll(this);

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
  readonly burnBatch = burnBatch(this);

  // Issue
  readonly issue = issue(this);
  readonly issueWithTokenUri = issueWithTokenUri(this);
  readonly issueWithinPhase = issueWithinPhase(this);
  readonly issueWithinPhaseWithTokenUri = issueWithinPhaseWithTokenUri(this);
  readonly batchIssue = batchIssue(this);
  readonly batchIssueWithTokenUri = batchIssueWithTokenUri(this);
  readonly batchIssueWithinPhase = batchIssueWithinPhase(this);
  readonly batchIssueWithinPhaseWithTokenUri = batchIssueWithinPhaseWithTokenUri(this);
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
    publicClient: Provider,
    collectionAddress: Addressish,
    withExperimental = false,
  ): Promise<CollectionContract> {
    try {
      const chainId = parse(ChainId, publicClient.chain.id);
      const address = await asAddress(collectionAddress);

      try {
        const featuresV1Contract = getContract({
          publicClient,
          address: address as Hex,
          abi: FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV1').abi,
        });

        const codes = await featuresV1Contract.read.supportedFeatureCodes();
        const features = codes.map((code) => FeatureCodesMap[numberToHex(code) as keyof typeof FeatureCodesMap]);
        return new CollectionContract(publicClient, chainId, address, features, withExperimental);
      } catch {}

      try {
        const featuresV0Contract = getContract({
          publicClient,
          address: address as Hex,
          abi: FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV0').abi,
        });

        const features = await featuresV0Contract.read.supportedFeatures();
        return new CollectionContract(publicClient, chainId, address, [...features], withExperimental);
      } catch {}
    } catch {}

    throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_FEATURES);
  }

  constructor(publicClient: Provider, chain: ChainId, address: Address, features: string[], withExperimental = false) {
    this.chainId = chain;
    this.address = address;
    this._publicClient = publicClient;

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

  get publicClient(): PublicClient {
    return this._publicClient;
  }

  assumeFeature<T extends FeatureInterfaceId>(feature: T): FeatureInterface<T> {
    return FeatureInterface.fromFeature(feature);
  }

  protected getInterfaces(): Partial<FeatureInterfaces> {
    return Object.fromEntries(this._supportedFeaturesList.map((f) => [f, this.assumeFeature(f)]));
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

  requireTokenId(tokenId: TokenId, functionName?: string): bigint {
    if (tokenId === null || tokenId === undefined) {
      throw new SdkError(SdkErrorCode.TOKEN_ID_REQUIRED, { tokenId, functionName });
    }

    try {
      return BigInt(tokenId.toString());
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

  reader<A extends Abi>(abi: A): GetContractReturnType<A, PublicClient> {
    return getContract({
      address: this.address as Hex,
      abi,
      publicClient: this._publicClient,
    });
  }
}
