import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import styles from "../styles/Home.module.css";

const network = {
  1: "Ethereum",
  137: "Polygon",
  80001: "Mumbai",
  11297108109: "Palm",
  11297108099: "PalmTestnet",
  7700: "Canto",
};
const ConnectWallet: React.FC = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: Object.keys(network).map(Number),
  });
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>();
  const onClick = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <>
          <div>Network: {network[chainId]}</div>
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
