import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from 'ethers';
import { parse } from '../../utils';
import { Address, Addressish, asAddress } from '../address';
import { ChainId } from '../network';
import { SdkError, SdkErrorCode } from './errors';
import {
  Agreements,
  Claims,
  Conditions,
  Contract,
  extractKnownSupportedFeatures,
  FeatureInterface,
  FeatureInterfaceId,
  Issuer,
  Metadata,
  Mint,
  Multicall,
  Ownable,
  Pause,
  Royalties,
  Standard,
  TokenUri,
  Version,
} from './features';

import { PendingClaim, PendingIssue, Token } from './objects';
import type { ClaimConditionsState, CollectionInfo, DebugHandler, TokenId, TokenStandard } from './types';

export const DefaultDebugHandler = (collection: CollectionInfo, action: string, ...data: unknown[]) => {
  console.debug(`Collection Contract ${collection.chainId} # ${collection.address} -> ${action}`, ...data);
};

export type FeatureInterfaces = { -readonly [K in FeatureInterfaceId]: FeatureInterface<K> };

export class CollectionContract {
  private static _debugHandler: DebugHandler | undefined;

  private _supportedFeatures: FeatureInterfaceId[] = [];
  private _interfaces: Partial<FeatureInterfaces>;
  private _tokenStandard: TokenStandard;
  private readonly _provider: Provider;

  readonly chainId: ChainId;
  readonly address: Address;

  // FeatureSets
  readonly agreements: Agreements;
  readonly claims: Claims;
  readonly contract: Contract;
  readonly conditions: Conditions;
  readonly issuer: Issuer;
  readonly metadata: Metadata;
  readonly mint: Mint;
  readonly multicall: Multicall;
  readonly ownable: Ownable;
  readonly pause: Pause;
  readonly royalties: Royalties;
  readonly standard: Standard;
  readonly tokenUri: TokenUri;
  readonly version: Version;

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

    this._supportedFeatures = extractKnownSupportedFeatures(features);
    this._interfaces = this.getInterfaces();
    this.debug('Loaded supported features', this._supportedFeatures);

    this.standard = new Standard(this);
    this._tokenStandard = this.standard.getStandard();
    this.debug('Token standard set to', this.tokenStandard);

    this.metadata = new Metadata(this);
    this.agreements = new Agreements(this);
    this.royalties = new Royalties(this);
    this.ownable = new Ownable(this);
    this.claims = new Claims(this);
    this.conditions = new Conditions(this);
    this.issuer = new Issuer(this);
    this.tokenUri = new TokenUri(this);
    this.pause = new Pause(this);
    this.mint = new Mint(this);
    this.contract = new Contract(this);
    this.multicall = new Multicall(this);
    this.version = new Version(this);
  }

  get supportedFeatures(): string[] {
    return this._supportedFeatures;
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
    for (const feature of this._supportedFeatures) {
      interfaces[feature] = this.assumeFeature(feature);
    }

    return interfaces;
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

  //////
  /// Helper functions
  //////

  requireTokenId(tokenId: TokenId): BigNumber {
    if (tokenId === null || tokenId === undefined) {
      new SdkError(SdkErrorCode.MISSING_TOKEN_ID);
    }

    try {
      return BigNumber.from(tokenId);
    } catch (err) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { tokenId }, new Error('Invalid value for BigNumber'));
    }
  }

  /////
  // High level objects
  /////

  Token(tokenId: BigNumberish): Token {
    return new Token(this, tokenId);
  }

  Claim(tokenId: TokenId, conditions: ClaimConditionsState): PendingClaim {
    return new PendingClaim(this, tokenId, conditions);
  }

  Issue(tokenId: TokenId, tokenURI?: string): PendingIssue {
    return new PendingIssue(this, tokenId, tokenURI);
  }
}
