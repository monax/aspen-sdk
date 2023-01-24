import { BigNumber, ContractTransaction } from 'ethers';
import { Address, CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { FeatureSet } from '../features';
import type { Signerish, TermsUserAcceptanceState } from '../types';

const handledFeatures = [
  'agreement/IAgreement.sol:ICedarAgreementV0',
  'agreement/ICedarAgreement.sol:ICedarAgreementV0',
  'agreement/IAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV1',
] as const;

export class Agreements extends FeatureSet<(typeof handledFeatures)[number]> {
  constructor(base: CollectionContract) {
    super(base, handledFeatures);
  }
  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    // Split the handled features into groups that can be handled on the same path for each function
    // It is a compile-time error to omit a feature from handledFeatures in each partition
    const getState = partitioner({
      cedarAgreementV0: [
        'agreement/ICedarAgreement.sol:ICedarAgreementV0',
        'agreement/IAgreement.sol:ICedarAgreementV0',
      ],
      cedarAgreementV1: [
        'agreement/IAgreement.sol:ICedarAgreementV1',
        'agreement/ICedarAgreement.sol:ICedarAgreementV1',
      ],
      publicAgreement: [
        'agreement/ICedarAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV1',
      ],
    });
    const acceptTerms = partitioner({
      plainAccept: [
        'agreement/ICedarAgreement.sol:ICedarAgreementV0',
        'agreement/IAgreement.sol:ICedarAgreementV0',
        'agreement/ICedarAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV1',
      ],
      overloadedAccept: [
        'agreement/IAgreement.sol:ICedarAgreementV1',
        'agreement/ICedarAgreement.sol:ICedarAgreementV1',
      ],
    });
    return { getState, acceptTerms };
  });

  async getState(userAddress: Address): Promise<TermsUserAcceptanceState> {
    let termsActivated = false;
    let termsAccepted = false;
    let termsURI = '';
    let termsVersion = 0;

    const { cedarAgreementV0, cedarAgreementV1, publicAgreement } = this.getPartition('getState')(this.base.interfaces);

    if (publicAgreement) {
      const agreement = await publicAgreement.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await agreement.getTermsDetails());
      termsAccepted = await agreement['hasAcceptedTerms(address)'](userAddress);
    } else if (cedarAgreementV1) {
      const agreement = await cedarAgreementV1.connectReadOnly();
      ({ termsActivated, termsVersion, termsURI } = await agreement.getTermsDetails());
      termsAccepted = await agreement.hasAcceptedTerms(userAddress);
    } else if (cedarAgreementV0) {
      const agreement = cedarAgreementV0.connectReadOnly();
      termsActivated = await agreement.termsActivated();
      termsAccepted = await agreement.getAgreementStatus(userAddress);
      termsURI = await agreement.userAgreement();
      termsActivated = await agreement.termsActivated();
    }

    const termsLink = resolveIpfsUrl(termsURI, IPFS_GATEWAY_PREFIX);
    this.base.debug('Loaded terms state', { termsActivated, termsAccepted, termsLink });
    return { termsActivated, termsAccepted, termsLink: termsLink, termsVersion };
  }

  async acceptTerms(signer: Signerish): Promise<ContractTransaction | null> {
    const { plainAccept, overloadedAccept } = this.getPartition('acceptTerms')(this.base.interfaces);

    let acceptTx: ContractTransaction | null = null;
    try {
      if (plainAccept) {
        const agreement = plainAccept.connectWith(signer);
        acceptTx = await agreement.acceptTerms();
      } else if (overloadedAccept) {
        const agreement = overloadedAccept.connectWith(signer);
        acceptTx = await agreement['acceptTerms()']();
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
    const { plainAccept, overloadedAccept } = this.getPartition('acceptTerms')(this.base.interfaces);

    let gas: BigNumber | null = null;
    try {
      if (plainAccept) {
        const agreement = plainAccept.connectWith(signer);
        gas = await agreement.estimateGas.acceptTerms();
      } else if (overloadedAccept) {
        const agreement = overloadedAccept.connectWith(signer);
        gas = await agreement.estimateGas['acceptTerms()']();
      } else {
        throw new Error(`Cannot accept terms because no supported feature on contract`);
      }
    } catch (err) {
      this.base.error('Failed to accept terms', err, 'agreements.acceptTerms', undefined, signer);
    }
    return gas;
  }
}
