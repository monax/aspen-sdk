import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetClaimPauseStatusFunctions = {
  v1a: 'pauseClaims()[]',
  v1b: 'unpauseClaims()[]',
  v2: 'setClaimPauseStatus(bool)[]',
} as const;

const SetClaimPauseStatusPartitions = {
  v1: [
    ...FeatureFunctionsMap[SetClaimPauseStatusFunctions.v1a].drop,
    ...FeatureFunctionsMap[SetClaimPauseStatusFunctions.v1b].drop,
  ],
  v2: [...FeatureFunctionsMap[SetClaimPauseStatusFunctions.v2].drop],
};
type SetClaimPauseStatusPartitions = typeof SetClaimPauseStatusPartitions;

const SetClaimPauseStatusInterfaces = Object.values(SetClaimPauseStatusPartitions).flat();
type SetClaimPauseStatusInterfaces = (typeof SetClaimPauseStatusInterfaces)[number];

export type SetClaimPauseStatusCallArgs = [walletClient: Signer, pauseStatus: boolean, params?: WriteParameters];
export type SetClaimPauseStatusResponse = GetTransactionReceiptReturnType;

export class SetClaimPauseStatus extends ContractFunction<
  SetClaimPauseStatusInterfaces,
  SetClaimPauseStatusPartitions,
  SetClaimPauseStatusCallArgs,
  SetClaimPauseStatusResponse
> {
  readonly functionName = 'setClaimPauseStatus';

  constructor(base: CollectionContract) {
    super(base, SetClaimPauseStatusInterfaces, SetClaimPauseStatusPartitions, SetClaimPauseStatusFunctions);
  }

  execute(...args: SetClaimPauseStatusCallArgs): Promise<SetClaimPauseStatusResponse> {
    return this.setClaimPauseStatus(...args);
  }

  async setClaimPauseStatus(
    walletClient: Signer,
    pauseStatus: boolean,
    params?: WriteParameters,
  ): Promise<SetClaimPauseStatusResponse> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setClaimPauseStatus([pauseStatus], params);
        const hash = await walletClient.writeContract(request);
        return this.base.publicClient.waitForTransactionReceipt({
          hash,
        });
      } else if (v1) {
        let request;
        if (pauseStatus) {
          ({ request } = await this.reader(this.abi(v1)).simulate.pauseClaims(params));
        } else {
          ({ request } = await this.reader(this.abi(v1)).simulate.unpauseClaims(params));
        }
        const hash = await walletClient.writeContract(request);
        return this.base.publicClient.waitForTransactionReceipt({
          hash,
        });
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(walletClient: Signer, pauseStatus: boolean, params?: WriteParameters): Promise<bigint> {
    const { v1, v2 } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v2) {
        const estimate = await this.reader(this.abi(v2)).estimateGas.setClaimPauseStatus([pauseStatus], fullParams);
        return estimate;
      } else if (v1) {
        let estimate;
        if (pauseStatus) {
          estimate = await this.reader(this.abi(v1)).estimateGas.pauseClaims(fullParams);
        } else {
          estimate = await this.reader(this.abi(v1)).estimateGas.unpauseClaims(fullParams);
        }
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(pauseStatus: boolean, params?: WriteParameters): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setClaimPauseStatus([pauseStatus], params);
        return encodeFunctionData(request);
      } else if (v1) {
        let request;
        if (pauseStatus) {
          ({ request } = await this.reader(this.abi(v1)).simulate.pauseClaims(params));
        } else {
          ({ request } = await this.reader(this.abi(v1)).simulate.unpauseClaims(params));
        }
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setClaimPauseStatus = asCallableClass(SetClaimPauseStatus);
