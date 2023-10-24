import { parse } from '@monaxlabs/phloem/dist/schema/parse';
import { Address, Addressish, asAddress, ChainId, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { decodeEventLog, encodeFunctionData, GetTransactionReceiptReturnType, Hex, TransactionReceipt } from 'viem';
import { BigIntish, Signer, TokenId, TokenStandard, WriteParameters } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { bigIntRange, normalise, One } from '../number';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const IssueFunctions = {
  nft: 'issue(address,uint256)[]',
  sft: 'issue(address,uint256,uint256)[]',
} as const;

const IssuePartitions = {
  nft: [...FeatureFunctionsMap[IssueFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[IssueFunctions.sft].drop],
};
type IssuePartitions = typeof IssuePartitions;

const IssueInterfaces = Object.values(IssuePartitions).flat();
type IssueInterfaces = (typeof IssueInterfaces)[number];

export type IssueCallArgs = [walletClient: Signer, args: IssueArgs, params?: WriteParameters];
export type IssueResponse = GetTransactionReceiptReturnType;

export type IssueArgs = {
  receiver: Addressish;
  tokenId?: TokenId;
  quantity: BigIntish;
};

export type IssuedToken = {
  chainId: ChainId;
  address: Address;
  tokenId: bigint;
  standard: TokenStandard;
  issuer: Address;
  receiver: Address;
  quantity: bigint;
  tokenURI: string | null;
};

export class Issue extends ContractFunction<IssueInterfaces, IssuePartitions, IssueCallArgs, IssueResponse> {
  readonly functionName = 'issue';

  constructor(base: CollectionContract) {
    super(base, IssueInterfaces, IssuePartitions, IssueFunctions);
  }

  execute(...args: IssueCallArgs): Promise<IssueResponse> {
    return this.issue(...args);
  }

  async issue(signer: Signer, args: IssueArgs, params?: WriteParameters): Promise<IssueResponse> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.issueERC1155(signer, args, params);
      case 'ERC721':
        return await this.issueERC721(signer, args, params);
    }
  }

  protected async issueERC1155(
    walletClient: Signer,
    { receiver, tokenId, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<IssueResponse> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(sft)).simulate.issue(
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

  protected async issueERC721(
    walletClient: Signer,
    { receiver, quantity }: IssueArgs,
    params?: WriteParameters,
  ): Promise<IssueResponse> {
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      // bypass ABI divercence
      const iface = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0');
      const { request } = await this.reader(iface.abi).simulate.issue([wallet as Hex, normalise(quantity)], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  async estimateGas(signer: Signer, args: IssueArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.estimateGasERC1155(signer, args, params);
      case 'ERC721':
        return await this.estimateGasERC721(signer, args, params);
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
      const estimate = await this.reader(this.abi(sft)).estimateGas.issue(
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
    const wallet = await asAddress(receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      // bypass ABI divercence
      const iface = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0');
      const estimate = await this.reader(iface.abi).estimateGas.issue([wallet as Hex, normalise(quantity)], fullParams);
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
      const { request } = await this.reader(this.abi(sft)).simulate.issue(
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
    const wallet = await asAddress(receiver);

    try {
      // bypass ABI divercence
      const iface = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0');
      const { request } = await this.reader(iface.abi).simulate.issue([wallet as Hex, normalise(quantity)], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { receiver, quantity });
    }
  }

  protected async validateArgs({ receiver }: IssueArgs) {
    const wallet = await asAddress(receiver);
    if (isZeroAddress(wallet)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receiver }, new Error('Receiver cannot be an empty address'));
    }
  }

  async parseReceiptLogs(receipt: TransactionReceipt): Promise<IssuedToken[]> {
    const { nft, sft } = this.partitions;

    const { chainId, address } = this.base;
    const issueTokens: IssuedToken[] = [];

    try {
      if (nft) {
        for (const log of receipt.logs) {
          const event = decodeEventLog({
            abi: this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensIssued') {
            const { startTokenId, issuer, receiver, quantity } = event.args;
            for (const tokenId of bigIntRange(startTokenId, quantity)) {
              issueTokens.push({
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
            issueTokens.push({
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
            abi: this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3').abi,
            data: log.data,
            topics: log.topics,
          });

          if (event.eventName === 'TokensIssued') {
            const { tokenId, claimer, receiver, quantityClaimed } = event.args;
            issueTokens.push({
              chainId,
              address,
              tokenId,
              standard: 'ERC1155',
              issuer: parse(Address, claimer),
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

    return issueTokens;
  }
}

export const issue = asCallableClass(Issue);
