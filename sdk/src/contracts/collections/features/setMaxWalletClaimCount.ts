import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract, Signer, TokenId, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const SetMaxWalletClaimCountFunctions = {
  nft: 'setMaxWalletClaimCount(uint256)[]',
  sft: 'setMaxWalletClaimCount(uint256,uint256)[]',
} as const;

const SetMaxWalletClaimCountPartitions = {
  nft: [...FeatureFunctionsMap[SetMaxWalletClaimCountFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetMaxWalletClaimCountFunctions.sft].drop],
  catchAll: CatchAllInterfaces,
};
type SetMaxWalletClaimCountPartitions = typeof SetMaxWalletClaimCountPartitions;

const SetMaxWalletClaimCountInterfaces = Object.values(SetMaxWalletClaimCountPartitions).flat();
type SetMaxWalletClaimCountInterfaces = (typeof SetMaxWalletClaimCountInterfaces)[number];

export type SetMaxWalletClaimCountCallArgs = [
  walletClient: Signer,
  maxWalletClaimCount: bigint | number,
  tokenId: TokenId,
  params?: WriteParameters,
];
export type SetMaxWalletClaimCountResponse = TransactionHash;

export class SetMaxWalletClaimCount extends ContractFunction<
  SetMaxWalletClaimCountInterfaces,
  SetMaxWalletClaimCountPartitions,
  SetMaxWalletClaimCountCallArgs,
  SetMaxWalletClaimCountResponse
> {
  readonly functionName = 'setMaxWalletClaimCount';

  constructor(base: CollectionContract) {
    super(base, SetMaxWalletClaimCountInterfaces, SetMaxWalletClaimCountPartitions, SetMaxWalletClaimCountFunctions);
  }

  execute(...args: SetMaxWalletClaimCountCallArgs): Promise<SetMaxWalletClaimCountResponse> {
    return this.setMaxWalletClaimCount(...args);
  }

  async setMaxWalletClaimCount(
    walletClient: Signer,
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const { request } = await this.reader(this.abi(iSft)).simulate.setMaxWalletClaimCount(
            [tokenId, BigInt(maxWalletClaimCount)],
            params,
          );
          const tx = await walletClient.sendTransaction(request);
          return tx as TransactionHash;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const { request } = await this.reader(this.abi(iNft)).simulate.setMaxWalletClaimCount(
            [BigInt(maxWalletClaimCount)],
            params,
          );
          const tx = await walletClient.sendTransaction(request);
          return tx as TransactionHash;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { nft, sft } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const estimate = await this.reader(this.abi(iSft)).estimateGas.setMaxWalletClaimCount(
            [tokenId, BigInt(maxWalletClaimCount)],
            fullParams,
          );
          return estimate;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const estimate = await this.reader(this.abi(iNft)).estimateGas.setMaxWalletClaimCount(
            [BigInt(maxWalletClaimCount)],
            fullParams,
          );
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    maxWalletClaimCount: bigint | number,
    tokenId: TokenId = null,
    params?: WriteParameters,
  ): Promise<string> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const { request } = await this.reader(this.abi(iSft)).simulate.setMaxWalletClaimCount(
            [tokenId, BigInt(maxWalletClaimCount)],
            params,
          );
          return encodeFunctionData(request);
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const { request } = await this.reader(this.abi(iNft)).simulate.setMaxWalletClaimCount(
            [BigInt(maxWalletClaimCount)],
            params,
          );
          return encodeFunctionData(request);
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setMaxWalletClaimCount = asCallableClass(SetMaxWalletClaimCount);
