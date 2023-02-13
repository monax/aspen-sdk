import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { CollectionContractClaimCondition, Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetClaimConditionsPartitions = {
  nft: [...FeatureFunctionsMap['setClaimConditions(tuple[],bool)[]'].drop],
  sft: [...FeatureFunctionsMap['setClaimConditions(uint256,tuple[],bool)[]'].drop],
};
type SetClaimConditionsPartitions = typeof SetClaimConditionsPartitions;

const SetClaimConditionsInterfaces = Object.values(SetClaimConditionsPartitions).flat();
type SetClaimConditionsInterfaces = (typeof SetClaimConditionsInterfaces)[number];

export type SetClaimConditionsCallArgs = [signer: Signerish, args: ConditionArgs, overrides?: SourcedOverrides];
export type SetClaimConditionsResponse = ContractTransaction;

export type ConditionArgs = {
  conditions: CollectionContractClaimCondition[];
  tokenId: BigNumberish | null;
  resetClaimEligibility: boolean;
};

export class SetClaimConditions extends ContractFunction<
  SetClaimConditionsInterfaces,
  SetClaimConditionsPartitions,
  SetClaimConditionsCallArgs,
  SetClaimConditionsResponse
> {
  readonly functionName = 'setClaimConditions';

  constructor(base: CollectionContract) {
    super(base, SetClaimConditionsInterfaces, SetClaimConditionsPartitions);
  }

  call(...args: SetClaimConditionsCallArgs): Promise<SetClaimConditionsResponse> {
    return this.setClaimConditions(...args);
  }

  async setClaimConditions(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await sft
              .connectWith(signer)
              .setClaimConditions(tokenId, conditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await nft.connectWith(signer).setClaimConditions(conditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await sft
              .connectWith(signer)
              .estimateGas.setClaimConditions(tokenId, conditions, resetClaimEligibility, overrides);
            return estimate;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await nft
              .connectWith(signer)
              .estimateGas.setClaimConditions(conditions, resetClaimEligibility, overrides);
            return estimate;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
