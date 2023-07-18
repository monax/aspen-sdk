import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const ApproveFunctions = {
  nft: 'approve(address,uint256)[]',
} as const;

const ApprovePartitions = {
  nft: [...FeatureFunctionsMap[ApproveFunctions.nft].drop],
};
type ApprovePartitions = typeof ApprovePartitions;

const ApproveInterfaces = Object.values(ApprovePartitions).flat();
type ApproveInterfaces = (typeof ApproveInterfaces)[number];

export type ApproveCallArgs = [signer: Signerish, args: ApproveArgs, overrides?: WriteOverrides];
export type ApproveResponse = ContractTransaction;

export type ApproveArgs = {
  toAddress: Addressish;
  tokenId: BigNumberish;
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
    signer: Signerish,
    { toAddress, tokenId }: ApproveArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectWith(signer).approve(to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, { toAddress, tokenId }: ApproveArgs, overrides: WriteOverrides = {}) {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectWith(signer).estimateGas.approve(to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction({ toAddress, tokenId }: ApproveArgs, overrides: WriteOverrides = {}) {
    const nft = this.partition('nft');
    const to = await asAddress(toAddress);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const tx = await nft.connectReadOnly().populateTransaction.approve(to, tokenId, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const approve = asCallableClass(Approve);
