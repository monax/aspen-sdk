import styles from "../styles/Home.module.css";
import { Web3Provider } from "@ethersproject/providers";
import {
  Address,
  ClaimConditionsState,
  CollectionContract,
  PendingClaim,
  parse,
} from "@monaxlabs/aspen-sdk";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { Options as ToastOptions, useToasts } from "react-toast-notifications";
import { TermsUserAcceptanceState } from "pages";

const TOAST_SUCCESS: ToastOptions = {
  appearance: "success",
  autoDismiss: true,
};
const TOAST_INFO: ToastOptions = {
  appearance: "info",
  autoDismiss: true,
};
const TOAST_ERROR: ToastOptions = {
  appearance: "error",
  autoDismiss: true,
};

const Mint: React.FC<{
  contract: CollectionContract;
  tokenId: string;
  conditions: ClaimConditionsState | null;
  termsInfo: TermsUserAcceptanceState | null;
  onUpdate: () => void;
}> = ({ contract, tokenId, conditions, termsInfo, onUpdate }) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [canMint, setCanMint] = useState(false);
  const [loadingMintButton, setLoadingMintButton] = useState(false);
  const { addToast } = useToasts();

  const onMint = () => {
    if (!library || loadingMintButton) return;

    if (!conditions) {
      addToast("No active claim condition", TOAST_ERROR);
      return;
    }

    setLoadingMintButton(true);

    const pendingClaim = new PendingClaim(contract, tokenId, conditions);
    const signer = library.getSigner();
    const recipient = parse(Address, account);
    const overrides = undefined;
    const qty = 1; // quantity

    pendingClaim.processCallback(signer, recipient, qty, overrides, (state) => {
      switch (state.status) {
        case "verifying-claim":
          addToast("Verifying the claim", TOAST_INFO);
          return;
        case "verification-failed":
          addToast("Claim did not verify!", TOAST_ERROR);
          setLoadingMintButton(false);
          return;
        case "signing-transaction":
          addToast("Waiting for transaction signature", TOAST_INFO);
          return;
        case "cancelled-transaction":
          addToast("Claim did not verify!", TOAST_ERROR);
          setLoadingMintButton(false);
          return;
        case "pending-transaction":
          const msg = "Transaction created! Waiting for confirmation.";
          addToast(msg, TOAST_INFO);
          return;
        case "transaction-failed":
          addToast("Claim transaction failed!", TOAST_ERROR);
          setLoadingMintButton(false);
          return;
        case "success":
          addToast("Successfully claimed a token!", TOAST_SUCCESS);
          onUpdate();
          setLoadingMintButton(false);
          return;
      }

      throw new Error("Unhandled claim state!");
    });
  };

  useEffect(() => {
    setCanMint(conditions?.claimState === "ok");
  }, [conditions]);

  const query = new URLSearchParams({
    walletAddress: `${account}`,
    collectionGuid: process.env.NEXT_PUBLIC_TEST_CONTRACT_GUID!,
    tokenId,
  });
  const termsAccepted = useMemo(
    () =>
      !termsInfo?.termsActivated ||
      (termsInfo?.termsActivated && termsInfo?.termsAccepted),
    [termsInfo]
  );

  return (
    <div className="flex">
      {canMint && termsAccepted && (
        <div className={styles.footer}>
          <button
            className={loadingMintButton ? styles.loading : styles.button}
            type="button"
            onClick={onMint}
          >
            Mint
          </button>
          <form
            id="mintToken"
            action={`/api/mint-with-fiat?${query.toString()}`}
            method="POST"
          >
            <button className={styles.button} type="submit">
              Mint with fiat
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Mint;
