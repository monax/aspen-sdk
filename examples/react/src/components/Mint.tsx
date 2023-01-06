import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";

import { useWeb3React } from "@web3-react/core";
import { Address, CollectionContract, parse } from "@monaxlabs/aspen-sdk";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

const Mint: React.FC<{ contract: CollectionContract; tokenId: string }> = ({
  contract,
  tokenId,
}) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [canMint, setCanMint] = useState(false);
  const [activeClaimConditions, setActiveClaimConditions] = useState(null);

  const onMint = async () => {
    if (!library) return;

    await contract.issuance.claim(
      library.getSigner(),
      parse(Address, account),
      tokenId,
      BigNumber.from(1),
      activeClaimConditions.activeClaimCondition.currency,
      activeClaimConditions.activeClaimCondition.pricePerToken,
      [],
      BigNumber.from(0)
    );
  };

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const activeConditions =
        await contract?.issuance.getActiveClaimConditions(tokenId);
      setActiveClaimConditions(activeConditions);

      if (account) {
        const userConditions = await contract?.issuance.getUserClaimConditions(
          account as Address,
          tokenId
        );

        const restrictions = await contract?.issuance.getUserClaimRestrictions(
          userConditions,
          activeConditions,
          [],
          0
        );
        setCanMint(restrictions.claimState === "ok" ? true : false);
      }
    })();
  }, [contract, account, tokenId]);

  return (
    <div>
      {canMint && (
        <button className={styles.button} type="button" onClick={onMint}>
          Mint
        </button>
      )}
    </div>
  );
};

export default Mint;