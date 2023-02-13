import { ContractReceipt, ContractTransaction } from 'ethers';
import { CollectionContract, TokenId } from '..';
import { SdkError } from '../errors';
import { IssuedToken } from '../features';
import { ContractObject } from './object';

export type IssueState =
  | { status: 'signing-transaction' }
  | { status: 'cancelled-transaction'; error: SdkError }
  | { status: 'pending-transaction'; tx: ContractTransaction }
  | { status: 'transaction-failed'; tx: ContractTransaction; error: SdkError }
  | { status: 'success'; tx: ContractTransaction; receipt: ContractReceipt; tokens: IssuedToken[] };

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

  // protected getArgs(): Omit<IssueArgs, 'receiver' | 'quantity'> {
  //   return {
  //     tokenId: this.tokenId,
  //     tokenURI: this.tokenURI,
  //   };
  // }

  // async processAsync(
  //   signer: Signerish,
  //   receiver: Address,
  //   quantity: BigNumberish,
  //   overrides: PayableOverrides = {},
  // ): Promise<IssueSuccessState> {
  //   return new Promise((resolve, reject) => {
  //     this.processCallback(signer, receiver, quantity, overrides, (state) => {
  //       switch (state.status) {
  //         case 'success':
  //           resolve(state);
  //           return;

  //         case 'cancelled-transaction':
  //         case 'transaction-failed':
  //           reject(state);
  //           return;

  //         case 'pending-transaction':
  //         case 'signing-transaction':
  //           // throw away intermediate steps
  //           return;
  //       }

  //       throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error(`Unknown issue status`));
  //     });
  //   });
  // }

  // async processCallback(
  //   signer: Signerish,
  //   receiver: Address,
  //   quantity: BigNumberish,
  //   overrides: PayableOverrides = {},
  //   onStateChange: (state: IssueState) => void,
  // ) {
  //   const { success, result: tx, error } = await this.execute(signer, receiver, quantity, overrides);
  //   if (!success) {
  //     onStateChange({ status: 'cancelled-transaction', error });
  //     return;
  //   }

  //   onStateChange({ status: 'pending-transaction', tx });

  //   try {
  //     const receipt = await tx.wait();
  //     const tokens = await this.base.issuer.parseLogs(receipt);
  //     onStateChange({ status: 'success', tx, receipt, tokens });
  //   } catch (err) {
  //     const error = SdkError.is(err) ? err : new SdkError(SdkErrorCode.UNKNOWN_ERROR, undefined, err as Error);
  //     onStateChange({ status: 'transaction-failed', tx, error });
  //     return;
  //   }
  // }

  // async execute(
  //   signer: Signerish,
  //   receiver: Address,
  //   quantity: BigNumberish,
  //   overrides: PayableOverrides = {},
  // ): Promise<OperationStatus<ContractTransaction>> {
  //   return await this.do(async () => {
  //     const args = { ...this.getArgs(), receiver, quantity };
  //     return await this.base.issuer.issue(signer, args, overrides);
  //   });
  // }

  // async estimateGas(
  //   signer: Signerish,
  //   receiver: Address,
  //   quantity: BigNumberish,
  //   overrides: PayableOverrides = {},
  // ): Promise<OperationStatus<BigNumber>> {
  //   return await this.do(async () => {
  //     const args = { ...this.getArgs(), receiver, quantity };
  //     return await this.base.issuer.estimateGas(signer, args, overrides);
  //   });
  // }
}
