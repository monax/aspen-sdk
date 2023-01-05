import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  useConnect,
  useAccount,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export function ConnectButton() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className="connectButton"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>Err: {error.message}</div>}
    </div>
  );
}

function TokenList() {
  const { address, isConnected } = useAccount();
  if (isConnected) {
    return (
      <div>
        <div>Welcome {address}!</div>
        <div className="tokenList">
          {[
            {
              name: "Neotopes 0",
              img: "token0.png",
              price: "£10",
              stripe: "https://buy.stripe.com/test_4gweVg2Az2d57OEbII",
            },
            {
              name: "Neotopes 1",
              img: "token1.png",
              price: "£20",
              stripe: "https://buy.stripe.com/test_eVa6oK8YXeZRb0Q4gh",
            },
            {
              name: "Neotopes 2",
              img: "token2.png",
              price: "£50",
              stripe: "https://buy.stripe.com/test_9AQ8wSfnlbNFb0QcMO",
            },
          ].map((e) => (
            <div className="card">
              <img className="img" src={e.img} />
              <div className="name">
                {e.name} - {e.price}
              </div>
              <a
                href={`${e.stripe}?client_reference_id=${address}`}
                target="_new"
                className="buyLink"
              >
                Buy
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>You must connect your wallet first!</div>;
  }
}

function Header() {
  return (
    <div className="Header">
      <img src="banner.png" className="banner" />
    </div>
  );
}

// Pass client to React Context Provider
export default function App() {
  return (
    <WagmiConfig client={client}>
      <Header />
      <ConnectButton />
      <TokenList />
    </WagmiConfig>
  );
}
