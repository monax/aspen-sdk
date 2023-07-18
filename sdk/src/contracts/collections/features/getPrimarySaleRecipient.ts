import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetPrimarySaleRecipientFunctions = {
  v1: 'primarySaleRecipient()[address]',
} as const;

const GetPrimarySaleRecipientPartitions = {
  v1: [...FeatureFunctionsMap[GetPrimarySaleRecipientFunctions.v1].drop],
};
type GetPrimarySaleRecipientPartitions = typeof GetPrimarySaleRecipientPartitions;

const GetPrimarySaleRecipientInterfaces = Object.values(GetPrimarySaleRecipientPartitions).flat();
type GetPrimarySaleRecipientInterfaces = (typeof GetPrimarySaleRecipientInterfaces)[number];

export type GetPrimarySaleRecipientCallArgs = [overrides?: CallOverrides];
export type GetPrimarySaleRecipientResponse = Address;

export class GetPrimarySaleRecipient extends ContractFunction<
  GetPrimarySaleRecipientInterfaces,
  GetPrimarySaleRecipientPartitions,
  GetPrimarySaleRecipientCallArgs,
  GetPrimarySaleRecipientResponse
> {
  readonly functionName = 'getPrimarySaleRecipient';

  constructor(base: CollectionContract) {
    super(base, GetPrimarySaleRecipientInterfaces, GetPrimarySaleRecipientPartitions, GetPrimarySaleRecipientFunctions);
  }

  execute(...args: GetPrimarySaleRecipientCallArgs): Promise<GetPrimarySaleRecipientResponse> {
    return this.getPrimarySaleRecipient(...args);
  }

  async getPrimarySaleRecipient(overrides: CallOverrides = {}): Promise<Address> {
    const v1 = this.partition('v1');

    try {
      const recipient = await v1.connectReadOnly().primarySaleRecipient(overrides);
      return parse(Address, recipient);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getPrimarySaleRecipient = asCallableClass(GetPrimarySaleRecipient);
