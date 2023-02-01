import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { Address, CollectionContract, IPFS_GATEWAY_PREFIX } from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs.js';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides, TermsUserAcceptanceState } from '../types';
import { FeatureSet } from './features';

export const AgreementsFeatures = [
  'agreement/IAgreement.sol:ICedarAgreementV0',
  'agreement/IAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:ICedarAgreementV0',
  'agreement/ICedarAgreement.sol:ICedarAgreementV1',
  'agreement/ICedarAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV0',
  'agreement/IAgreement.sol:IPublicAgreementV1',
  'agreement/IAgreement.sol:IRestrictedAgreementV0',
  'agreement/IAgreement.sol:IRestrictedAgreementV1',
  'agreement/ICedarAgreement.sol:IRestrictedAgreementV0',
  'agreement/IAgreement.sol:IDelegatedAgreementV0',
] as const;

export type AgreementsFeatures = (typeof AgreementsFeatures)[number];

export class Agreements extends FeatureSet<AgreementsFeatures> {
  constructor(base: CollectionContract) {
    super(base, AgreementsFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const acceptTerms = partitioner({
      v0: ['agreement/ICedarAgreement.sol:ICedarAgreementV0', 'agreement/IAgreement.sol:ICedarAgreementV0'],
      v1: ['agreement/IAgreement.sol:ICedarAgreementV1', 'agreement/ICedarAgreement.sol:ICedarAgreementV1'],
      p0: [
        'agreement/ICedarAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV0',
        'agreement/IAgreement.sol:IPublicAgreementV1',
      ],
      r0: [
        'agreement/IAgreement.sol:IRestrictedAgreementV0',
        'agreement/IAgreement.sol:IRestrictedAgreementV1',
        'agreement/ICedarAgreement.sol:IRestrictedAgreementV0',
      ],
      delegated: ['agreement/IAgreement.sol:IDelegatedAgreementV0'],
    });

    return { acceptTerms };
  });

  async getState(userAddress: Address): Promise<TermsUserAcceptanceState> {
    let termsActivated = false;
    let termsAccepted = false;
    let termsURI = '';
    let termsVersion = 0;

    const { v0, v1, p0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    if (p0) {
      const iAgreement = await p0.connectReadOnly();
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

  async acceptTerms(signer: Signerish, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const { v0, v1, p0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (p0) {
        const tx = await p0.connectWith(signer).acceptTerms(overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer)['acceptTerms()'](overrides);
        return tx;
      } else if (v0) {
        const tx = await v0.connectWith(signer).acceptTerms(overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements' });
  }

  async estimateGasForAcceptTerms(signer: Signerish): Promise<BigNumber> {
    const { v0, v1, p0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (p0) {
        const estimate = await p0.connectWith(signer).estimateGas.acceptTerms();
        return estimate;
      } else if (v1) {
        const estimate = await v1.connectWith(signer).estimateGas['acceptTerms()']();
        return estimate;
      } else if (v0) {
        const estimate = await v0.connectWith(signer).estimateGas.acceptTerms();
        return estimate;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements' });
  }

  async acceptTermsWithSignature(
    signer: Signerish,
    acceptor: Address,
    signature: string,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, delegated } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (delegated) {
        const tx = await delegated.connectWith(signer).acceptTerms(acceptor, signature, overrides);
        return tx;
      } else if (v0) {
        const tx = await v0.connectWith(signer).storeTermsAccepted(acceptor, signature, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements' });
  }

  async hasAcceptedTermsVersion(userAddress: Address, version: BigNumberish): Promise<boolean> {
    const { p0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (p0) {
        const accepted = await p0.connectReadOnly()['hasAcceptedTerms(address,uint8)'](userAddress, version);
        return accepted;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, {
      feature: 'agreements',
      function: 'hasAcceptedTermsVersion',
    });
  }

  /** ISSUER role required */
  async setTermsStatus(
    signer: Signerish,
    termsEnabled: boolean,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, v1, r0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (r0) {
        const tx = r0.connectWith(signer).setTermsActivation(termsEnabled, overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer).setTermsActivation(termsEnabled, overrides);
        return tx;
      } else if (v0) {
        const tx = v0.connectWith(signer).setTermsStatus(termsEnabled, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements', function: 'setTermsStatus' });
  }

  /** ISSUER role required */
  async setTermsUri(signer: Signerish, termsUri: string, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    const { v1, r0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (r0) {
        const tx = r0.connectWith(signer).setTermsURI(termsUri, overrides);
        return tx;
      } else if (v1) {
        const tx = await v1.connectWith(signer).setTermsURI(termsUri, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements', function: 'setTermsUri' });
  }

  /** ISSUER role required */
  async acceptTermsFor(
    signer: Signerish,
    acceptor: Address,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v1, r0 } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (v1) {
        const tx = await v1.connectWith(signer)['acceptTerms(address)'](acceptor, overrides);
        return tx;
      } else if (r0) {
        const tx = await r0.connectWith(signer).acceptTerms(acceptor, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements', function: 'acceptTermsFor' });
  }

  /** ISSUER role required */
  async acceptTermsForMany(
    signer: Signerish,
    acceptors: Address[],
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { delegated } = this.getPartition('acceptTerms')(this.base.interfaces);

    try {
      if (delegated) {
        const tx = await delegated.connectWith(signer).batchAcceptTerms(acceptors, overrides);
        return tx;
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'agreements', function: 'acceptTermsForMany' });
  }
}
