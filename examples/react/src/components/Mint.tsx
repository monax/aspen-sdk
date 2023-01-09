import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import {
  ActiveClaimConditions,
  Address,
  CollectionContract,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

const Mint: React.FC<{ contract: CollectionContract; tokenId: string }> = ({
  contract,
  tokenId,
}) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [canMint, setCanMint] = useState(false);
  const [activeClaimConditions, setActiveClaimConditions] =
    useState<ActiveClaimConditions | null>(null);

  const onMint = async () => {
    if (!library) return;

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
      if (tx) {
        const receipt = await tx.wait();
        if (receipt.status === 1) {
          const a = await contract.issuance.getClaimedTokenAssets(receipt);
          console.log(a)
        }
      }
    })();
  };

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const activeConditions = await contract.issuance.getActiveClaimConditions(
        tokenId
      );
      if (!activeConditions) {
        throw new Error(`No active claim condition`);
      }
      setActiveClaimConditions(activeConditions);

      if (account) {
        const userConditions = await contract?.issuance.getUserClaimConditions(
          account as Address,
          tokenId
        );

        if (!userConditions) {
          throw new Error(`No user claim conditions`);
        }

        const restrictions = await contract?.issuance.getUserClaimRestrictions(
          userConditions,
          activeConditions,
          [],
          0
        );
        setCanMint(restrictions.claimState === "ok");
      }
    })();
  }, [contract, account, tokenId]);

  const query = new URLSearchParams({
    walletAddress: `${account}`,
    collectionGuid: process.env.NEXT_PUBLIC_TEST_CONTRACT_GUID!,
    tokenId,
  });

  return (
    <div className="flex">
      {canMint && (
        <div className={styles.footer}>
          <button className={styles.button} type="button" onClick={onMint}>
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
