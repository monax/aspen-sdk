import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetPermanentTokenUriFunctions = {
  v1: 'setPermantentTokenURI(uint256,string)[]',
} as const;

const SetPermanentTokenUriPartitions = {
  v1: [...FeatureFunctionsMap[SetPermanentTokenUriFunctions.v1].drop],
};
type SetPermanentTokenUriPartitions = typeof SetPermanentTokenUriPartitions;

const SetPermanentTokenUriInterfaces = Object.values(SetPermanentTokenUriPartitions).flat();
type SetPermanentTokenUriInterfaces = (typeof SetPermanentTokenUriInterfaces)[number];

export type SetPermanentTokenUriCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  tokenUri: string,
  overrides?: WriteOverrides,
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
    super(base, SetPermanentTokenUriInterfaces, SetPermanentTokenUriPartitions, SetPermanentTokenUriFunctions);
  }

  call(...args: SetPermanentTokenUriCallArgs): Promise<SetPermanentTokenUriResponse> {
    return this.setPermanentTokenUri(...args);
  }

  async setPermanentTokenUri(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides: WriteOverrides = {},
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
    overrides: WriteOverrides = {},
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
