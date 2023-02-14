import { CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import type { SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const GetTermsDetailsFunctions = {
  v1a: 'termsActivated()[bool]',
  v1b: 'userAgreement()[string]',
  v2: 'getTermsDetails()[string,uint8,bool]',
} as const;

const GetTermsDetailsPartitions = {
  v1: [
    ...FeatureFunctionsMap[GetTermsDetailsFunctions.v1a].drop,
    ...FeatureFunctionsMap[GetTermsDetailsFunctions.v1b].drop,
  ],
  v2: [...FeatureFunctionsMap[GetTermsDetailsFunctions.v2].drop],
};
type GetTermsDetailsPartitions = typeof GetTermsDetailsPartitions;

const GetTermsDetailsInterfaces = Object.values(GetTermsDetailsPartitions).flat();
type GetTermsDetailsInterfaces = (typeof GetTermsDetailsInterfaces)[number];

export type GetTermsDetailsCallArgs = [overrides?: SourcedOverrides];
export type GetTermsDetailsResponse = {
  termsActivated: boolean;
  termsLink: string;
  termsVersion: number;
};

export class GetTermsDetails extends ContractFunction<
  GetTermsDetailsInterfaces,
  GetTermsDetailsPartitions,
  GetTermsDetailsCallArgs,
  GetTermsDetailsResponse
> {
  readonly functionName = 'getTermsDetails';

  constructor(base: CollectionContract) {
    super(base, GetTermsDetailsInterfaces, GetTermsDetailsPartitions, GetTermsDetailsFunctions);
  }

  call(...args: GetTermsDetailsCallArgs): Promise<GetTermsDetailsResponse> {
    return this.getTermsDetails(...args);
  }

  async getTermsDetails(overrides?: SourcedOverrides): Promise<GetTermsDetailsResponse> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const iAgreement = await v2.connectReadOnly();
        const { termsActivated, termsVersion, termsURI } = await iAgreement.getTermsDetails(overrides);
        return { termsActivated, termsVersion, termsLink: resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX) };
      } else if (v1) {
        const iAgreement = v1.connectReadOnly();
        const [termsActivated, termsURI] = await Promise.all([
          iAgreement.termsActivated(overrides),
          iAgreement.userAgreement(overrides),
        ]);
        return { termsActivated, termsVersion: 0, termsLink: resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX) };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}
