import {
  setProvider,
  setSigner,
  setContract,
  setContractOwner,
} from "../redux/provider";
const { ethers } = require("ethers");

const getProvider = async (dispatch) => {
  const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(setProvider(tempProvider));
  const tempSigner = tempProvider.getSigner();
  dispatch(setSigner(tempSigner));
  if (sessionStorage.getItem("contractAddress") != null) {
    const { abi } = require("../contracts/Ballot.json");
    if (
      sessionStorage.getItem("contractAddress") === null ||
      sessionStorage.getItem("contractAddress") === ""
    ) {
      dispatch(setContract(null));
    } else {
      const contract = new ethers.Contract(
        sessionStorage.getItem("contractAddress"),
        abi,
        tempSigner
      );
      dispatch(setContract(contract));
      const owner = await contract.chairperson();
      dispatch(setContractOwner(owner));
    }
  }
};

export default getProvider;
