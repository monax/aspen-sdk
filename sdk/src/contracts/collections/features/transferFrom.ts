import { BigNumberish, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const TransferFromFunctions = {
  nft: 'transferFrom(address,address,uint256)[]',
} as const;

const TransferFromPartitions = {
  nft: [...FeatureFunctionsMap[TransferFromFunctions.nft].drop],
};
type TransferFromPartitions = typeof TransferFromPartitions;

const TransferFromInterfaces = Object.values(TransferFromPartitions).flat();
type TransferFromInterfaces = (typeof TransferFromInterfaces)[number];

export type TransferFromCallArgs = [signer: Signerish, args: TransferFromArgs, overrides?: WriteOverrides];
export type TransferFromResponse = ContractTransaction;

export type TransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenId: BigNumberish;
};

export class TransferFrom extends ContractFunction<
  TransferFromInterfaces,
  TransferFromPartitions,
  TransferFromCallArgs,
  TransferFromResponse
> {
  readonly functionName = 'transferFrom';

  constructor(base: CollectionContract) {
    super(base, TransferFromInterfaces, TransferFromPartitions, TransferFromFunctions);
  }

  execute(...args: TransferFromCallArgs): Promise<TransferFromResponse> {
    return this.transferFrom(...args);
  }

  async transferFrom(
    signer: Signerish,
    { fromAddress, toAddress, tokenId }: TransferFromArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectWith(signer).transferFrom(from, to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    { fromAddress, toAddress, tokenId }: TransferFromArgs,
    overrides: WriteOverrides = {},
  ) {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectWith(signer).estimateGas.transferFrom(from, to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction({ fromAddress, toAddress, tokenId }: TransferFromArgs, overrides: WriteOverrides = {}) {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectReadOnly().populateTransaction.transferFrom(from, to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const transferFrom = asCallableClass(TransferFrom);
