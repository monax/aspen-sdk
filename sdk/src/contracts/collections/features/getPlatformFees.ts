import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { CollectionContract, ReadParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { normalise } from '../number';
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

export type GetPlatformFeesCallArgs = [params?: ReadParameters];
export type GetPlatformFeesResponse = PlatformFee;

export type PlatformFee = {
  recipient: Address;
  basisPoints: bigint;
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

  async getPlatformFees(params?: ReadParameters): Promise<PlatformFee> {
    const { v1, v2 } = this.partitions;
    try {
      if (v2) {
        const [platformFeeReceiver, platformFeeBPS] = await this.reader(this.abi(v2)).read.getPlatformFees(params);
        return { recipient: parse(Address, platformFeeReceiver), basisPoints: normalise(platformFeeBPS) };
      } else if (v1) {
        // bypass ABI divercence
        const iface = this.base.assumeFeature('royalties/IPlatformFee.sol:IDelegatedPlatformFeeV0');
        const [recipient, basisPoints] = await this.reader(iface.abi).read.getPlatformFeeInfo(params);
        return { recipient: parse(Address, recipient), basisPoints: normalise(basisPoints) };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getPlatformFees = asCallableClass(GetPlatformFees);
