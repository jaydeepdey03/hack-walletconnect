import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {createWeb3Modal, defaultConfig} from "@web3modal/ethers5/react";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!;

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:3000",
  icons: ["https://avatars.mywebsite.com/"],
};

const ethereumSepolia = {
  chainId: 11155111,
  name: "Ethereum Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env
    .VITE_ALCHEMY_PROJECT_ID!}`,
};

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [ethereumSepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
