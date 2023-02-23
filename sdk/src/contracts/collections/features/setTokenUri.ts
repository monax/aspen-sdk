import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTokenUriFunctions = {
  v1: 'setTokenURI(uint256,string)[]',
} as const;

const SetTokenUriPartitions = {
  v1: [...FeatureFunctionsMap[SetTokenUriFunctions.v1].drop],
};
type SetTokenUriPartitions = typeof SetTokenUriPartitions;

const SetTokenUriInterfaces = Object.values(SetTokenUriPartitions).flat();
type SetTokenUriInterfaces = (typeof SetTokenUriInterfaces)[number];

export type SetTokenUriCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  tokenUri: string,
  overrides?: WriteOverrides,
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
    super(base, SetTokenUriInterfaces, SetTokenUriPartitions, SetTokenUriFunctions);
  }

  execute(...args: SetTokenUriCallArgs): Promise<SetTokenUriResponse> {
    return this.setTokenUri(...args);
  }

  async setTokenUri(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides: WriteOverrides = {},
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
    overrides: WriteOverrides = {},
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

export const setTokenUri = asCallableClass(SetTokenUri);
