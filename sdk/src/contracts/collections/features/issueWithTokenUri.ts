import { Addressish, asAddress, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractReceipt, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';
import { IssuedToken } from './issue';

const IssueWithTokenUriFunctions = {
  nft: 'issueWithTokenURI(address,string)[]',
} as const;

const IssueWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap[IssueWithTokenUriFunctions.nft].drop],
};
type IssueWithTokenUriPartitions = typeof IssueWithTokenUriPartitions;

const IssueWithTokenUriInterfaces = Object.values(IssueWithTokenUriPartitions).flat();
type IssueWithTokenUriInterfaces = (typeof IssueWithTokenUriInterfaces)[number];

export type IssueWithTokenUriCallArgs = [signer: Signerish, args: IssueWithTokenUriArgs, overrides?: WriteOverrides];
export type IssueWithTokenUriResponse = ContractTransaction;

export type IssueWithTokenUriArgs = {
  receiver: Addressish;
  tokenURI: string;
};

export class IssueWithTokenUri extends ContractFunction<
  IssueWithTokenUriInterfaces,
  IssueWithTokenUriPartitions,
  IssueWithTokenUriCallArgs,
  IssueWithTokenUriResponse
> {
  readonly functionName = 'issueWithTokenUri';

  constructor(base: CollectionContract) {
    super(base, IssueWithTokenUriInterfaces, IssueWithTokenUriPartitions, IssueWithTokenUriFunctions);
  }

  execute(...args: IssueWithTokenUriCallArgs): Promise<IssueWithTokenUriResponse> {
    return this.issueWithTokenUri(...args);
  }

  async issueWithTokenUri(
    signer: Signerish,
    args: IssueWithTokenUriArgs,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const tx = await nft.connectWith(signer).issueWithTokenURI(wallet, args.tokenURI, overrides);
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
      const estimate = await nft.connectWith(signer).estimateGas.issueWithTokenURI(wallet, args.tokenURI, overrides);
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
      const tx = await nft.connectReadOnly().populateTransaction.issueWithTokenURI(wallet, args.tokenURI, overrides);
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
    return this.base.issue.parseReceiptLogs(receipt);
  }
}

export const issueWithTokenUri = asCallableClass(IssueWithTokenUri);
