import { parseThenOrElse } from '@monaxlabs/phloem/dist/schema';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import * as t from 'io-ts';
import { Abi, GetContractReturnType, PublicClient } from 'viem';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { ExperimentalFeatures } from './experimental-features.gen';
import { FeatureAbis } from './feature-abis.gen';
import { FeatureFunctionsMap } from './feature-functions.gen';

export const FeatureInterfaceId = t.keyof(FeatureAbis);
export type FeatureInterfaceId = t.TypeOf<typeof FeatureInterfaceId>;
export type FeatureFactories = typeof FeatureAbis;
export type FeatureAbi<T extends FeatureInterfaceId> = (typeof FeatureAbis)[T];

type OnlyNever<T> = { [K in keyof T as T[K] extends never ? K : never]: T[K] };
type ExpandAbi<T extends FeatureInterfaceId> = {
  [K in T]: Exclude<T, K> extends never
    ? FeatureAbi<K>[number]
    : Extract<FeatureAbi<K>[number], FeatureAbi<Exclude<T, K>>[number]>;
};
export type CommonAbi<T extends FeatureInterfaceId> = keyof OnlyNever<ExpandAbi<T>> extends never
  ? ExpandAbi<T>[T][]
  : never;

export type ExperimentalFeatureInterfaceId = (typeof ExperimentalFeatures)[number];
export interface ReleasedFeatureInterfaceIdBrand {
  readonly ReleasedFeatureInterfaceId: unique symbol;
}
export const ReleasedFeatureInterfaceId = t.brand(
  FeatureInterfaceId,
  (id): id is t.Branded<FeatureInterfaceId, ReleasedFeatureInterfaceIdBrand> =>
    !ExperimentalFeatures.includes(id as ExperimentalFeatureInterfaceId),
  'ReleasedFeatureInterfaceId',
);
export type ReleasedFeatureInterfaceId = Exclude<FeatureInterfaceId, ExperimentalFeatureInterfaceId>;

export const FeatureFunctionId = t.keyof(FeatureFunctionsMap);
export type FeatureFunctionId = t.TypeOf<typeof FeatureFunctionId>;

export const ERC721StandardInterfaces: FeatureInterfaceId[] = Array.from(
  new Set(
    [
      ...FeatureFunctionsMap['approve(address,uint256)[]'].drop,
      ...FeatureFunctionsMap['totalSupply()[uint256]'].drop,
      ...FeatureFunctionsMap['exists(uint256)[bool]'].drop,
    ].filter((id) => /(ERC721|NFT)/.test(id)),
  ),
);

export const ERC1155StandardInterfaces: FeatureInterfaceId[] = Array.from(
  new Set(
    [
      ...FeatureFunctionsMap['balanceOf(address,uint256)[uint256]'].drop,
      ...FeatureFunctionsMap['totalSupply(uint256)[uint256]'].drop,
      ...FeatureFunctionsMap['exists(uint256)[bool]'].drop,
    ].filter((id) => /(ERC1155|SFT)/.test(id)),
  ),
);

export const CatchAllInterfaces: FeatureInterfaceId[] = [
  ...FeatureFunctionsMap['isIAspenFeaturesV1()[bool]'].drop,
  ...FeatureFunctionsMap['isIAspenFeaturesV0()[bool]'].drop,
  ...FeatureFunctionsMap['isICedarFeaturesV0()[bool]'].drop,
];

export type ContractFunctionIds = typeof ContractFunctionIds;
export type ContractFunctionId = ContractFunctionIds[number];

