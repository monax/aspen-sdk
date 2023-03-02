import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetRoyaltyInfoForTokenFunctions = {
  v1: 'setRoyaltyInfoForToken(uint256,address,uint256)[]',
} as const;

const SetRoyaltyInfoForTokenPartitions = {
  v1: [...FeatureFunctionsMap[SetRoyaltyInfoForTokenFunctions.v1].drop],
};
type SetRoyaltyInfoForTokenPartitions = typeof SetRoyaltyInfoForTokenPartitions;

const SetRoyaltyInfoForTokenInterfaces = Object.values(SetRoyaltyInfoForTokenPartitions).flat();
type SetRoyaltyInfoForTokenInterfaces = (typeof SetRoyaltyInfoForTokenInterfaces)[number];

export type SetRoyaltyInfoForTokenCallArgs = [
  signer: Signerish,
  tokenId: BigNumber,
  royaltyRecipient: Addressish,
  basisPoints: BigNumber,
  overrides?: WriteOverrides,
];
export type SetRoyaltyInfoForTokenResponse = ContractTransaction;

export class SetRoyaltyInfoForToken extends ContractFunction<
  SetRoyaltyInfoForTokenInterfaces,
  SetRoyaltyInfoForTokenPartitions,
  SetRoyaltyInfoForTokenCallArgs,
  SetRoyaltyInfoForTokenResponse
> {
  readonly functionName = 'setRoyaltyInfoForToken';

  constructor(base: CollectionContract) {
    super(base, SetRoyaltyInfoForTokenInterfaces, SetRoyaltyInfoForTokenPartitions, SetRoyaltyInfoForTokenFunctions);
  }

  execute(...args: SetRoyaltyInfoForTokenCallArgs): Promise<SetRoyaltyInfoForTokenResponse> {
    return this.setRoyaltyInfoForToken(...args);
  }

  async setRoyaltyInfoForToken(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);

    try {
      const tx = await v1.connectWith(signer).setRoyaltyInfoForToken(tokenId, wallet, basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);

    try {
      const estimate = await v1
        .connectWith(signer)
        .estimateGas.setRoyaltyInfoForToken(tokenId, wallet, basisPoints, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Addressish,
    basisPoints: BigNumber,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);

    try {
      const tx = await v1
        .connectWith(signer)
        .populateTransaction.setRoyaltyInfoForToken(tokenId, wallet, basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setRoyaltyInfoForToken = asCallableClass(SetRoyaltyInfoForToken);
