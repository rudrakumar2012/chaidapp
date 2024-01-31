import { useEffect, useState } from "react";
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Login from "./Components/Login";
import Connected from "./Components/Connected";
import Memos from "./Components/Memos";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [state, setState] = useState({ contract: null });

  useEffect(() => {
    getChai();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  },[provider]);

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function conncetToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected: " + address);
        setIsConnected(true);
      } catch (error) {
        alert(error);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function getChai() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setState({ contract });
    console.log(contract);
  }

  return (
      <div>
        {isConnected ? (
        <div>
          <Connected account={account} state={state} />
          <Memos state={state}/>
        </div>
        ) : (
          <Login connectWallet={conncetToMetamask} />
        )}
      </div>
  );
}

export default App;


