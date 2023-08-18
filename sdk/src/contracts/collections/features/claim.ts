import { parse } from '@monaxlabs/phloem/dist/schema/parse';
import { Address, Addressish, asAddress, ChainId, isSameAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { decodeEventLog, encodeFunctionData, TransactionReceipt } from 'viem';
import { NATIVE_TOKEN } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bigIntRange, normalise, One, Zero } from '../number';
import type { BigIntish, PayableParameters, Signer, TokenId, TokenStandard } from '../types';
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

export type ClaimCallArgs = [walletClient: Signer, args: ClaimArgs, params?: PayableParameters];
export type ClaimResponse = TransactionHash;

export type ClaimArgs = {
  conditionId: number;
  receiver: Addressish;
  tokenId?: TokenId;
  quantity: BigIntish;
  currency: Addressish;
  pricePerToken: BigIntish;
  proofs: string[];
  proofMaxQuantityPerTransaction: BigIntish;
};

export type ClaimedToken = {
  chainId: ChainId;
  address: string;
  tokenId: bigint;
  standard: TokenStandard;
  receiver: Address;
  quantity: bigint;
};

export class Claim extends ContractFunction<ClaimInterfaces, ClaimPartitions, ClaimCallArgs, ClaimResponse> {
  readonly functionName = 'claim';

  constructor(base: CollectionContract) {
    super(base, ClaimInterfaces, ClaimPartitions, ClaimFunctions);
  }

  execute(...args: ClaimCallArgs): Promise<ClaimResponse> {
    return this.claim(...args);
  }

  protected async claim(...[walletClient, args, params]: ClaimCallArgs): Promise<TransactionHash> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.claimERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.claimERC721(walletClient, args, params);
    }
  }

  protected async claimERC1155(
    walletClient: Signer,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<TransactionHash> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const { request } = await this.reader(this.abi(sft)).simulate.claim(
        [
          wallet as `0x${string}`,
          tokenId,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        params,
      );

      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async claimERC721(
    walletClient: Signer,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<TransactionHash> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const { request } = await this.reader(this.abi(nft)).simulate.claim(
        [
          wallet as `0x${string}`,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        params,
      );

      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(walletClient: Signer, args: ClaimArgs, params?: PayableParameters): Promise<bigint> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.estimateGasERC721(walletClient, args, params);
    }
  }

  protected async estimateGasERC1155(
    walletClient: Signer,
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<bigint> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const estimate = await this.reader(this.abi(sft)).estimateGas.claim(
        [
          wallet as `0x${string}`,
          tokenId,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        {
          account: walletClient.account,
          ...params,
        },
      );
      return estimate;
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async estimateGasERC721(
    walletClient: Signer,
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<bigint> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const estimate = await this.reader(this.abi(nft)).estimateGas.claim(
        [
          wallet as `0x${string}`,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        {
          account: walletClient.account,
          ...params,
        },
      );
      return estimate;
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(args: ClaimArgs, params?: PayableParameters): Promise<string> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args, params);
      case 'ERC721':
        return await this.populateTransactionERC721(args, params);
    }
  }

  protected async populateTransactionERC1155(
    { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<string> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const { request } = await this.reader(this.abi(sft)).simulate.claim(
        [
          wallet as `0x${string}`,
          tokenId,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      const args = { receiver, tokenId, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async populateTransactionERC721(
    { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction }: ClaimArgs,
    params: PayableParameters = {
      value: Zero,
    },
  ): Promise<string> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const tokenAddress = await asAddress(currency);

    try {
      if (isSameAddress(tokenAddress, NATIVE_TOKEN) && !params.value) {
        params.value = normalise(pricePerToken) * normalise(quantity);
      }

      const { request } = await this.reader(this.abi(nft)).simulate.claim(
        [
          wallet as `0x${string}`,
          normalise(quantity),
          tokenAddress as `0x${string}`,
          normalise(pricePerToken),
          proofs as `0x${string}`[],
          normalise(proofMaxQuantityPerTransaction),
        ],
        params,
      );

      return encodeFunctionData(request);
    } catch (err) {
      const args = { receiver, quantity, currency, pricePerToken, proofs, proofMaxQuantityPerTransaction };
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async parseReceiptLogs(receipt: TransactionReceipt): Promise<ClaimedToken[]> {
    const { nft, sft } = this.partitions;
    const { chainId, address } = this.base;
    const issueTokens: ClaimedToken[] = [];

    try {
      if (nft) {
        for (const log of receipt.logs) {
          const event = decodeEventLog({
            abi: this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensClaimed') {
            const { startTokenId, receiver, quantityClaimed } = event.args;
            for (const tokenId of bigIntRange(startTokenId, quantityClaimed)) {
              issueTokens.push({
                chainId,
                address,
                tokenId,
                standard: 'ERC721',
                receiver: parse(Address, receiver),
                quantity: One,
              });
            }
          }
        }
      } else if (sft) {
        for (const log of receipt.logs) {
          const event = decodeEventLog({
            abi: this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensClaimed') {
            const { tokenId, receiver, quantityClaimed } = event.args;
            issueTokens.push({
              chainId,
              address,
              tokenId,
              standard: 'ERC1155',
              receiver: parse(Address, receiver),
              quantity: quantityClaimed,
            });
          }
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.INVALID_DATA, { receipt });
    }

    return issueTokens;
  }
}

export const claim = asCallableClass(Claim);
