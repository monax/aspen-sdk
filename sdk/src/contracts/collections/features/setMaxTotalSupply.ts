import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { BigIntish, CollectionContract, Signer, TokenId, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetMaxTotalSupplyFunctions = {
  nft: 'setMaxTotalSupply(uint256)[]',
  sft: 'setMaxTotalSupply(uint256,uint256)[]',
} as const;

const SetMaxTotalSupplyPartitions = {
  nft: [...FeatureFunctionsMap[SetMaxTotalSupplyFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetMaxTotalSupplyFunctions.sft].drop],
};
type SetMaxTotalSupplyPartitions = typeof SetMaxTotalSupplyPartitions;

const SetMaxTotalSupplyInterfaces = Object.values(SetMaxTotalSupplyPartitions).flat();
type SetMaxTotalSupplyInterfaces = (typeof SetMaxTotalSupplyInterfaces)[number];

export type SetMaxTotalSupplyCallArgs = [
  walletClient: Signer,
  totalSupply: BigIntish,
  tokenId: TokenId,
  params?: WriteParameters,
];
export type SetMaxTotalSupplyResponse = TransactionHash;

export class SetMaxTotalSupply extends ContractFunction<
  SetMaxTotalSupplyInterfaces,
  SetMaxTotalSupplyPartitions,
  SetMaxTotalSupplyCallArgs,
  SetMaxTotalSupplyResponse
> {
  readonly functionName = 'setMaxTotalSupply';

  constructor(base: CollectionContract) {
    super(base, SetMaxTotalSupplyInterfaces, SetMaxTotalSupplyPartitions, SetMaxTotalSupplyFunctions);
  }

  /** Set max total supply [ERC721: of all tokens] [ERC1155: per token] */
  execute(...args: SetMaxTotalSupplyCallArgs): Promise<SetMaxTotalSupplyResponse> {
    return this.setMaxTotalSupply(...args);
  }

  async setMaxTotalSupply(
    walletClient: Signer,
    totalSupply: BigIntish,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const { request } = await this.reader(this.abi(sft)).simulate.setMaxTotalSupply(
          [tokenId, BigInt(totalSupply)],
          params,
        );
        const tx = await walletClient.writeContract(request);
        return tx as TransactionHash;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const { request } = await this.reader(this.abi(nft)).simulate.setMaxTotalSupply([BigInt(totalSupply)], params);
        const tx = await walletClient.writeContract(request);
        return tx as TransactionHash;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    totalSupply: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { nft, sft } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const estimate = await this.reader(this.abi(sft)).estimateGas.setMaxTotalSupply(
          [tokenId, BigInt(totalSupply)],
          fullParams,
        );
        return estimate;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const estimate = await this.reader(this.abi(nft)).estimateGas.setMaxTotalSupply(
          [BigInt(totalSupply)],
          fullParams,
        );
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(
    totalSupply: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<string> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const { request } = await this.reader(this.abi(sft)).simulate.setMaxTotalSupply(
          [tokenId, BigInt(totalSupply)],
          params,
        );
        return encodeFunctionData(request);
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const { request } = await this.reader(this.abi(nft)).simulate.setMaxTotalSupply([BigInt(totalSupply)], params);
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setMaxTotalSupply = asCallableClass(SetMaxTotalSupply);
