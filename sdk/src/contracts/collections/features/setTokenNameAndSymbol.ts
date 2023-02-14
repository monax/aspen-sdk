import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetTokenNameAndSymbolFunctions = {
  v1: 'setTokenNameAndSymbol(string,string)[]',
} as const;

const SetTokenNameAndSymbolPartitions = {
  v1: [...FeatureFunctionsMap[SetTokenNameAndSymbolFunctions.v1].drop],
};
type SetTokenNameAndSymbolPartitions = typeof SetTokenNameAndSymbolPartitions;

const SetTokenNameAndSymbolInterfaces = Object.values(SetTokenNameAndSymbolPartitions).flat();
type SetTokenNameAndSymbolInterfaces = (typeof SetTokenNameAndSymbolInterfaces)[number];

export type SetTokenNameAndSymbolCallArgs = [
  signer: Signerish,
  name: string,
  symbol: string,
  overrides?: SourcedOverrides,
];
export type SetTokenNameAndSymbolResponse = ContractTransaction;

export class SetTokenNameAndSymbol extends ContractFunction<
  SetTokenNameAndSymbolInterfaces,
  SetTokenNameAndSymbolPartitions,
  SetTokenNameAndSymbolCallArgs,
  SetTokenNameAndSymbolResponse
> {
  readonly functionName = 'setTokenNameAndSymbol';

  constructor(base: CollectionContract) {
    super(base, SetTokenNameAndSymbolInterfaces, SetTokenNameAndSymbolPartitions, SetTokenNameAndSymbolFunctions);
  }

  call(...args: SetTokenNameAndSymbolCallArgs): Promise<SetTokenNameAndSymbolResponse> {
    return this.setTokenNameAndSymbol(...args);
  }

  async setTokenNameAndSymbol(
    signer: Signerish,
    name: string,
    symbol: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = v1.connectWith(signer).setTokenNameAndSymbol(name, symbol, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, name: string, symbol: string, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = v1.connectWith(signer).estimateGas.setTokenNameAndSymbol(name, symbol, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
