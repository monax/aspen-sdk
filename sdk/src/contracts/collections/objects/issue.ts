import { Address, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, TransactionReceipt } from 'viem';
import { BigIntish, CollectionContract, OperationStatus, Provider, Signer, TokenId, WriteParameters } from '..';
import { SdkError, SdkErrorCode } from '../errors';
import { IssuedToken } from '../features';
import { ContractObject } from './object';

export type IssueState =
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; receipt: TransactionReceipt }
  | { status: 'transaction-failed'; receipt: TransactionReceipt; error: SdkError }
  | { status: 'success'; tx: TransactionHash; receipt: TransactionReceipt; tokens: IssuedToken[] };

export type IssueSuccessState = Extract<IssueState, { status: 'success' }>;

export class PendingIssue extends ContractObject {
  public constructor(
    protected readonly base: CollectionContract,
    readonly tokenId: TokenId,
    readonly tokenURI?: string,
  ) {
    super(base);

    this.tokenId = this.base.tokenStandard === 'ERC1155' ? this.base.requireTokenId(tokenId) : tokenId;
  }

  async processAsync(
    walletClient: Signer,
    publicClient: Provider,
    receiver: Address,
    quantity: BigIntish,
    params?: WriteParameters,
  ): Promise<IssueSuccessState> {
    return new Promise((resolve, reject) => {
      this.processCallback(
        walletClient,
        publicClient,
        receiver,
        quantity,
        (state) => {
          switch (state.status) {
            case 'success':
              resolve(state);
              return;

            case 'cancelled-transaction':
            case 'transaction-failed':
              reject(state);
              return;

            case 'pending-transaction':
            case 'signing-transaction':
              // throw away intermediate steps
              return;
          }

          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error(`Unknown issue status`));
        },
        params,
      );
    });
  }

  async processCallback(
    walletClient: Signer,
    publicClient: Provider,
    receiver: Address,
    quantity: BigIntish,
    onStateChange: (state: IssueState) => void,
    params?: WriteParameters,
  ) {
    const { success, result: receipt, error } = await this.execute(walletClient, receiver, quantity, params);
    if (!success) {
      onStateChange({ status: 'cancelled-transaction', error });
      return;
    }

    onStateChange({ status: 'pending-transaction', receipt });

    try {
      const tokens = await this.base.issue.parseReceiptLogs(receipt);
      onStateChange({ status: 'success', tx: receipt.transactionHash as TransactionHash, receipt, tokens });
    } catch (err) {
      const error = SdkError.from(err, SdkErrorCode.UNKNOWN_ERROR, { receiver, quantity });
      onStateChange({ status: 'transaction-failed', receipt, error });
      return;
    }
  }

  async execute(
    walletClient: Signer,
    receiver: Address,
    quantity: BigIntish,
    params?: WriteParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      const args = { receiver, quantity, tokenId: this.tokenId };
      return await this.base.issue(walletClient, args, params);
    });
  }

  async estimateGas(
    walletClient: Signer,
    receiver: Address,
    quantity: BigIntish,
    params?: WriteParameters,
  ): Promise<OperationStatus<bigint>> {
    return await this.run(async () => {
      const args = { receiver, quantity, tokenId: this.tokenId };
      return await this.base.issue.estimateGas(walletClient, args, params);
    });
  }
}
