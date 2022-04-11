import { setAccountAddress, setChainId } from "../redux/information";
import getProvider from "./getProvider";

// initialSetup function body
const initialSetup = async (dispatch, isLoggedIn) => {
  if (isLoggedIn) {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        dispatch(setAccountAddress(accounts[0]));
        dispatch(setChainId(window.ethereum.chainId));
        getProvider(dispatch);
      });
  }
};

export default initialSetup;
