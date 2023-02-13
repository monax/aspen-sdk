import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetRoyaltyInfoForTokenPartitions = {
  v1: [...FeatureFunctionsMap['setRoyaltyInfoForToken(uint256,address,uint256)[]'].drop],
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
    super(base, SetRoyaltyInfoForTokenInterfaces, SetRoyaltyInfoForTokenPartitions);
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
}
