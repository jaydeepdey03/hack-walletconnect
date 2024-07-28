/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, ReactNode, useEffect} from "react";
import {useWeb3ModalProvider} from "@web3modal/ethers/react";
import {BrowserProvider, Contract} from "ethers";

export const GlobalContext = createContext({});

const ContractAddress = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0";

const USDTAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export function GlobalContextProvider({children}: {children: ReactNode}) {
  const {walletProvider} = useWeb3ModalProvider();
  console.log(walletProvider, "isConnected");

  useEffect(() => {
    async function returnContract() {
      if (!walletProvider) {
        return;
      }

      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner();

      const contract = new Contract(ContractAddress, USDTAbi, signer);

      return contract;
    }

    (async function () {
      const contract = await returnContract();
      console.log(contract, "contract");
    })();
  }, [walletProvider]);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
