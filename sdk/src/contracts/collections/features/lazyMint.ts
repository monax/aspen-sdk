import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex } from 'viem';
import { BytesLike, CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type LazyMintCallArgs = [walletClient: Signer, mint: MintAgs, params?: WriteParameters];
export type LazyMintResponse = TransactionHash;

export type MintAgs = {
  amount: bigint;
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

  execute(...args: LazyMintCallArgs): Promise<LazyMintResponse> {
    return this.lazyMint(...args);
  }

  async lazyMint(
    walletClient: Signer,
    { amount, baseURI, encryptedBaseURI }: MintAgs,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.lazyMint([amount, baseURI], params);
        const tx = await walletClient.sendTransaction(request);
        return tx as TransactionHash;
      } else if (v1) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const { request } = await this.reader(this.abi(v1)).simulate.lazyMint(
          [amount, baseURI, encryptedBaseURI as Hex],
          params,
        );
        const tx = await walletClient.sendTransaction(request);
        return tx as TransactionHash;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { amount, baseURI, encryptedBaseURI });
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    { amount, baseURI, encryptedBaseURI }: MintAgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { v1, v2 } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v2) {
        const estimate = await this.reader(this.abi(v2)).estimateGas.lazyMint([amount, baseURI], fullParams);
        return estimate;
      } else if (v1) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const estimate = await this.reader(this.abi(v1)).estimateGas.lazyMint(
          [amount, baseURI, encryptedBaseURI as Hex],
          fullParams,
        );
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { amount, baseURI, encryptedBaseURI });
    }

    this.notSupported();
  }

  async populateTransaction({ amount, baseURI, encryptedBaseURI }: MintAgs, params?: WriteParameters): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.lazyMint([amount, baseURI], params);
        return encodeFunctionData(request);
      } else if (v1) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const { request } = await this.reader(this.abi(v1)).simulate.lazyMint(
          [amount, baseURI, encryptedBaseURI as Hex],
          params,
        );
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { amount, baseURI, encryptedBaseURI });
    }

    this.notSupported();
  }
}

export const lazyMint = asCallableClass(LazyMint);
