import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PayableOverrides } from 'ethers';
import { ClaimConditionsState, CollectionContract, OperationStatus, Signerish, TokenId } from '..';
import { Address } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { ClaimArgs, ClaimedToken } from '../features/claims';
import { ContractObject } from './object';

export type ClaimState =
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; tx: ContractTransaction }
  | { status: 'transaction-failed'; tx: ContractTransaction; error: SdkError }
  | { status: 'success'; tx: ContractTransaction; receipt: ContractReceipt; tokens: ClaimedToken[] };

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

  async process(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
    onStateChange: (state: ClaimState) => void,
  ) {
    const { success, result: tx, error } = await this.execute(signer, receiver, quantity, overrides);
    if (!success) {
      onStateChange({ status: 'cancelled-transaction', error });
      return;
    }

    onStateChange({ status: 'pending-transaction', tx });

    try {
      const receipt = await tx.wait();
      const tokens = await this.base.claims.parseLogs(receipt);
      onStateChange({ status: 'success', tx, receipt, tokens });
    } catch (err) {
      const error = SdkError.is(err) ? err : new SdkError(SdkErrorCode.UNKNOWN_ERROR, undefined, err as Error);
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
    return this.do(() => {
      const args = { ...this.getArgs(), receiver, quantity };
      return this.base.claims.claim(signer, args, overrides);
    });
  }

  async verify(receiver: Address, quantity: number): Promise<boolean> {
    try {
      const status = await this.base.claims.verify({ ...this.getArgs(), receiver, quantity }, true);
      return status;
    } catch {}

    return false;
  }

  async estimateGas(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
  ): Promise<OperationStatus<BigNumber>> {
    return this.do(() => {
      const args = { ...this.getArgs(), receiver, quantity };
      return this.base.claims.estimateGas(signer, args, overrides);
    });
  }
}
