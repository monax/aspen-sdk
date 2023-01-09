import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import {
  ActiveClaimConditions,
  Address,
  CollectionContract,
  CollectionUserClaimConditions,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

const Mint: React.FC<{
  contract: CollectionContract;
  tokenId: string;
  userClaimRestrictions: CollectionUserClaimConditions | null;
  activeClaimConditions: ActiveClaimConditions | null;
  onUpdate: () => void;
}> = ({
  contract,
  tokenId,
  activeClaimConditions,
  userClaimRestrictions,
  onUpdate,
}) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [canMint, setCanMint] = useState(false);
  const [loadingMintButton, setLoadingMintButton] = useState(false);

  const onMint = async () => {
    if (!library) return;
    setLoadingMintButton(true)

    if (!activeClaimConditions) {
      throw new Error(`No active claim condition`);
    }


    (async () => {
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
      try {
        if (tx) {
          const receipt = await tx.wait();
          if (receipt.status === 1) {
            onUpdate();
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingMintButton(false)
      }
    })();
  };

  useEffect(() => {
    if (!contract) return;
    (async () => {
      if (account) {
        setCanMint(userClaimRestrictions?.claimState === "ok");
      }
    })();
  }, [contract, account, tokenId, userClaimRestrictions?.claimState]);

  const query = new URLSearchParams({
    walletAddress: `${account}`,
    collectionGuid: process.env.NEXT_PUBLIC_TEST_CONTRACT_GUID!,
    tokenId,
  });

  return (
    <div className="flex">
      {canMint && (
        <div className={styles.footer}>
          <button className={loadingMintButton? styles.loading : styles.button} type="button" onClick={onMint}>
            Mint
          </button>
          {/* <a
            className={styles.button}
            type="button"
            href="https://buy.stripe.com/test_9AQ8wSfnlbNFb0QcMO"
            target="_blank"
            rel="noreferrer"
          >
            Mint with fiat
          </a> */}

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
