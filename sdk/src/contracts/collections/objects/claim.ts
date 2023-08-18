import { Address, TransactionHash } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, TransactionReceipt } from 'viem';
import {
  BigIntish,
  ClaimConditionsState,
  CollectionContract,
  OperationStatus,
  PayableParameters,
  Provider,
  Signer,
  TokenId,
} from '..';
import { SdkError, SdkErrorCode } from '../errors';
import { ClaimArgs, ClaimedToken } from '../features';
import { ContractObject } from './object';

export type ClaimState =
  | { status: 'verifying-claim' }
  | { status: 'verification-failed'; error: SdkError }
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; receipt: TransactionReceipt }
  | { status: 'transaction-failed'; receipt: TransactionReceipt; error: SdkError }
  | { status: 'success'; tx: TransactionHash; receipt: TransactionReceipt; tokens: ClaimedToken[] };

export type ClaimSuccessState = Extract<ClaimState, { status: 'success' }>;

export class PendingClaim extends ContractObject {
  public constructor(
    protected readonly base: CollectionContract,
    readonly tokenId: TokenId,
    readonly conditions: ClaimConditionsState,
  ) {
    super(base);

    this.tokenId = this.base.tokenStandard === 'ERC1155' ? this.base.requireTokenId(tokenId) : tokenId;
  }

  protected getArgs(): Omit<ClaimArgs, 'receiver' | 'quantity'> {
    const c = this.conditions;

    return {
      conditionId: c.activeClaimConditionId,
      tokenId: this.tokenId,
      currency: c.currency,
      pricePerToken: c.pricePerToken,
      proofs: c.allowlist.proofs,
      proofMaxQuantityPerTransaction: c.allowlist.proofMaxQuantityPerTransaction,
    };
  }

  async processAsync(
    walletClient: Signer,
    publicClient: Provider,
    receiver: Address,
    quantity: BigIntish,
    params?: PayableParameters,
  ): Promise<ClaimSuccessState> {
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

            case 'verification-failed':
            case 'cancelled-transaction':
            case 'transaction-failed':
              reject(state);
              return;

            case 'verifying-claim':
            case 'signing-transaction':
            case 'pending-transaction':
              // throw away intermediate steps
              return;
          }

          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error(`Unknown claim status`));
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
    onStateChange: (state: ClaimState) => void,
    params?: PayableParameters,
  ) {
    onStateChange({ status: 'verifying-claim' });

    const verification = await this.verify(receiver, quantity);
    if (!verification.success) {
      onStateChange({ status: 'verification-failed', error: verification.error });
      return;
    }

    const {
      success: hasTransaction,
      result: receipt,
      error,
    } = await this.execute(walletClient, receiver, quantity, params);
    if (!hasTransaction) {
      onStateChange({ status: 'cancelled-transaction', error });
      return;
    }

    onStateChange({ status: 'pending-transaction', receipt });

    try {
      const tokens = await this.base.claim.parseReceiptLogs(receipt);
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
    params?: PayableParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.claim(walletClient, args, params);
    });
  }

  async verify(receiver: Address, quantity: BigIntish): Promise<OperationStatus<boolean>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.verifyClaim(args, true);
    });
  }

  async estimateGas(
    walletClient: Signer,
    receiver: Address,
    quantity: BigIntish,
    params?: PayableParameters,
  ): Promise<OperationStatus<bigint>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.claim.estimateGas(walletClient, args, params);
    });
  }
}
