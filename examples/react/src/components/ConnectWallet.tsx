import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useMemo } from "react";
import styles from "../styles/Home.module.css";
import React from 'react';

const network = {
  1: "Ethereum",
  137: "Polygon",
  80001: "Mumbai",
  11297108109: "Palm",
  11297108099: "PalmTestnet",
};
const ConnectWallet: React.FC = () => {
  const injectedConnector = useMemo(
    () =>
      new InjectedConnector({
        supportedChainIds: Object.keys(network).map(Number),
      }),
    []
  );
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();
  const onClick = () => activate(injectedConnector);

  useEffect(() => {
    (async () => {
      const autorized = await injectedConnector.isAuthorized();
      if (autorized) {
        activate(injectedConnector);
      }
    })();
  }, [activate, injectedConnector]);
  return (
    <div>
      {active ? (
        <>
          {/*FIXME[Silas]: use proper chainId parsing from the SDK*/}
          <div>
            Network:{" "}
            {chainId
              ? network[chainId as keyof typeof network] || `unknown chainId`
              : `no chainId`}
          </div>
          <div>ChainId: {chainId}</div>
          <div>Account: {account}</div>
          <div>✅ </div>
        </>
      ) : (
        <button className={styles.button} type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
