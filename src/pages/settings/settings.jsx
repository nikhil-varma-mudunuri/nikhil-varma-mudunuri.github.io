import "./settings.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const { ethers } = require("ethers");
const Settings = () => {
  const { accountAddress, chainId } = useSelector((state) => state.information);
  const { provider } = useSelector((state) => state.provider);
  const [networkName, setNetworkName] = useState("");
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const callBack = async () => {
      if (provider) {
        const { name } = await provider.getNetwork();
        await provider
          .getBalance(accountAddress)
          .then((balance) => setBalance(ethers.utils.formatEther(balance)));
        setNetworkName(name);
      }
    };
    callBack();
  }, [provider, accountAddress]);
  return (
    <div className="settings">
      <p>{`Account Address: ${accountAddress}`}</p>
      <p>{`Chain ID: ${chainId}`}</p>
      <p>{`Network Name : ${networkName}`}</p>
      <p>{`Balance : ${balance} ETH`}</p>
    </div>
  );
};

export default Settings;
