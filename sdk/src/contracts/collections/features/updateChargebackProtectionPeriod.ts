import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { Signer } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const UpdateChargebackProtectionPeriodFunctions = {
  v1: 'updateChargebackProtectionPeriod(uint256)[]',
} as const;

const UpdateChargebackProtectionPeriodPartitions = {
  v1: [...FeatureFunctionsMap[UpdateChargebackProtectionPeriodFunctions.v1].drop],
};
type UpdateChargebackProtectionPeriodPartitions = typeof UpdateChargebackProtectionPeriodPartitions;

const UpdateChargebackProtectionPeriodInterfaces = Object.values(UpdateChargebackProtectionPeriodPartitions).flat();
type UpdateChargebackProtectionPeriodInterfaces = (typeof UpdateChargebackProtectionPeriodInterfaces)[number];

export type UpdateChargebackProtectionPeriodCallArgs = [
  walletClient: Signer,
  newPeriodInSeconds: bigint | number,
  params?: WriteParameters,
];
export type UpdateChargebackProtectionPeriodResponse = GetTransactionReceiptReturnType;

export class UpdateChargebackProtectionPeriod extends ContractFunction<
  UpdateChargebackProtectionPeriodInterfaces,
  UpdateChargebackProtectionPeriodPartitions,
  UpdateChargebackProtectionPeriodCallArgs,
  UpdateChargebackProtectionPeriodResponse
> {
  readonly functionName = 'updateChargebackProtectionPeriod';

  constructor(base: CollectionContract) {
    super(
      base,
      UpdateChargebackProtectionPeriodInterfaces,
      UpdateChargebackProtectionPeriodPartitions,
      UpdateChargebackProtectionPeriodFunctions,
    );
  }

  execute(...args: UpdateChargebackProtectionPeriodCallArgs): Promise<UpdateChargebackProtectionPeriodResponse> {
    return this.updateChargebackProtectionPeriod(...args);
  }

  async updateChargebackProtectionPeriod(
    walletClient: Signer,
    newPeriodInSeconds: bigint | number,
    params?: WriteParameters,
  ): Promise<UpdateChargebackProtectionPeriodResponse> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.updateChargebackProtectionPeriod(
        [BigInt(newPeriodInSeconds)],
        params,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }

  async estimateGas(
    walletClient: Signer,
    newPeriodInSeconds: bigint | number,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.updateChargebackProtectionPeriod(
        [BigInt(newPeriodInSeconds)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }

  async populateTransaction(newPeriodInSeconds: bigint | number, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.updateChargebackProtectionPeriod(
        [BigInt(newPeriodInSeconds)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { newPeriodInSeconds });
    }
  }
}

export const updateChargebackProtectionPeriod = asCallableClass(UpdateChargebackProtectionPeriod);
