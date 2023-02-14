import { BigNumber, ContractTransaction } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const SetOperatorFiltererStatusFunctions = {
  v1: 'setOperatorFiltererStatus(bool)[]',
} as const;

const SetOperatorFiltererStatusPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorFiltererStatusFunctions.v1].drop],
};
type SetOperatorFiltererStatusPartitions = typeof SetOperatorFiltererStatusPartitions;

const SetOperatorFiltererStatusInterfaces = Object.values(SetOperatorFiltererStatusPartitions).flat();
type SetOperatorFiltererStatusInterfaces = (typeof SetOperatorFiltererStatusInterfaces)[number];

export type SetOperatorFiltererStatusCallArgs = [signer: Signerish, enabled: boolean, overrides?: SourcedOverrides];
export type SetOperatorFiltererStatusResponse = ContractTransaction;

export class SetOperatorFiltererStatus extends ContractFunction<
  SetOperatorFiltererStatusInterfaces,
  SetOperatorFiltererStatusPartitions,
  SetOperatorFiltererStatusCallArgs,
  SetOperatorFiltererStatusResponse
> {
  readonly functionName = 'setOperatorFiltererStatus';

  constructor(base: CollectionContract) {
    super(
      base,
      SetOperatorFiltererStatusInterfaces,
      SetOperatorFiltererStatusPartitions,
      SetOperatorFiltererStatusFunctions,
    );
  }

  call(...args: SetOperatorFiltererStatusCallArgs): Promise<SetOperatorFiltererStatusResponse> {
    return this.setOperatorFiltererStatus(...args);
  }

  async setOperatorFiltererStatus(
    signer: Signerish,
    enabled: boolean,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const v1 = this.partition('v1');

    try {
      const tx = await v1.connectWith(signer).setOperatorFiltererStatus(enabled, overrides);
      return tx;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(signer: Signerish, enabled: boolean, overrides?: SourcedOverrides): Promise<BigNumber> {
    const v1 = this.partition('v1');

    try {
      const estimate = await v1.connectWith(signer).estimateGas.setOperatorFiltererStatus(enabled, overrides);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}