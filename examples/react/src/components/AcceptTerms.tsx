import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import {
  Address,
  CollectionContract,
  TermsUserAcceptanceState,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const AcceptTerms: React.FC<{ contract: CollectionContract }> = ({
  contract,
}) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [termsInfo, setTermsInfo] = useState<TermsUserAcceptanceState | null>(
    null
  );

  if (!library) {
    // FIXME: can we do better than this?
    throw new Error(`web3React library unexpectedly null`);
  }

  const handleAcceptTerms = () =>
    contract.agreements.acceptTerms(library.getSigner());

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const acceptTerms = await contract.agreements.getState(
        parse(Address, account)
      );
      setTermsInfo(acceptTerms);
    })();
  }, [contract, account]);

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
