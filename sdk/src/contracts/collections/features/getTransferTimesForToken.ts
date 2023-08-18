import { Addressish, asAddress, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { ReadParameters, RequiredTokenId } from '../types';
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

export type GetTransferTimesForTokenCallArgs = [args: GetTransferTimesForTokenArgs, params?: ReadParameters];
export type GetTransferTimesForTokenResponse = TransferTimesForToken;

export type TransferTimesForERC721Token = { transferTimestamp: bigint };
export type TransferTimesForERC1155Token = {
  quantityOfTokens: readonly bigint[];
  transferableAt: readonly bigint[];
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
    params?: ReadParameters,
  ): Promise<TransferTimesForToken> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getTransferTimesForTokenERC1155(args, params);
      case 'ERC721':
        return await this.getTransferTimesForTokenERC721(args, params);
    }
  }

  protected async getTransferTimesForTokenERC1155(
    { owner, tokenId }: GetTransferTimesForTokenArgs,
    params?: ReadParameters,
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
      const [quantityOfTokens, transferableAt] = await this.reader(this.abi(sft)).read.getTransferTimesForToken(
        [wallet as Hex, tokenId],
        params,
      );

      return { quantityOfTokens, transferableAt };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId });
    }
  }

  protected async getTransferTimesForTokenERC721(
    { tokenId }: GetTransferTimesForTokenArgs,
    params?: ReadParameters,
  ): Promise<TransferTimesForToken> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const nft = this.partition('nft');

    try {
      const transferTimestamp = await this.reader(this.abi(nft)).read.getTransferTimeForToken([tokenId], params);
      return { transferTimestamp };
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }
}

export const getTransferTimesForToken = asCallableClass(GetTransferTimesForToken);
