import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {createWeb3Modal, defaultConfig} from "@web3modal/ethers/react";
import {GlobalContextProvider} from "@/context/GlobalContext";

export default function App({Component, pageProps}: AppProps) {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

  const sepolia = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
  };

  // 3. Create a metadata object
  const metadata = {
    name: "lfgho-hackathon",
    description: "AppKit Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,
    auth: {
      email: true, // default to true
      socials: ["google", "x", "github", "discord", "apple"],
      showWallets: true, // default to true
      walletFeatures: true, // default to true
    },
  });

  createWeb3Modal({
    ethersConfig,
    chains: [sepolia],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
