import { BigNumber, CallOverrides } from 'ethers';
import { Address, CollectionContract } from '../..';
import { parse } from '@monaxlabs/phloem/dist/schema';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetPlatformFeesFunctions = {
  v1: 'getPlatformFeeInfo()[address,uint16]',
  v2: 'getPlatformFees()[address,uint16]',
} as const;

const GetPlatformFeesPartitions = {
  v1: [...FeatureFunctionsMap[GetPlatformFeesFunctions.v1].drop],
  v2: [...FeatureFunctionsMap[GetPlatformFeesFunctions.v2].drop],
};
type GetPlatformFeesPartitions = typeof GetPlatformFeesPartitions;

const GetPlatformFeesInterfaces = Object.values(GetPlatformFeesPartitions).flat();
type GetPlatformFeesInterfaces = (typeof GetPlatformFeesInterfaces)[number];

export type GetPlatformFeesCallArgs = [overrides?: CallOverrides];
export type GetPlatformFeesResponse = PlatformFee;

export type PlatformFee = {
  recipient: Address;
  basisPoints: BigNumber;
};

export class GetPlatformFees extends ContractFunction<
  GetPlatformFeesInterfaces,
  GetPlatformFeesPartitions,
  GetPlatformFeesCallArgs,
  GetPlatformFeesResponse
> {
  readonly functionName = 'getPlatformFees';

  constructor(base: CollectionContract) {
    super(base, GetPlatformFeesInterfaces, GetPlatformFeesPartitions, GetPlatformFeesFunctions);
  }

  execute(...args: GetPlatformFeesCallArgs): Promise<GetPlatformFeesResponse> {
    return this.getPlatformFees(...args);
  }

  async getPlatformFees(overrides: CallOverrides = {}): Promise<PlatformFee> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const { platformFeeReceiver, platformFeeBPS } = await v2.connectReadOnly().getPlatformFees(overrides);
        return { recipient: parse(Address, platformFeeReceiver), basisPoints: BigNumber.from(platformFeeBPS) };
      } else if (v1) {
        const [recipient, basisPoints] = await v1.connectReadOnly().getPlatformFeeInfo(overrides);
        return { recipient: parse(Address, recipient), basisPoints: BigNumber.from(basisPoints) };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getPlatformFees = asCallableClass(GetPlatformFees);
