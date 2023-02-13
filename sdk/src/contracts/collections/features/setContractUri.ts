import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetContractUriPartitions = {
  v1: [...FeatureFunctionsMap['setContractURI(string)[]'].drop],
};
type SetContractUriPartitions = typeof SetContractUriPartitions;

const SetContractUriInterfaces = Object.values(SetContractUriPartitions).flat();
type SetContractUriInterfaces = (typeof SetContractUriInterfaces)[number];

export type SetContractUriCallArgs = [signer: Signerish, uri: string, overrides?: SourcedOverrides];
export type SetContractUriResponse = ContractTransaction;

export class SetContractUri extends ContractFunction<
  SetContractUriInterfaces,
  SetContractUriPartitions,
  SetContractUriCallArgs,
  SetContractUriResponse
> {
  readonly functionName = 'setContractUri';

  constructor(base: CollectionContract) {
    super(base, SetContractUriInterfaces, SetContractUriPartitions);
  }

  call(...args: SetContractUriCallArgs): Promise<SetContractUriResponse> {
    return this.setContractUri(...args);
  }

  async setContractUri(signer: Signerish, uri: string, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setContractURI(uri, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }

  async estimateGas(signer: Signerish, uri: string, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setContractURI(uri, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { uri });
    }
  }
}
