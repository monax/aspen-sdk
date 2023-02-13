import { ethers } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SymbolPartitions = {
  // 'Symbol' has always been present but not actually exposed by the old interfaces
  catchAll: [
    ...FeatureFunctionsMap['isIAspenFeaturesV0()[bool]'].drop,
    ...FeatureFunctionsMap['isICedarFeaturesV0()[bool]'].drop,
  ],
};
type SymbolPartitions = typeof SymbolPartitions;

const SymbolInterfaces = Object.values(SymbolPartitions).flat();
type SymbolInterfaces = (typeof SymbolInterfaces)[number];

export type SymbolCallArgs = [overrides?: SourcedOverrides];
export type SymbolResponse = string;

export class Symbol extends ContractFunction<SymbolInterfaces, SymbolPartitions, SymbolCallArgs, SymbolResponse> {
  readonly functionName = 'symbol';

  constructor(base: CollectionContract) {
    super(base, SymbolInterfaces, SymbolPartitions);
  }

  call(...args: SymbolCallArgs): Promise<SymbolResponse> {
    return this.symbol(...args);
  }

  async symbol(overrides?: SourcedOverrides): Promise<string> {
    try {
      const abi = ['function symbol() external returns (string)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      const symbol = await contract.symbol(overrides);
      return symbol;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
