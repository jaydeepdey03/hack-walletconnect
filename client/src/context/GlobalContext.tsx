/* eslint-disable @typescript-eslint/no-explicit-any */
import {abi} from "@/lib/abi";
import {useWeb3ModalProvider} from "@web3modal/ethers/react";
import {Contract} from "ethers";
import {BrowserProvider} from "ethers";
import {createContext, ReactNode, useEffect, useState} from "react";

export const GlobalContext = createContext({
  contract: undefined as Contract | undefined,
});

const ContractAddress = "0x033Db7F7E7eF664Dd6dB84A0Eb77a0533013ff5A";

export function GlobalContextProvider({children}: {children: ReactNode}) {
  const {walletProvider} = useWeb3ModalProvider();
  const [contract, setContract] = useState<Contract>();

  console.log(walletProvider, "walletProvider");

  useEffect(() => {
    (async function () {
      try {
        if (!walletProvider) return;
        const provider = new BrowserProvider(walletProvider!);
        const signer = await provider.getSigner();
        const contract = new Contract(ContractAddress, abi, signer);
        console.log(contract, "contract");
        setContract(contract);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [walletProvider]);
  return (
    <GlobalContext.Provider
      value={{
        contract,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
