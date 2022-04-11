import {
  setAccountAddress,
  setChainId,
  setIsLoggedIn,
} from "../redux/information";
import { setSigner, setProvider, setContract } from "../redux/provider";
import getProvider from "./getProvider";
const GUILogin = async (isLoggedIn, dispatch) => {
  if (isLoggedIn) {
    dispatch(setAccountAddress(""));
    sessionStorage.setItem("contractAddress", "");
    dispatch(setChainId(""));
    dispatch(setIsLoggedIn(false));
    dispatch(setProvider(null));
    dispatch(setSigner(null));
    dispatch(setContract(null));
  } else {
    const accounts = await window.ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })
      .then(() => window.ethereum.request({ method: "eth_requestAccounts" }));
    dispatch(setAccountAddress(accounts[0]));
    dispatch(setChainId(window.ethereum.chainId));
    getProvider(dispatch);
    dispatch(setIsLoggedIn(true));
  }
};

export default GUILogin;
