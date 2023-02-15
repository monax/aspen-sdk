import { ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const PrefixFunctions = {
  v1: 'acceptTerms()+[]',
  v2: 'acceptTerms()[]',
} as const;

const PrefixPartitions = {
  v1: [...FeatureFunctionsMap[PrefixFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[PrefixFunctions.v2].drop],
};
type PrefixPartitions = typeof PrefixPartitions;

const PrefixInterfaces = Object.values(PrefixPartitions).flat();
type PrefixInterfaces = (typeof PrefixInterfaces)[number];

export type PrefixCallArgs = [signer: Signerish, overrides?: WriteOverrides];
export type PrefixResponse = ContractTransaction;

export class Prefix extends ContractFunction<PrefixInterfaces, PrefixPartitions, PrefixCallArgs, PrefixResponse> {
  readonly functionName = 'name';

  constructor(base: CollectionContract) {
    super(base, PrefixInterfaces, PrefixPartitions, PrefixFunctions);
  }

  call(...args: PrefixCallArgs): Promise<PrefixResponse> {
    // return this.funcName(...args);
    this.notSupported();
  }
}
