import {Button} from "./components/ui/button";
import {useWeb3Modal} from "@web3modal/ethers5/react";

export default function Home() {
  const {open} = useWeb3Modal();

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <Button onClick={() => open()}>Open Connect Modal</Button>
          <Button onClick={() => open({view: "Networks"})}>
            Open Network Modal
          </Button>
        </div>
      </div>
    </div>
  );
}
