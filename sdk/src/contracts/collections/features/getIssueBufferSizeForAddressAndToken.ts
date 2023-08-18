import { Addressish, asAddress, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { ReadParameters, TokenId } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetIssueBufferSizeForAddressAndTokenFunctions = {
  sft: 'getIssueBufferSizeForAddressAndToken(address,uint256)[uint256]',
} as const;

const GetIssueBufferSizeForAddressAndTokenPartitions = {
  sft: [...FeatureFunctionsMap[GetIssueBufferSizeForAddressAndTokenFunctions.sft].drop],
};
type GetIssueBufferSizeForAddressAndTokenPartitions = typeof GetIssueBufferSizeForAddressAndTokenPartitions;

const GetIssueBufferSizeForAddressAndTokenInterfaces = Object.values(
  GetIssueBufferSizeForAddressAndTokenPartitions,
).flat();
type GetIssueBufferSizeForAddressAndTokenInterfaces = (typeof GetIssueBufferSizeForAddressAndTokenInterfaces)[number];

export type GetIssueBufferSizeForAddressAndTokenArgs = {
  owner: Addressish;
  tokenId: TokenId;
};

export type GetIssueBufferSizeForAddressAndTokenCallArgs = [
  args: GetIssueBufferSizeForAddressAndTokenArgs,
  params?: ReadParameters,
];
export type GetIssueBufferSizeForAddressAndTokenResponse = IssueBufferSize;

export type IssueBufferSize = bigint;

export class GetIssueBufferSizeForAddressAndToken extends ContractFunction<
  GetIssueBufferSizeForAddressAndTokenInterfaces,
  GetIssueBufferSizeForAddressAndTokenPartitions,
  GetIssueBufferSizeForAddressAndTokenCallArgs,
  GetIssueBufferSizeForAddressAndTokenResponse
> {
  readonly functionName = 'getIssueBufferSizeForAddressAndToken';

  constructor(base: CollectionContract) {
    super(
      base,
      GetIssueBufferSizeForAddressAndTokenInterfaces,
      GetIssueBufferSizeForAddressAndTokenPartitions,
      GetIssueBufferSizeForAddressAndTokenFunctions,
    );
  }

  execute(
    ...args: GetIssueBufferSizeForAddressAndTokenCallArgs
  ): Promise<GetIssueBufferSizeForAddressAndTokenResponse> {
    return this.getIssueBufferSizeForAddressAndToken(...args);
  }

  async getIssueBufferSizeForAddressAndToken(
    args: GetIssueBufferSizeForAddressAndTokenArgs,
    params?: ReadParameters,
  ): Promise<IssueBufferSize> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getIssueBufferSizeForAddressAndTokenERC1155(args, params);
    }
    this.notSupported();
  }

  protected async getIssueBufferSizeForAddressAndTokenERC1155(
    { owner, tokenId }: GetIssueBufferSizeForAddressAndTokenArgs,
    params?: ReadParameters,
  ): Promise<IssueBufferSize> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const sft = this.partition('sft');
    const wallet = await asAddress(owner);
    if (isZeroAddress(wallet)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { owner }, new Error('Owner cannot be an empty address'));
    }
    const tokenOwner = (await asAddress(owner)) as Hex;

    try {
      const issueBufferSize = await this.reader(this.abi(sft)).read.getIssueBufferSizeForAddressAndToken(
        [tokenOwner, tokenId],
        params,
      );

      return issueBufferSize;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { owner, tokenId });
    }
  }
}

export const getIssueBufferSizeForAddressAndToken = asCallableClass(GetIssueBufferSizeForAddressAndToken);
