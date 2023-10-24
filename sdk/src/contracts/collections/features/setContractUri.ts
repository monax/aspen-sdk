import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetContractUriFunctions = {
  v1: 'setContractURI(string)[]',
} as const;

const SetContractUriPartitions = {
  v1: [...FeatureFunctionsMap[SetContractUriFunctions.v1].drop],
};
type SetContractUriPartitions = typeof SetContractUriPartitions;

const SetContractUriInterfaces = Object.values(SetContractUriPartitions).flat();
type SetContractUriInterfaces = (typeof SetContractUriInterfaces)[number];

export type SetContractUriCallArgs = [walletClient: Signer, uri: string, params?: WriteParameters];
export type SetContractUriResponse = GetTransactionReceiptReturnType;

export class SetContractUri extends ContractFunction<
  SetContractUriInterfaces,
  SetContractUriPartitions,
  SetContractUriCallArgs,
  SetContractUriResponse
> {
  readonly functionName = 'setContractUri';

  constructor(base: CollectionContract) {
    super(base, SetContractUriInterfaces, SetContractUriPartitions, SetContractUriFunctions);
  }

  execute(...args: SetContractUriCallArgs): Promise<SetContractUriResponse> {
    return this.setContractUri(...args);
  }

  async setContractUri(walletClient: Signer, uri: string, params?: WriteParameters): Promise<SetContractUriResponse> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setContractURI([uri], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }

  async estimateGas(walletClient: Signer, uri: string, params?: WriteParameters): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setContractURI([uri], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }

  async populateTransaction(uri: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setContractURI([uri], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }
}

export const setContractUri = asCallableClass(SetContractUri);
