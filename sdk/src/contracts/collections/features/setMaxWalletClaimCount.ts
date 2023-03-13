import { BigNumber, BigNumberish, Contract, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const SetMaxWalletClaimCountFunctions = {} as const;

const SetMaxWalletClaimCountPartitions = {
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
    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _tokenId, uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const tx = await contract.setMaxWalletClaimCount(tokenId, maxWalletClaimCount, overrides);
          return tx;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const tx = await contract.setMaxWalletClaimCount(maxWalletClaimCount, overrides);
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
    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _tokenId, uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const estimate = await contract.estimateGas.setMaxWalletClaimCount(tokenId, maxWalletClaimCount, overrides);
          return estimate;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const estimate = await contract.estimateGas.setMaxWalletClaimCount(maxWalletClaimCount, overrides);
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    maxWalletClaimCount: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          tokenId = this.base.requireTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _tokenId, uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const estimate = await contract.populateTransaction.setMaxWalletClaimCount(
            tokenId,
            maxWalletClaimCount,
            overrides,
          );
          return estimate;
        }

        case 'ERC721': {
          this.base.rejectTokenId(tokenId, this.functionName);
          const abi = ['function setMaxWalletClaimCount(uint256 _count)'];
          const contract = new Contract(this.base.address, abi, signer);
          const estimate = await contract.populateTransaction.setMaxWalletClaimCount(maxWalletClaimCount, overrides);
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setMaxWalletClaimCount = asCallableClass(SetMaxWalletClaimCount);
