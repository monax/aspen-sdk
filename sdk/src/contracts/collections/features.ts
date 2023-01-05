import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import * as t from 'io-ts';
import { Address } from '../address';
import type { CollectionContract } from './collections';
import { FeatureFactories } from './feature-factories.gen';
import { Signerish } from './types';

export interface FeatureInterfaceFactory<T> {
  connect(address: string, signerOrProvider: Signer | Provider): T;
}

export const FeatureInterfaceId = t.keyof(FeatureFactories);
export type FeatureInterfaceId = t.TypeOf<typeof FeatureInterfaceId>;
export type FeatureFactories = typeof FeatureFactories;
export type FeatureFactory<T extends FeatureInterfaceId> = FeatureFactories[T];
export type FeatureContract<T extends FeatureInterfaceId> = ReturnType<FeatureFactory<T>['connect']>;

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

  static fromFeature<T extends FeatureInterfaceId>(
    feature: T,
    address: Address,
    signer: Signerish,
  ): FeatureInterface<FeatureContract<T>> {
    const factory = FeatureFactories[feature];
    // FIXME[Silas]: this makes me sad but typescript is not smart enough to understand that the map key union
    //  is correlated with the map value union and narrow appropriately (even though this _does_ work with a literal key)
    return new FeatureInterface(factory as unknown as FeatureInterfaceFactory<FeatureContract<T>>, address, signer);
  }
}
export abstract class Features {
  readonly base: CollectionContract;

  constructor(base: CollectionContract) {
    this.base = base;
  }

  abstract get supported(): boolean;
}
