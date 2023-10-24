import { parse } from '@monaxlabs/phloem/dist/schema/parse';
import { Address, asAddress, isSameAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, TransactionReceipt, decodeEventLog, encodeFunctionData } from 'viem';
import { CollectionContract, IssueArgs, IssuedToken, ZERO_ADDRESS } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { One, bigIntRange, normalise } from '../number';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const IssueWithinPhaseFunctions = {
  nft: 'issueWithinPhase(address,uint256)[]',
  sft: 'issueWithinPhase(address,uint256,uint256)[]',
} as const;

const IssueWithinPhasePartitions = {
  nft: [...FeatureFunctionsMap[IssueWithinPhaseFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[IssueWithinPhaseFunctions.sft].drop],
};
type IssueWithinPhasePartitions = typeof IssueWithinPhasePartitions;

const IssueWithinPhaseInterfaces = Object.values(IssueWithinPhasePartitions).flat();
type IssueWithinPhaseInterfaces = (typeof IssueWithinPhaseInterfaces)[number];

export type IssueWithinPhaseCallArgs = [walletClient: Signer, args: IssueArgs, params?: WriteParameters];
export type IssueWithinPhaseResponse = GetTransactionReceiptReturnType;

export class IssueWithinPhase extends ContractFunction<
  IssueWithinPhaseInterfaces,
  IssueWithinPhasePartitions,
  IssueWithinPhaseCallArgs,
  IssueWithinPhaseResponse
> {
  readonly functionName = 'issueWithinPhase';

  constructor(base: CollectionContract) {
    super(base, IssueWithinPhaseInterfaces, IssueWithinPhasePartitions, IssueWithinPhaseFunctions);
  }

  execute(...args: IssueWithinPhaseCallArgs): Promise<IssueWithinPhaseResponse> {
    return this.issueWithinPhase(...args);
  }

  async issueWithinPhase(
    walletClient: Signer,
    args: IssueArgs,
    params?: WriteParameters,
  ): Promise<IssueWithinPhaseResponse> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.issueWithinPhaseERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.issueWithinPhaseERC721(walletClient, args, params);
    }
  }

  protected async issueWithinPhaseERC1155(
    walletClient: Signer,
    { receiver, tokenId, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<IssueWithinPhaseResponse> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.issueWithinPhase(
        [wallet as Hex, tokenId, normalise(quantity)],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async issueWithinPhaseERC721(
    walletClient: Signer,
    { receiver, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<IssueWithinPhaseResponse> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithinPhase(
        [wallet as Hex, normalise(quantity)],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async estimateGas(walletClient: Signer, args: IssueArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(walletClient, args, params);
      case 'ERC721':
        return await this.estimateGasERC721(walletClient, args, params);
    }
  }

  protected async estimateGasERC1155(
    walletClient: Signer,
    { receiver, tokenId, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(sft)).estimateGas.issueWithinPhase(
        [wallet as Hex, tokenId, normalise(quantity)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async estimateGasERC721(
    walletClient: Signer,
    { receiver, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.issueWithinPhase(
        [wallet as Hex, normalise(quantity)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async populateTransaction(args: IssueArgs, params?: WriteParameters): Promise<string> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.populateTransactionERC1155(args, params);
      case 'ERC721':
        return await this.populateTransactionERC721(args, params);
    }
  }

  protected async populateTransactionERC1155(
    { receiver, tokenId, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<string> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.issueWithinPhase(
        [wallet as Hex, tokenId, normalise(quantity)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, tokenId, quantity });
    }
  }

  protected async populateTransactionERC721(
    { receiver, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<string> {
    const nft = this.partition('nft');
    const wallet = await asAddress(receiver);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithinPhase(
        [wallet as Hex, normalise(quantity)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  protected async validateArgs({ receiver }: IssueArgs) {
    const wallet = await asAddress(receiver);
    if (isSameAddress(wallet, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receiver }, new Error('Receiver cannot be an empty address'));
    }
  }

  async parseReceiptLogs(receipt: TransactionReceipt): Promise<IssuedToken[]> {
    const { nft, sft } = this.partitions;
    const { chainId, address } = this.base;
    const issueWithinPhaseTokens: IssuedToken[] = [];

    try {
      if (nft) {
        for (const log of receipt.logs) {
          const event = decodeEventLog({
            abi: this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV4').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensIssued') {
            const { startTokenId, issuer, receiver, quantity } = event.args;
            for (const tokenId of bigIntRange(startTokenId, quantity)) {
              issueWithinPhaseTokens.push({
                chainId,
                address,
                tokenId,
                standard: 'ERC721',
                issuer: parse(Address, issuer),
                receiver: parse(Address, receiver),
                tokenURI: null,
                quantity: One,
              });
            }
          }

          if (event.eventName === 'TokenIssued') {
            const { tokenId, issuer, receiver, tokenURI } = event.args;
            issueWithinPhaseTokens.push({
              chainId,
              address,
              tokenId,
              standard: 'ERC721',
              issuer: parse(Address, issuer),
              receiver: parse(Address, receiver),
              tokenURI: tokenURI,
              quantity: One,
            });
          }
        }
      } else if (sft) {
        for (const log of receipt.logs) {
          const event = decodeEventLog({
            abi: this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV4').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensIssued') {
            const { tokenId, issuer, receiver, quantityClaimed } = event.args;
            issueWithinPhaseTokens.push({
              chainId,
              address,
              tokenId,
              standard: 'ERC1155',
              issuer: parse(Address, issuer),
              receiver: parse(Address, receiver),
              tokenURI: null,
              quantity: quantityClaimed,
            });
          }
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.INVALID_DATA, { receipt });
    }

    return issueWithinPhaseTokens;
  }
}

export const issueWithinPhase = asCallableClass(IssueWithinPhase);
