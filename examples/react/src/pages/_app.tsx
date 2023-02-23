import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  CollectionContract,
  DefaultDebugHandler,
  PublishingAPI,
} from "@monaxlabs/aspen-sdk";
import { ToastProvider } from "react-toast-notifications";

CollectionContract.setDebugHandler(DefaultDebugHandler);

PublishingAPI.OpenAPI.BASE = process.env.NEXT_PUBLIC_PUBLISHING_API_BASEURI!;

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
