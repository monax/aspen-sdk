import { BigNumber, BytesLike, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const LazyMintFunctions = {
  v1: 'lazyMint(uint256,string,bytes)[]',
  v2: 'lazyMint(uint256,string)[]',
} as const;

const LazyMintPartitions = {
  v1: [...FeatureFunctionsMap[LazyMintFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[LazyMintFunctions.v2].drop],
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
    super(base, LazyMintInterfaces, LazyMintPartitions, LazyMintFunctions);
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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { amount, baseURI, encryptedBaseURI });
    }

    this.notSupported();
  }

  async estimateGas(
    signer: Signerish,
    { amount, baseURI, encryptedBaseURI }: MintAgs,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.lazyMint(amount, baseURI, overrides);
        return estimate;
      } else if (v1) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const estimator = v1.connectWith(signer).estimateGas;
        const estimate = await estimator.lazyMint(amount, baseURI, encryptedBaseURI, overrides);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { amount, baseURI, encryptedBaseURI });
    }

    this.notSupported();
  }
}
