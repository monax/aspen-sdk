import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PayableOverrides } from 'ethers';
import { Address, ChainId, extractEventsFromLogs, isSameAddress, NATIVE_TOKEN } from '../..';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bnRange, One } from '../number';
import type { Signerish, TokenId, TokenStandard } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const ClaimPartitions = {
  nft: [...FeatureFunctionsMap['claim(address,uint256,address,uint256,bytes32[],uint256)[]'].drop],
  sft: [...FeatureFunctionsMap['claim(address,uint256,uint256,address,uint256,bytes32[],uint256)[]'].drop],
};
type ClaimPartitions = typeof ClaimPartitions;

const ClaimInterfaces = Object.values(ClaimPartitions).flat();
type ClaimInterfaces = (typeof ClaimInterfaces)[number];

export type ClaimCallArgs = [signer: Signerish, args: ClaimArgs, overrides?: PayableOverrides];
export type ClaimResponse = ContractTransaction;

export type ClaimArgs = {
  conditionId: number;
  receiver: Address;
  tokenId?: TokenId;
  quantity: BigNumberish;
  currency: Address;
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
    super(base, ClaimInterfaces, ClaimPartitions);
  }

  call(...args: ClaimCallArgs): Promise<ClaimResponse> {
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
    tokenId = this.base.requireTokenId(tokenId);
    const sft = this.partition('sft');

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = await sft.connectWith(signer);
      const tx = await iSft.claim(
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async claimERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      const tx = await iNft.claim(
        receiver,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
      return tx;
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
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
    tokenId = this.base.requireTokenId(tokenId);
    const sft = this.partition('sft');

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iSft = sft.connectWith(signer);
      return await iSft.estimateGas.claim(
        receiver,
        tokenId,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async estimateGasERC721(
    signer: Signerish,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    overrides: PayableOverrides = {},
  ): Promise<BigNumber> {
    const nft = this.partition('nft');

    try {
      if (isSameAddress(currency, NATIVE_TOKEN)) {
        overrides.value = BigNumber.from(pricePerToken).mul(quantity);
      }

      const iNft = nft.connectWith(signer);
      return await iNft.estimateGas.claim(
        receiver,
        quantity,
        currency,
        pricePerToken,
        proofs,
        proofMaxQuantityPerTransaction,
        overrides,
      );
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
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
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receipt }, err as Error);
    }

    return issueTokens;
  }
}
