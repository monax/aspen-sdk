import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';
import { CollectionContractClaimCondition } from './getClaimConditionById';

const SetClaimConditionsFunctions = {
  nft: 'setClaimConditions(tuple[],bool)[]',
  sft: 'setClaimConditions(uint256,tuple[],bool)[]',
} as const;

const SetClaimConditionsPartitions = {
  nft: [...FeatureFunctionsMap[SetClaimConditionsFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetClaimConditionsFunctions.sft].drop],
};
type SetClaimConditionsPartitions = typeof SetClaimConditionsPartitions;

const SetClaimConditionsInterfaces = Object.values(SetClaimConditionsPartitions).flat();
type SetClaimConditionsInterfaces = (typeof SetClaimConditionsInterfaces)[number];

export type SetClaimConditionsCallArgs = [signer: Signerish, args: ConditionArgs, overrides?: WriteOverrides];
export type SetClaimConditionsResponse = ContractTransaction;

export type LooseCollectionContractClaimCondition = Omit<CollectionContractClaimCondition, 'currency'> & {
  currency: Addressish;
};

export type ConditionArgs = {
  conditions: LooseCollectionContractClaimCondition[];
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
    super(base, SetClaimConditionsInterfaces, SetClaimConditionsPartitions, SetClaimConditionsFunctions);
  }

  execute(...args: SetClaimConditionsCallArgs): Promise<SetClaimConditionsResponse> {
    return this.setClaimConditions(...args);
  }

  async setClaimConditions(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimCondition[] = await Promise.all(
      conditions.map(async (c) => ({ ...c, currency: await asAddress(c.currency) })),
    );

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await sft
              .connectWith(signer)
              .setClaimConditions(tokenId, strictConditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const tx = await nft
              .connectWith(signer)
              .setClaimConditions(strictConditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    this.notSupported();
  }

  async estimateGas(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimCondition[] = await Promise.all(
      conditions.map(async (c) => ({ ...c, currency: await asAddress(c.currency) })),
    );

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await sft
              .connectWith(signer)
              .estimateGas.setClaimConditions(tokenId, strictConditions, resetClaimEligibility, overrides);
            return estimate;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const estimate = await nft
              .connectWith(signer)
              .estimateGas.setClaimConditions(strictConditions, resetClaimEligibility, overrides);
            return estimate;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    this.notSupported();
  }

  async populateTransaction(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimCondition[] = await Promise.all(
      conditions.map(async (c) => ({ ...c, currency: await asAddress(c.currency) })),
    );

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const tx = await sft
              .connectWith(signer)
              .populateTransaction.setClaimConditions(tokenId, strictConditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const tx = await nft
              .connectWith(signer)
              .populateTransaction.setClaimConditions(strictConditions, resetClaimEligibility, overrides);
            return tx;
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    this.notSupported();
  }
}

export const setClaimConditions = asCallableClass(SetClaimConditions);
