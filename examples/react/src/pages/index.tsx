import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";
import {
  Address,
  CollectionContract,
} from "@monaxlabs/aspen-sdk/dist/contracts";
import { parse } from "@monaxlabs/aspen-sdk/dist/utils";
import { useWeb3React } from "@web3-react/core";
import AcceptTerms from "components/AcceptTerms";
import Select from "components/common/Select";
import ConnectWallet from "components/ConnectWallet";
import LoadClaimConditions from "components/LoadClaimConditions";
import Mint from "components/Mint";

const Home: NextPage = () => {
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_TEST_CONTRACT ||
      "0xfe66131bF7f81bE9aeDf1ae58284ec17484E5Da9"
  );

  const [contract, setContract] = useState<CollectionContract | null>(null);
  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState("0");
  const { active, library } = useWeb3React<Web3Provider>();

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

            <LoadClaimConditions contract={contract} tokenId={selectedToken} />
            <AcceptTerms contract={contract} />
            <Mint contract={contract} tokenId={selectedToken} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
