import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

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
    super(base, SetClaimPauseStatusInterfaces, SetClaimPauseStatusPartitions, SetClaimPauseStatusFunctions);
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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}
