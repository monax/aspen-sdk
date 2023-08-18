import { parseAbi } from 'viem';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetClaimPauseStatusFunctions = {
  v1: 'getClaimPauseStatus()[bool]',
} as const;

const GetClaimPauseStatusPartitions = {
  v1: [...FeatureFunctionsMap[GetClaimPauseStatusFunctions.v1].drop],
  // 'claimIsPaused' has always been present but not actually exposed by the old interfaces
  catchAll: [
    ...FeatureFunctionsMap['pauseClaims()[]'].drop,
    ...FeatureFunctionsMap['setClaimPauseStatus(bool)[]'].drop,
  ],
};
type GetClaimPauseStatusPartitions = typeof GetClaimPauseStatusPartitions;

const GetClaimPauseStatusInterfaces = Object.values(GetClaimPauseStatusPartitions).flat();
type GetClaimPauseStatusInterfaces = (typeof GetClaimPauseStatusInterfaces)[number];

export type GetClaimPauseStatusCallArgs = [params?: ReadParameters];
export type GetClaimPauseStatusResponse = boolean;

export class GetClaimPauseStatus extends ContractFunction<
  GetClaimPauseStatusInterfaces,
  GetClaimPauseStatusPartitions,
  GetClaimPauseStatusCallArgs,
  GetClaimPauseStatusResponse
> {
  readonly functionName = 'getClaimPauseStatus';

  constructor(base: CollectionContract) {
    super(base, GetClaimPauseStatusInterfaces, GetClaimPauseStatusPartitions, GetClaimPauseStatusFunctions);
  }

  execute(...args: GetClaimPauseStatusCallArgs): Promise<GetClaimPauseStatusResponse> {
    return this.getClaimPauseStatus(...args);
  }

  async getClaimPauseStatus(params?: ReadParameters): Promise<GetClaimPauseStatusResponse> {
    const { v1 } = this.partitions;

    try {
      if (v1) {
        const paused = await this.reader(this.abi(v1)).read.getClaimPauseStatus(params);
        return paused;
      } else {
        const abi = parseAbi(['function claimIsPaused() public view returns (bool)']);
        const paused = await this.reader(abi).read.claimIsPaused(params);
        return paused;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getClaimPauseStatus = asCallableClass(GetClaimPauseStatus);
