import { ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const PrefixPartitions = {
  v1: [...FeatureFunctionsMap['accept1Terms()+[]'].drop],
  v2: [...FeatureFunctionsMap['accept1Terms()[]'].drop],
};
type PrefixPartitions = typeof PrefixPartitions;

const PrefixInterfaces = Object.values(PrefixPartitions).flat();
type PrefixInterfaces = (typeof PrefixInterfaces)[number];

export type PrefixCallArgs = [signer: Signerish, overrides?: SourcedOverrides];
export type PrefixResponse = ContractTransaction;

export class Prefix extends ContractFunction<PrefixInterfaces, PrefixPartitions, PrefixCallArgs, PrefixResponse> {
  readonly functionName = 'funcName';

  constructor(base: CollectionContract) {
    super(base, PrefixInterfaces, PrefixPartitions);
  }

  call(...args: PrefixCallArgs): Promise<PrefixResponse> {
    return this.funcName(...args);
    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
