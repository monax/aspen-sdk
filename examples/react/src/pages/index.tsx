/* eslint-disable @next/next/no-img-element */
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
  TokenMetadata,
  UserClaimConditions,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import AcceptTerms from "components/AcceptTerms";
import Select from "components/common/Select";
import ConnectWallet from "components/ConnectWallet";
import LoadClaimConditions from "components/LoadClaimConditions";
import Mint from "components/Mint";

import {
  AllowlistStatus,
  Chain,
  getAllowlistStatus,
} from "@monaxlabs/aspen-sdk/dist/apis/publishing";
import { useToasts } from "react-toast-notifications";

type Metadata = {
  uri: string | null;
  metadata: TokenMetadata | null;
};

const DELAY = 10000;

const Home: NextPage = () => {
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_TEST_CONTRACT ||
      "0x8AC3e9b7D377526Da1f81f60d03e006ADd5A606b"
  );

  const [contract, setContract] = useState<CollectionContract | null>(null);
  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<Metadata | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [termsInfo, setTermsInfo] = useState<TermsUserAcceptanceState | null>(
    null
  );
  const { addToast } = useToasts();
  const { account, active, library } = useWeb3React<Web3Provider>();
  const [userClaimConditions, setUserClaimConditions] =
    useState<UserClaimConditions | null>(null);
  const [userClaimRestrictions, setUserClaimRestrictions] =
    useState<CollectionUserClaimConditions | null>(null);
  const [activeClaimConditions, setActiveClaimConditions] =
    useState<ActiveClaimConditions | null>(null);
  const [allowlistStatus, setAllowlistStatus] = useState<AllowlistStatus>({
    status: "no-allowlist",
    proofs: [],
    proofMaxQuantityPerTransaction: 0,
  });

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
        addToast("No active claim conditions", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      if (!userConditions) {
        addToast("No user claim condition", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      setUserClaimConditions(userConditions);

      try {
        const allowlistStatusValue = await getAllowlistStatus(
          contractAddress,
          account,
          Chain.MUMBAI,
          selectedToken
        );
        setAllowlistStatus(allowlistStatusValue);
        const { proofs, proofMaxQuantityPerTransaction } = allowlistStatusValue;
        const restrictions = await contract.issuance.getUserClaimRestrictions(
          userConditions,
          activeConditions,
          proofs,
          proofMaxQuantityPerTransaction
        );
        setUserClaimRestrictions(restrictions);
      } catch (error: any) {
        addToast(error?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }

      if (contract.erc1155.supported && selectedToken) {
        const balance = await contract.erc1155.balanceOf(
          account,
          selectedToken
        );
        setTokenBalance(balance.toString());
      }
    }
  }, [account, addToast, contract, contractAddress, selectedToken]);

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
  }, [active, library, contractAddress, selectedToken]);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const acceptTerms = await contract.agreements.getState(
        parse(Address, account)
      );
      setTermsInfo(acceptTerms);
    })();
  }, [contract, account]);

  useEffect(() => {
    if (!contract || !selectedToken) return;
    (async () => {
      const metadata = await contract.metadata.getTokenMetadata(selectedToken);
      setTokenMetadata(metadata);
    })();
  }, [contract, selectedToken]);

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
                value={selectedToken || 'none'}
                onChange={(e) => setSelectedToken(e.target.value)}
                options={tokens.map((t) => String(t))}
              />
            </div>
            <div className={styles.flex}>
              <p>Token Balance: {tokenBalance}</p>
            </div>
            {tokenMetadata?.metadata?.image && (
              <img
                src={tokenMetadata.metadata.image}
                alt={tokenMetadata.metadata.name}
                width="400"
                height="400"
              />
            )}
            <LoadClaimConditions
              userClaimConditions={userClaimConditions}
              userClaimRestrictions={userClaimRestrictions}
              activeClaimConditions={activeClaimConditions}
              allowlistStatus={allowlistStatus}
            />
            <AcceptTerms contract={contract} termsInfo={termsInfo} />
            <Mint
              userClaimRestrictions={userClaimRestrictions}
              activeClaimConditions={activeClaimConditions}
              allowlistStatus={allowlistStatus}
              contract={contract}
              tokenId={selectedToken || 'none'}
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
