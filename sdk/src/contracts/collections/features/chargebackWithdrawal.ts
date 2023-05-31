import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Address, Addressish, asAddress, isZeroAddress } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { RequiredTokenId, Signerish, WriteOverrides } from '../types';
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
  tokenId: RequiredTokenId;
  owner?: Addressish;
  quantity?: number;
};

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
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.chargebackWithdrawalERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.chargebackWithdrawalERC721(signer, args, overrides);
    }
  }

  protected async chargebackWithdrawalERC1155(
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const tx = await sft.connectWith(signer).chargebackWithdrawal(owner, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
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
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.estimateGasERC721(signer, args, overrides);
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const gas = await sft.connectWith(signer).estimateGas.chargebackWithdrawal(owner, tokenId, quantity, overrides);
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
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.populateTransactionERC721(signer, args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    signer: Signerish,
    args: ChargebackWithdrawalArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const sft = this.partition('sft');
    const { quantity, tokenId, owner } = await this.requireArgs(args);

    try {
      const tx = await sft
        .connectWith(signer)
        .populateTransaction.chargebackWithdrawal(owner, tokenId, quantity, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId, quantity });
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

  protected async requireArgs({ owner, quantity, tokenId }: ChargebackWithdrawalArgs): Promise<{
    tokenId: RequiredTokenId;
    owner: Address;
    quantity: number;
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

    return { owner: wallet, quantity, tokenId };
  }
}

export const chargebackWithdrawal = asCallableClass(ChargebackWithdrawal);
