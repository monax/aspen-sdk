import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetSaleRecipientForTokenFunctions = {
  v1: 'setSaleRecipientForToken(uint256,address)[]',
} as const;

const SetSaleRecipientForTokenPartitions = {
  v1: [...FeatureFunctionsMap[SetSaleRecipientForTokenFunctions.v1].drop],
};
type SetSaleRecipientForTokenPartitions = typeof SetSaleRecipientForTokenPartitions;

const SetSaleRecipientForTokenInterfaces = Object.values(SetSaleRecipientForTokenPartitions).flat();
type SetSaleRecipientForTokenInterfaces = (typeof SetSaleRecipientForTokenInterfaces)[number];

export type SetSaleRecipientForTokenCallArgs = [
  signer: Signerish,
  tokenId: BigNumber,
  saleRecipient: Addressish,
  overrides?: WriteOverrides,
];
export type SetSaleRecipientForTokenResponse = ContractTransaction;

export class SetSaleRecipientForToken extends ContractFunction<
  SetSaleRecipientForTokenInterfaces,
  SetSaleRecipientForTokenPartitions,
  SetSaleRecipientForTokenCallArgs,
  SetSaleRecipientForTokenResponse
> {
  readonly functionName = 'setSaleRecipientForToken';

  constructor(base: CollectionContract) {
    super(
      base,
      SetSaleRecipientForTokenInterfaces,
      SetSaleRecipientForTokenPartitions,
      SetSaleRecipientForTokenFunctions,
    );
  }

  execute(...args: SetSaleRecipientForTokenCallArgs): Promise<SetSaleRecipientForTokenResponse> {
    return this.setSaleRecipientForToken(...args);
  }

  async setSaleRecipientForToken(
    signer: Signerish,
    tokenId: BigNumber,
    saleRecipient: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);

    try {
      const tx = await v1.connectWith(signer).setSaleRecipientForToken(tokenId, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    tokenId: BigNumber,
    saleRecipient: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setSaleRecipientForToken(tokenId, wallet, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenId: BigNumber,
    saleRecipient: Addressish,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);

    try {
      const tx = await v1.connectReadOnly().populateTransaction.setSaleRecipientForToken(tokenId, wallet, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setSaleRecipientForToken = asCallableClass(SetSaleRecipientForToken);
