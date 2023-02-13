import { BigNumber, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetPlatformFeeInfoPartitions = {
  v1: [...FeatureFunctionsMap['setPlatformFeeInfo(address,uint256)[]'].drop],
};
type SetPlatformFeeInfoPartitions = typeof SetPlatformFeeInfoPartitions;

const SetPlatformFeeInfoInterfaces = Object.values(SetPlatformFeeInfoPartitions).flat();
type SetPlatformFeeInfoInterfaces = (typeof SetPlatformFeeInfoInterfaces)[number];

export type SetPlatformFeeInfoCallArgs = [
  signer: Signerish,
  recipient: Addressish,
  basisPoints: BigNumber,
  overrides?: SourcedOverrides,
];
export type SetPlatformFeeInfoResponse = ContractTransaction;

export class SetPlatformFeeInfo extends ContractFunction<
  SetPlatformFeeInfoInterfaces,
  SetPlatformFeeInfoPartitions,
  SetPlatformFeeInfoCallArgs,
  SetPlatformFeeInfoResponse
> {
  readonly functionName = 'setPlatformFeeInfo';

  constructor(base: CollectionContract) {
    super(base, SetPlatformFeeInfoInterfaces, SetPlatformFeeInfoPartitions);
  }

  call(...args: SetPlatformFeeInfoCallArgs): Promise<SetPlatformFeeInfoResponse> {
    return this.setPlatformFeeInfo(...args);
  }

  async setPlatformFeeInfo(
    signer: Signerish,
    recipient: Addressish,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setPlatformFeeInfo(asAddress(recipient), basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    recipient: Addressish,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1
        .connectWith(signer)
        .estimateGas.setPlatformFeeInfo(asAddress(recipient), basisPoints, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
