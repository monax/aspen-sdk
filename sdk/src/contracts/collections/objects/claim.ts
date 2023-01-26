import { BigNumber, BigNumberish, ContractTransaction, PayableOverrides } from 'ethers';
import { ClaimConditionsState, CollectionContract, OperationStatus, Signerish, TokenId } from '..';
import { Address } from '../..';
import { ClaimArgs } from '../features/claims';
import { ContractObject } from './object';

export class PendingClaim extends ContractObject {
  public constructor(
    protected readonly base: CollectionContract,
    readonly conditions: ClaimConditionsState,
    readonly tokenId?: TokenId,
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
