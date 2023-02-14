import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PayableOverrides } from 'ethers';
import { ClaimConditionsState, CollectionContract, OperationStatus, Signerish, TokenId } from '..';
import { Address } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { ClaimArgs, ClaimedToken } from '../features';
import { ContractObject } from './object';

export type ClaimState =
  | { status: 'verifying-claim' }
  | { status: 'verification-failed'; error: SdkError }
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; tx: ContractTransaction }
  | { status: 'transaction-failed'; tx: ContractTransaction; error: SdkError }
  | { status: 'success'; tx: ContractTransaction; receipt: ContractReceipt; tokens: ClaimedToken[] };

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
      proofs: c.allowlistStatus.proofs,
      proofMaxQuantityPerTransaction: c.allowlistStatus.proofMaxQuantityPerTransaction,
    };
  }

  async processAsync(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
  ): Promise<ClaimSuccessState> {
    return new Promise((resolve, reject) => {
      this.processCallback(signer, receiver, quantity, overrides, (state) => {
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
      });
    });
  }

  async processCallback(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
    onStateChange: (state: ClaimState) => void,
  ) {
    onStateChange({ status: 'verifying-claim' });

    const verification = await this.verify(receiver, quantity);
    if (!verification.success) {
      onStateChange({ status: 'verification-failed', error: verification.error });
      return;
    }

    const { success: hasTransaction, result: tx, error } = await this.execute(signer, receiver, quantity, overrides);
    if (!hasTransaction) {
      onStateChange({ status: 'cancelled-transaction', error });
      return;
    }

    onStateChange({ status: 'pending-transaction', tx });

    try {
      const receipt = await tx.wait();
      const tokens = await this.base.claim.parseReceiptLogs(receipt);
      onStateChange({ status: 'success', tx, receipt, tokens });
    } catch (err) {
      const error = SdkError.from(err, SdkErrorCode.UNKNOWN_ERROR, { receiver, quantity });
      onStateChange({ status: 'transaction-failed', tx, error });
      return;
    }
  }

  async execute(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.claim(signer, args, overrides);
    });
  }

  async verify(receiver: Address, quantity: BigNumberish): Promise<OperationStatus<boolean>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.verifyClaim(args, true);
    });
  }

  async estimateGas(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
  ): Promise<OperationStatus<BigNumber>> {
    return await this.run(async () => {
      const args = { ...this.getArgs(), receiver, quantity };
      return await this.base.claim.estimateGas(signer, args, overrides);
    });
  }
}
