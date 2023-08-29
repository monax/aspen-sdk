import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { goerli, polygon, polygonMumbai } from 'viem/chains';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './App.tsx';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, polygonMumbai, goerli],
  [alchemyProvider({ apiKey: 'VxJ0dp7RKpWY5rMgbA3uIfImLRUaufBR' }), publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config: themeConfig,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
