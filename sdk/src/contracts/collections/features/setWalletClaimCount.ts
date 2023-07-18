import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const SetWalletClaimCountFunctions = {
  nft: 'setWalletClaimCount(address,uint256)[]',
  sft: 'setWalletClaimCount(uint256,address,uint256)[]',
} as const;

const SetWalletClaimCountPartitions = {
  nft: [...FeatureFunctionsMap[SetWalletClaimCountFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetWalletClaimCountFunctions.sft].drop],
  catchAll: CatchAllInterfaces,
};
type SetWalletClaimCountPartitions = typeof SetWalletClaimCountPartitions;

const SetWalletClaimCountInterfaces = Object.values(SetWalletClaimCountPartitions).flat();
type SetWalletClaimCountInterfaces = (typeof SetWalletClaimCountInterfaces)[number];

export type SetWalletClaimCountCallArgs = [
  signer: Signerish,
  userAddress: Addressish,
  maxWalletClaimCount: BigNumberish,
  tokenId: BigNumberish | null,
  overrides?: WriteOverrides,
];
export type SetWalletClaimCountResponse = ContractTransaction;

export class SetWalletClaimCount extends ContractFunction<
  SetWalletClaimCountInterfaces,
  SetWalletClaimCountPartitions,
  SetWalletClaimCountCallArgs,
  SetWalletClaimCountResponse
> {
  readonly functionName = 'setWalletClaimCount';

  constructor(base: CollectionContract) {
    super(base, SetWalletClaimCountInterfaces, SetWalletClaimCountPartitions, SetWalletClaimCountFunctions);
  }

  execute(...args: SetWalletClaimCountCallArgs): Promise<SetWalletClaimCountResponse> {
    return this.setWalletClaimCount(...args);
  }

  async setWalletClaimCount(
    signer: Signerish,
    userAddress: Addressish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await sft
              .connectWith(signer)
              .setWalletClaimCount(tokenId, address, maxWalletClaimCount, overrides);
            return tx;
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const tx = await nft.connectWith(signer).setWalletClaimCount(address, maxWalletClaimCount, overrides);
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
    userAddress: Addressish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await sft
              .connectWith(signer)
              .estimateGas.setWalletClaimCount(tokenId, address, maxWalletClaimCount, overrides);
            return estimate;
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const estimate = await nft
              .connectWith(signer)
              .estimateGas.setWalletClaimCount(address, maxWalletClaimCount, overrides);
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
    userAddress: Addressish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await sft
              .connectReadOnly()
              .populateTransaction.setWalletClaimCount(tokenId, address, maxWalletClaimCount, overrides);
            return tx;
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const tx = await nft
              .connectReadOnly()
              .populateTransaction.setWalletClaimCount(address, maxWalletClaimCount, overrides);
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

export const setWalletClaimCount = asCallableClass(SetWalletClaimCount);
