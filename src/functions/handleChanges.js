import { setAccountAddress, setChainId } from "../redux/information";
import getProvider from "./getProvider";

// handleChanges function body
const handleChanges = (dispatch) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      dispatch(setAccountAddress(accounts[0]));
      getProvider(dispatch);
    });
    window.ethereum.on("chainChanged", (chain) => {
      dispatch(setChainId(chain));
      getProvider(dispatch);
    });
  } else {
    alert("INSTALL METAMASK");
  }
};

export default handleChanges;
