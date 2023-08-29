import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { BytesLike, CollectionContract, PayableParameters, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const MulticallFunctions = {
  v1: 'multicall(bytes[])[bytes[]]',
} as const;

const MulticallPartitions = {
  v1: [...FeatureFunctionsMap[MulticallFunctions.v1].drop],
};
type MulticallPartitions = typeof MulticallPartitions;

const MulticallInterfaces = Object.values(MulticallPartitions).flat();
type MulticallInterfaces = (typeof MulticallInterfaces)[number];

export type MulticallCallArgs = [walletClient: Signer, data: BytesLike[], params?: PayableParameters];
export type MulticallResponse = GetTransactionReceiptReturnType;

export class Multicall extends ContractFunction<
  MulticallInterfaces,
  MulticallPartitions,
  MulticallCallArgs,
  MulticallResponse
> {
  readonly functionName = 'multicall';

  constructor(base: CollectionContract) {
    super(base, MulticallInterfaces, MulticallPartitions, MulticallFunctions);
  }

  execute(...args: MulticallCallArgs): Promise<MulticallResponse> {
    return this.multicall(...args);
  }

  async multicall(walletClient: Signer, data: BytesLike[], params?: WriteParameters): Promise<MulticallResponse> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.multicall([data as ReadonlyArray<Hex>], params);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, data: BytesLike[], params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.multicall([data as ReadonlyArray<Hex>], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(data: BytesLike[], params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.multicall([data as ReadonlyArray<Hex>], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const multicall = asCallableClass(Multicall);
