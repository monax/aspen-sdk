import { ethers } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetClaimPauseStatusPartitions = {
  // 'claimIsPaused' has always been present but not actually exposed by the old interfaces
  catchAll: [
    ...FeatureFunctionsMap['pauseClaims()[]'].drop,
    ...FeatureFunctionsMap['setClaimPauseStatus(bool)[]'].drop,
  ],
};
type GetClaimPauseStatusPartitions = typeof GetClaimPauseStatusPartitions;

const GetClaimPauseStatusInterfaces = Object.values(GetClaimPauseStatusPartitions).flat();
type GetClaimPauseStatusInterfaces = (typeof GetClaimPauseStatusInterfaces)[number];

export type GetClaimPauseStatusCallArgs = [overrides?: WriteOverrides];
export type GetClaimPauseStatusResponse = boolean;

export class GetClaimPauseStatus extends ContractFunction<
  GetClaimPauseStatusInterfaces,
  GetClaimPauseStatusPartitions,
  GetClaimPauseStatusCallArgs,
  GetClaimPauseStatusResponse
> {
  readonly functionName = 'getClaimPauseStatus';

  constructor(base: CollectionContract) {
    super(base, GetClaimPauseStatusInterfaces, GetClaimPauseStatusPartitions, {});
  }

  execute(...args: GetClaimPauseStatusCallArgs): Promise<GetClaimPauseStatusResponse> {
    return this.getClaimPauseStatus(...args);
  }

  async getClaimPauseStatus(overrides: WriteOverrides = {}): Promise<boolean> {
    if (!this.supported) {
      this.notSupported();
    }

    try {
      const abi = ['function claimIsPaused() public view returns (bool)'];
      const contract = new ethers.Contract(this.base.address, abi, this.base.provider);
      const paused = await contract.claimIsPaused(overrides);
      return paused;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getClaimPauseStatus = asCallableClass(GetClaimPauseStatus);
