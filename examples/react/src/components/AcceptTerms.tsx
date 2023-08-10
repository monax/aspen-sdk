import { Web3Provider } from '@ethersproject/providers';
import { CollectionContract } from '@monaxlabs/aspen-sdk';
import { useWeb3React } from '@web3-react/core';
import { TermsUserAcceptanceState } from 'pages';
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/Home.module.css';

const AcceptTerms: React.FC<{
  contract: CollectionContract;
  termsInfo: TermsUserAcceptanceState | null;
}> = ({ contract, termsInfo }) => {
  const { library } = useWeb3React<Web3Provider>();
  const { addToast } = useToasts();

  if (!library) {
    addToast('web3React library unexpectedly null', {
      appearance: 'error',
      autoDismiss: true,
    });
    return null;
  }

  const handleAcceptTerms = () => contract.acceptTerms(library.getSigner());

  return (
    <div>
      {termsInfo && termsInfo.termsActivated && (
        <div className={styles.card}>
          <h4>Terms of Service Agreement Required : </h4>
          {!termsInfo.termsAccepted && (
            <button className={styles.button} type="button" onClick={handleAcceptTerms}>
              Agree to Terms
            </button>
          )}

          <a className={styles.button} type="button" href={termsInfo.termsLink} target="_blank" rel="noreferrer">
            View Terms
          </a>
        </div>
      )}
    </div>
  );
};

export default AcceptTerms;
