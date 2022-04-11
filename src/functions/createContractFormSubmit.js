const { ethers } = require("ethers");
const createContractFormSubmit = async ({
  e,
  proposal,
  optionValues,
  duration,
  setContractState,
  setButtonArray,
  setOptionValues,
  setProposal,
  setDuration,
  setIsDisabled,
  signer,
}) => {
  e.preventDefault();
  if (optionValues.length < 2) {
    alert("must have 2 options atleast");
  } else {
    const { abi, bytecode } = require("../contracts/Ballot.json");
    try {
      setIsDisabled(true);
      const factor = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factor.deploy(duration, proposal, optionValues);
      setContractState(`Contract Deploying at address ${contract.address}`);
      await contract.deployTransaction.wait();
      setContractState(`Contract Deployed at address ${contract.address}`);
      setTimeout(() => {
        setIsDisabled(false);
        setButtonArray([0, 1]);
        setOptionValues(["", ""]);
        setDuration("");
        setProposal("");
        setContractState("YET TO DEPLOYED");
      }, 10000);
    } catch (error) {
      setIsDisabled(false);
      alert(error);
    }
  }
};
export default createContractFormSubmit;
