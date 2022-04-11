const { ethers } = require("ethers");

const searchContract = async ({
  e,
  search: contractAddress,
  setContract,
  dispatch,
  signer,
  setContractOwner,
}) => {
  e.preventDefault();
  try {
    ethers.utils.getAddress(contractAddress);
    const { abi } = require("../contracts/Ballot.json");
    try {
      const contractObj = new ethers.Contract(contractAddress, abi, signer);
      const owner = await contractObj.chairperson();
      dispatch(setContractOwner(owner));
      sessionStorage.setItem("contractAddress", contractAddress);
      dispatch(setContract(contractObj));
    } catch (error) {
      console.log(error);
      alert("not a valid contract address [or] valid chainId");
      dispatch(setContract(null));
      sessionStorage.setItem("contractAddress", "");
      dispatch(setContractOwner(""));
    }
  } catch (error) {
    alert(error.reason);
    dispatch(setContract(null));
    sessionStorage.setItem("contractAddress", "");
    dispatch(setContractOwner(""));
  }
};

export default searchContract;
