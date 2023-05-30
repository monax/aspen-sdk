import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { asAddress, isSameAddress, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, TokenId, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

export type ChargebackWithdrawalArgs = {
  tokenId: TokenId;
  owner: string;
  quantity: number;
};

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

export type ChargebackWithdrawalCallArgs = [
  signer: Signerish,
  args: ChargebackWithdrawalArgs,
  overrides?: WriteOverrides,
];
export type ChargebackWithdrawalResponse = ContractTransaction;

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
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.chargebackWithdrawalERC1155(signer, args, overrides);
      case 'ERC721':
        return this.chargebackWithdrawalERC721(signer, args, overrides);
    }
  }

  protected async chargebackWithdrawalERC1155(
    signer: Signerish,
    { owner, tokenId, quantity }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const tokenOwner = await asAddress(owner);

    try {
      const tx = await sft.connectWith(signer).chargebackWithdrawal(tokenOwner, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId });
    }
  }

  protected async chargebackWithdrawalERC721(
    signer: Signerish,
    { tokenId }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const nft = this.partition('nft');

    try {
      const tx = await nft.connectWith(signer).chargebackWithdrawal(tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  async estimateGas(
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    this.validateArgs(args);
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.estimateGasERC1155(signer, args, overrides);
      case 'ERC721':
        return this.estimateGasERC721(signer, args, overrides);
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    { owner, tokenId, quantity }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const tokenOwner = await asAddress(owner);

    try {
      const gas = await sft
        .connectWith(signer)
        .estimateGas.chargebackWithdrawal(tokenOwner, tokenId, quantity, overrides);
      return gas;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { tokenId }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const nft = this.partition('nft');

    try {
      const gas = await nft.connectWith(signer).estimateGas.chargebackWithdrawal(tokenId, overrides);
      return gas;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  async populateTransaction(
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    this.validateArgs(args);
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.populateTransactionERC1155(signer, args, overrides);
      case 'ERC721':
        return this.populateTransactionERC721(signer, args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    signer: Signerish,
    { owner, tokenId, quantity }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const tokenOwner = await asAddress(owner);

    try {
      const tx = await sft
        .connectWith(signer)
        .populateTransaction.chargebackWithdrawal(tokenOwner, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, quantity });
    }
  }

  protected async populateTransactionERC721(
    signer: Signerish,
    { tokenId }: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const nft = this.partition('nft');

    try {
      const tx = await nft.connectWith(signer).populateTransaction.chargebackWithdrawal(tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }

  protected async validateArgs({ owner, quantity }: ChargebackWithdrawalArgs) {
    const wallet = await asAddress(owner);
    if (isSameAddress(wallet, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be an empty address'));
    }
    if (quantity == 0 || quantity == undefined || quantity == null) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Quantity cannot be 0, undefined or null'));
    }
  }
}

export const chargebackWithdrawal = asCallableClass(ChargebackWithdrawal);
