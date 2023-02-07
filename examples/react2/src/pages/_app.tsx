import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ToastProvider>
  );
}
