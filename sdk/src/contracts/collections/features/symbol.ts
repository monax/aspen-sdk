import { parseAbi } from 'viem';
import { CollectionContract, ReadParameters } from '../..';
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

export type SymbolCallArgs = [params?: ReadParameters];
export type SymbolResponse = string;

export class Symbol extends ContractFunction<SymbolInterfaces, SymbolPartitions, SymbolCallArgs, SymbolResponse> {
  readonly functionName = 'symbol';

  constructor(base: CollectionContract) {
    super(base, SymbolInterfaces, SymbolPartitions, SymbolFunctions);
  }

  execute(...args: SymbolCallArgs): Promise<SymbolResponse> {
    return this.symbol(...args);
  }

  async symbol(params?: ReadParameters): Promise<string> {
    try {
      const abi = parseAbi(['function symbol() external view returns (string)']);
      const symbol = await this.reader(abi).read.symbol(params);
      return symbol;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const symbol = asCallableClass(Symbol);
