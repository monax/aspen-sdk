import { BigNumberish, BytesLike, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SafeTransferFromFunctions = {
  nft: 'safeTransferFrom(address,address,uint256,bytes)+[]',
  sft: 'safeTransferFrom(address,address,uint256,uint256,bytes)[]',
} as const;

const SafeTransferFromPartitions = {
  nft: [...FeatureFunctionsMap[SafeTransferFromFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SafeTransferFromFunctions.sft].drop],
};
type SafeTransferFromPartitions = typeof SafeTransferFromPartitions;

const SafeTransferFromInterfaces = Object.values(SafeTransferFromPartitions).flat();
type SafeTransferFromInterfaces = (typeof SafeTransferFromInterfaces)[number];

export type SafeTransferFromCallArgs = [signer: Signerish, args: SafeTransferFromArgs, overrides?: WriteOverrides];
export type SafeTransferFromResponse = ContractTransaction;

export type SafeTransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenId: BigNumberish;
  bytes: BytesLike;
  amount?: BigNumberish;
};

export class SafeTransferFrom extends ContractFunction<
  SafeTransferFromInterfaces,
  SafeTransferFromPartitions,
  SafeTransferFromCallArgs,
  SafeTransferFromResponse
> {
  readonly functionName = 'safeTransferFrom';

  constructor(base: CollectionContract) {
    super(base, SafeTransferFromInterfaces, SafeTransferFromPartitions, SafeTransferFromFunctions);
  }

  execute(...args: SafeTransferFromCallArgs): Promise<SafeTransferFromResponse> {
    return this.safeTransferFrom(...args);
  }

  async safeTransferFrom(
    signer: Signerish,
    { fromAddress, toAddress, tokenId, bytes, amount }: SafeTransferFromArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const tx = await sft.connectWith(signer).safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            const tx = await nft
              .connectWith(signer)
            ['safeTransferFrom(address,address,uint256,bytes)'](from, to, tokenId, bytes, overrides);
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    signer: Signerish,
    { fromAddress, toAddress, tokenId, bytes, amount }: SafeTransferFromArgs,
    overrides: WriteOverrides = {},
  ) {
    const { nft, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const tx = await sft
              .connectWith(signer)
              .estimateGas.safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            const tx = await nft
              .connectWith(signer)
              .estimateGas['safeTransferFrom(address,address,uint256,bytes)'](from, to, tokenId, bytes, overrides);
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(
    { fromAddress, toAddress, tokenId, bytes, amount }: SafeTransferFromArgs,
    overrides: WriteOverrides = {},
  ) {
    const { nft, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const tx = await sft
              .connectReadOnly()
              .populateTransaction.safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            const tx = await nft
              .connectReadOnly()
              .populateTransaction['safeTransferFrom(address,address,uint256,bytes)'](
                from,
                to,
                tokenId,
                bytes,
                overrides,
              );
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const safeTransferFrom = asCallableClass(SafeTransferFrom);
