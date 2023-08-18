import { Address, Addressish, asAddress, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { Signer, WriteParameters, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
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
  walletClient: Signer,
  args: BatchIssueWithTokenUriArgs,
  params?: WriteParameters,
];
export type BatchIssueWithTokenUriResponse = TransactionHash;

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
    walletClient: Signer,
    args: BatchIssueWithTokenUriArgs,
    params?: WriteParameters,
  ): Promise<BatchIssueWithTokenUriResponse> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithTokenURI(
        [wallets as `0x${string}`[], args.tokenURIs],
        params,
      );
      const tx = await walletClient.writeContract(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(walletClient: Signer, args: BatchIssueWithTokenUriArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.batchIssueWithTokenURI(
        [wallets as `0x${string}`[], args.tokenURIs],
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

  async populateTransaction(args: BatchIssueWithTokenUriArgs, params?: WriteParameters): Promise<string> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithTokenURI(
        [wallets as `0x${string}`[], args.tokenURIs],
        params,
      );
      return encodeFunctionData(request);
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
