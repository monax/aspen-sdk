import { BytesLike, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const MulticallPartitions = {
  v1: [...FeatureFunctionsMap['multicall(bytes[])[bytes[]]'].drop],
};
type MulticallPartitions = typeof MulticallPartitions;

const MulticallInterfaces = Object.values(MulticallPartitions).flat();
type MulticallInterfaces = (typeof MulticallInterfaces)[number];

export type MulticallCallArgs = [signer: Signerish, data: BytesLike[], overrides?: SourcedOverrides];
export type MulticallResponse = ContractTransaction;

export class Multicall extends ContractFunction<
  MulticallInterfaces,
  MulticallPartitions,
  MulticallCallArgs,
  MulticallResponse
> {
  readonly functionName = 'multicall';

  constructor(base: CollectionContract) {
    super(base, MulticallInterfaces, MulticallPartitions);
  }

  call(...args: MulticallCallArgs): Promise<MulticallResponse> {
    return this.multicall(...args);
  }

  async multicall(signer: Signerish, data: BytesLike[], overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).multicall(data, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
