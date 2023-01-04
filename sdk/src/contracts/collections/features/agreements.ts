import { BigNumber, ContractTransaction } from 'ethers';
import { resolveIpfsUrl } from '../../../ipfs';
import { Address, isSameAddress } from '../../address';
import { IPFS_GATEWAY_PREFIX, ZERO_ADDRESS } from '../../constants';
import { Signerish } from '../../providers';
import { Features } from '../features';
import type { TermsUserAcceptanceState } from '../types';

export class Agreements extends Features {
  /**
   * @returns True if the contract supports Agreement interface
   */
  get supported(): boolean {
    const interfaces = this.base.interfaces;

    return !!(
      (interfaces['agreement/IAgreement.sol:ICedarAgreementV0'] || interfaces['agreement/IAgreement.sol:ICedarAgreementV1'] || interfaces['agreement/IAgreement.sol:IPublicAgreementV0'])
      // || interfaces.IPublicAgreementV1
    );
  }

  async getState(userAddress: Address): Promise<TermsUserAcceptanceState> {
    const interfaces = this.base.interfaces;
    let termsActivated = false;
    let termsAccepted = false;
    let termsLink = '';
    let termsVersion = 0;

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      [termsActivated, termsAccepted, termsLink] = await Promise.all([
        this.getTermsActivated(),
        isSameAddress(userAddress, ZERO_ADDRESS) ? false : this.getTermsAccepted(userAddress),
        this.getTermsLink(),
      ]);
    } else if (interfaces['agreement/IAgreement.sol:ICedarAgreementV1']) {
      const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV1'].connectReadOnly();
      const [accepted, details] = await Promise.all([
        isSameAddress(userAddress, ZERO_ADDRESS) ? false : iAgreements.hasAcceptedTerms(userAddress),
        iAgreements.getTermsDetails(),
      ]);
      termsAccepted = accepted;
      termsActivated = details.termsActivated;
      termsLink = resolveIpfsUrl(details.termsURI, IPFS_GATEWAY_PREFIX);
      termsVersion = details.termsVersion;
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV0']) {
      const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV0'].connectReadOnly();
      const [accepted, details] = await Promise.all([
        isSameAddress(userAddress, ZERO_ADDRESS) ? false : iAgreements['hasAcceptedTerms(address)'](userAddress),
        iAgreements.getTermsDetails(),
      ]);
      termsAccepted = accepted;
      termsActivated = details.termsActivated;
      termsLink = resolveIpfsUrl(details.termsURI, IPFS_GATEWAY_PREFIX);
      termsVersion = details.termsVersion;
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV1']) {
      const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV1'].connectReadOnly();
      const [accepted, details] = await Promise.all([
        isSameAddress(userAddress, ZERO_ADDRESS) ? false : iAgreements['hasAcceptedTerms(address)'](userAddress),
        iAgreements.getTermsDetails(),
      ]);
      termsAccepted = accepted;
      termsActivated = details.termsActivated;
      termsLink = resolveIpfsUrl(details.termsURI, IPFS_GATEWAY_PREFIX);
      termsVersion = details.termsVersion;
    }

    this.base.debug('Loaded terms state', { termsActivated, termsAccepted, termsLink });

