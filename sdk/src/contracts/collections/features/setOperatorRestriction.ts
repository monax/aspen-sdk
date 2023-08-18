import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetOperatorRestrictionFunctions = {
  v1: 'setOperatorFiltererStatus(bool)[]',
  v2: 'setOperatorRestriction(bool)[]',
} as const;

const SetOperatorRestrictionPartitions = {
  v1: [...FeatureFunctionsMap[SetOperatorRestrictionFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[SetOperatorRestrictionFunctions.v2].drop],
};
type SetOperatorRestrictionPartitions = typeof SetOperatorRestrictionPartitions;

const SetOperatorRestrictionInterfaces = Object.values(SetOperatorRestrictionPartitions).flat();
type SetOperatorRestrictionInterfaces = (typeof SetOperatorRestrictionInterfaces)[number];

export type SetOperatorRestrictionCallArgs = [walletClient: Signer, enabled: boolean, params?: WriteParameters];
export type SetOperatorRestrictionResponse = TransactionHash;

export class SetOperatorRestriction extends ContractFunction<
  SetOperatorRestrictionInterfaces,
  SetOperatorRestrictionPartitions,
  SetOperatorRestrictionCallArgs,
  SetOperatorRestrictionResponse
> {
  readonly functionName = 'setOperatorRestriction';

  constructor(base: CollectionContract) {
    super(base, SetOperatorRestrictionInterfaces, SetOperatorRestrictionPartitions, SetOperatorRestrictionFunctions);
  }

  execute(...args: SetOperatorRestrictionCallArgs): Promise<SetOperatorRestrictionResponse> {
    return this.setOperatorRestriction(...args);
  }

  async setOperatorRestriction(
    walletClient: Signer,
    enabled: boolean,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setOperatorRestriction([enabled], params);
        const tx = await walletClient.writeContract(request);
        return tx as TransactionHash;
      } else if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.setOperatorFiltererStatus([enabled], params);
        const tx = await walletClient.writeContract(request);
        return tx as TransactionHash;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async estimateGas(walletClient: Signer, enabled: boolean, params?: WriteParameters): Promise<bigint> {
    const { v1, v2 } = this.partitions;
    const fullParams = { account: walletClient.account, ...params };

    try {
      if (v2) {
        const estimate = await this.reader(this.abi(v2)).estimateGas.setOperatorRestriction([enabled], fullParams);
        return estimate;
      } else if (v1) {
        const estimate = await this.reader(this.abi(v1)).estimateGas.setOperatorFiltererStatus([enabled], fullParams);
        return estimate;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  async populateTransaction(enabled: boolean, params?: WriteParameters): Promise<string> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { request } = await this.reader(this.abi(v2)).simulate.setOperatorRestriction([enabled], params);
        return encodeFunctionData(request);
      } else if (v1) {
        const { request } = await this.reader(this.abi(v1)).simulate.setOperatorFiltererStatus([enabled], params);
        return encodeFunctionData(request);
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const setOperatorRestriction = asCallableClass(SetOperatorRestriction);
