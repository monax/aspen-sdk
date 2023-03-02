import { BigNumber, BigNumberish, ContractTransaction, PopulatedTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, WriteOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const UpdateBaseUriFunctions = {
  v1: 'updateBaseURI(uint256,string)[]',
} as const;

const UpdateBaseUriPartitions = {
  v1: [...FeatureFunctionsMap[UpdateBaseUriFunctions.v1].drop],
};
type UpdateBaseUriPartitions = typeof UpdateBaseUriPartitions;

const UpdateBaseUriInterfaces = Object.values(UpdateBaseUriPartitions).flat();
type UpdateBaseUriInterfaces = (typeof UpdateBaseUriInterfaces)[number];

export type UpdateBaseUriCallArgs = [
  signer: Signerish,
  baseURIIndex: BigNumberish,
  baseURI: string,
  overrides?: WriteOverrides,
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
    super(base, UpdateBaseUriInterfaces, UpdateBaseUriPartitions, UpdateBaseUriFunctions);
  }

  execute(...args: UpdateBaseUriCallArgs): Promise<UpdateBaseUriResponse> {
    return this.updateBaseUri(...args);
  }

  async updateBaseUri(
    signer: Signerish,
    baseURIIndex: BigNumberish,
    baseURI: string,
    overrides: WriteOverrides = {},
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).updateBaseURI(baseURIIndex, baseURI, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estitamateGas(
    signer: Signerish,
    baseURIIndex: BigNumberish,
    baseURI: string,
    overrides: WriteOverrides = {},
  ): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.updateBaseURI(baseURIIndex, baseURI, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    signer: Signerish,
    baseURIIndex: BigNumberish,
    baseURI: string,
    overrides: WriteOverrides = {},
  ): Promise<PopulatedTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).populateTransaction.updateBaseURI(baseURIIndex, baseURI, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const updateBaseUri = asCallableClass(UpdateBaseUri);
