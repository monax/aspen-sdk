import { Web3Provider } from "@ethersproject/providers";
import {
  ActiveClaimConditions,
  Address,
  CollectionContract,
  CollectionUserClaimConditions,
  UserClaimConditions,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const LoadClaimConditions: React.FC<{
  contract: CollectionContract;
  tokenId: string;
}> = ({ contract, tokenId }) => {
  const { account } = useWeb3React<Web3Provider>();
  const [userClaimConditions, setUserClaimConditions] =
    useState<UserClaimConditions | null>(null);
  const [userClaimRestrictions, setUserClaimRestrictions] =
    useState<CollectionUserClaimConditions | null>(null);
  const [activeClaimConditions, setActiveClaimConditions] =
    useState<ActiveClaimConditions | null>(null);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const activeConditions = await contract.issuance.getActiveClaimConditions(
        tokenId
      );
      setActiveClaimConditions(activeConditions);

      if (account) {
        const userConditions = await contract.issuance.getUserClaimConditions(
          account as Address,
          "0"
        );

        if (!activeConditions) {
          throw new Error(`No active claim conditions`);
        }
        if (!userConditions) {
          throw new Error(`No user claim condition`);
        }
        setUserClaimConditions(userConditions);
        const restrictions = await contract.issuance.getUserClaimRestrictions(
          userConditions,
          activeConditions,
          [],
          0
        );
        setUserClaimRestrictions(restrictions);
      }
    })();
  }, [contract, account, tokenId]);

  return (
    <>
      {activeClaimConditions && (
        <div className={styles.card}>
          <h4>Active Claim Conditions : </h4>
          <p>
            Max Claimable Supply :{" "}
            {activeClaimConditions.activeClaimCondition.maxClaimableSupply.toString()}
          </p>
          {activeClaimConditions.activeClaimCondition.pricePerToken && (
            <p>
              Price Per Token :{" "}
              {activeClaimConditions.activeClaimCondition.pricePerToken.toString()}
            </p>
          )}
        </div>
      )}
      {userClaimConditions && (
        <div className={styles.card}>
          <h4>User Claim Conditions : </h4>
          <p>
            Wallet Claim Count :{" "}
            {userClaimConditions.walletClaimCount.toString()}
          </p>
          {userClaimConditions.walletClaimedCountInPhase && (
            <p>
              Wallet Claimed Count In Phase :{" "}
              {userClaimConditions.walletClaimedCountInPhase.toString()}
            </p>
          )}
        </div>
      )}
      {userClaimRestrictions && (
        <div className={styles.card}>
          <h4>User Claim Restrictions : </h4>
          <p>
            Available Quantity :{" "}
            {userClaimRestrictions.availableQuantity.toString()}
          </p>
          <p>
            Can Claim Tokens :{" "}
            {userClaimRestrictions.canClaimTokens ? "TRUE" : "FALSE"}
          </p>
          <p>
            Can Mint After : {userClaimRestrictions.canMintAfter.toDateString()}
          </p>
        </div>
      )}
    </>
  );
};

export default LoadClaimConditions;
