import {
  ActiveClaimConditions,
  CollectionUserClaimConditions,
  UserClaimConditions,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

const LoadClaimConditions: React.FC<{
  userClaimConditions: UserClaimConditions | null;
  userClaimRestrictions: CollectionUserClaimConditions | null;
  activeClaimConditions: ActiveClaimConditions | null;
}> = ({
  userClaimConditions,
  userClaimRestrictions,
  activeClaimConditions,
}) => {
  const maxClaimableSupply =
    activeClaimConditions?.activeClaimCondition.maxClaimableSupply.gt(1e9)
      ? Infinity
      : activeClaimConditions?.activeClaimCondition.maxClaimableSupply.toString();

  return (
    <>
      {activeClaimConditions && (
        <div className={styles.card}>
          <h4>Active Claim Conditions : </h4>
          <p>Max Claimable Supply : {maxClaimableSupply === Infinity ? '∞' : maxClaimableSupply}</p>
          {activeClaimConditions.activeClaimCondition.pricePerToken && (
            <p>
              Price Per Token :{" "}
              {ethers.utils.formatEther(
                activeClaimConditions?.activeClaimCondition.pricePerToken
              )}
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
            {userClaimRestrictions.canClaimTokens ? "YES" : "NO"}
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
