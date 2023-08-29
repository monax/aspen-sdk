import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTermsRequiredFunctions = {
  v1: 'setTermsRequired(bool)[]',
} as const;

const SetTermsRequiredPartitions = {
  v1: [...FeatureFunctionsMap[SetTermsRequiredFunctions.v1].drop],
};
type SetTermsRequiredPartitions = typeof SetTermsRequiredPartitions;

const SetTermsRequiredInterfaces = Object.values(SetTermsRequiredPartitions).flat();
type SetTermsRequiredInterfaces = (typeof SetTermsRequiredInterfaces)[number];

export type SetTermsRequiredCallArgs = [walletClient: Signer, termsRequired: boolean, params?: WriteParameters];
export type SetTermsRequiredResponse = GetTransactionReceiptReturnType;

export class SetTermsRequired extends ContractFunction<
  SetTermsRequiredInterfaces,
  SetTermsRequiredPartitions,
  SetTermsRequiredCallArgs,
  SetTermsRequiredResponse
> {
  readonly functionName = 'setTermsRequired';

  constructor(base: CollectionContract) {
    super(base, SetTermsRequiredInterfaces, SetTermsRequiredPartitions, SetTermsRequiredFunctions);
  }

  execute(...args: SetTermsRequiredCallArgs): Promise<SetTermsRequiredResponse> {
    return this.setTermsRequired(...args);
  }

  async setTermsRequired(
    walletClient: Signer,
    termsRequired: boolean,
    params?: WriteParameters,
  ): Promise<SetTermsRequiredResponse> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTermsRequired([termsRequired], params);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, termsRequired: boolean, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setTermsRequired([termsRequired], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(termsRequired: boolean, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTermsRequired([termsRequired], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTermsRequired = asCallableClass(SetTermsRequired);
