import { CallOverrides } from 'ethers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { ClaimArgs } from './claim';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const VerifyClaimFunctions = {
  nft: 'verifyClaim(uint256,address,uint256,address,uint256,bool)[]',
  sft: 'verifyClaim(uint256,address,uint256,uint256,address,uint256,bool)[]',
} as const;

const VerifyClaimPartitions = {
  nft: [...FeatureFunctionsMap[VerifyClaimFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[VerifyClaimFunctions.sft].drop],
};
type VerifyClaimPartitions = typeof VerifyClaimPartitions;

const VerifyClaimInterfaces = Object.values(VerifyClaimPartitions).flat();
type VerifyClaimInterfaces = (typeof VerifyClaimInterfaces)[number];

export type VerifyClaimCallArgs = [args: ClaimArgs, verifyMaxQuantity?: boolean, overrides?: CallOverrides];
export type VerifyClaimResponse = boolean;

export class VerifyClaim extends ContractFunction<
  VerifyClaimInterfaces,
  VerifyClaimPartitions,
  VerifyClaimCallArgs,
  VerifyClaimResponse
> {
  readonly functionName = 'verifyClaim';

  constructor(base: CollectionContract) {
    super(base, VerifyClaimInterfaces, VerifyClaimPartitions, VerifyClaimFunctions);
  }

  call(...args: VerifyClaimCallArgs): Promise<VerifyClaimResponse> {
    return this.verifyClaim(...args);
  }

  /**
   * Use this function to verify that the claimant actually meets the claim conditions
   */
  async verifyClaim(args: ClaimArgs, verifyMaxQuantity = true, overrides?: CallOverrides): Promise<boolean> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.verifyERC1155(args, verifyMaxQuantity, overrides);
      case 'ERC721':
        return await this.verifyERC721(args, verifyMaxQuantity, overrides);
    }
  }

  protected async verifyERC1155(
    args: ClaimArgs,
    verifyMaxQuantity: boolean,
    overrides: CallOverrides = {},
  ): Promise<boolean> {
    args.tokenId = this.base.requireTokenId(args.tokenId, this.functionName);
    const sft = this.partition('sft');

    try {
      await sft
        .connectReadOnly()
        .verifyClaim(
          args.conditionId,
          args.receiver,
          args.tokenId,
          args.quantity,
          args.currency,
          args.pricePerToken,
          verifyMaxQuantity,
          overrides,
        );

      return true;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async verifyERC721(
    args: ClaimArgs,
    verifyMaxQuantity: boolean,
    overrides: CallOverrides = {},
  ): Promise<boolean> {
    const nft = this.partition('nft');

    try {
      await nft
        .connectReadOnly()
        .verifyClaim(
          args.conditionId,
          args.receiver,
          args.quantity,
          args.currency,
          args.pricePerToken,
          verifyMaxQuantity,
          overrides,
        );

      return true;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }
}
