import { asAddress, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractReceipt, ContractTransaction, PopulatedTransaction } from 'ethers';
import { IssueWithTokenUriArgs } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';
import { IssuedToken } from './issue';

const IssueWithinPhaseWithTokenUriFunctions = {
  nft: 'issueWithinPhaseWithTokenURI(address,string)[]',
} as const;

const IssueWithinPhaseWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap[IssueWithinPhaseWithTokenUriFunctions.nft].drop],
};
type IssueWithinPhaseWithTokenUriPartitions = typeof IssueWithinPhaseWithTokenUriPartitions;

const IssueWithinPhaseWithTokenUriInterfaces = Object.values(IssueWithinPhaseWithTokenUriPartitions).flat();
type IssueWithinPhaseWithTokenUriInterfaces = (typeof IssueWithinPhaseWithTokenUriInterfaces)[number];

export type IssueWithinPhaseWithTokenUriCallArgs = [
  signer: Signerish,
  args: IssueWithTokenUriArgs,
  overrides?: WriteOverrides,
];
export type IssueWithinPhaseWithTokenUriResponse = ContractTransaction;

export class IssueWithinPhaseWithTokenUri extends ContractFunction<
  IssueWithinPhaseWithTokenUriInterfaces,
  IssueWithinPhaseWithTokenUriPartitions,
  IssueWithinPhaseWithTokenUriCallArgs,
  IssueWithinPhaseWithTokenUriResponse
> {
  readonly functionName = 'issueWithinPhaseWithTokenUri';

  constructor(base: CollectionContract) {
    super(
      base,
      IssueWithinPhaseWithTokenUriInterfaces,
      IssueWithinPhaseWithTokenUriPartitions,
      IssueWithinPhaseWithTokenUriFunctions,
    );
  }

  execute(...args: IssueWithinPhaseWithTokenUriCallArgs): Promise<IssueWithinPhaseWithTokenUriResponse> {
    return this.issueWithinPhaseWithTokenUri(...args);
  }

  async issueWithinPhaseWithTokenUri(
    signer: Signerish,
    args: IssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const tx = await nft.connectWith(signer).issueWithinPhaseWithTokenURI(wallet, args.tokenURI, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(
    signer: Signerish,
    args: IssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const estimate = await nft
        .connectWith(signer)
        .estimateGas.issueWithinPhaseWithTokenURI(wallet, args.tokenURI, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(
    args: IssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const tx = await nft
        .connectReadOnly()
        .populateTransaction.issueWithinPhaseWithTokenURI(wallet, args.tokenURI, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  protected async validateArgs({ receiver }: IssueWithTokenUriArgs) {
    const wallet = await asAddress(receiver);
    if (isZeroAddress(wallet)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, { receiver }, new Error('Receiver cannot be an empty address'));
    }
  }

  async parseReceiptLogs(receipt: ContractReceipt): Promise<IssuedToken[]> {
    return this.base.issueWithinPhase.parseReceiptLogs(receipt);
  }
}

export const issueWithinPhaseWithTokenUri = asCallableClass(IssueWithinPhaseWithTokenUri);
