import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs.js';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from '../features';
import type { Signerish, TermsUserAcceptanceState } from '../types';

export const AgreementsFeatures = [
  'agreement/IAgreement.sol:ICedarAgreementV0',
  'agreement/IAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:ICedarAgreementV0',
  'agreement/ICedarAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV1',
  // 'agreement/IAgreement.sol:IRestrictedAgreementV0',
  // 'agreement/IAgreement.sol:IRestrictedAgreementV1',
  // 'agreement/IAgreement.sol:IRestrictedAgreementV2',
  // @todo are the following in use?
  // 'agreement/IAgreementsRegistry.sol:IAgreementsRegistryV0',
  // 'agreement/IAgreementsRegistry.sol:IAgreementsRegistryV1',
] as const;

export type AgreementsFeatures = (typeof AgreementsFeatures)[number];

export class Agreements extends FeatureSet<AgreementsFeatures> {
  constructor(base: CollectionContract) {
    super(base, AgreementsFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    // Split the handled features into groups that can be handled on the same path for each function
    // It is a compile-time error to omit a feature from handledFeatures in each partition
    const acceptTerms = partitioner({
      v0: ['agreement/ICedarAgreement.sol:ICedarAgreementV0', 'agreement/IAgreement.sol:ICedarAgreementV0'],
      v1: ['agreement/IAgreement.sol:ICedarAgreementV1', 'agreement/ICedarAgreement.sol:ICedarAgreementV1'],
      v2: [
        'agreement/ICedarAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV1',
      ],
    });

    return { acceptTerms };
  });

  async getState(userAddress: Address): Promise<TermsUserAcceptanceState> {
    let termsActivated = false;
    let termsAccepted = false;
    let termsURI = '';
    let termsVersion = 0;

    const { v0, v1, v2 } = this.getPartition('acceptTerms')(this.base.interfaces);

    if (v2) {
      const iAgreement = await v2.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await iAgreement.getTermsDetails());
      termsAccepted = await iAgreement['hasAcceptedTerms(address)'](userAddress);
    } else if (v1) {
      const iAgreement = await v1.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await iAgreement.getTermsDetails());
      termsAccepted = await iAgreement.hasAcceptedTerms(userAddress);
    } else if (v0) {
      const iAgreement = v0.connectReadOnly();
      termsActivated = await iAgreement.termsActivated();
      termsAccepted = await iAgreement.getAgreementStatus(userAddress);
      termsURI = await iAgreement.userAgreement();
      termsActivated = await iAgreement.termsActivated();
    }

    const termsLink = resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX);
    this.base.debug('Loaded terms state', { termsActivated, termsAccepted, termsLink, termsVersion });

    return { termsActivated, termsAccepted, termsLink, termsVersion };
  }

  async acceptTerms(signer: Signerish): Promise<ContractTransaction> {
    const { v0, v1, v2 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (v2) {
        const iAgreement = v2.connectWith(signer);
        return await iAgreement.acceptTerms();
      } else if (v1) {
        const iAgreement = v1.connectWith(signer);
        return await iAgreement['acceptTerms()']();
      } else if (v0) {
        const iAgreement = v0.connectWith(signer);
        return await iAgreement.acceptTerms();
      } else {
        throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements' });
      }
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }
  }

  async estimateGasForAcceptTerms(signer: Signerish): Promise<BigNumber> {
    const { v0, v1, v2 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (v2) {
        const iAgreement = v2.connectWith(signer);
        return await iAgreement.estimateGas.acceptTerms();
      } else if (v1) {
        const iAgreement = v1.connectWith(signer);
        return await iAgreement.estimateGas['acceptTerms()']();
      } else if (v0) {
        const iAgreement = v0.connectWith(signer);
        return await iAgreement.estimateGas.acceptTerms();
      } else {
        throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements' });
      }
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }
  }
}
