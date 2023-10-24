import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract, RequiredTokenId, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const TransferFromFunctions = {
  nft: 'transferFrom(address,address,uint256)[]',
} as const;

const TransferFromPartitions = {
  nft: [...FeatureFunctionsMap[TransferFromFunctions.nft].drop],
};
type TransferFromPartitions = typeof TransferFromPartitions;

const TransferFromInterfaces = Object.values(TransferFromPartitions).flat();
type TransferFromInterfaces = (typeof TransferFromInterfaces)[number];

export type TransferFromCallArgs = [walletClient: Signer, args: TransferFromArgs, params?: WriteParameters];
export type TransferFromResponse = GetTransactionReceiptReturnType;

export type TransferFromArgs = {
  fromAddress: Addressish;
  toAddress: Addressish;
  tokenId: RequiredTokenId;
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
    walletClient: Signer,
    { fromAddress, toAddress, tokenId }: TransferFromArgs,
    params?: WriteParameters,
  ): Promise<TransferFromResponse> {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.transferFrom(
        [from as Hex, to as Hex, tokenId],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    { fromAddress, toAddress, tokenId }: TransferFromArgs,
    params?: WriteParameters,
  ) {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    const fullParams = { account: walletClient.account, ...params };
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await this.reader(this.abi(nft)).estimateGas.transferFrom(
        [from as Hex, to as Hex, tokenId],
        fullParams,
      );
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction({ fromAddress, toAddress, tokenId }: TransferFromArgs, params?: WriteParameters) {
    const nft = this.partition('nft');
    const from = await asAddress(fromAddress);
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.transferFrom(
        [from as Hex, to as Hex, tokenId],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const transferFrom = asCallableClass(TransferFrom);
