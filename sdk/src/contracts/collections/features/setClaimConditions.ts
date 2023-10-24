import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, encodeFunctionData } from 'viem';
import { CollectionContract, claimConditionsForChain } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type {
  CollectionContractClaimCondition,
  CollectionContractClaimConditionOnChain,
  Signer,
  TokenId,
  WriteParameters,
} from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

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

export type SetClaimConditionsCallArgs = [walletClient: Signer, args: ConditionArgs, params?: WriteParameters];
export type SetClaimConditionsResponse = GetTransactionReceiptReturnType;

export type LooseCollectionContractClaimCondition = Omit<CollectionContractClaimCondition, 'currency'> & {
  currency: Addressish;
};

export type ConditionArgs = {
  conditions: LooseCollectionContractClaimCondition[];
  tokenId: TokenId;
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
    walletClient: Signer,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    params?: WriteParameters,
  ): Promise<SetClaimConditionsResponse> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimConditionOnChain[] = await Promise.all(
      conditions.map(async (c) => claimConditionsForChain({ ...c, currency: await asAddress(c.currency) })),
    );
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(sft)).simulate.setClaimConditions(
              [tokenId, strictConditions, resetClaimEligibility],
              fullParams,
            );
            const hash = await walletClient.writeContract(request);
            return this.base.publicClient.waitForTransactionReceipt({
              hash,
            });
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(nft)).simulate.setClaimConditions(
              [strictConditions, resetClaimEligibility],
              fullParams,
            );
            const hash = await walletClient.writeContract(request);
            return this.base.publicClient.waitForTransactionReceipt({
              hash,
            });
          }
          break;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { conditions, tokenId, resetClaimEligibility });
    }

    this.notSupported();
  }

  async estimateGas(
    walletClient: Signer,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    params?: WriteParameters,
  ): Promise<bigint> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimConditionOnChain[] = await Promise.all(
      conditions.map(async (c) => claimConditionsForChain({ ...c, currency: await asAddress(c.currency) })),
    );
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const estimate = await this.reader(this.abi(sft)).estimateGas.setClaimConditions(
              [tokenId, strictConditions, resetClaimEligibility],
              fullParams,
            );
            return estimate;
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const estimate = await this.reader(this.abi(nft)).estimateGas.setClaimConditions(
              [strictConditions, resetClaimEligibility],
              fullParams,
            );
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
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    params?: WriteParameters,
  ): Promise<string> {
    const { nft, sft } = this.partitions;
    const strictConditions: CollectionContractClaimConditionOnChain[] = await Promise.all(
      conditions.map(async (c) => claimConditionsForChain({ ...c, currency: await asAddress(c.currency) })),
    );

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155':
          if (sft) {
            tokenId = this.base.requireTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(sft)).simulate.setClaimConditions(
              [tokenId, strictConditions, resetClaimEligibility],
              params,
            );
            return encodeFunctionData(request);
          }
          break;
        case 'ERC721':
          if (nft) {
            this.base.rejectTokenId(tokenId, this.functionName);
            const { request } = await this.reader(this.abi(nft)).simulate.setClaimConditions(
              [strictConditions, resetClaimEligibility],
              params,
            );
            return encodeFunctionData(request);
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
