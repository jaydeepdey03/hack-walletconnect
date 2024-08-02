/* eslint-disable @typescript-eslint/no-explicit-any */
import {abi} from "@/lib/abi";
import {Contract} from "ethers";
import {BrowserProvider} from "ethers";
import {createContext, ReactNode, useEffect, useState} from "react";

import {createWeb3Modal} from "@web3modal/wagmi/react";
import {defaultWagmiConfig} from "@web3modal/wagmi/react/config";

import {WagmiProvider} from "wagmi";
import {arbitrum, mainnet, sepolia} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const GlobalContext = createContext({
  ContractAddress: "",
});

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// const chains = [sepolia] as const;

const config = defaultWagmiConfig({
  chains: [sepolia],
  projectId,
  metadata,
});

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const ContractAddress = "0x41B1Cbc18f5ffDDA64124FB55279561aaE2e53bd" as string;

export function GlobalContextProvider({children}: {children: ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={{ContractAddress}}>
          {children}
        </GlobalContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
