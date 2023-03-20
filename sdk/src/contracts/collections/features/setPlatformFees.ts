import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetPlatformFeesFunctions = {
  v1: 'setPlatformFeeInfo(address,uint256)[]',
  v2: 'setPlatformFees(address,uint16)[]',
} as const;

const SetPlatformFeesPartitions = {
  v1: [...FeatureFunctionsMap[SetPlatformFeesFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[SetPlatformFeesFunctions.v2].drop],
};
type SetPlatformFeesPartitions = typeof SetPlatformFeesPartitions;

const SetPlatformFeesInterfaces = Object.values(SetPlatformFeesPartitions).flat();
type SetPlatformFeesInterfaces = (typeof SetPlatformFeesInterfaces)[number];

export type SetPlatformFeesCallArgs = [
  signer: Signerish,
  recipient: Addressish,
  basisPoints: BigNumber,
  overrides?: WriteOverrides,
];
export type SetPlatformFeesResponse = ContractTransaction;

export class SetPlatformFees extends ContractFunction<
  SetPlatformFeesInterfaces,
  SetPlatformFeesPartitions,
  SetPlatformFeesCallArgs,
  SetPlatformFeesResponse
> {
  readonly functionName = 'setPlatformFees';

  constructor(base: CollectionContract) {
    super(base, SetPlatformFeesInterfaces, SetPlatformFeesPartitions, SetPlatformFeesFunctions);
  }

  execute(...args: SetPlatformFeesCallArgs): Promise<SetPlatformFeesResponse> {
    return this.setPlatformFees(...args);
  }

  async setPlatformFees(
    signer: Signerish,
    recipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const tx = await v1.connectWith(signer).setPlatformFeeInfo(wallet, basisPoints, overrides);
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
    const wallet = await asAddress(recipient);

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setPlatformFeeInfo(wallet, basisPoints, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    recipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setPlatformFeeInfo(wallet, basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setPlatformFees = asCallableClass(SetPlatformFees);
