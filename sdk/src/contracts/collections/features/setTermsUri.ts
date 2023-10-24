import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTermsUriFunctions = {
  v1: 'setTermsURI(string)[]',
} as const;

const SetTermsUriPartitions = {
  v1: [...FeatureFunctionsMap[SetTermsUriFunctions.v1].drop],
};
type SetTermsUriPartitions = typeof SetTermsUriPartitions;

const SetTermsUriInterfaces = Object.values(SetTermsUriPartitions).flat();
type SetTermsUriInterfaces = (typeof SetTermsUriInterfaces)[number];

export type SetTermsUriCallArgs = [walletClient: Signer, termsUri: string, params?: WriteParameters];
export type SetTermsUriResponse = GetTransactionReceiptReturnType;

export class SetTermsUri extends ContractFunction<
  SetTermsUriInterfaces,
  SetTermsUriPartitions,
  SetTermsUriCallArgs,
  SetTermsUriResponse
> {
  readonly functionName = 'setTermsUri';

  constructor(base: CollectionContract) {
    super(base, SetTermsUriInterfaces, SetTermsUriPartitions, SetTermsUriFunctions);
  }

  execute(...args: SetTermsUriCallArgs): Promise<SetTermsUriResponse> {
    return this.setTermsUri(...args);
  }

  async setTermsUri(walletClient: Signer, termsUri: string, params?: WriteParameters): Promise<SetTermsUriResponse> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTermsURI([termsUri], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, termsUri: string, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setTermsURI([termsUri], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(termsUri: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTermsURI([termsUri], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTermsUri = asCallableClass(SetTermsUri);
