import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetTermsActivationPartitions = {
  v1: [...FeatureFunctionsMap['setTermsStatus(bool)[]'].drop],
  v2: [...FeatureFunctionsMap['setTermsActivation(bool)[]'].drop],
};
type SetTermsActivationPartitions = typeof SetTermsActivationPartitions;

const SetTermsActivationInterfaces = Object.values(SetTermsActivationPartitions).flat();
type SetTermsActivationInterfaces = (typeof SetTermsActivationInterfaces)[number];

export type SetTermsActivationCallArgs = [signer: Signerish, termsEnabled: boolean, overrides?: SourcedOverrides];
export type SetTermsActivationResponse = ContractTransaction;

export class SetTermsActivation extends ContractFunction<
  SetTermsActivationInterfaces,
  SetTermsActivationPartitions,
  SetTermsActivationCallArgs,
  SetTermsActivationResponse
> {
  readonly functionName = 'setTermsActivation';

  constructor(base: CollectionContract) {
    super(base, SetTermsActivationInterfaces, SetTermsActivationPartitions);
  }

  call(...args: SetTermsActivationCallArgs): Promise<SetTermsActivationResponse> {
    return this.setTermsActivation(...args);
  }

  async setTermsActivation(
    signer: Signerish,
    termsEnabled: boolean,
    overrides?: SourcedOverrides,
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

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }

  async estimateGas(signer: Signerish, termsEnabled: boolean, overrides?: SourcedOverrides): Promise<BigNumber> {
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

    throw new SdkError(SdkErrorCode.FUNCTION_NOT_SUPPORTED, { function: this.functionName });
  }
}
