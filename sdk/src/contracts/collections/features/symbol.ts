import { CallOverrides, ethers } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, CatchAllInterfaces, ContractFunction } from './features';

const SymbolFunctions = {
  v1: 'symbol()[string]',
} as const;

const SymbolPartitions = {
  v1: [...FeatureFunctionsMap[SymbolFunctions.v1].drop],
  // 'Symbol' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type SymbolPartitions = typeof SymbolPartitions;

const SymbolInterfaces = Object.values(SymbolPartitions).flat();
type SymbolInterfaces = (typeof SymbolInterfaces)[number];

export type SymbolCallArgs = [overrides?: CallOverrides];
export type SymbolResponse = string;

export class Symbol extends ContractFunction<SymbolInterfaces, SymbolPartitions, SymbolCallArgs, SymbolResponse> {
  readonly functionName = 'symbol';

  constructor(base: CollectionContract) {
    super(base, SymbolInterfaces, SymbolPartitions, SymbolFunctions);
  }

  execute(...args: SymbolCallArgs): Promise<SymbolResponse> {
    return this.symbol(...args);
  }

  async symbol(overrides: CallOverrides = {}): Promise<string> {
    try {
      const abi = ['function symbol() external view returns (string)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      const symbol = String(await contract.symbol(overrides));
      return symbol;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const symbol = asCallableClass(Symbol);
