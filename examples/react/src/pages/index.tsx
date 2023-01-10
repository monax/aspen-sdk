import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Web3Provider } from "@ethersproject/providers";
import {
  ActiveClaimConditions,
  Address,
  CollectionContract,
  CollectionUserClaimConditions,
  TermsUserAcceptanceState,
  UserClaimConditions,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import AcceptTerms from "components/AcceptTerms";
import Select from "components/common/Select";
import ConnectWallet from "components/ConnectWallet";
import LoadClaimConditions from "components/LoadClaimConditions";
import Mint from "components/Mint";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const DELAY = 30000;

const Home: NextPage = () => {
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_TEST_CONTRACT ||
      "0xfe66131bF7f81bE9aeDf1ae58284ec17484E5Da9"
  );

  const [contract, setContract] = useState<CollectionContract | null>(null);
  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState("0");
  const [termsInfo, setTermsInfo] = useState<TermsUserAcceptanceState | null>(
    null
  );
  const { account, active, library } = useWeb3React<Web3Provider>();
  const [userClaimConditions, setUserClaimConditions] =
    useState<UserClaimConditions | null>(null);
  const [userClaimRestrictions, setUserClaimRestrictions] =
    useState<CollectionUserClaimConditions | null>(null);
  const [activeClaimConditions, setActiveClaimConditions] =
    useState<ActiveClaimConditions | null>(null);

  const loadClaimConditions = useCallback(async () => {
    if (!contract) return;
    const activeConditions = await contract.issuance.getActiveClaimConditions(
      selectedToken
    );
    setActiveClaimConditions(activeConditions);

    if (account) {
      const userConditions = await contract.issuance.getUserClaimConditions(
        account as Address,
        selectedToken
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
  }, [account, contract, selectedToken]);

  useEffect(() => {
    loadClaimConditions();
    const interval = setInterval(() => {
      loadClaimConditions();
    }, DELAY);
    return () => clearInterval(interval);
  }, [loadClaimConditions]);

  useEffect(() => {
    if (!active || !library) return;
    (async () => {
      const collectionContract = new CollectionContract(
        library,
        parse(Address, contractAddress)
      );
      await collectionContract.load();
      setContract(collectionContract);

      let tokensCount = await collectionContract.issuance.getTokensCount();
      setTokens(Array.from(Array(tokensCount.toNumber()).keys()));
    })();
  }, [active, library, contractAddress]);

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
      <main className={styles.main}>
        <h2>Aspen SDK Example </h2>
        <p>
          The examples are with contracts that are deployed on Mumbai, make sure
          to connect to the correct Network
        </p>
        <ConnectWallet />
        {active && contract && (
          <div className={styles.container}>
            <div className={styles.flex}>
              <p>Contract Address : </p>
              <input
                className={styles.input}
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>
            <div className={styles.flex}>
              <p>Select Token : </p>
              <Select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                options={tokens.map((t) => String(t))}
              />
            </div>

            <LoadClaimConditions
              userClaimConditions={userClaimConditions}
              userClaimRestrictions={userClaimRestrictions}
              activeClaimConditions={activeClaimConditions}
            />
            <AcceptTerms contract={contract} termsInfo={termsInfo} />
            <Mint
              userClaimRestrictions={userClaimRestrictions}
              activeClaimConditions={activeClaimConditions}
              contract={contract}
              tokenId={selectedToken}
              termsInfo={termsInfo}
              onUpdate={loadClaimConditions}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
