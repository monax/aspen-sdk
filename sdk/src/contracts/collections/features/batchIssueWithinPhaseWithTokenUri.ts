import { Address, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { BatchIssueWithTokenUriArgs, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const BatchIssueWithinPhaseWithTokenUriFunctions = {
  nft: 'batchIssueWithinPhaseWithTokenURI(address[],string[])[]',
} as const;

const BatchIssueWithinPhaseWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap[BatchIssueWithinPhaseWithTokenUriFunctions.nft].drop],
};
type BatchIssueWithinPhaseWithTokenUriPartitions = typeof BatchIssueWithinPhaseWithTokenUriPartitions;

const BatchIssueWithinPhaseWithTokenUriInterfaces = Object.values(BatchIssueWithinPhaseWithTokenUriPartitions).flat();
type BatchIssueWithinPhaseWithTokenUriInterfaces = (typeof BatchIssueWithinPhaseWithTokenUriInterfaces)[number];

export type BatchIssueWithinPhaseWithTokenUriCallArgs = [
  signer: Signerish,
  args: BatchIssueWithTokenUriArgs,
  overrides?: WriteOverrides,
];
export type BatchIssueWithinPhaseWithTokenUriResponse = ContractTransaction;

export class BatchIssueWithinPhaseWithTokenUri extends ContractFunction<
  BatchIssueWithinPhaseWithTokenUriInterfaces,
  BatchIssueWithinPhaseWithTokenUriPartitions,
  BatchIssueWithinPhaseWithTokenUriCallArgs,
  BatchIssueWithinPhaseWithTokenUriResponse
> {
  readonly functionName = 'batchIssueWithinPhaseWithTokenUri';

  constructor(base: CollectionContract) {
    super(
      base,
      BatchIssueWithinPhaseWithTokenUriInterfaces,
      BatchIssueWithinPhaseWithTokenUriPartitions,
      BatchIssueWithinPhaseWithTokenUriFunctions,
    );
  }

  execute(...args: BatchIssueWithinPhaseWithTokenUriCallArgs): Promise<BatchIssueWithinPhaseWithTokenUriResponse> {
    return this.batchIssueWithinPhaseWithTokenUri(...args);
  }

  async batchIssueWithinPhaseWithTokenUri(
    signer: Signerish,
    args: BatchIssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const tx = await nft.connectWith(signer).batchIssueWithinPhaseWithTokenURI(wallets, args.tokenURIs, overrides);
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
        .estimateGas.batchIssueWithinPhaseWithTokenURI(wallets, args.tokenURIs, overrides);
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
        .populateTransaction.batchIssueWithinPhaseWithTokenURI(wallets, args.tokenURIs, overrides);
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

export const batchIssueWithinPhaseWithTokenUri = asCallableClass(BatchIssueWithinPhaseWithTokenUri);
