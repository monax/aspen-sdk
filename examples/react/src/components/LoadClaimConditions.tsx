import { ClaimConditionsState } from "@monaxlabs/aspen-sdk/dist/contracts";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

const LoadClaimConditions: React.FC<{
  conditions: ClaimConditionsState | null;
}> = ({ conditions }) => {
  if (!conditions) return null;

  const maxClaimableSupply = conditions.maxClaimableSupply.gt(1e9)
    ? Infinity
    : conditions.maxClaimableSupply.toString();

  return (
    <>
      <div className={styles.card}>
        <h4>Active Claim Conditions : </h4>
        <p>
          Max Claimable Supply :{" "}
          {maxClaimableSupply === Infinity ? "∞" : maxClaimableSupply}
        </p>
        {conditions.pricePerToken && (
          <p>
            Price Per Token :{" "}
            {ethers.utils.formatEther(conditions.pricePerToken)}
          </p>
        )}
      </div>
      <div className={styles.card}>
        <h4>User Claim Conditions : </h4>
        <p>Wallet Claim Count : {conditions.walletClaimCount.toString()}</p>
        {conditions.walletClaimedCountInPhase && (
          <p>
            Wallet Claimed Count In Phase :{" "}
            {conditions.walletClaimedCountInPhase.toString()}
          </p>
        )}
      </div>

      <div className={styles.card}>
        <h4>User Claim Restrictions : </h4>
        <p>Available Quantity : {conditions.availableQuantity.toString()}</p>
        <p>
          Can Claim Tokens :{" "}
          {conditions.canClaimTokens ? "YES" : `NO (${conditions.claimState})`}
        </p>
        <p>Can Mint After : {conditions.canMintAfter.toDateString()}</p>
        <p>Wallet Allow List Status : {conditions.allowlist.status}</p>
      </div>
    </>
  );
};

export default LoadClaimConditions;
