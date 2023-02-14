import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetOwnerFunctions = {
  v1: 'setOwner(address)[]',
} as const;

const SetOwnerPartitions = {
  v1: [...FeatureFunctionsMap[SetOwnerFunctions.v1].drop],
};
type SetOwnerPartitions = typeof SetOwnerPartitions;

const SetOwnerInterfaces = Object.values(SetOwnerPartitions).flat();
type SetOwnerInterfaces = (typeof SetOwnerInterfaces)[number];

export type SetOwnerCallArgs = [signer: Signerish, ownerAddress: Address, overrides?: SourcedOverrides];
export type SetOwnerResponse = ContractTransaction;

export class SetOwner extends ContractFunction<
  SetOwnerInterfaces,
  SetOwnerPartitions,
  SetOwnerCallArgs,
  SetOwnerResponse
> {
  readonly functionName = 'setOwner';

  constructor(base: CollectionContract) {
    super(base, SetOwnerInterfaces, SetOwnerPartitions, SetOwnerFunctions);
  }

  call(...args: SetOwnerCallArgs): Promise<SetOwnerResponse> {
    return this.setOwner(...args);
  }

  async setOwner(signer: Signerish, ownerAddress: Address, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setOwner(ownerAddress, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, ownerAddress: Address, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setOwner(ownerAddress, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}