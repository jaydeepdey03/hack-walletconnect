/* eslint-disable @typescript-eslint/no-explicit-any */
import {abi} from "@/lib/abi";
import {createContext, ReactNode} from "react";
import {useReadContract} from "wagmi";

export const GlobalContext = createContext({});

const ContractAddress = "0x033Db7F7E7eF664Dd6dB84A0Eb77a0533013ff5A";

export function GlobalContextProvider({children}: {children: ReactNode}) {
  const result = useReadContract({
    abi: abi,
    address: ContractAddress,
    functionName: "retrieve",
  });

  console.log(result, "result");

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
