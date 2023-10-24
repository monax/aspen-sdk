import { encodeFunctionData, GetTransactionReceiptReturnType } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const UpdateBaseUriFunctions = {
  v1: 'updateBaseURI(uint256,string)[]',
} as const;

const UpdateBaseUriPartitions = {
  v1: [...FeatureFunctionsMap[UpdateBaseUriFunctions.v1].drop],
};
type UpdateBaseUriPartitions = typeof UpdateBaseUriPartitions;

const UpdateBaseUriInterfaces = Object.values(UpdateBaseUriPartitions).flat();
type UpdateBaseUriInterfaces = (typeof UpdateBaseUriInterfaces)[number];

export type UpdateBaseUriCallArgs = [
  walletClient: Signer,
  baseURIIndex: bigint | number,
  baseURI: string,
  params?: WriteParameters,
];
export type UpdateBaseUriResponse = GetTransactionReceiptReturnType;

export class UpdateBaseUri extends ContractFunction<
  UpdateBaseUriInterfaces,
  UpdateBaseUriPartitions,
  UpdateBaseUriCallArgs,
  UpdateBaseUriResponse
> {
  readonly functionName = 'updateBaseUri';

  constructor(base: CollectionContract) {
    super(base, UpdateBaseUriInterfaces, UpdateBaseUriPartitions, UpdateBaseUriFunctions);
  }

  execute(...args: UpdateBaseUriCallArgs): Promise<UpdateBaseUriResponse> {
    return this.updateBaseUri(...args);
  }

  async updateBaseUri(
    walletClient: Signer,
    baseURIIndex: bigint | number,
    baseURI: string,
    params?: WriteParameters,
  ): Promise<UpdateBaseUriResponse> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.updateBaseURI(
        [BigInt(baseURIIndex), baseURI],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    baseURIIndex: bigint | number,
    baseURI: string,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.updateBaseURI(
        [BigInt(baseURIIndex), baseURI],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(baseURIIndex: bigint | number, baseURI: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.updateBaseURI(
        [BigInt(baseURIIndex), baseURI],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const updateBaseUri = asCallableClass(UpdateBaseUri);
