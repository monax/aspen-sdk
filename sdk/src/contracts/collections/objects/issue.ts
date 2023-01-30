import { BigNumber, BigNumberish, ContractReceipt, ContractTransaction, PayableOverrides } from 'ethers';
import { CollectionContract, OperationStatus, Signerish, TokenId } from '..';
import { Address } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { IssueArgs, IssuedToken } from '../features';
import { ContractObject } from './object';

export type IssueState =
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; tx: ContractTransaction }
  | { status: 'transaction-failed'; tx: ContractTransaction; error: SdkError }
  | { status: 'success'; tx: ContractTransaction; receipt: ContractReceipt; tokens: IssuedToken[] };

export class PendingIssue extends ContractObject {
  public constructor(
    protected readonly base: CollectionContract,
    readonly tokenId: TokenId,
    readonly tokenURI?: string,
  ) {
    super(base);

    this.tokenId = this.base.tokenStandard === 'ERC1155' ? this.base.requireTokenId(tokenId) : tokenId;
  }

  protected getArgs(): Omit<IssueArgs, 'receiver' | 'quantity'> {
    return {
      tokenId: this.tokenId,
      tokenURI: this.tokenURI,
    };
  }

  async process(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
    onStateChange: (state: IssueState) => void,
  ) {
    const { success, result: tx, error } = await this.execute(signer, receiver, quantity, overrides);
    if (!success) {
      onStateChange({ status: 'cancelled-transaction', error });
      return;
    }

    onStateChange({ status: 'pending-transaction', tx });

    try {
      const receipt = await tx.wait();
      const tokens = await this.base.issuer.parseLogs(receipt);
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
      return this.base.issuer.issue(signer, args, overrides);
    });
  }

  async estimateGas(
    signer: Signerish,
    receiver: Address,
    quantity: BigNumberish,
    overrides: PayableOverrides = {},
  ): Promise<OperationStatus<BigNumber>> {
    return this.do(() => {
      const args = { ...this.getArgs(), receiver, quantity };
      return this.base.issuer.estimateGas(signer, args, overrides);
    });
  }
}
