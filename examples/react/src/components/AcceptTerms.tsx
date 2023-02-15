import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import { CollectionContract } from "@monaxlabs/aspen-sdk/dist/contracts";
import { useWeb3React } from "@web3-react/core";
import { useToasts } from "react-toast-notifications";
import { TermsUserAcceptanceState } from "pages";

const AcceptTerms: React.FC<{
  contract: CollectionContract;
  termsInfo: TermsUserAcceptanceState | null;
}> = ({ contract, termsInfo }) => {
  const { library } = useWeb3React<Web3Provider>();
  const { addToast } = useToasts();

  if (!library) {
    addToast("web3React library unexpectedly nulln", {
      appearance: "error",
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
