import { asAddress } from '@monaxlabs/phloem/dist/types';
import { CallOverrides } from 'ethers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { ClaimArgs } from './claim';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const VerifyClaimFunctions = {
  nftV1: 'verifyClaim(uint256,address,uint256,address,uint256,bool)[]',
  nftV2: 'verifyClaim(address,uint256,address,uint256,bytes32[],uint256)[]',
  sftV1: 'verifyClaim(uint256,address,uint256,uint256,address,uint256,bool)[]',
  sftV2: 'verifyClaim(address,uint256,uint256,address,uint256,bytes32[],uint256)[]',
} as const;

const VerifyClaimPartitions = {
  nftV1: [...FeatureFunctionsMap[VerifyClaimFunctions.nftV1].drop],
  nftV2: [...FeatureFunctionsMap[VerifyClaimFunctions.nftV2].drop],
  sftV1: [...FeatureFunctionsMap[VerifyClaimFunctions.sftV1].drop],
  sftV2: [...FeatureFunctionsMap[VerifyClaimFunctions.sftV2].drop],
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

  execute(...args: VerifyClaimCallArgs): Promise<VerifyClaimResponse> {
    return this.verifyClaim(...args);
  }

  /**
   * Use this function to verify that the claimant actually meets the claim conditions
   */
  protected async verifyClaim(
    args: ClaimArgs,
    verifyMaxQuantity = true,
    overrides: CallOverrides = {},
  ): Promise<boolean> {
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
    const { sftV1, sftV2 } = this.partitions;
    const wallet = await asAddress(args.receiver);
    const tokenAddress = await asAddress(args.currency);

    try {
      if (sftV2) {
        await sftV2
          .connectReadOnly()
          .verifyClaim(
            wallet,
            args.tokenId,
            args.quantity,
            tokenAddress,
            args.pricePerToken,
            args.proofs,
            args.proofMaxQuantityPerTransaction,
            overrides,
          );

        return true;
      } else if (sftV1) {
        await sftV1
          .connectReadOnly()
          .verifyClaim(
            args.conditionId,
            wallet,
            args.tokenId,
            args.quantity,
            tokenAddress,
            args.pricePerToken,
            verifyMaxQuantity,
            overrides,
          );

        return true;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }

    this.notSupported();
  }

  protected async verifyERC721(
    args: ClaimArgs,
    verifyMaxQuantity: boolean,
    overrides: CallOverrides = {},
  ): Promise<boolean> {
    const { nftV1, nftV2 } = this.partitions;
    const wallet = await asAddress(args.receiver);
    const tokenAddress = await asAddress(args.currency);

    try {
      if (nftV2) {
        await nftV2
          .connectReadOnly()
          .verifyClaim(
            wallet,
            args.quantity,
            tokenAddress,
            args.pricePerToken,
            args.proofs,
            args.proofMaxQuantityPerTransaction,
            overrides,
          );

        return true;
      } else if (nftV1) {
        await nftV1
          .connectReadOnly()
          .verifyClaim(
            args.conditionId,
            wallet,
            args.quantity,
            tokenAddress,
            args.pricePerToken,
            verifyMaxQuantity,
            overrides,
          );
        return true;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }

    this.notSupported();
  }
}

export const verifyClaim = asCallableClass(VerifyClaim);
