import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
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
  signer: Signerish,
  maxWalletClaimCount: BigNumberish,
  tokenId: BigNumberish | null,
  overrides?: WriteOverrides,
];
export type SetMaxWalletClaimCountResponse = ContractTransaction;

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
    signer: Signerish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const tx = await iSft.connectWith(signer).setMaxWalletClaimCount(tokenId, maxWalletClaimCount, overrides);
          return tx;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const tx = iNft.connectWith(signer).setMaxWalletClaimCount(maxWalletClaimCount, overrides);
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const estimate = await iSft
            .connectWith(signer)
            .estimateGas.setMaxWalletClaimCount(tokenId, maxWalletClaimCount, overrides);
          return estimate;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const estimate = await iNft
            .connectWith(signer)
            .estimateGas.setMaxWalletClaimCount(maxWalletClaimCount, overrides);
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const iSft = sft ?? this.base.assumeFeature('issuance/ISFTClaimCount.sol:IRestrictedSFTClaimCountV0');
          const tx = await iSft
            .connectReadOnly()
            .populateTransaction.setMaxWalletClaimCount(tokenId, maxWalletClaimCount, overrides);
          return tx;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const iNft = nft ?? this.base.assumeFeature('issuance/INFTClaimCount.sol:IRestrictedNFTClaimCountV0');
          const tx = await iNft
            .connectReadOnly()
            .populateTransaction.setMaxWalletClaimCount(maxWalletClaimCount, overrides);
          return tx;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setMaxWalletClaimCount = asCallableClass(SetMaxWalletClaimCount);
