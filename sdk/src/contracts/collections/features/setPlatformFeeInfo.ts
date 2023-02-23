import { BigNumber, ContractTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetPlatformFeeInfoFunctions = {
  v1: 'setPlatformFeeInfo(address,uint256)[]',
} as const;

const SetPlatformFeeInfoPartitions = {
  v1: [...FeatureFunctionsMap[SetPlatformFeeInfoFunctions.v1].drop],
};
type SetPlatformFeeInfoPartitions = typeof SetPlatformFeeInfoPartitions;

const SetPlatformFeeInfoInterfaces = Object.values(SetPlatformFeeInfoPartitions).flat();
type SetPlatformFeeInfoInterfaces = (typeof SetPlatformFeeInfoInterfaces)[number];

export type SetPlatformFeeInfoCallArgs = [
  signer: Signerish,
  recipient: Addressish,
  basisPoints: BigNumber,
  overrides?: WriteOverrides,
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
    super(base, SetPlatformFeeInfoInterfaces, SetPlatformFeeInfoPartitions, SetPlatformFeeInfoFunctions);
  }

  execute(...args: SetPlatformFeeInfoCallArgs): Promise<SetPlatformFeeInfoResponse> {
    return this.setPlatformFeeInfo(...args);
  }

  async setPlatformFeeInfo(
    signer: Signerish,
    recipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
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
    overrides: WriteOverrides = {},
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

export const setPlatformFeeInfo = asCallableClass(SetPlatformFeeInfo);
