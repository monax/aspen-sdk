import { BigNumber } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const TokensCountPartitions = {
  nft: [...FeatureFunctionsMap['totalSupply()[uint256]'].drop],
  sft: [...FeatureFunctionsMap['getLargestTokenId()[uint256]'].drop],
  smallestId: [...FeatureFunctionsMap['getSmallestTokenId()[uint8]'].drop],
};
type TokensCountPartitions = typeof TokensCountPartitions;

const TokensCountInterfaces = Object.values(TokensCountPartitions).flat();
type TokensCountInterfaces = (typeof TokensCountInterfaces)[number];

export type TokensCountCallArgs = [overrides?: SourcedOverrides];
export type TokensCountResponse = BigNumber;

export class TokensCount extends ContractFunction<
  TokensCountInterfaces,
  TokensCountPartitions,
  TokensCountCallArgs,
  TokensCountResponse
> {
  readonly functionName = 'tokensCount';

  constructor(base: CollectionContract) {
    super(base, TokensCountInterfaces, TokensCountPartitions);
  }

  /** Get the number of unique tokens in the collection */
  call(...args: TokensCountCallArgs): Promise<TokensCountResponse> {
    return this.tokensCount(...args);
  }

  async tokensCount(overrides?: SourcedOverrides): Promise<BigNumber> {
    const { nft, sft, smallestId } = this.partitions;

    try {
      if (sft) {
        let offset = 0;
        if (smallestId) {
          offset = await smallestId.connectReadOnly().getSmallestTokenId(overrides);
        }
        const balance = (await sft.connectReadOnly().getLargestTokenId(overrides)).add(1 - offset);
        return balance;
      } else if (nft) {
        const balance = await nft.connectReadOnly().totalSupply(overrides);
        return balance;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
