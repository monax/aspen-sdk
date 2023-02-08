import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetClaimPauseStatusPartitions = {
  v1: [...FeatureFunctionsMap['pauseClaims()[]'].drop],
  v2: [...FeatureFunctionsMap['setClaimPauseStatus(bool)[]'].drop],
};
type SetClaimPauseStatusPartitions = typeof SetClaimPauseStatusPartitions;

const SetClaimPauseStatusInterfaces = Object.values(SetClaimPauseStatusPartitions).flat();
type SetClaimPauseStatusInterfaces = (typeof SetClaimPauseStatusInterfaces)[number];

export type SetClaimPauseStatusCallArgs = [signer: Signerish, pauseStatus: boolean, overrides?: SourcedOverrides];
export type SetClaimPauseStatusResponse = ContractTransaction;

export class SetClaimPauseStatus extends ContractFunction<
  SetClaimPauseStatusInterfaces,
  SetClaimPauseStatusPartitions,
  SetClaimPauseStatusCallArgs,
  SetClaimPauseStatusResponse
> {
  readonly functionName = 'setClaimPauseStatus';

  constructor(base: CollectionContract) {
    super(base, SetClaimPauseStatusInterfaces, SetClaimPauseStatusPartitions);
  }

  call(...args: SetClaimPauseStatusCallArgs): Promise<SetClaimPauseStatusResponse> {
    return this.setClaimPauseStatus(...args);
  }

  async setClaimPauseStatus(
    signer: Signerish,
    pauseStatus: boolean,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const tx = await v2.connectWith(signer).setClaimPauseStatus(pauseStatus, overrides);
        return tx;
      } else if (v1) {
        const tx = await (pauseStatus
          ? v1.connectWith(signer).pauseClaims(overrides)
          : v1.connectWith(signer).unpauseClaims(overrides));
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(signer: Signerish, pauseStatus: boolean, overrides?: SourcedOverrides): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.setClaimPauseStatus(pauseStatus, overrides);
        return estimate;
      } else if (v1) {
        const estimate = await (pauseStatus
          ? v1.connectWith(signer).estimateGas.pauseClaims(overrides)
          : v1.connectWith(signer).estimateGas.unpauseClaims(overrides));
        return estimate;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
