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

export type SafeTransferFromCallArgs = [
  signer: Signerish,
  fromAddress: Addressish,
  toAddress: Addressish,
  tokenId: BigNumberish,
  bytes: BytesLike,
  amount?: BigNumberish,
  overrides?: WriteOverrides,
];
export type SafeTransferFromResponse = ContractTransaction;

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
    fromAddress: Addressish,
    toAddress: Addressish,
    tokenId: BigNumberish,
    bytes: BytesLike,
    amount?: BigNumberish,
    overrides?: WriteOverrides,
  ): Promise<ContractTransaction> {
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const tx = sft.connectWith(signer).safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
          return tx;
        }
        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const tx = nft
            .connectWith(signer)
            ['safeTransferFrom(address,address,uint256,bytes)'](from, to, tokenId, bytes, overrides);
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    fromAddress: Addressish,
    toAddress: Addressish,
    tokenId: BigNumberish,
    bytes: BytesLike,
    amount?: BigNumberish,
    overrides?: WriteOverrides,
  ) {
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const tx = sft
            .connectWith(signer)
            .estimateGas.safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
          return tx;
        }
        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const tx = nft
            .connectWith(signer)
            .estimateGas['safeTransferFrom(address,address,uint256,bytes)'](from, to, tokenId, bytes, overrides);
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    fromAddress: Addressish,
    toAddress: Addressish,
    tokenId: BigNumberish,
    bytes: BytesLike,
    amount?: BigNumberish,
    overrides?: WriteOverrides,
  ) {
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const tx = sft
            .connectWith(signer)
            .populateTransaction.safeTransferFrom(from, to, tokenId, amount || 0, bytes, overrides);
          return tx;
        }
        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const tx = nft
            .connectWith(signer)
            .populateTransaction['safeTransferFrom(address,address,uint256,bytes)'](
              from,
              to,
              tokenId,
              bytes,
              overrides,
            );
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const safeTransferFrom = asCallableClass(SafeTransferFrom);
