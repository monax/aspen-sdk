import { Web3Provider } from '@ethersproject/providers';
import { CollectionContract, DefaultDebugHandler } from '@monaxlabs/aspen-sdk';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/globals.css';
import React from 'react'

CollectionContract.setDebugHandler(DefaultDebugHandler);

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
