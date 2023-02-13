import { ethers } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetClaimPauseStatusPartitions = {
  // @todo
  x1: [...FeatureFunctionsMap['pauseClaims()[]'].drop],
  x2: [...FeatureFunctionsMap['setClaimPauseStatus(bool)[]'].drop],
};
type GetClaimPauseStatusPartitions = typeof GetClaimPauseStatusPartitions;

const GetClaimPauseStatusInterfaces = Object.values(GetClaimPauseStatusPartitions).flat();
type GetClaimPauseStatusInterfaces = (typeof GetClaimPauseStatusInterfaces)[number];

export type GetClaimPauseStatusCallArgs = [overrides?: SourcedOverrides];
export type GetClaimPauseStatusResponse = boolean;

export class GetClaimPauseStatus extends ContractFunction<
  GetClaimPauseStatusInterfaces,
  GetClaimPauseStatusPartitions,
  GetClaimPauseStatusCallArgs,
  GetClaimPauseStatusResponse
> {
  readonly functionName = 'getClaimPauseStatus';

  constructor(base: CollectionContract) {
    super(base, GetClaimPauseStatusInterfaces, GetClaimPauseStatusPartitions);
  }

  call(...args: GetClaimPauseStatusCallArgs): Promise<GetClaimPauseStatusResponse> {
    return this.getClaimPauseStatus(...args);
  }

  async getClaimPauseStatus(overrides?: SourcedOverrides): Promise<boolean> {
    if (!this.supported) {
      throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
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
