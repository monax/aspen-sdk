import { Provider } from '@ethersproject/providers';
import { Signer, utils } from 'ethers';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import * as t from 'io-ts';
import { parseThenOrElse } from '../../utils/schema';
import { Address } from '../address';
import { AccessControlInterface } from '../generated/additional/AccessControl';
import type { CollectionContract } from './collections';
import { FeatureFactories } from './feature-factories.gen';
import { Signerish } from './types';

export interface FeatureInterfaceFactory<T> {
  connect(address: string, signerOrProvider: Signer | Provider): T;
  createInterface(): AccessControlInterface;
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
  private readonly _iface: AccessControlInterface;
  private connection: T | null = null;

  constructor(factory: FeatureInterfaceFactory<T>, address: Address, signer: Signerish) {
    this._factory = factory;
    this._address = address;
    this._signer = signer;
    this._iface = factory.createInterface();
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

  get interface(): utils.Interface {
    return this._iface;
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

export abstract class FeatureSet<T extends FeatureInterfaceId> {
  protected constructor(
    protected readonly base: CollectionContract,
    protected readonly handledFeatures: readonly T[],
  ) {}

  // Late-bound because it must be called after load()
  private getPartitioner = () => exhaustiveUnionPartitioner(...this.handledFeatures);

  makeGetPartition<N extends string, P>(
    partitionsThunk: (p: ReturnType<FeatureSet<T>['getPartitioner']>) => P,
  ): <K extends keyof P>(k: K) => P[K] {
    let t: P;
    return (k) => {
      if (!t) {
        t = partitionsThunk(this.getPartitioner());
      }
      return t[k];
    };
  }

  /**
   * @returns True if the contract supports Agreement interface
   */
  get supported(): boolean {
    // The contract must implement at least one handled feature
    return this.handledFeatures.some((f) => Boolean(this.base.interfaces[f]));
  }
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

const getPartition = <T extends FeatureInterfaceId, C extends Record<string, NonEmptyArray<T>>>(
  base: CollectionContract,
  handledFeatures: T[],
  cover: Cover<T, C>,
) => exhaustiveUnionPartitioner(...handledFeatures)(cover)(base.interfaces);

type Partition<T extends FeatureInterfaceId, C extends Record<string, NonEmptyArray<T>>> = ReturnType<
  typeof getPartition<T, C>
>;

export type CallableFeatureFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, NonEmptyArray<T>>,
  A extends unknown[],
  R,
> = FeatureFunction<T, C, A, R>['call'] & FeatureFunction<T, C, A, R>;

type PartitionExhausted = typeof FeatureFunction.PARTITION_EXHAUSTED;

type Unsupported = typeof FeatureFunction.UNSUPPORTED;

export class FeatureFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, NonEmptyArray<T>>,
  A extends unknown[],
  R,
> {
  static readonly UNSUPPORTED: unique symbol = Symbol('UNSUPPORTED');
  static readonly PARTITION_EXHAUSTED: unique symbol = Symbol('PARTITION_EXHAUSTED');
  private _partition?: Partition<T, C>;

  // If only a single subset of features need to be composed rather than partitioned
  static fromFeatures<T extends FeatureInterfaceId, A extends unknown[], R>(
    functionName: string,
    base: CollectionContract,
    handledFeatures: NonEmptyArray<T>,
    func: (partition: Partition<T, { factory: NonEmptyArray<T> }>) => (...args: A) => Promise<R | PartitionExhausted>,
  ): CallableFeatureFunction<T, { factory: NonEmptyArray<T> }, A, R> {
    return new FeatureFunction(functionName, base, handledFeatures, { factory: handledFeatures }, func).asCallable();
  }

  // Define a feature function by partitioning as set of features
  static fromFeaturePartition<
    T extends FeatureInterfaceId,
    C extends Record<string, NonEmptyArray<T>>,
    A extends unknown[],
    R,
  >(
    functionName: string,
    base: CollectionContract,
    handledFeatures: NonEmptyArray<T>,
    cover: Cover<T, C>,
    func: (partition: Partition<T, C>) => (...args: A) => Promise<R | PartitionExhausted>,
  ): CallableFeatureFunction<T, C, A, R> {
    return new FeatureFunction(functionName, base, handledFeatures, cover, func).asCallable();
  }

  protected constructor(
    readonly functionName: string,
    readonly base: CollectionContract,
    readonly handledFeatures: NonEmptyArray<T>,
    readonly cover: Cover<T, C>,
    // We need the function curry for type inference
    readonly func: (partition: Partition<T, C>) => (...args: A) => Promise<R | PartitionExhausted>,
  ) {}

  asCallable(errorOnUnsupported = false): CallableFeatureFunction<T, C, A, R> {
    return extendWithPrototype(errorOnUnsupported ? this.call.bind(this) : this.must.bind(this), this);
  }

  get partition() {
    if (!this._partition) {
      this._partition = getPartition(this.base, this.handledFeatures, this.cover);
    }
    return this._partition;
  }

  async call(...args: A): Promise<R | Unsupported> {
    await this.base.load();
    if (!this.supported) {
      return FeatureFunction.UNSUPPORTED;
    }
    const result = await this.func(this.partition)(...args);
    if (result === FeatureFunction.PARTITION_EXHAUSTED) {
      throw new Error(
        `The feature function ${this.functionName} appears to be supported was not able to find suitable features to implement itself`,
      );
    }
    return result;
  }

  async must(...args: A): Promise<R> {
    const result = await this.call(...args);
    if (this.unsupported(result)) {
      throw new Error(`Function '${this.functionName}' is not supported on the contract at ${this.base.address}`);
    }
    return result;
  }

  unsupported<T>(result: T | Unsupported): result is Unsupported {
    return result === FeatureFunction.UNSUPPORTED;
  }

  // Hey, I just met you, and this is crazy...
  async maybe<P>(p: P, ...args: A): Promise<P | R | Unsupported> {
    if (p === FeatureFunction.UNSUPPORTED) {
      return this.call(...args);
    }
    return p;
  }
  /**
   * @returns True if the contract supports Agreement interface
   */
  get supported(): boolean {
    // The contract must implement at least one handled feature
    return this.handledFeatures.some((f) => Boolean(this.base.interfaces[f]));
  }
}

// A cover is a set of non-empty subsets of T provided as a Record where each subset is identified by a key in K where
// the union of the subsets contains T
type Cover<T, C extends Record<string, NonEmptyArray<T>>> =
  // Provide _some_ arguments
  C extends any
    ? // If excluding E from T is empty then E covers T so this should be a success
      Exclude<T, C[StringKeyOf<C>][number]> extends never
      ? C
      : // Otherwise we have some missing elements, we now make the argument type be exactly the ones that are
        // missing so type checking fails. This gives a hint. (note: we could use never here, but it can cause narrowing
        // on inferred K so that an extraneous partition subset can be present with the wrong keys)
        Record<StringKeyOf<C>, Exclude<T, C[StringKeyOf<C>][number]>[]>
    : never;

type StringKeyOf<R> = R extends Record<infer K, unknown> ? (K extends string ? K : never) : never;

// Exhaustive union partitioner takes a Cover and for each subset in the Cover returns a single type which is the first
// truthy value in the image of the subset under the map M. It is useful for dealing with a subset of features without
// branching on each exact feature when you are able to work with the intersection interface of the features in a subset
export const exhaustiveUnionPartitioner =
  <T extends string>(...keys: T[]) =>
  <C extends Record<string, NonEmptyArray<T>>, R>(cover: Cover<T, C>) =>
  <M extends Partial<Record<T, unknown>>>(m: M): { [k in StringKeyOf<C>]: M[C[k][number]] } => {
    // Flatten the cover down to its element type then map them with M to get the values
    const ret = {} as { [k in StringKeyOf<C>]: M[C[k][number]] };
    for (const [key, subset] of Object.entries(cover)) {
      // Here we are just short-circuit or-ing together A || B || ... ||
      ret[key as StringKeyOf<C>] = (subset as T[]).reduce((acc, k) => acc || m[k], undefined as M[T]);
    }
    return ret;
  };

// Cannot get type inference to correctly infer keys from the Provider type (inference over class types seem flaky
// in general), so Object works here
// eslint-disable-next-line @typescript-eslint/ban-types
function extendWithPrototype<TObj, TProto extends Object>(
  obj: TObj,
  proto: TProto,
): TObj & TProto & { __extendedWithPrototype: true } {
  // Proxy everything other than what is defined on obj to proto
  return Object.assign(Object.create(proto), obj, { __extendedWithPrototype: true });
}