export const ContractFunctionIds = [
  // Contract
  'isAspenFeatures',
  'isAspenFeaturesV1',
  'supportsInterface',
  'supportedFeatures',
  'supportedFeatureCodes',
  'implementationName',
  'implementationVersion',
  'owner',
  'setOwner',
  'grantRole',
  'revokeRole',
  'renounceRole',
  'hasRole',
  'getRoleAdmin',

  // Collection
  'name',
  'symbol',
  'contractUri',
  'setContractUri',
  'setTokenNameAndSymbol',

  // Multicall
  'multicall',

  // Terms
  'acceptTerms',
  'acceptTermsFor',
  'acceptTermsForMany',
  'acceptTermsWithSignature',
  'getTermsDetails',
  'hasAcceptedTerms',
  'hasAcceptedTermsVersion',
  'setTermsActivation',
  'setTermsUri',
  'setTermsRequired',

  // Token
  'exists',
  'ownerOf',
  'balanceOf',
  'balanceOfBatch',
  'tokenUri',
  'setTokenUri',
  'setPermanentTokenUri',
  'getBaseURIIndices',
  'getBaseURICount',
  'updateBaseUri',
  'transferFrom',
  'safeTransferFrom',
  'safeBatchTransferFrom',

  // Approve
  'approve',
  'isApproved',
  'setApprovalForAll',
  'isApprovedForAll',

  // Supply
  'totalSupply',
  'setMaxTotalSupply',
  'getSmallestTokenId',
  'getLargestTokenId',

  // Mint
  'lazyMint',

  // Claim
  'claim',
  'verifyClaim',
  'getClaimData',
  'getClaimConditions',
  'getClaimConditionById',
  'getUserClaimConditions',
  'setClaimConditions',
  'getClaimPauseStatus',
  'setClaimPauseStatus',
  'setMaxWalletClaimCount',
  'setWalletClaimCount',
  'getClaimPaymentDetails',

  // Burn
  'burn',
  'burnBatch',

  // Issue
  'issue',
  'issueWithTokenUri',
  'issueWithinPhase',
  'issueWithinPhaseWithTokenUri',
  'batchIssue',
  'batchIssueWithTokenUri',
  'batchIssueWithinPhase',
  'batchIssueWithinPhaseWithTokenUri',
  'chargebackWithdrawal',
  'updateChargebackProtectionPeriod',
  'getTransferTimesForToken',
  'getIssueBufferSizeForAddressAndToken',
  'getChargebackProtectionPeriod',

  // Royalties
  'royaltyInfo',
  'getDefaultRoyaltyInfo',
  'setDefaultRoyaltyInfo',
  'getRoyaltyInfoForToken',
  'setRoyaltyInfoForToken',

  // Platform fee
  'getPlatformFees',
  'setPlatformFees',

  // Primary Sales
  'getPrimarySaleRecipient',
  'setPrimarySaleRecipient',
  'setSaleRecipientForToken',

  // Operator Filterer
  'setOperatorFilterer',
  'setOperatorRestriction',
  'getOperatorRestriction',
] as const;

export class FeatureInterface<T extends FeatureInterfaceId> {
  constructor(private _abi: FeatureAbi<T>) {}

  get abi() {
    return this._abi;
  }

  static fromFeature<T extends FeatureInterfaceId>(feature: T): FeatureInterface<T> {
    return new FeatureInterface(FeatureAbis[feature]);
  }
}

export type CallableContractFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, T[]>,
  A extends unknown[],
  R,
> = ContractFunction<T, C, A, R>['execute'] & ContractFunction<T, C, A, R>;

export interface CallContractFunction<A extends unknown[], R> {
  (...args: A): R;
}

export abstract class ContractFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, T[]>,
  A extends unknown[],
  R,
> {
  protected _partitions?: Partition<T, C>;
  abstract readonly functionName: ContractFunctionId;

  protected constructor(
    protected readonly base: CollectionContract,
    readonly handledFeatures: T[],
    protected readonly cover: Cover<T, C>,
    readonly handledFunctions: Record<string, FeatureFunctionId> = {},
  ) {}

  /**
   * @returns True if the contract supports Agreement interface
   */
  get supported(): boolean {
    // The contract must implement at least one handled feature
    return this.handledFeatures.some((f) => Boolean(this.base.interfaces[f]));
  }

  protected get partitions() {
    if (!this.supported) {
      this.notSupported();
    }

    if (!this._partitions) {
      this._partitions = getPartition(this.base, this.handledFeatures, this.cover);
    }

    return this._partitions;
  }

  protected partition<K extends StringKeyOf<C>>(partition: K): Exclude<Partition<T, C>[K], undefined> {
    const p = this.partitions[partition];
    if (p !== undefined) {
      return p as Exclude<Partition<T, C>[K], undefined>;
    }

    this.notSupported();
  }

  protected notSupported(): never {
    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }

  abstract execute(...args: A): Promise<R>;

  protected abi<T extends FeatureInterfaceId>(feature: FeatureInterface<T>) {
    return feature.abi as unknown as CommonAbi<T>;
  }

  protected reader<A extends Abi>(abi: A): GetContractReturnType<A, PublicClient> {
    return this.base.reader(abi);
  }

  // NB: this approach clogs the IDE TS server
  // protected reader<T extends FeatureInterfaceId>(
  //   feature: FeatureInterface<T>,
  // ): GetContractReturnType<CommonAbi<T>, PublicClient> {
  //   return this.base.reader(feature.abi as unknown as CommonAbi<T>);
  // }
}

