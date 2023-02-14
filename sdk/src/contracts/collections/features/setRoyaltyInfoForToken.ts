import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

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
  royaltyRecipient: Address,
  basisPoints: BigNumber,
  overrides?: SourcedOverrides,
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

  call(...args: SetRoyaltyInfoForTokenCallArgs): Promise<SetRoyaltyInfoForTokenResponse> {
    return this.setRoyaltyInfoForToken(...args);
  }

  async setRoyaltyInfoForToken(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const contract = v1.connectWith(signer);
      const tx = await contract.setRoyaltyInfoForToken(tokenId, royaltyRecipient, basisPoints, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    signer: Signerish,
    tokenId: BigNumber,
    royaltyRecipient: Address,
    basisPoints: BigNumber,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimator = v1.connectWith(signer).estimateGas;
      const estimate = await estimator.setRoyaltyInfoForToken(tokenId, royaltyRecipient, basisPoints, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
