import { getReadonlyProvider } from '@/utils/chain/provider';
import type { Address, ChainId } from '@monax/aspen-spec';
import type { Signerish } from '@monax/pando';
import { ICedarFeaturesV0__factory } from '@monax/pando/dist/types';
import { InterfaceNotLoadedError } from './constants';
import { FeatureInterface } from './FeatureInterface';
import { Agreements } from './Features/Agreements';
import { Issuance } from './Features/Issuance';
import { Metadata } from './Features/Metadata';
import { Ownable } from './Features/Ownable';
import { Royalties } from './Features/Royalties';
import type {
  CollectionCallData,
  CollectionInfo,
  DebugHandler,
  ErrorHandler,
  FeatureInterfacesMap,
  SupportedInterfaces,
  TokenStandard,
} from './types';

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

export class CollectionContract {
  private static _cache: { [key: string]: CollectionContract } = {};

  private _supportedFeatures: string[] = [];
  private _interfaces: FeatureInterfacesMap | null = null;
  private _tokenStandard: TokenStandard | null = null;
  private readonly _provider: Signerish;
  private static _debugHandler: DebugHandler | undefined;
  private static _errorHandler: ErrorHandler | undefined;
  private static _throwErrors = false;

  readonly chainId: ChainId;
  readonly address: Address;

  // Features
  readonly metadata: Metadata;
  readonly agreements: Agreements;
  readonly royalties: Royalties;
  readonly issuance: Issuance;
  readonly ownable: Ownable;

  static memo(chainId: ChainId, collectionAddress: Address): CollectionContract {
    const key = `${chainId}-${collectionAddress}`;

    if (!this._cache[key]) {
      this._cache[key] = new CollectionContract(chainId, collectionAddress);
    }

    return this._cache[key];
  }

  static setDebugHandler(handler: DebugHandler | undefined) {
    CollectionContract._debugHandler = handler;
  }

  static setErrorHandler(handler: ErrorHandler | undefined) {
    CollectionContract._errorHandler = handler;
  }

  static setThrowsErrors(shouldThrowErrors: boolean) {
    CollectionContract._throwErrors = shouldThrowErrors;
  }

  constructor(chainId: ChainId, collectionAddress: Address) {
    this.chainId = chainId;
    this.address = collectionAddress;
    this._provider = getReadonlyProvider(chainId);

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
  get interfaces(): FeatureInterfacesMap {
    if (!this._interfaces) throw InterfaceNotLoadedError;
    return this._interfaces;
  }

  get tokenStandard(): TokenStandard | null {
    return this._tokenStandard;
  }

  get provider(): Signerish {
    return this._provider;
  }
  async load(forceUpdate = false): Promise<boolean> {
    if (this._interfaces == null || forceUpdate) {
      try {
        const contract = ICedarFeaturesV0__factory.connect(this.address, this._provider);
        this._supportedFeatures = await contract.supportedFeatures();
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

    this._interfaces = this._supportedFeatures.reduce<{
      [key: string]: FeatureInterface<SupportedInterfaces>;
    }>((iface, feature) => {
      if (!feature) return iface;

      const [, featureKey] = feature.split(':');
      const iFeature = FeatureInterface.fromFeature(feature, this.address, this._provider);
      if (iFeature) iface[featureKey] = iFeature;

      return iface;
    }, {});

    this.debug('Interfaces initialized');

    this.detectTokenStandards();
  }

  protected detectTokenStandards() {
    if (!this._interfaces) {
      this._tokenStandard = null;
    } else if (
      this._interfaces.IERC1155V0 ||
      this._interfaces.IERC1155SupplyV0 ||
      this._interfaces.IERC1155SupplyV1 ||
      this._interfaces.ISFTSupplyV0
    ) {
      this._tokenStandard = 'ERC1155';
    } else if (this._interfaces.IERC721V0 || this._interfaces.INFTSupplyV0) {
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
