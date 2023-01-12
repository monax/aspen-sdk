import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import {
  ActiveClaimConditions,
  Address,
  CollectionContract,
  CollectionUserClaimConditions,
  TermsUserAcceptanceState,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";

const Mint: React.FC<{
  contract: CollectionContract;
  tokenId: string;
  userClaimRestrictions: CollectionUserClaimConditions | null;
  activeClaimConditions: ActiveClaimConditions | null;
  termsInfo: TermsUserAcceptanceState | null;
  onUpdate: () => void;
  onError: (error: string) => void;
}> = ({
  contract,
  tokenId,
  activeClaimConditions,
  userClaimRestrictions,
  termsInfo,
  onUpdate,
  onError,
}) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [canMint, setCanMint] = useState(false);
  const [loadingMintButton, setLoadingMintButton] = useState(false);

  const onMint = async () => {
    if (!library || loadingMintButton) return;

    if (!activeClaimConditions) {
      onError("No active claim condition");
      return;
    }

    setLoadingMintButton(true);

    await (async () => {
      const verifyClaim = await contract.issuance.verifyClaim(
        activeClaimConditions?.activeClaimConditionId,
        parse(Address, account),
        tokenId,
        1,
        activeClaimConditions.activeClaimCondition.currency,
        activeClaimConditions.activeClaimCondition.pricePerToken,
        true
      );
      if (!verifyClaim) return;
      try {
        const tx = await contract.issuance.claim(
          library.getSigner(),
          parse(Address, account),
          tokenId,
          BigNumber.from(1),
          activeClaimConditions.activeClaimCondition.currency,
          activeClaimConditions.activeClaimCondition.pricePerToken,
          [],
          BigNumber.from(0)
        );

        if (tx) {
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            onUpdate();
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMintButton(false);
      }
    })();
  };

  useEffect(() => {
    setCanMint(userClaimRestrictions?.claimState === "ok");
  }, [userClaimRestrictions]);

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
