import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { FeatureSet } from '../features';
import type { Signerish, TermsUserAcceptanceState } from '../types';

export const AgreementsFeatures = [
  'agreement/IAgreement.sol:ICedarAgreementV0',
  'agreement/ICedarAgreement.sol:ICedarAgreementV0',
  'agreement/IAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV1',
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

    const acceptTerms = this.getPartition('acceptTerms')(this.base.interfaces);

    if (acceptTerms.v2) {
      const iAgreement = await acceptTerms.v2.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await iAgreement.getTermsDetails());
      termsAccepted = await iAgreement['hasAcceptedTerms(address)'](userAddress);
    } else if (acceptTerms.v1) {
      const iAgreement = await acceptTerms.v1.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await iAgreement.getTermsDetails());
      termsAccepted = await iAgreement.hasAcceptedTerms(userAddress);
    } else if (acceptTerms.v0) {
      const iAgreement = acceptTerms.v0.connectReadOnly();
      termsActivated = await iAgreement.termsActivated();
      termsAccepted = await iAgreement.getAgreementStatus(userAddress);
      termsURI = await iAgreement.userAgreement();
      termsActivated = await iAgreement.termsActivated();
    }

    const termsLink = resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX);
    this.base.debug('Loaded terms state', { termsActivated, termsAccepted, termsLink, termsVersion });

    return { termsActivated, termsAccepted, termsLink, termsVersion };
  }

  async acceptTerms(signer: Signerish): Promise<ContractTransaction | null> {
    const acceptTerms = this.getPartition('acceptTerms')(this.base.interfaces);

    let acceptTx: ContractTransaction | null = null;
    try {
      if (acceptTerms.v2) {
        const iAgreement = acceptTerms.v2.connectWith(signer);
        acceptTx = await iAgreement.acceptTerms();
      } else if (acceptTerms.v1) {
        const iAgreement = acceptTerms.v1.connectWith(signer);
        acceptTx = await iAgreement['acceptTerms()']();
      } else if (acceptTerms.v0) {
        const iAgreement = acceptTerms.v0.connectWith(signer);
        acceptTx = await iAgreement.acceptTerms();
      } else {
        throw new Error(`Cannot accept terms because no supported feature on contract`);
      }
    } catch (err) {
      this.base.error('Failed to accept terms', err, 'agreements.acceptTerms', undefined, signer);
    }
    if (acceptTx) {
      this.base.debug('Terms accepted', acceptTx);
    }
    return acceptTx;
  }

  async estimateGasForAcceptTerms(signer: Signerish): Promise<BigNumber | null> {
    const acceptTerms = this.getPartition('acceptTerms')(this.base.interfaces);

    let gas: BigNumber | null = null;
    try {
      if (acceptTerms.v2) {
        const iAgreement = acceptTerms.v2.connectWith(signer);
        gas = await iAgreement.estimateGas.acceptTerms();
      } else if (acceptTerms.v1) {
        const iAgreement = acceptTerms.v1.connectWith(signer);
        gas = await iAgreement.estimateGas['acceptTerms()']();
      } else if (acceptTerms.v0) {
        const iAgreement = acceptTerms.v0.connectWith(signer);
        gas = await iAgreement.estimateGas.acceptTerms();
      } else {
        throw new Error(`Cannot accept terms because no supported feature on contract`);
      }
    } catch (err) {
      this.base.error('Failed to accept terms', err, 'agreements.acceptTerms', undefined, signer);
    }
    return gas;
  }
}