    return { termsActivated, termsAccepted, termsLink, termsVersion };
  }

  protected async getTermsActivated(): Promise<boolean> {
    const interfaces = this.base.interfaces;

    let termsActivated = false;

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV0'].connectReadOnly();
        termsActivated = await iAgreements.termsActivated();
        this.base.debug('Loaded termsActivated', termsActivated);
      } catch (err) {
        this.base.error('Failed to load termsActivated', err, 'agreements.getTermsActivated');
      }
    } else {
      const err = new Error("Contract doesn't support agreements interface");
      this.base.error('Failed to load termsActivated', err, 'agreements.getTermsActivated');
    }

    return termsActivated;
  }

  protected async getTermsLink(): Promise<string> {
    const interfaces = this.base.interfaces;

    let termsLink = '';

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV0'].connectReadOnly();
        termsLink = resolveIpfsUrl(await iAgreements.userAgreement(), IPFS_GATEWAY_PREFIX);
        this.base.debug('Loaded termsLink', termsLink);
      } catch (err) {
        this.base.error('Failed to load termsLink', err, 'agreements.getTermsLink');
      }
    } else {
      const err = new Error("Contract doesn't support agreements interface");
      this.base.error('Failed to load termsLink', err, 'agreements.getTermsLink');
    }

    return termsLink;
  }

  protected async getTermsAccepted(userAddress: Address): Promise<boolean> {
    const interfaces = this.base.interfaces;

    let termsAccepted = false;

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV0'].connectReadOnly();
        termsAccepted = await iAgreements.getAgreementStatus(userAddress);
        this.base.debug('Loaded termsAccepted', termsAccepted);
      } catch (err) {
        this.base.error('Failed to load termsAccepted', err, 'agreements.getTermsAccepted', { userAddress });
      }
    } else {
      const err = new Error("Contract doesn't support agreements interface");
      this.base.error('Failed to load termsAccepted', err, 'agreements.getTermsAccepted');
    }

    return termsAccepted;
  }

  async acceptTerms(signer: Signerish): Promise<ContractTransaction | null> {
    const interfaces = this.base.interfaces;

    let acceptTx: ContractTransaction | null = null;

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV0'].connectWith(signer);
        acceptTx = await iAgreements.acceptTerms();
        this.base.debug('Accepted terms', acceptTx);
      } catch (err) {
        this.base.error('Failed to accept terms', err, 'agreements.acceptTerms', undefined, signer);
      }
    } else if (interfaces['agreement/IAgreement.sol:ICedarAgreementV1']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV1'].connectWith(signer);
        acceptTx = await iAgreements['acceptTerms()']();
        this.base.debug('Accepted terms', acceptTx);
      } catch (err) {
        this.base.error('Failed to accept terms', err, 'agreements.acceptTerms');
      }
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV0'].connectWith(signer);
        acceptTx = await iAgreements.acceptTerms();
        this.base.debug('Accepted terms', acceptTx);
      } catch (err) {
        this.base.error('Failed to accept terms', err, 'agreements.acceptTerms');
      }
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV1']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV1'].connectWith(signer);
        acceptTx = await iAgreements.acceptTerms();
        this.base.debug('Accepted terms', acceptTx);
      } catch (err) {
        this.base.error('Failed to accept terms', err, 'agreements.acceptTerms');
      }
    } else {
      const err = new Error("Contract doesn't support agreements interface");
      this.base.error('Failed to accept terms', err, 'agreements.acceptTerms', undefined, signer);
    }

    return acceptTx;
  }

  async estimateGasForAcceptTerms(signer: Signerish): Promise<BigNumber | null> {
    const interfaces = this.base.interfaces;

    if (interfaces['agreement/IAgreement.sol:ICedarAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV0'].connectWith(signer);
        return await iAgreements.estimateGas.acceptTerms();
      } catch (err) {
        this.base.error(
          'Failed to estimate gas for accept terms',
          err,
          'agreements.estimateGasForAcceptTerms',
          undefined,
          signer,
        );
      }
    } else if (interfaces['agreement/IAgreement.sol:ICedarAgreementV1']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:ICedarAgreementV1'].connectWith(signer);
        return await iAgreements.estimateGas['acceptTerms()']();
      } catch (err) {
        this.base.error('Failed to estimate gas for accept terms', err, 'agreements.estimateGasForAcceptTerms');
      }
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV0']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV0'].connectWith(signer);
        return await iAgreements.estimateGas.acceptTerms();
      } catch (err) {
        this.base.error('Failed to estimate gas for accept terms', err, 'agreements.estimateGasForAcceptTerms');
      }
    } else if (interfaces['agreement/IAgreement.sol:IPublicAgreementV1']) {
      try {
        const iAgreements = interfaces['agreement/IAgreement.sol:IPublicAgreementV1'].connectWith(signer);
        return await iAgreements.estimateGas.acceptTerms();
      } catch (err) {
        this.base.error('Failed to estimate gas for accept terms', err, 'agreements.estimateGasForAcceptTerms');
      }
    } else {
      const err = new Error("Contract doesn't support agreements interface");
      this.base.error(
        'Failed to estimate gas for accept terms',
        err,
        'agreements.estimateGasForAcceptTerms',
        undefined,
        signer,
      );
    }

    return null;
  }
}
