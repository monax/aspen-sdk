/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Web3Provider } from "@ethersproject/providers";
import {
  Address,
  ClaimConditionsState,
  CollectionContract,
  TermsUserAcceptanceState,
  TokenMetadata,
  ZERO_ADDRESS,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import AcceptTerms from "components/AcceptTerms";
import Select from "components/common/Select";
import ConnectWallet from "components/ConnectWallet";
import LoadClaimConditions from "components/LoadClaimConditions";
import Mint from "components/Mint";
import { useToasts } from "react-toast-notifications";
import { useAsyncEffect } from "hooks/useAsyncEffect";
import { SdkError } from "@monaxlabs/aspen-sdk/dist/contracts/collections/errors";

type Metadata = {
  uri: string | null;
  metadata: TokenMetadata | null;
};

const DELAY = 10000;
const DEFAULT_CONTRACT =
  process.env.NEXT_PUBLIC_TEST_CONTRACT ||
  "0x8AC3e9b7D377526Da1f81f60d03e006ADd5A606b";

const Home: NextPage = () => {
  const { addToast } = useToasts();
  const { account, active, library } = useWeb3React<Web3Provider>();

  const [contractAddress, setContractAddress] = useState(DEFAULT_CONTRACT);
  const [contract, setContract] = useState<CollectionContract | null>(null);
  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>("0");
  const [tokenMetadata, setTokenMetadata] = useState<Metadata | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [termsInfo, setTermsInfo] = useState<TermsUserAcceptanceState | null>(
    null
  );
  const [conditions, setConditions] = useState<ClaimConditionsState | null>(
    null
  );

  const loadClaimConditions = useCallback(async () => {
    if (!contract) return;

    try {
      const address = parse(Address, account ?? ZERO_ADDRESS);
      const conditions = await contract.conditions.getState(
        address,
        selectedToken
      );
      setConditions(conditions);

      if (contract.tokenStandard === "ERC1155" && selectedToken) {
        const balance = await contract.standard.balanceOf(
          address,
          selectedToken
        );
        setTokenBalance(balance.toString());
      }
    } catch (err) {
      if (SdkError.is(err)) {
        console.log(err.message, err.data, err.error);
      } else {
        console.error(err);
      }

      addToast((err as Error).message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [account, addToast, contract, selectedToken]);

  useEffect(() => {
    loadClaimConditions();
    const interval = setInterval(() => {
      loadClaimConditions();
    }, DELAY);
    return () => clearInterval(interval);
  }, [loadClaimConditions]);

  useAsyncEffect(async () => {
    if (!active || !library) return;

    const contract = await CollectionContract.from(library, contractAddress);
    setContract(contract);

    const tokensCount = await contract.standard.getTokensCount();
    setTokens(Array.from(Array(tokensCount.toNumber()).keys()));
  }, [active, library, contractAddress]);

  useAsyncEffect(async () => {
    if (!contract) return;
    const acceptTerms = await contract.agreements.getState(
      parse(Address, account)
    );
    setTermsInfo(acceptTerms);
  }, [contract, account]);

  useAsyncEffect(async () => {
    if (!contract || selectedToken === null) return;
    const metadata = await contract.tokenUri.getMetadata(selectedToken);
    setTokenMetadata(metadata);
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
                value={selectedToken || "none"}
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
            <LoadClaimConditions conditions={conditions} />
            <AcceptTerms contract={contract} termsInfo={termsInfo} />
            <Mint
              conditions={conditions}
              contract={contract}
              tokenId={selectedToken || "none"}
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
