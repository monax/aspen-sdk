import { Address } from '../address';
import { Signerish } from '../providers';
import type { CollectionContract } from './collections';
import { FeatureInterfaceMap } from './constants';
import { FeatureInterfaceFactory, SupportedInterfaces } from './types';

export class FeatureInterface<T> {
  private readonly _factory: FeatureInterfaceFactory<T>;
  private readonly _address: Address;
  private readonly _signer: Signerish;
  private connection: T | null = null;

  constructor(factory: FeatureInterfaceFactory<T>, address: Address, signer: Signerish) {
    this._factory = factory;
    this._address = address;
    this._signer = signer;
  }

  connectReadOnly(): T {
    if (!this.connection) {
      this.connection = this._factory.connect(this._address, this._signer);
    }

    return this.connection;
  }

  connectWith(signer: Signerish): T {
    return this._factory.connect(this._address, signer);
  }

  static fromFeature(
    feature: string,
    address: Address,
    signer: Signerish,
  ): FeatureInterface<SupportedInterfaces> | null {
    const factory = FeatureInterfaceMap[feature] || null;
    if (!factory) return null;

    return new FeatureInterface<SupportedInterfaces>(factory, address, signer);
  }
}
export abstract class Features {
  readonly base: CollectionContract;

  constructor(base: CollectionContract) {
    this.base = base;
  }

  abstract get supported(): boolean;
}
