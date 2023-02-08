import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetTermsUriPartitions = {
  v1: [...FeatureFunctionsMap['setTermsURI(string)[]'].drop],
};
type SetTermsUriPartitions = typeof SetTermsUriPartitions;

const SetTermsUriInterfaces = Object.values(SetTermsUriPartitions).flat();
type SetTermsUriInterfaces = (typeof SetTermsUriInterfaces)[number];

export type SetTermsUriCallArgs = [signer: Signerish, termsUri: string, overrides?: SourcedOverrides];
export type SetTermsUriResponse = ContractTransaction;

export class SetTermsUri extends ContractFunction<
  SetTermsUriInterfaces,
  SetTermsUriPartitions,
  SetTermsUriCallArgs,
  SetTermsUriResponse
> {
  readonly functionName = 'setTermsUri';

  constructor(base: CollectionContract) {
    super(base, SetTermsUriInterfaces, SetTermsUriPartitions);
  }

  call(...args: SetTermsUriCallArgs): Promise<SetTermsUriResponse> {
    return this.setTermsUri(...args);
  }

  async setTermsUri(signer: Signerish, termsUri: string, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setTermsURI(termsUri, overrides);
      return tx;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }

  async estimateGas(signer: Signerish, termsUri: string, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setTermsURI(termsUri, overrides);
      return estimate;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }
  }
}
