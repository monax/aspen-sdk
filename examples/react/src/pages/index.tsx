import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { Web3Provider } from "@ethersproject/providers";
import { CollectionContract, parse, Address } from "@monaxlabs/aspen-sdk";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "components/ConnectWallet";
import LoadClaimConditions from "components/LoadClaimConditions";
import Mint from "components/Mint";
import AcceptTerms from "components/AcceptTerms";

const Home: NextPage = () => {
  const [contractAddress, setContractAddress] = useState(
    "0xfe66131bF7f81bE9aeDf1ae58284ec17484E5Da9"
  );

  const [contract, setContract] = useState<CollectionContract>(null);

  const { active, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!active || !library) return;
    (async () => {
      const collectionContract = new CollectionContract(
        library,
        parse(Address, contractAddress)
      );
      await collectionContract.load();
      console.log(collectionContract.tokenStandard);
      setContract(collectionContract);
    })();
  }, [active, library, contractAddress]);

  return (
    <div>
      <main className={styles.main}>
        <h2>Aspen Publishing SDK Example </h2>
        <p>
          The examples are with contracts that are deployed on Mumbai, make sure
          to connect to the correct Network
        </p>
        <ConnectWallet />
        {active && (
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

            <LoadClaimConditions contract={contract} />
            <AcceptTerms contract={contract} />
            <Mint contract={contract} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
