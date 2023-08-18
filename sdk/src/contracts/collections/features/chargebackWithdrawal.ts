import { Address, Addressish, asAddress, isZeroAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ChargebackWithdrawalFunctions = {
  nft: 'chargebackWithdrawal(uint256)[]',
  sft: 'chargebackWithdrawal(address,uint256,uint256)[]',
} as const;

const ChargebackWithdrawalPartitions = {
  nft: [...FeatureFunctionsMap[ChargebackWithdrawalFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[ChargebackWithdrawalFunctions.sft].drop],
};
type ChargebackWithdrawalPartitions = typeof ChargebackWithdrawalPartitions;

const ChargebackWithdrawalInterfaces = Object.values(ChargebackWithdrawalPartitions).flat();
type ChargebackWithdrawalInterfaces = (typeof ChargebackWithdrawalInterfaces)[number];

export type ChargebackWithdrawalArgs = {
  tokenId: bigint;
  owner?: Addressish;
  quantity?: number;
};

export type ChargebackWithdrawalCallArgs = [
  walletClient: Signer,
  args: ChargebackWithdrawalArgs,
  params?: WriteParameters,
];
export type ChargebackWithdrawalResponse = TransactionHash;

export class ChargebackWithdrawal extends ContractFunction<
  ChargebackWithdrawalInterfaces,
  ChargebackWithdrawalPartitions,
  ChargebackWithdrawalCallArgs,
  ChargebackWithdrawalResponse
> {
  readonly functionName = 'chargebackWithdrawal';

  constructor(base: CollectionContract) {
    super(base, ChargebackWithdrawalInterfaces, ChargebackWithdrawalPartitions, ChargebackWithdrawalFunctions);
  }

  execute(...args: ChargebackWithdrawalCallArgs): Promise<ChargebackWithdrawalResponse> {
    return this.chargebackWithdrawal(...args);
  }

  async chargebackWithdrawal(
    walletClient: Signer,
    args: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<ChargebackWithdrawalResponse> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.chargebackWithdrawalERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.chargebackWithdrawalERC721(walletClient, args, params);
    }
  }

  protected async chargebackWithdrawalERC1155(
    walletClient: Signer,
    args: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<ChargebackWithdrawalResponse> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.chargebackWithdrawal(
        [owner as `0x${string}`, tokenId, quantity],
        params,
      );
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
    }
  }

  protected async chargebackWithdrawalERC721(
    walletClient: Signer,
    { tokenId }: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<ChargebackWithdrawalResponse> {
    const nft = this.partition('nft');

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.chargebackWithdrawal([tokenId], params);
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  async estimateGas(walletClient: Signer, args: ChargebackWithdrawalArgs, params?: WriteParameters): Promise<bigint> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.estimateGasERC721(walletClient, args, params);
    }
  }

  protected async estimateGasERC1155(
    walletClient: Signer,
    args: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const estimate = await this.reader(this.abi(sft)).estimateGas.chargebackWithdrawal(
        [owner as `0x${string}`, tokenId, quantity],
        {
          account: walletClient.account,
          ...params,
        },
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
    }
  }

  protected async estimateGasERC721(
    walletClient: Signer,
    { tokenId }: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const nft = this.partition('nft');

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.chargebackWithdrawal([tokenId], {
        account: walletClient.account,
        ...params,
      });
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  async populateTransaction(args: ChargebackWithdrawalArgs, params?: WriteParameters): Promise<string> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args, params);
      case 'ERC721':
        return await this.populateTransactionERC721(args, params);
    }
  }

  protected async populateTransactionERC1155(
    args: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<string> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.chargebackWithdrawal(
        [owner as `0x${string}`, tokenId, quantity],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
    }
  }

  protected async populateTransactionERC721(
    { tokenId }: ChargebackWithdrawalArgs,
    params?: WriteParameters,
  ): Promise<string> {
    const nft = this.partition('nft');

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.chargebackWithdrawal([tokenId], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  protected async requireArgs({ owner, quantity, tokenId }: ChargebackWithdrawalArgs): Promise<{
    tokenId: bigint;
    owner: Address;
    quantity: bigint;
  }> {
    if (!owner) throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be undefined'));
    const wallet = await asAddress(owner);
    if (isZeroAddress(wallet)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be an empty address'));
    }
    if (quantity == 0 || quantity == undefined || quantity == null) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { quantity }, new Error('Quantity cannot be 0, undefined or null'));
    }
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    return { owner: wallet, quantity: BigInt(quantity), tokenId };
  }
}

export const chargebackWithdrawal = asCallableClass(ChargebackWithdrawal);
