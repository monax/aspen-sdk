import { Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetPlatformFeesFunctions = {
  v1: 'setPlatformFeeInfo(address,uint256)[]',
  v2: 'setPlatformFees(address,uint16)[]',
} as const;

const SetPlatformFeesPartitions = {
  v1: [...FeatureFunctionsMap[SetPlatformFeesFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[SetPlatformFeesFunctions.v2].drop],
};
type SetPlatformFeesPartitions = typeof SetPlatformFeesPartitions;

const SetPlatformFeesInterfaces = Object.values(SetPlatformFeesPartitions).flat();
type SetPlatformFeesInterfaces = (typeof SetPlatformFeesInterfaces)[number];

export type SetPlatformFeesCallArgs = [
  walletClient: Signer,
  recipient: Addressish,
  basisPoints: bigint | number,
  params?: WriteParameters,
];
export type SetPlatformFeesResponse = TransactionHash;

export class SetPlatformFees extends ContractFunction<
  SetPlatformFeesInterfaces,
  SetPlatformFeesPartitions,
  SetPlatformFeesCallArgs,
  SetPlatformFeesResponse
> {
  readonly functionName = 'setPlatformFees';

  constructor(base: CollectionContract) {
    super(base, SetPlatformFeesInterfaces, SetPlatformFeesPartitions, SetPlatformFeesFunctions);
  }

  execute(...args: SetPlatformFeesCallArgs): Promise<SetPlatformFeesResponse> {
    return this.setPlatformFees(...args);
  }

  async setPlatformFees(
    walletClient: Signer,
    recipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPlatformFeeInfo(
        [wallet as Hex, BigInt(basisPoints)],
        params,
      );
      const tx = await walletClient.sendTransaction(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    recipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setPlatformFeeInfo(
        [wallet as Hex, BigInt(basisPoints)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    recipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(recipient);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPlatformFeeInfo(
        [wallet as Hex, BigInt(basisPoints)],
        params,
      );

      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setPlatformFees = asCallableClass(SetPlatformFees);
