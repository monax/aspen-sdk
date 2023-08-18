import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { CollectionContract, Signer, TokenId, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const SetWalletClaimCountFunctions = {
  nft: 'setWalletClaimCount(address,uint256)[]',
  sft: 'setWalletClaimCount(uint256,address,uint256)[]',
} as const;

const SetWalletClaimCountPartitions = {
  nft: [...FeatureFunctionsMap[SetWalletClaimCountFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetWalletClaimCountFunctions.sft].drop],
  catchAll: CatchAllInterfaces,
};
type SetWalletClaimCountPartitions = typeof SetWalletClaimCountPartitions;

const SetWalletClaimCountInterfaces = Object.values(SetWalletClaimCountPartitions).flat();
type SetWalletClaimCountInterfaces = (typeof SetWalletClaimCountInterfaces)[number];

export type SetWalletClaimCountCallArgs = [
  walletClient: Signer,
  userAddress: Addressish,
  maxWalletClaimCount: bigint | number,
  tokenId: TokenId,
  params?: WriteParameters,
];
export type SetWalletClaimCountResponse = GetTransactionReceiptReturnType;

export class SetWalletClaimCount extends ContractFunction<
  SetWalletClaimCountInterfaces,
  SetWalletClaimCountPartitions,
  SetWalletClaimCountCallArgs,
  SetWalletClaimCountResponse
> {
  readonly functionName = 'setWalletClaimCount';

  constructor(base: CollectionContract) {
    super(base, SetWalletClaimCountInterfaces, SetWalletClaimCountPartitions, SetWalletClaimCountFunctions);
  }

  execute(...args: SetWalletClaimCountCallArgs): Promise<SetWalletClaimCountResponse> {
    return this.setWalletClaimCount(...args);
  }

  async setWalletClaimCount(
    walletClient: Signer,
    userAddress: Addressish,
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<SetWalletClaimCountResponse> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(sft)).simulate.setWalletClaimCount(
              [tokenId, address as Hex, BigInt(maxWalletClaimCount)],
              params,
            );
            const hash = await walletClient.writeContract(request);
            return this.base.publicClient.waitForTransactionReceipt({
              hash,
            });
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(nft)).simulate.setWalletClaimCount(
              [address as Hex, BigInt(maxWalletClaimCount)],
              params,
            );
            const hash = await walletClient.writeContract(request);
            return this.base.publicClient.waitForTransactionReceipt({
              hash,
            });
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    userAddress: Addressish,
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await this.reader(this.abi(sft)).estimateGas.setWalletClaimCount(
              [tokenId, address as Hex, BigInt(maxWalletClaimCount)],
              fullParams,
            );
            return estimate;
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const estimate = await this.reader(this.abi(nft)).estimateGas.setWalletClaimCount(
              [address as Hex, BigInt(maxWalletClaimCount)],
              fullParams,
            );
            return estimate;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(
    userAddress: Addressish,
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<string> {
    const { nft, sft } = this.partitions;
    const address = await asAddress(userAddress);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(sft)).simulate.setWalletClaimCount(
              [tokenId, address as Hex, BigInt(maxWalletClaimCount)],
              params,
            );
            return encodeFunctionData(request);
          }
          break;

        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(nft)).simulate.setWalletClaimCount(
              [address as Hex, BigInt(maxWalletClaimCount)],
              params,
            );

            return encodeFunctionData(request);
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setWalletClaimCount = asCallableClass(SetWalletClaimCount);
