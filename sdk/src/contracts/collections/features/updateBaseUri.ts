import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const UpdateBaseUriPartitions = {
  v1: [...FeatureFunctionsMap['updateBaseURI(uint256,string)[]'].drop],
};
type UpdateBaseUriPartitions = typeof UpdateBaseUriPartitions;

const UpdateBaseUriInterfaces = Object.values(UpdateBaseUriPartitions).flat();
type UpdateBaseUriInterfaces = (typeof UpdateBaseUriInterfaces)[number];

export type UpdateBaseUriCallArgs = [
  signer: Signerish,
  tokenId: BigNumberish,
  tokenUri: string,
  overrides?: SourcedOverrides,
];
export type UpdateBaseUriResponse = ContractTransaction;

export class UpdateBaseUri extends ContractFunction<
  UpdateBaseUriInterfaces,
  UpdateBaseUriPartitions,
  UpdateBaseUriCallArgs,
  UpdateBaseUriResponse
> {
  readonly functionName = 'updateBaseUri';

  constructor(base: CollectionContract) {
    super(base, UpdateBaseUriInterfaces, UpdateBaseUriPartitions);
  }

  call(...args: UpdateBaseUriCallArgs): Promise<UpdateBaseUriResponse> {
    return this.updateBaseUri(...args);
  }

  async updateBaseUri(
    signer: Signerish,
    tokenId: BigNumberish,
    tokenUri: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).updateBaseURI(tokenId, tokenUri, overrides);
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
      const estimate = await v1.connectWith(signer).estimateGas.updateBaseURI(tokenId, tokenUri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
