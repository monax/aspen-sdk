import { Address, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { BatchIssueWithTokenUriArgs, Signer, WriteParameters, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
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
  walletClient: Signer,
  args: BatchIssueWithTokenUriArgs,
  params?: WriteParameters,
];
export type BatchIssueWithinPhaseWithTokenUriResponse = GetTransactionReceiptReturnType;

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
    walletClient: Signer,
    args: BatchIssueWithTokenUriArgs,
    params?: WriteParameters,
  ): Promise<BatchIssueWithinPhaseWithTokenUriResponse> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithinPhaseWithTokenURI(
        [wallets as Hex[], args.tokenURIs],
        params,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, args);
    }
  }

  async estimateGas(walletClient: Signer, args: BatchIssueWithTokenUriArgs, params?: WriteParameters): Promise<bigint> {
    this.validateArgs(args);
    const nft = this.partition('nft');
    const wallets = await Promise.all(args.receivers.map((receiver) => asAddress(receiver)));

    try {
      const estimate = await this.reader(this.abi(nft)).estimateGas.batchIssueWithinPhaseWithTokenURI(
        [wallets as Hex[], args.tokenURIs],
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
      const { request } = await this.reader(this.abi(nft)).simulate.batchIssueWithinPhaseWithTokenURI(
        [wallets as Hex[], args.tokenURIs],
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

export const batchIssueWithinPhaseWithTokenUri = asCallableClass(BatchIssueWithinPhaseWithTokenUri);
