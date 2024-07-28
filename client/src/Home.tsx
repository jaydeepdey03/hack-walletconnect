import {Button} from "./components/ui/button";
import {useWeb3Modal} from "@web3modal/ethers5/react";
import {abi} from "./lib/abi";
import {useReadContract, useWriteContract} from "wagmi";

export default function Home() {
  const {open} = useWeb3Modal();
  const {data: hash, writeContract} = useWriteContract();

  async function increment() {
    writeContract({
      abi,
      address: "0x033Db7F7E7eF664Dd6dB84A0Eb77a0533013ff5A",
      functionName: "increment",
      args: [],
    });
  }

  const result = useReadContract({
    abi: abi,
    address: "0x033Db7F7E7eF664Dd6dB84A0Eb77a0533013ff5A",
    functionName: "retrieve",
  });

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <Button onClick={() => open()}>Open Connect Modal</Button>
          <Button onClick={() => open({view: "Networks"})}>
            Open Network Modal
          </Button>

          <Button onClick={increment}>Increment</Button>

          {hash && (
            <div>
              <p>Number: {Number(result.data)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
