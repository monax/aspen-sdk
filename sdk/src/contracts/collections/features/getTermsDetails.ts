import { CollectionContract, IPFS_GATEWAY_PREFIX, ReadParameters } from '../..';
import { resolveIpfsUrl } from '../../../utils';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

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

export type GetTermsDetailsCallArgs = [params?: ReadParameters];
export type GetTermsDetailsResponse = TermsDetails;

export type TermsDetails = {
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

  execute(...args: GetTermsDetailsCallArgs): Promise<GetTermsDetailsResponse> {
    return this.getTermsDetails(...args);
  }

  async getTermsDetails(params?: ReadParameters): Promise<TermsDetails> {
    const { v1, v2 } = this.partitions;

    try {
      if (v2) {
        const iAgreement = await this.reader(this.abi(v2));
        const [termsURI, termsVersion, termsActivated] = await iAgreement.read.getTermsDetails(params);
        return { termsActivated, termsVersion, termsLink: resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX) };
      } else if (v1) {
        const iAgreement = this.reader(this.abi(v1));
        const [termsActivated, termsURI] = await Promise.all([
          iAgreement.read.termsActivated(params),
          iAgreement.read.userAgreement(params),
        ]);
        return { termsActivated, termsVersion: 0, termsLink: resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX) };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }
}

export const getTermsDetails = asCallableClass(GetTermsDetails);