export function extractKnownSupportedFeatures(
  supportedFeaturesFromContract: string[],
  withExperimental: boolean,
): FeatureInterfaceId[] {
  const mapper = withExperimental
    ? (f: string) =>
        parseThenOrElse(
          FeatureInterfaceId,
          f,
          (f) => f,
          () => null,
        )
    : (f: string) =>
        parseThenOrElse(
          ReleasedFeatureInterfaceId,
          f,
          (f) => f,
          () => null,
        );

  return supportedFeaturesFromContract.map(mapper).filter((f): f is FeatureInterfaceId => Boolean(f));
}

const getPartition = <T extends FeatureInterfaceId, C extends Record<string, T[]>>(
  base: CollectionContract,
  handledFeatures: T[],
  cover: Cover<T, C>,
) => exhaustiveUnionPartitioner(base.interfaces, ...handledFeatures)(cover);

type Partition<T extends FeatureInterfaceId, C extends Record<string, T[]>> = ReturnType<typeof getPartition<T, C>>;

export type CallableFeatureFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, NonEmptyArray<T>>,
  A extends unknown[],
  R,
> = FeatureFunction<T, C, A, R>['call'] & FeatureFunction<T, C, A, R>;

/*
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
  get supported(): boolean {
    // The contract must implement at least one handled feature
    return this.handledFeatures.some((f) => Boolean(this.base.interfaces[f]));
  }
}

*/

const PartitionExhausted: unique symbol = Symbol('UNSUPPORTED');
const Unsupported: unique symbol = Symbol('PARTITION_EXHAUSTED');

type PartitionExhausted = typeof PartitionExhausted;
type Unsupported = typeof Unsupported;

export class FeatureFunction<
  T extends FeatureInterfaceId,
  C extends Record<string, NonEmptyArray<T>>,
  A extends unknown[],
  R,
> {
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
    if (!this.supported) {
      return Unsupported;
    }
    const result = await this.func(this.partition)(...args);
    if (result === PartitionExhausted) {
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
    return result === Unsupported;
  }

  // Hey, I just met you, and this is crazy...
  async maybe<P>(p: P, ...args: A): Promise<P | R | Unsupported> {
    if (p === Unsupported) {
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
type Cover<T, C extends Record<string, T[]>> =
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
  <T extends string, M extends Partial<Record<T, unknown>>>(m: M, ...keys: T[]) =>
  <C extends Record<string, T[]>>(cover: Cover<T, C>): { [k in StringKeyOf<C>]: M[C[k][number]] } => {
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

type ExecutableFunction = { execute: CallableFunction };
type FunctionClass<T> = new (base: CollectionContract) => T;

export const asCallableClass = <O extends ExecutableFunction>(
  classDefinition: FunctionClass<O>,
): FunctionClass<O['execute'] & O> & ((base: CollectionContract) => O['execute'] & O) => {
  return new Proxy(classDefinition, {
    construct: (target: FunctionClass<O>, argumentsList: [CollectionContract]) => {
      return asExecutable(new target(...argumentsList));
    },
    apply: (target: FunctionClass<O>, _thisArg, argumentsList: [CollectionContract]) => {
      return asExecutable(new target(...argumentsList));
    },
  }) as FunctionClass<O['execute'] & O> & ((base: CollectionContract) => O['execute'] & O);
};

export const asExecutable = <T extends { execute: CallableFunction }>(obj: T): T['execute'] & T => {
  return new Proxy(obj.execute.bind(obj), {
    apply: (target, _thisArg, argumentsList) => {
      return target(...argumentsList);
    },
    get: (target, prop) => {
      return Reflect.get(obj, prop, obj);
    },
  }) as T['execute'] & T;
};
