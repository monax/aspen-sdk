import { BigNumber, BytesLike, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const MulticallFunctions = {
  v1: 'multicall(bytes[])[bytes[]]',
} as const;

const MulticallPartitions = {
  v1: [...FeatureFunctionsMap[MulticallFunctions.v1].drop],
};
type MulticallPartitions = typeof MulticallPartitions;

const MulticallInterfaces = Object.values(MulticallPartitions).flat();
type MulticallInterfaces = (typeof MulticallInterfaces)[number];

export type MulticallCallArgs = [signer: Signerish, data: BytesLike[], overrides?: WriteOverrides];
export type MulticallResponse = ContractTransaction;

export class Multicall extends ContractFunction<
  MulticallInterfaces,
  MulticallPartitions,
  MulticallCallArgs,
  MulticallResponse
> {
  readonly functionName = 'multicall';

  constructor(base: CollectionContract) {
    super(base, MulticallInterfaces, MulticallPartitions, MulticallFunctions);
  }

  execute(...args: MulticallCallArgs): Promise<MulticallResponse> {
    return this.multicall(...args);
  }

  async multicall(signer: Signerish, data: BytesLike[], overrides: WriteOverrides = {}): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).multicall(data, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, data: BytesLike[], overrides: WriteOverrides = {}): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.multicall(data, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(data: BytesLike[], overrides: WriteOverrides = {}): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectReadOnly().populateTransaction.multicall(data, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const multicall = asCallableClass(Multicall);
