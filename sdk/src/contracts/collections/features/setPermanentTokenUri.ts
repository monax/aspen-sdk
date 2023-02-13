import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetPermanentTokenUriPartitions = {
  v1: [...FeatureFunctionsMap['setPermantentTokenURI(uint256,string)[]'].drop],
};
type SetPermanentTokenUriPartitions = typeof SetPermanentTokenUriPartitions;

const SetPermanentTokenUriInterfaces = Object.values(SetPermanentTokenUriPartitions).flat();
type SetPermanentTokenUriInterfaces = (typeof SetPermanentTokenUriInterfaces)[number];

export type SetPermanentTokenUriCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  tokenUri: string,
  overrides?: SourcedOverrides,
];
export type SetPermanentTokenUriResponse = ContractTransaction;

export class SetPermanentTokenUri extends ContractFunction<
  SetPermanentTokenUriInterfaces,
  SetPermanentTokenUriPartitions,
  SetPermanentTokenUriCallArgs,
  SetPermanentTokenUriResponse
> {
  readonly functionName = 'setPermanentTokenUri';

  constructor(base: CollectionContract) {
    super(base, SetPermanentTokenUriInterfaces, SetPermanentTokenUriPartitions);
  }

  call(...args: SetPermanentTokenUriCallArgs): Promise<SetPermanentTokenUriResponse> {
    return this.setPermanentTokenUri(...args);
  }

  async setPermanentTokenUri(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setPermantentTokenURI(tokenId, tokenUri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estitamateGas(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setPermantentTokenURI(tokenId, tokenUri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
