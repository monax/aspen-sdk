import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { RequiredTokenId, Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SafeTransferFromFunctions = {
  nft: 'safeTransferFrom(address,address,uint256,bytes)[]',
  nftV2: 'safeTransferFrom(address,address,uint256)[]',
  sft: 'safeTransferFrom(address,address,uint256,uint256,bytes)[]',
} as const;

const SafeTransferFromPartitions = {
  nft: [...FeatureFunctionsMap[SafeTransferFromFunctions.nft].drop],
  nftV2: [...FeatureFunctionsMap[SafeTransferFromFunctions.nftV2].drop],
  sft: [...FeatureFunctionsMap[SafeTransferFromFunctions.sft].drop],
};
type SafeTransferFromPartitions = typeof SafeTransferFromPartitions;

const SafeTransferFromInterfaces = Object.values(SafeTransferFromPartitions).flat();
type SafeTransferFromInterfaces = (typeof SafeTransferFromInterfaces)[number];

export type SafeTransferFromCallArgs = [walletClient: Signer, args: SafeTransferFromArgs, params?: WriteParameters];
export type SafeTransferFromResponse = TransactionHash;

export type SafeTransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenId: RequiredTokenId;
  bytes?: Hex;
  amount?: bigint;
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
    walletClient: Signer,
    { fromAddress, toAddress, tokenId, bytes, amount }: SafeTransferFromArgs,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { nft, nftV2, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const { request } = await this.reader(this.abi(sft)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, BigInt(amount || 0), bytes ?? '0x'],
              params,
            );
            const tx = await walletClient.writeContract(request);
            return tx as TransactionHash;
          }
          break;
        case 'ERC721':
          if (nft && bytes) {
            const { request } = await this.reader(this.abi(nft)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, bytes],
              params,
            );
            const tx = await walletClient.writeContract(request);
            return tx as TransactionHash;
          } else if (nftV2 && !bytes) {
            const { request } = await this.reader(this.abi(nftV2)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId],
              params,
            );
            const tx = await walletClient.writeContract(request);
            return tx as TransactionHash;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    { fromAddress, toAddress, tokenId, bytes, amount }: SafeTransferFromArgs,
    params?: WriteParameters,
  ) {
    const { nft, nftV2, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const estimate = await this.reader(this.abi(sft)).estimateGas.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, BigInt(amount || 0), bytes ?? '0x'],
              {
                account: walletClient.account,
                ...params,
              },
            );
            return estimate;
          }
          break;
        case 'ERC721':
          if (nft && bytes) {
            const estimate = await this.reader(this.abi(nft)).estimateGas.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, bytes],
              {
                account: walletClient.account,
                ...params,
              },
            );
            return estimate;
          } else if (nftV2 && !bytes) {
            const estimate = await this.reader(this.abi(nftV2)).estimateGas.safeTransferFrom(
              [from as Hex, to as Hex, tokenId],
              {
                account: walletClient.account,
                ...params,
              },
            );
            return estimate;
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
    params?: WriteParameters,
  ) {
    const { nft, nftV2, sft } = this.partitions;
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            const { request } = await this.reader(this.abi(sft)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, BigInt(amount || 0), bytes ?? '0x'],
              params,
            );
            return encodeFunctionData(request);
          }
          break;
        case 'ERC721':
          if (nft && bytes) {
            const { request } = await this.reader(this.abi(nft)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId, bytes],
              params,
            );
            return encodeFunctionData(request);
          } else if (nftV2 && !bytes) {
            const { request } = await this.reader(this.abi(nftV2)).simulate.safeTransferFrom(
              [from as Hex, to as Hex, tokenId],
              params,
            );
            return encodeFunctionData(request);
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
