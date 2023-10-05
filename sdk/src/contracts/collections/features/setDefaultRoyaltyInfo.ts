import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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
  walletClient: Signer,
  royaltyRecipient: Addressish,
  basisPoints: bigint,
  params?: WriteParameters,
];
export type SetDefaultRoyaltyInfoResponse = GetTransactionReceiptReturnType;

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

  execute(...args: SetDefaultRoyaltyInfoCallArgs): Promise<SetDefaultRoyaltyInfoResponse> {
    return this.setDefaultRoyaltyInfo(...args);
  }

  async setDefaultRoyaltyInfo(
    walletClient: Signer,
    royaltyRecipient: Addressish,
    basisPoints: bigint,
    params?: WriteParameters,
  ): Promise<SetDefaultRoyaltyInfoResponse> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setDefaultRoyaltyInfo(
        [wallet as Hex, basisPoints],
        params,
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
    royaltyRecipient: Addressish,
    basisPoints: bigint,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setDefaultRoyaltyInfo(
        [wallet as Hex, basisPoints],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    royaltyRecipient: Addressish,
    basisPoints: bigint,
    params?: WriteParameters,
  ): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setDefaultRoyaltyInfo(
        [wallet as Hex, basisPoints],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setDefaultRoyaltyInfo = asCallableClass(SetDefaultRoyaltyInfo);
