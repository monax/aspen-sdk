import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetTermsActivationFunctions = {
  v1: 'setTermsStatus(bool)[]',
  v2: 'setTermsActivation(bool)[]',
} as const;

const SetTermsActivationPartitions = {
  v1: [...FeatureFunctionsMap[SetTermsActivationFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[SetTermsActivationFunctions.v2].drop],
};
type SetTermsActivationPartitions = typeof SetTermsActivationPartitions;

const SetTermsActivationInterfaces = Object.values(SetTermsActivationPartitions).flat();
type SetTermsActivationInterfaces = (typeof SetTermsActivationInterfaces)[number];

export type SetTermsActivationCallArgs = [signer: Signerish, termsEnabled: boolean, overrides?: WriteOverrides];
export type SetTermsActivationResponse = ContractTransaction;

export class SetTermsActivation extends ContractFunction<
  SetTermsActivationInterfaces,
  SetTermsActivationPartitions,
  SetTermsActivationCallArgs,
  SetTermsActivationResponse
> {
  readonly functionName = 'setTermsActivation';

  constructor(base: CollectionContract) {
    super(base, SetTermsActivationInterfaces, SetTermsActivationPartitions, SetTermsActivationFunctions);
  }

  call(...args: SetTermsActivationCallArgs): Promise<SetTermsActivationResponse> {
    return this.setTermsActivation(...args);
  }

  async setTermsActivation(
    signer: Signerish,
    termsEnabled: boolean,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const tx = await v2.connectWith(signer).setTermsActivation(termsEnabled, overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer).setTermsStatus(termsEnabled, overrides);
        return tx;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(signer: Signerish, termsEnabled: boolean, overrides: WriteOverrides = {}): Promise<BigNumber> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const estimate = await v2.connectWith(signer).estimateGas.setTermsActivation(termsEnabled, overrides);
        return estimate;
      } else if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas.setTermsStatus(termsEnabled, overrides);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}
