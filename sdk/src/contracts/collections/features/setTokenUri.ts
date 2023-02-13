import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetTokenUriPartitions = {
  v1: [...FeatureFunctionsMap['setTokenURI(uint256,string)[]'].drop],
};
type SetTokenUriPartitions = typeof SetTokenUriPartitions;

const SetTokenUriInterfaces = Object.values(SetTokenUriPartitions).flat();
type SetTokenUriInterfaces = (typeof SetTokenUriInterfaces)[number];

export type SetTokenUriCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  tokenUri: string,
  overrides?: SourcedOverrides,
];
export type SetTokenUriResponse = ContractTransaction;

export class SetTokenUri extends ContractFunction<
  SetTokenUriInterfaces,
  SetTokenUriPartitions,
  SetTokenUriCallArgs,
  SetTokenUriResponse
> {
  readonly functionName = 'setTokenUri';

  constructor(base: CollectionContract) {
    super(base, SetTokenUriInterfaces, SetTokenUriPartitions);
  }

  call(...args: SetTokenUriCallArgs): Promise<SetTokenUriResponse> {
    return this.setTokenUri(...args);
  }

  async setTokenUri(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setTokenURI(tokenId, tokenUri, overrides);
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
      const estimate = await v1.connectWith(signer).estimateGas.setTokenURI(tokenId, tokenUri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
