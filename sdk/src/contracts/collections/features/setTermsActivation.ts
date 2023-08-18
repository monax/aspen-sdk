import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type SetTermsActivationCallArgs = [walletClient: Signer, termsEnabled: boolean, params?: WriteParameters];
export type SetTermsActivationResponse = TransactionHash;

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

  execute(...args: SetTermsActivationCallArgs): Promise<SetTermsActivationResponse> {
    return this.setTermsActivation(...args);
  }

  async setTermsActivation(
    walletClient: Signer,
    termsEnabled: boolean,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setTermsActivation([termsEnabled], params);
        const tx = await walletClient.sendTransaction(request);
        return tx as TransactionHash;
      } else if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.setTermsStatus([termsEnabled], params);
        const tx = await walletClient.sendTransaction(request);
        return tx as TransactionHash;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(walletClient: Signer, termsEnabled: boolean, params?: WriteParameters): Promise<bigint> {
    const { v1, v2 } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v2) {
        const estimate = await this.reader(this.abi(v2)).estimateGas.setTermsActivation([termsEnabled], fullParams);
        return estimate;
      } else if (v1) {
        const estimate = await this.reader(this.abi(v1)).estimateGas.setTermsStatus([termsEnabled], fullParams);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(termsEnabled: boolean, params?: WriteParameters): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setTermsActivation([termsEnabled], params);
        return encodeFunctionData(request);
      } else if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.setTermsStatus([termsEnabled], params);
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setTermsActivation = asCallableClass(SetTermsActivation);
