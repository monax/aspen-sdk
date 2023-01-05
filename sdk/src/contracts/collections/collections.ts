import { Provider } from '@ethersproject/providers';
import * as t from 'io-ts';
import { parse } from '../../schema';
import { Address } from '../address';
import { ICedarFeaturesV0__factory } from '../generated';
import { ChainId } from '../network';
import { Signerish } from '../providers';
import { InterfaceNotLoadedError } from './constants';
import { FeatureContract, FeatureFactories, FeatureInterface, FeatureInterfaceId } from './features';
import { Agreements } from './features/agreements';
import { Issuance } from './features/issuance';
import { Metadata } from './features/metadata';
import { Ownable } from './features/ownable';
import { Royalties } from './features/royalties';
import type { CollectionCallData, CollectionInfo, DebugHandler, ErrorHandler, TokenStandard } from './types';

export const DefaultDebugHandler = (collection: CollectionInfo, action: string, ...data: unknown[]) => {
  console.debug(`Collection Contract ${collection.chainId} # ${collection.address} -> ${action}`, ...data);
};

export const DefaultErrorHandler = (
  message: string,
  error: Error,
  collection: CollectionInfo,
  callData: CollectionCallData,
) => {
  console.debug(`Received "${message}" error when calling ${callData.method}`, { collection, callData, error });
  console.error(error);
};

export type FeatureInterfaces = { -readonly [K in keyof FeatureFactories]: FeatureInterface<FeatureContract<K>> };

export class CollectionContract {
  private _supportedFeatures: FeatureInterfaceId[] = [];
  private _interfaces: Partial<FeatureInterfaces> | null = null;
  private _tokenStandard: TokenStandard | null = null;
  private readonly _provider: Provider;
  private chainId: ChainId | null = null;
  private static _debugHandler: DebugHandler | undefined;
  private static _errorHandler: ErrorHandler | undefined;
  private static _throwErrors = false;

  readonly address: Address;

  // features
  readonly metadata: Metadata;
  readonly agreements: Agreements;
  readonly royalties: Royalties;
  readonly issuance: Issuance;
  readonly ownable: Ownable;

  static setDebugHandler(handler: DebugHandler | undefined) {
    CollectionContract._debugHandler = handler;
  }

  static setErrorHandler(handler: ErrorHandler | undefined) {
    CollectionContract._errorHandler = handler;
  }

  static setThrowsErrors(shouldThrowErrors: boolean) {
    CollectionContract._throwErrors = shouldThrowErrors;
  }

  constructor(provider: Provider, collectionAddress: Address) {
    this.address = collectionAddress;
    this._provider = provider;

    this.metadata = new Metadata(this);
    this.agreements = new Agreements(this);
    this.royalties = new Royalties(this);
    this.issuance = new Issuance(this);
    this.ownable = new Ownable(this);
  }

  get supportedFeatures(): string[] {
    return this._supportedFeatures;
  }

  /**
   * @throws InterfaceNotLoadedError
   * @returns An object with mapped interface factories
   */
  get interfaces(): Partial<FeatureInterfaces> {
    if (!this._interfaces) throw InterfaceNotLoadedError;
    return this._interfaces;
  }

  get tokenStandard(): TokenStandard | null {
    return this._tokenStandard;
  }

  get provider(): Provider {
    return this._provider;
  }

  async getChainId(): Promise<ChainId> {
    if (!this.chainId) {
      const { chainId } = await this.provider.getNetwork();
      this.chainId = parse(ChainId, chainId);
    }
    return this.chainId;
  }

  async load(forceUpdate = false): Promise<boolean> {
    if (this._interfaces == null || forceUpdate) {
      try {
        // Preload chainId
        await this.getChainId();
        const contract = ICedarFeaturesV0__factory.connect(this.address, this._provider);
        this._supportedFeatures = parse(t.array(FeatureInterfaceId), await contract.supportedFeatures());
        this.debug('Loaded supported features', this._supportedFeatures);

        this.buildInterface();
      } catch (err) {
        this._supportedFeatures = [];
        this._interfaces = null;
        this.error('Failed to load supported features', err, 'base.load', { forceUpdate });
      }
    }

    return this._interfaces != null;
  }

  protected buildInterface() {
    if (this._supportedFeatures.length == 0) {
      this._interfaces = null;
      this.debug('Interfaces set to null');
      return;
    }
    // Note: we are forced to subvert the type system since it cannot invert that the keys and values are correlated
    const interfaces = {} as Record<FeatureInterfaceId, FeatureInterface<unknown>>;
    for (const feature of this._supportedFeatures) {
      interfaces[feature] = FeatureInterface.fromFeature(feature, this.address, this._provider);
    }
    this._interfaces = interfaces as Partial<FeatureInterfaces>;

    this.debug('Interfaces initialized');

    this.detectTokenStandards();
  }

  protected detectTokenStandards() {
    if (!this._interfaces) {
      this._tokenStandard = null;
    } else if (
      this._interfaces['standard/IERC1155.sol:IERC1155V0'] ||
      this._interfaces['standard/IERC1155.sol:IERC1155SupplyV0'] ||
      this._interfaces['standard/IERC1155.sol:IERC1155SupplyV1'] ||
      this._interfaces['issuance/ISFTSupply.sol:ISFTSupplyV0']
    ) {
      this._tokenStandard = 'ERC1155';
    } else if (
      this._interfaces['standard/IERC721.sol:IERC721V0'] ||
      this._interfaces['issuance/INFTSupply.sol:INFTSupplyV0']
    ) {
      this._tokenStandard = 'ERC721';
    } else {
      this._tokenStandard = null;
    }

    this.debug('Token standard set to', this.tokenStandard);
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

  error(
    message: string,
    error: Error | unknown,
    method: string,
    args?: { [key: string]: unknown },
    signer?: Signerish,
  ) {
    const collection: CollectionInfo = {
      chainId: this.chainId,
      address: this.address,
      tokenStandard: this.tokenStandard,
    };

    const callData = {
      method,
      args,
      signer: signer || this._provider,
      supportedFeatures: this._supportedFeatures,
    };

    if (CollectionContract._errorHandler) {
      const validError = error instanceof Error ? error : new Error((error as string).toString());
      CollectionContract._errorHandler(message, validError, collection, callData);
    }

    if (CollectionContract._throwErrors) {
      throw error;
    }
  }
}
