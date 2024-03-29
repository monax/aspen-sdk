import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { BytesLike, CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const SetOperatorFiltererFunctions = {
  v1: 'setOperatorFilterer(bytes32)[]',
} as const;

const SetOperatorFiltererPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorFiltererFunctions.v1].drop],
};
type SetOperatorFiltererPartitions = typeof SetOperatorFiltererPartitions;

const SetOperatorFiltererInterfaces = Object.values(SetOperatorFiltererPartitions).flat();
type SetOperatorFiltererInterfaces = (typeof SetOperatorFiltererInterfaces)[number];

export type SetOperatorFiltererCallArgs = [walletClient: Signer, operatorId: BytesLike, params?: WriteParameters];
export type SetOperatorFiltererResponse = GetTransactionReceiptReturnType;

export class SetOperatorFilterer extends ContractFunction<
  SetOperatorFiltererInterfaces,
  SetOperatorFiltererPartitions,
  SetOperatorFiltererCallArgs,
  SetOperatorFiltererResponse
> {
  readonly functionName = 'setOperatorFilterer';

  constructor(base: CollectionContract) {
    super(base, SetOperatorFiltererInterfaces, SetOperatorFiltererPartitions, SetOperatorFiltererFunctions);
  }

  execute(...args: SetOperatorFiltererCallArgs): Promise<SetOperatorFiltererResponse> {
    return this.setOperatorFilterer(...args);
  }

  async setOperatorFilterer(
    walletClient: Signer,
    operatorId: BytesLike,
    params?: WriteParameters,
  ): Promise<SetOperatorFiltererResponse> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setOperatorFilterer([operatorId as Hex], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, operatorId: BytesLike, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setOperatorFilterer([operatorId as Hex], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(operatorId: BytesLike, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setOperatorFilterer([operatorId as Hex], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setOperatorFilterer = asCallableClass(SetOperatorFilterer);
