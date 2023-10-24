import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const ApproveFunctions = {
  nft: 'approve(address,uint256)[]',
} as const;

const ApprovePartitions = {
  nft: [...FeatureFunctionsMap[ApproveFunctions.nft].drop],
};
type ApprovePartitions = typeof ApprovePartitions;

const ApproveInterfaces = Object.values(ApprovePartitions).flat();
type ApproveInterfaces = (typeof ApproveInterfaces)[number];

export type ApproveCallArgs = [walletClient: Signer, args: ApproveArgs, params?: WriteParameters];
export type ApproveResponse = GetTransactionReceiptReturnType;

export type ApproveArgs = {
  toAddress: Addressish;
  tokenId: bigint;
};

export class Approve extends ContractFunction<ApproveInterfaces, ApprovePartitions, ApproveCallArgs, ApproveResponse> {
  readonly functionName = 'approve';

  constructor(base: CollectionContract) {
    super(base, ApproveInterfaces, ApprovePartitions, ApproveFunctions);
  }

  execute(...args: ApproveCallArgs): Promise<ApproveResponse> {
    return this.approve(...args);
  }

  async approve(
    walletClient: Signer,
    { toAddress, tokenId }: ApproveArgs,
    params?: WriteParameters,
  ): Promise<ApproveResponse> {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.approve([to as Hex, tokenId], fullParams);
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(walletClient: Signer, { toAddress, tokenId }: ApproveArgs, params?: WriteParameters) {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.approve([to as Hex, tokenId], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction({ toAddress, tokenId }: ApproveArgs, params?: WriteParameters) {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.approve([to as Hex, tokenId], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const approve = asCallableClass(Approve);
