import Image from "next/image";
import {Inter} from "next/font/google";
import {Button} from "@/components/ui/button";
import {useWeb3Modal} from "@web3modal/ethers/react";
import {useGlobalContextHook} from "@/context/useGlobalContextHook";
import {useEffect, useState} from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {open} = useWeb3Modal();
  const {contract} = useGlobalContextHook();

  const [value, setValue] = useState<number>();
  async function increment() {
    try {
      if (!contract) return;
      await contract.increment();
      const newValue = await contract.retrieve();
      setValue(Number(newValue));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        if (!contract) return;
        const value = await contract.retrieve();
        console.log(value, "value");
        setValue(Number(value));
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, [contract]);

  console.log(value, "value");
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center gap-2">
        <Button onClick={() => open()}>Open Connect Modal</Button>
        <Button onClick={() => open({view: "Networks"})}>
          Open Network Modal
        </Button>

        <Button onClick={increment}>Increment</Button>
        <div>
          <p>{value && value}</p>
        </div>
      </div>
    </div>
  );
}
