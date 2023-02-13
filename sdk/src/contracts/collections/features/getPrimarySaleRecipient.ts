import { Address, CollectionContract } from '../..';
import { parse } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetPrimarySaleRecipientPartitions = {
  v1: [...FeatureFunctionsMap['primarySaleRecipient()[address]'].drop],
};
type GetPrimarySaleRecipientPartitions = typeof GetPrimarySaleRecipientPartitions;

const GetPrimarySaleRecipientInterfaces = Object.values(GetPrimarySaleRecipientPartitions).flat();
type GetPrimarySaleRecipientInterfaces = (typeof GetPrimarySaleRecipientInterfaces)[number];

export type GetPrimarySaleRecipientCallArgs = [overrides?: SourcedOverrides];
export type GetPrimarySaleRecipientResponse = Address;

export class GetPrimarySaleRecipient extends ContractFunction<
  GetPrimarySaleRecipientInterfaces,
  GetPrimarySaleRecipientPartitions,
  GetPrimarySaleRecipientCallArgs,
  GetPrimarySaleRecipientResponse
> {
  readonly functionName = 'getPrimarySaleRecipient';

  constructor(base: CollectionContract) {
    super(base, GetPrimarySaleRecipientInterfaces, GetPrimarySaleRecipientPartitions);
  }

  call(...args: GetPrimarySaleRecipientCallArgs): Promise<GetPrimarySaleRecipientResponse> {
    return this.getPrimarySaleRecipient(...args);
  }

  async getPrimarySaleRecipient(overrides?: SourcedOverrides): Promise<Address> {
    const v1 = this.partition('v1');

    try {
      const recipient = await v1.connectReadOnly().primarySaleRecipient(overrides);
      return parse(Address, recipient);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}
