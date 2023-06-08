import { Address, Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const BatchIssueWithTokenUriFunctions = {
  nft: 'batchIssueWithTokenURI(address[],string[])[]',
} as const;

const BatchIssueWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap[BatchIssueWithTokenUriFunctions.nft].drop],
};
type BatchIssueWithTokenUriPartitions = typeof BatchIssueWithTokenUriPartitions;

const BatchIssueWithTokenUriInterfaces = Object.values(BatchIssueWithTokenUriPartitions).flat();
type BatchIssueWithTokenUriInterfaces = (typeof BatchIssueWithTokenUriInterfaces)[number];

export type BatchIssueWithTokenUriCallArgs = [
  signer: Signerish,
  args: BatchIssueWithTokenUriArgs,
  overrides?: WriteOverrides,
];
export type BatchIssueWithTokenUriResponse = ContractTransaction;

export type BatchIssueWithTokenUriArgs = {
  receivers: Addressish[];
  tokenURIs: string[];
};

export class BatchIssueWithTokenUri extends ContractFunction<
  BatchIssueWithTokenUriInterfaces,
  BatchIssueWithTokenUriPartitions,
  BatchIssueWithTokenUriCallArgs,
  BatchIssueWithTokenUriResponse
> {
  readonly functionName = 'batchIssueWithTokenUri';

  constructor(base: CollectionContract) {
    super(base, BatchIssueWithTokenUriInterfaces, BatchIssueWithTokenUriPartitions, BatchIssueWithTokenUriFunctions);
  }

  execute(...args: BatchIssueWithTokenUriCallArgs): Promise<BatchIssueWithTokenUriResponse> {
    return this.batchIssueWithTokenUri(...args);
  }

  async batchIssueWithTokenUri(
    signer: Signerish,
    args: BatchIssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft.connectWith(signer).batchIssueWithTokenURI(wallets, args.tokenURIs, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(
    signer: Signerish,
    args: BatchIssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await nft
        .connectWith(signer)
        .estimateGas.batchIssueWithTokenURI(wallets, args.tokenURIs, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(
    args: BatchIssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft
        .connectReadOnly()
        .populateTransaction.batchIssueWithTokenURI(wallets, args.tokenURIs, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async validateArgs({ receivers }: BatchIssueWithTokenUriArgs) {
    const wallets = await Promise.all(receivers.map((receiver) => asAddress(receiver)));
    if (wallets.includes(ZERO_ADDRESS as Address)) {
      throw new SdkError(
        SdkErrorCode.INVALID_DATA,
        { receivers },
        new Error('Receivers cannot include an empty address'),
      );
    }
  }
}

export const batchIssueWithTokenUri = asCallableClass(BatchIssueWithTokenUri);
