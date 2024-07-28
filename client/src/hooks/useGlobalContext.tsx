import {GlobalContext} from "@/context/GlobalContext";
import {useContext} from "react";

export default function useGlobalContextHook() {
  return useContext(GlobalContext);
}
