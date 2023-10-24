import { Addressish, asAddress, isZeroAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, TransactionReceipt, encodeFunctionData } from 'viem';
import { IssuedToken } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const IssueWithTokenUriFunctions = {
  nft: 'issueWithTokenURI(address,string)[]',
} as const;

const IssueWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap[IssueWithTokenUriFunctions.nft].drop],
};
type IssueWithTokenUriPartitions = typeof IssueWithTokenUriPartitions;

const IssueWithTokenUriInterfaces = Object.values(IssueWithTokenUriPartitions).flat();
type IssueWithTokenUriInterfaces = (typeof IssueWithTokenUriInterfaces)[number];

export type IssueWithTokenUriCallArgs = [
  walletClient: Signer,
  args: IssueWithTokenUriArgs,
  overrides?: WriteParameters,
];
export type IssueWithTokenUriResponse = GetTransactionReceiptReturnType;

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
    walletClient: Signer,
    args: IssueWithTokenUriArgs,
    params?: WriteParameters,
  ): Promise<IssueWithTokenUriResponse> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithTokenURI(
        [wallet as Hex, args.tokenURI],
        fullParams,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(walletClient: Signer, args: IssueWithTokenUriArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.issueWithTokenURI(
        [wallet as Hex, args.tokenURI],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(args: IssueWithTokenUriArgs, params: WriteParameters): Promise<string> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithTokenURI(
        [wallet as Hex, args.tokenURI],
        params,
      );
      return encodeFunctionData(request);
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

  async parseReceiptLogs(receipt: TransactionReceipt): Promise<IssuedToken[]> {
    return this.base.issue.parseReceiptLogs(receipt);
  }
}

export const issueWithTokenUri = asCallableClass(IssueWithTokenUri);
