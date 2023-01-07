import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import * as t from 'io-ts';
import { parseThenOrElse } from '../../utils/schema.js';
import { Address } from '../address.js';
import type { CollectionContract } from './collections.js';
import { FeatureFactories } from './feature-factories.gen.js';
import { Signerish } from './types.js';

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

export function extractKnownSupportedFeatures(supportedFeaturesFromContract: string[]): FeatureInterfaceId[] {
  return supportedFeaturesFromContract
    .map((f) =>
      parseThenOrElse(
        FeatureInterfaceId,
        f,
        (f) => f,
        () => null,
      ),
    )
    .filter((f): f is FeatureInterfaceId => Boolean(f));
}

// A cover is a set of non-empty subsets of T provided as a Record where each subset is identified by a key in K where
// the union of the subsets contains T
type Cover<K extends string, T, C extends Record<K, NonEmptyArray<T>>, E = C[K][number]> =
  // Provide _some_ arguments
  C extends any
    ? // If excluding E from T is empty then E covers T so this should be a success
      Exclude<T, E> extends never
      ? C
      : // Otherwise we have some missing elements, we now make the argument type be exactly the ones that are
        // missing so type checking fails. This gives a hint. (note: we could use never here, but it can cause narrowing
        // on inferred K so that an extraneous partition subset can be present with the wrong keys)
        Record<K, Exclude<T, E>[]>
    : never;

// Exhaustive union partitioner takes a Cover and for each subset in the Cover returns a single type which is the first
// truthy value in the image of the subset under the map M. It is useful for dealing with a subset of features without
// branching on each exact feature when you are able to work with the intersection interface of the features in a subset
export const exhaustiveUnionPartitioner =
  <T extends string, V, M extends Partial<Record<T, V>>>(map: M, ...keys: T[]) =>
  <K extends string, C extends Record<K, NonEmptyArray<T>>, R>(
    cover: Cover<K, T, C>,
  ): { [k in K]: M[C[k][number]] } => {
    // Flatten the cover down to its element type then map them with M to get the values
    const ret = {} as { [k in K]: M[C[k][number]] };
    for (const [key, subset] of Object.entries(cover)) {
      // Here we are just short-circuit or-ing together A || B || ... ||
      ret[key as K] = (subset as T[]).reduce((acc, k) => acc || map[k], undefined as M[T]);
    }
    return ret;
  };

export function memoise<T>(thunk: () => T): () => T {
  let t: T;
  return () => {
    if (!t) {
      t = thunk();
    }
    return t;
  };
}
