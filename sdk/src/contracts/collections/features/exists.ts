import { BigNumberish } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const ExistsPartitions = {
  v1: [...FeatureFunctionsMap['exists(uint256)[bool]'].drop],
};
type ExistsPartitions = typeof ExistsPartitions;

const ExistsInterfaces = Object.values(ExistsPartitions).flat();
type ExistsInterfaces = (typeof ExistsInterfaces)[number];

export type ExistsCallArgs = [tokenId: BigNumberish, overrides?: SourcedOverrides];
export type ExistsResponse = boolean;

export class Exists extends ContractFunction<ExistsInterfaces, ExistsPartitions, ExistsCallArgs, ExistsResponse> {
  readonly functionName = 'exists';

  constructor(base: CollectionContract) {
    super(base, ExistsInterfaces, ExistsPartitions);
  }

  /** Check if a token exists */
  call(...args: ExistsCallArgs): Promise<ExistsResponse> {
    return this.exists(...args);
  }

  async exists(tokenId: BigNumberish, overrides?: SourcedOverrides): Promise<boolean> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const v1 = this.partition('v1');

    try {
      const exists = await v1.connectReadOnly().exists(tokenId, overrides);
      return exists;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, { tokenId }, err as Error);
    }
  }
}
