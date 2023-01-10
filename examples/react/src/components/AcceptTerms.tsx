import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import {
  CollectionContract,
  TermsUserAcceptanceState,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { useWeb3React } from "@web3-react/core";

const AcceptTerms: React.FC<{
  contract: CollectionContract;
  termsInfo: TermsUserAcceptanceState | null;
  onError: (error: string) => void;
}> = ({ contract, termsInfo, onError }) => {
  const { library } = useWeb3React<Web3Provider>();

  if (!library) {
    // FIXME: can we do better than this?
    onError(`web3React library unexpectedly null`);
    return null;
  }

  const handleAcceptTerms = () =>
    contract.agreements.acceptTerms(library.getSigner());

  return (
    <div>
      {termsInfo && termsInfo.termsActivated && (
        <div className={styles.card}>
          <h4>Terms of Service Agreement Required : </h4>
          {!termsInfo.termsAccepted && (
            <button
              className={styles.button}
              type="button"
              onClick={handleAcceptTerms}
            >
              Agree to Terms
            </button>
          )}

          <a
            className={styles.button}
            type="button"
            href={termsInfo.termsLink}
            target="_blank"
            rel="noreferrer"
          >
            View Terms
          </a>
        </div>
      )}
    </div>
  );
};

export default AcceptTerms;
