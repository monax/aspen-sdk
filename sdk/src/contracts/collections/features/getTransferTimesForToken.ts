import { BigNumber } from 'ethers';
import { ZERO_ADDRESS, isSameAddress } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { TokenId, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

export type GetTransferTimesForTokenArgs = {
  tokenId: TokenId;
  owner: string;
};

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

export type GetTransferTimesForTokenCallArgs = [args: GetTransferTimesForTokenArgs, overrides?: WriteOverrides];
export type GetTransferTimesForTokenResponse = TransferTimesForToken;

export type TransferTimesForToken = {
  quantityOfTokens?: BigNumber[];
  transferableAt?: BigNumber[];
  transferTimestamp?: BigNumber;
};

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
    overrides: WriteOverrides = {},
  ): Promise<TransferTimesForToken> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getTransferTimesForTokenERC1155(args, overrides);
      case 'ERC721':
        return this.getTransferTimesForTokenERC721(args, overrides);
    }
  }

  protected async getTransferTimesForTokenERC1155(
    { owner, tokenId }: GetTransferTimesForTokenArgs,
    overrides: WriteOverrides = {},
  ): Promise<TransferTimesForToken> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    if (isSameAddress(owner, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be an empty address'));
    }

    try {
      const { quantityOfTokens, transferableAt } = await sft
        .connectReadOnly()
        .getTransferTimesForToken(owner, tokenId, overrides);

      return { quantityOfTokens, transferableAt };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId });
    }
  }

  protected async getTransferTimesForTokenERC721(
    { tokenId }: GetTransferTimesForTokenArgs,
    overrides: WriteOverrides = {},
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
