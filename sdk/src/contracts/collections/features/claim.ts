import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
} from 'ethers';
import { Address, Addressish, asAddress, ChainId, extractEventsFromLogs, isSameAddress, NATIVE_TOKEN } from '../..';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
import type { Signerish, TokenId, TokenStandard } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ClaimFunctions = {
  nft: 'claim(address,uint256,address,uint256,bytes32[],uint256)[]',
  sft: 'claim(address,uint256,uint256,address,uint256,bytes32[],uint256)[]',
} as const;

const ClaimPartitions = {
  nft: [...FeatureFunctionsMap[ClaimFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[ClaimFunctions.sft].drop],
};
type ClaimPartitions = typeof ClaimPartitions;

const ClaimInterfaces = Object.values(ClaimPartitions).flat();
type ClaimInterfaces = (typeof ClaimInterfaces)[number];

export type ClaimCallArgs = [signer: Signerish, args: ClaimArgs, overrides?: PayableOverrides];
export type ClaimResponse = ContractTransaction;

export type ClaimArgs = {
  conditionId: number;
  receiver: Addressish;
  tokenId?: TokenId;
  quantity: BigNumberish;
  currency: Addressish;
  pricePerToken: BigNumberish;
  proofs: string[];
  proofMaxQuantityPerTransaction: BigNumberish;
};

export type ClaimedToken = {
  chainId: ChainId;
  address: string;
  tokenId: BigNumber;
  standard: TokenStandard;
  receiver: Address;
  quantity: BigNumber;
};

export class Claim extends ContractFunction<ClaimInterfaces, ClaimPartitions, ClaimCallArgs, ClaimResponse> {
  readonly functionName = 'claim';

  constructor(base: CollectionContract) {
    super(base, ClaimInterfaces, ClaimPartitions, ClaimFunctions);
  }

  execute(...args: ClaimCallArgs): Promise<ClaimResponse> {
    return this.claim(...args);
  }

  protected async claim(...[signer, args, overrides = {}]: ClaimCallArgs): Promise<ContractTransaction> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.claimERC1155(signer, args, overrides);
      case 'ERC721':
        return this.claimERC721(signer, args, overrides);
    }
  }

  protected async claimERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = await sft.connectWith(signer);
      const tx = await iSft.claim(
        wallet,
        tokenId,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async claimERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      const tx = await iNft.claim(
        wallet,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(signer: Signerish, args: ClaimArgs, overrides: PayableOverrides = {}): Promise<BigNumber> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.estimateGasERC1155(signer, args, overrides);
      case 'ERC721':
        return this.estimateGasERC721(signer, args, overrides);
    }
  }

  protected async estimateGasERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<BigNumber> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = sft.connectWith(signer);
      return await iSft.estimateGas.claim(
        wallet,
        tokenId,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<BigNumber> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      return await iNft.estimateGas.claim(
        wallet,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(
    signer: Signerish,
    args: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<PopulatedTransaction> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.populateTransactionERC1155(signer, args, overrides);
      case 'ERC721':
        return this.populateTransactionERC721(signer, args, overrides);
    }
  }

  protected async populateTransactionERC1155(
    signer: Signerish,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<PopulatedTransaction> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = sft.connectWith(signer);
      return await iSft.populateTransaction.claim(
        wallet,
        tokenId,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async populateTransactionERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<PopulatedTransaction> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      return await iNft.populateTransaction.claim(
        wallet,
        quantity,
        tokenAddress,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async parseReceiptLogs(receipt: ContractReceipt): Promise<ClaimedToken[]> {
    const { nft, sft } = this.partitions;
    const { chainId, address } = this.base;
    const issueTokens: ClaimedToken[] = [];

    try {
      if (nft) {
        const nftEvents = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2');
        const contract = nftEvents.connectReadOnly();

        issueTokens.push(
          ...extractEventsFromLogs(contract.filters.TokensClaimed(), contract.interface, receipt.logs)
            .map(({ startTokenId, receiver, quantityClaimed }) => {
              const events: ClaimedToken[] = [];
              for (const tokenId of bnRange(startTokenId, quantityClaimed)) {
                events.push({
                  chainId,
                  address,
                  tokenId,
                  standard: 'ERC721',
                  receiver: parse(Address, receiver),
                  quantity: One,
                });
              }
              return events;
            })
            .flat(),
        );
      } else if (sft) {
        const sftEvents = this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2');
        const contract = sftEvents.connectReadOnly();

        issueTokens.push(
          ...extractEventsFromLogs(contract.filters.TokensClaimed(), contract.interface, receipt.logs).map(
            ({ tokenId, receiver, quantityClaimed }) => {
              const event: ClaimedToken = {
                chainId,
                address,
                tokenId,
                standard: 'ERC1155',
                receiver: parse(Address, receiver),
                quantity: quantityClaimed,
              };
              return event;
            },
          ),
        );
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.INVALID_DATA, { receipt });
    }

    return issueTokens;
  }
}

export const claim = asCallableClass(Claim);
