import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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
  walletClient: Signer,
  name: string,
  symbol: string,
  params?: WriteParameters,
];
export type SetTokenNameAndSymbolResponse = GetTransactionReceiptReturnType;

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

  execute(...args: SetTokenNameAndSymbolCallArgs): Promise<SetTokenNameAndSymbolResponse> {
    return this.setTokenNameAndSymbol(...args);
  }

  async setTokenNameAndSymbol(
    walletClient: Signer,
    name: string,
    symbol: string,
    params?: WriteParameters,
  ): Promise<SetTokenNameAndSymbolResponse> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTokenNameAndSymbol([name, symbol], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, name: string, symbol: string, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setTokenNameAndSymbol([name, symbol], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(name: string, symbol: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTokenNameAndSymbol([name, symbol], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTokenNameAndSymbol = asCallableClass(SetTokenNameAndSymbol);
