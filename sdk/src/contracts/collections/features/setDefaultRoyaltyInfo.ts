import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetDefaultRoyaltyInfoFunctions = {
  v1: 'setDefaultRoyaltyInfo(address,uint256)[]',
} as const;

const SetDefaultRoyaltyInfoPartitions = {
  v1: [...FeatureFunctionsMap['setDefaultRoyaltyInfo(address,uint256)[]'].drop],
};
type SetDefaultRoyaltyInfoPartitions = typeof SetDefaultRoyaltyInfoPartitions;

const SetDefaultRoyaltyInfoInterfaces = Object.values(SetDefaultRoyaltyInfoPartitions).flat();
type SetDefaultRoyaltyInfoInterfaces = (typeof SetDefaultRoyaltyInfoInterfaces)[number];

export type SetDefaultRoyaltyInfoCallArgs = [
  signer: Signerish,
  royaltyRecipient: Address,
  basisPoints: BigNumber,
  overrides?: WriteOverrides,
];
export type SetDefaultRoyaltyInfoResponse = ContractTransaction;

export class SetDefaultRoyaltyInfo extends ContractFunction<
  SetDefaultRoyaltyInfoInterfaces,
  SetDefaultRoyaltyInfoPartitions,
  SetDefaultRoyaltyInfoCallArgs,
  SetDefaultRoyaltyInfoResponse
> {
  readonly functionName = 'setDefaultRoyaltyInfo';

  constructor(base: CollectionContract) {
    super(base, SetDefaultRoyaltyInfoInterfaces, SetDefaultRoyaltyInfoPartitions, SetDefaultRoyaltyInfoFunctions);
  }

  call(...args: SetDefaultRoyaltyInfoCallArgs): Promise<SetDefaultRoyaltyInfoResponse> {
    return this.setDefaultRoyaltyInfo(...args);
  }

  async setDefaultRoyaltyInfo(
    signer: Signerish,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setDefaultRoyaltyInfo(royaltyRecipient, basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimator = v1.connectWith(signer).estimateGas;
      const estimate = await estimator.setDefaultRoyaltyInfo(royaltyRecipient, basisPoints, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
