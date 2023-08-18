import { asAddress, isZeroAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, Hex, TransactionReceipt } from 'viem';
import { IssuedToken, IssueWithTokenUriArgs } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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
  walletClient: Signer,
  args: IssueWithTokenUriArgs,
  overrides?: WriteParameters,
];
export type IssueWithinPhaseWithTokenUriResponse = TransactionHash;

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
    walletClient: Signer,
    args: IssueWithTokenUriArgs,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithinPhaseWithTokenURI(
        [wallet as Hex, args.tokenURI],
        params,
      );
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(walletClient: Signer, args: IssueWithTokenUriArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.issueWithinPhaseWithTokenURI(
        [wallet as Hex, args.tokenURI],
        {
          account: walletClient.account,
          ...params,
        },
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async populateTransaction(args: IssueWithTokenUriArgs, params?: WriteParameters): Promise<string> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallet = await asAddress(args.receiver);

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.issueWithinPhaseWithTokenURI(
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
    return this.base.issueWithinPhase.parseReceiptLogs(receipt);
  }
}

export const issueWithinPhaseWithTokenUri = asCallableClass(IssueWithinPhaseWithTokenUri);
