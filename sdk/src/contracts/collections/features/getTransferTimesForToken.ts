import { BigNumber, CallOverrides } from 'ethers';
import { Addressish, asAddress, isZeroAddress } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { RequiredTokenId } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetTransferTimesForTokenFunctions = {
  nft: 'getTransferTimeForToken(uint256)[uint256]',
  sft: 'getTransferTimesForToken(address,uint256)[uint256[],uint256[]]',
} as const;

const GetTransferTimesForTokenPartitions = {
  nft: [...FeatureFunctionsMap[GetTransferTimesForTokenFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[GetTransferTimesForTokenFunctions.sft].drop],
};
type GetTransferTimesForTokenPartitions = typeof GetTransferTimesForTokenPartitions;

const GetTransferTimesForTokenInterfaces = Object.values(GetTransferTimesForTokenPartitions).flat();
type GetTransferTimesForTokenInterfaces = (typeof GetTransferTimesForTokenInterfaces)[number];

export type GetTransferTimesForTokenArgs = {
  tokenId: RequiredTokenId;
  owner?: Addressish;
};

export type GetTransferTimesForTokenCallArgs = [args: GetTransferTimesForTokenArgs, overrides?: CallOverrides];
export type GetTransferTimesForTokenResponse = TransferTimesForToken;

export type TransferTimesForERC721Token = { transferTimestamp: BigNumber };
export type TransferTimesForERC1155Token = {
  quantityOfTokens: BigNumber[];
  transferableAt: BigNumber[];
};
export type TransferTimesForToken = TransferTimesForERC721Token | TransferTimesForERC1155Token;

export class GetTransferTimesForToken extends ContractFunction<
  GetTransferTimesForTokenInterfaces,
  GetTransferTimesForTokenPartitions,
  GetTransferTimesForTokenCallArgs,
  GetTransferTimesForTokenResponse
> {
  readonly functionName = 'getTransferTimesForToken';

  constructor(base: CollectionContract) {
    super(
      base,
      GetTransferTimesForTokenInterfaces,
      GetTransferTimesForTokenPartitions,
      GetTransferTimesForTokenFunctions,
    );
  }

  execute(...args: GetTransferTimesForTokenCallArgs): Promise<GetTransferTimesForTokenResponse> {
    return this.getTransferTimesForToken(...args);
  }

  async getTransferTimesForToken(
    args: GetTransferTimesForTokenArgs,
    overrides: CallOverrides = {},
  ): Promise<TransferTimesForToken> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getTransferTimesForTokenERC1155(args, overrides);
      case 'ERC721':
        return await this.getTransferTimesForTokenERC721(args, overrides);
    }
  }

  protected async getTransferTimesForTokenERC1155(
    { owner, tokenId }: GetTransferTimesForTokenArgs,
    overrides: CallOverrides = {},
  ): Promise<TransferTimesForToken> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    if (!owner) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be undefined'));
    }
    const wallet = await asAddress(owner);
    if (isZeroAddress(wallet)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be an empty address'));
    }

    try {
      const { quantityOfTokens, transferableAt } = await sft
        .connectReadOnly()
        .getTransferTimesForToken(wallet, tokenId, overrides);

      return { quantityOfTokens, transferableAt };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId });
    }
  }

  protected async getTransferTimesForTokenERC721(
    { tokenId }: GetTransferTimesForTokenArgs,
    overrides: CallOverrides = {},
  ): Promise<TransferTimesForToken> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const nft = this.partition('nft');

    try {
      const transferTimestamp = await nft.connectReadOnly().getTransferTimeForToken(tokenId, overrides);
      return { transferTimestamp };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }
}

export const getTransferTimesForToken = asCallableClass(GetTransferTimesForToken);
