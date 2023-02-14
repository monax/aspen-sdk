import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetMaxTotalSupplyFunctions = {
  nft: 'setMaxTotalSupply(uint256)[]',
  sft: 'setMaxTotalSupply(uint256,uint256)[]',
} as const;

const SetMaxTotalSupplyPartitions = {
  nft: [...FeatureFunctionsMap[SetMaxTotalSupplyFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[SetMaxTotalSupplyFunctions.sft].drop],
};
type SetMaxTotalSupplyPartitions = typeof SetMaxTotalSupplyPartitions;

const SetMaxTotalSupplyInterfaces = Object.values(SetMaxTotalSupplyPartitions).flat();
type SetMaxTotalSupplyInterfaces = (typeof SetMaxTotalSupplyInterfaces)[number];

export type SetMaxTotalSupplyCallArgs = [
  signer: Signerish,
  totalSupply: BigNumberish,
  tokenId: BigNumberish | null,
  overrides?: SourcedOverrides,
];
export type SetMaxTotalSupplyResponse = ContractTransaction;

export class SetMaxTotalSupply extends ContractFunction<
  SetMaxTotalSupplyInterfaces,
  SetMaxTotalSupplyPartitions,
  SetMaxTotalSupplyCallArgs,
  SetMaxTotalSupplyResponse
> {
  readonly functionName = 'setMaxTotalSupply';

  constructor(base: CollectionContract) {
    super(base, SetMaxTotalSupplyInterfaces, SetMaxTotalSupplyPartitions, SetMaxTotalSupplyFunctions);
  }

  /** Set max total supply [ERC721: of all tokens] [ERC1155: per token] */
  call(...args: SetMaxTotalSupplyCallArgs): Promise<SetMaxTotalSupplyResponse> {
    return this.setMaxTotalSupply(...args);
  }

  async setMaxTotalSupply(
    signer: Signerish,
    totalSupply: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const tx = await sft.connectWith(signer).setMaxTotalSupply(tokenId, totalSupply, overrides);
        return tx;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const tx = await nft.connectWith(signer).setMaxTotalSupply(totalSupply, overrides);
        return tx;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(
    signer: Signerish,
    totalSupply: BigNumberish,
    tokenId: BigNumberish | null = null,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const estimate = await sft.connectWith(signer).estimateGas.setMaxTotalSupply(tokenId, totalSupply, overrides);
        return estimate;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const estimate = await nft.connectWith(signer).estimateGas.setMaxTotalSupply(totalSupply, overrides);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}
