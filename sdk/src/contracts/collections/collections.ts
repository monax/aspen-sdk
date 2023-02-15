import { Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { parse } from '../../utils';
import { Address, Addressish, asAddress } from '../address';
import { ChainId } from '../network';
import { SdkError, SdkErrorCode } from './errors';
import {
  AcceptTerms,
  AcceptTermsFor,
  AcceptTermsForMany,
  AcceptTermsWithSignature,
  asCallable,
  BalanceOf,
  Burn,
  Claim,
  ContractFunctionId,
  ContractFunctionIds,
  ContractUri,
  ERC1155StandardInterfaces,
  ERC721StandardInterfaces,
  Exists,
  extractKnownSupportedFeatures,
  FeatureFunctionId,
  FeatureInterface,
  FeatureInterfaceId,
  GetBaseURIIndices,
  GetClaimConditionById,
  GetClaimPauseStatus,
  GetDefaultRoyaltyInfo,
  GetLargestTokenId,
  GetPlatformFeeInfo,
  GetPrimarySaleRecipient,
  GetRoyaltyInfoForToken,
  GetSmallestTokenId,
  GetTermsDetails,
  GetUserClaimConditions,
  HasAcceptedTerms,
  HasAcceptedTermsVersion,
  ImplementationName,
  ImplementationVersion,
  IsAspenFeatures,
  Issue,
  IssueWithTokenUri,
  LazyMint,
  Multicall,
  Name,
  Owner,
  OwnerOf,
  RoyaltyInfo,
  SetClaimConditions,
  SetClaimPauseStatus,
  SetContractUri,
  SetDefaultRoyaltyInfo,
  SetMaxTotalSupply,
  SetOperatorFiltererStatus,
  SetOwner,
  SetPermanentTokenUri,
  SetPlatformFeeInfo,
  SetPrimarySaleRecipient,
  SetRoyaltyInfoForToken,
  SetTermsActivation,
  SetTermsUri,
  SetTokenNameAndSymbol,
  SetTokenUri,
  SupportedFeatures,
  SupportsInterface,
  Symbol,
  TokenUri,
  TotalSupply,
  UpdateBaseUri,
  VerifyClaim,
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
  readonly isAspenFeatures = asCallable(new IsAspenFeatures(this));
  readonly supportsInterface = asCallable(new SupportsInterface(this));
  readonly supportedFeatures = asCallable(new SupportedFeatures(this));
  readonly implementationName = asCallable(new ImplementationName(this));
  readonly implementationVersion = asCallable(new ImplementationVersion(this));
  readonly owner = asCallable(new Owner(this));
  readonly setOwner = asCallable(new SetOwner(this));

  // Collection
  readonly name = asCallable(new Name(this));
  readonly symbol = asCallable(new Symbol(this));
  readonly contractUri = asCallable(new ContractUri(this));
  readonly setContractUri = asCallable(new SetContractUri(this));
  readonly setTokenNameAndSymbol = asCallable(new SetTokenNameAndSymbol(this));

  // Multicall
  readonly multicall = asCallable(new Multicall(this));

  // Terms
  readonly acceptTerms = asCallable(new AcceptTerms(this));
  readonly acceptTermsFor = asCallable(new AcceptTermsFor(this));
  readonly acceptTermsForMany = asCallable(new AcceptTermsForMany(this));
  readonly acceptTermsWithSignature = asCallable(new AcceptTermsWithSignature(this));
  readonly getTermsDetails = asCallable(new GetTermsDetails(this));
  readonly hasAcceptedTerms = asCallable(new HasAcceptedTerms(this));
  readonly hasAcceptedTermsVersion = asCallable(new HasAcceptedTermsVersion(this));
  readonly setTermsActivation = asCallable(new SetTermsActivation(this));
  readonly setTermsUri = asCallable(new SetTermsUri(this));

  // Token
  readonly exists = asCallable(new Exists(this));
  readonly ownerOf = asCallable(new OwnerOf(this));
  readonly balanceOf = asCallable(new BalanceOf(this));
  readonly tokenUri = asCallable(new TokenUri(this));
  readonly setTokenUri = asCallable(new SetTokenUri(this));
  readonly setPermanentTokenUri = asCallable(new SetPermanentTokenUri(this));
  readonly getBaseURIIndices = asCallable(new GetBaseURIIndices(this));
  readonly updateBaseUri = asCallable(new UpdateBaseUri(this));

  // Supply
  readonly totalSupply = asCallable(new TotalSupply(this));
  readonly setMaxTotalSupply = asCallable(new SetMaxTotalSupply(this));
  readonly getSmallestTokenId = asCallable(new GetSmallestTokenId(this));
  readonly getLargestTokenId = asCallable(new GetLargestTokenId(this));

  // Mint
  readonly lazyMint = asCallable(new LazyMint(this));

  // Claim
  readonly claim = asCallable(new Claim(this));
  readonly verifyClaim = asCallable(new VerifyClaim(this));
  readonly getClaimConditionById = asCallable(new GetClaimConditionById(this));
  readonly getUserClaimConditions = asCallable(new GetUserClaimConditions(this));
  readonly setClaimConditions = asCallable(new SetClaimConditions(this));
  readonly getClaimPauseStatus = asCallable(new GetClaimPauseStatus(this));
  readonly setClaimPauseStatus = asCallable(new SetClaimPauseStatus(this));

  // Burn
  readonly burn = asCallable(new Burn(this));

  // Issue
  readonly issue = asCallable(new Issue(this));
  readonly issueWithTokenUri = asCallable(new IssueWithTokenUri(this));

  // Royalties
  readonly royaltyInfo = asCallable(new RoyaltyInfo(this));
  readonly getDefaultRoyaltyInfo = asCallable(new GetDefaultRoyaltyInfo(this));
  readonly setDefaultRoyaltyInfo = asCallable(new SetDefaultRoyaltyInfo(this));
  readonly getRoyaltyInfoForToken = asCallable(new GetRoyaltyInfoForToken(this));
  readonly setRoyaltyInfoForToken = asCallable(new SetRoyaltyInfoForToken(this));

  // Platform fee
  readonly getPlatformFeeInfo = asCallable(new GetPlatformFeeInfo(this));
  readonly setPlatformFeeInfo = asCallable(new SetPlatformFeeInfo(this));

  // Royalties
  readonly getPrimarySaleRecipient = asCallable(new GetPrimarySaleRecipient(this));
  readonly setPrimarySaleRecipient = asCallable(new SetPrimarySaleRecipient(this));

  // Operator filterer
  readonly setOperatorFiltererStatus = asCallable(new SetOperatorFiltererStatus(this));

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
