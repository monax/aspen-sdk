import { BigNumber, BytesLike, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const LazyMintPartitions = {
  v1: [...FeatureFunctionsMap['lazyMint(uint256,string,bytes)[]'].drop],
  v2: [...FeatureFunctionsMap['lazyMint(uint256,string)[]'].drop],
};
type LazyMintPartitions = typeof LazyMintPartitions;

const LazyMintInterfaces = Object.values(LazyMintPartitions).flat();
type LazyMintInterfaces = (typeof LazyMintInterfaces)[number];

export type LazyMintCallArgs = [signer: Signerish, mint: MintAgs, overrides?: SourcedOverrides];
export type LazyMintResponse = ContractTransaction;

export type MintAgs = {
  amount: BigNumber;
  baseURI: string;
  encryptedBaseURI?: BytesLike;
};

export class LazyMint extends ContractFunction<
  LazyMintInterfaces,
  LazyMintPartitions,
  LazyMintCallArgs,
  LazyMintResponse
> {
  readonly functionName = 'lazyMint';

  constructor(base: CollectionContract) {
    super(base, LazyMintInterfaces, LazyMintPartitions);
  }

  call(...args: LazyMintCallArgs): Promise<LazyMintResponse> {
    return this.lazyMint(...args);
  }

  async lazyMint(
    signer: Signerish,
    { amount, baseURI, encryptedBaseURI }: MintAgs,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const tx = await v2.connectWith(signer).lazyMint(amount, baseURI, overrides);
        return tx;
      } else if (v1) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const tx = await v1.connectWith(signer).lazyMint(amount, baseURI, encryptedBaseURI, overrides);
        return tx;
      }
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
