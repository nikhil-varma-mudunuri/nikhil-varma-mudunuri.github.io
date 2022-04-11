import CustomButton from "../../components/custom-button/custom-button";
import CustomInput from "../../components/custom-input/custom-input";
import "./create-contract.scss";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import createContractFormSubmit from "../../functions/createContractFormSubmit";
import { useSelector } from "react-redux";

const CreateContract = () => {
  // state
  const [buttonArray, setButtonArray] = useState([0, 1]);
  const [optionValues, setOptionValues] = useState(["", ""]);
  const [proposal, setProposal] = useState("");
  const [duration, setDuration] = useState("");
  const [contractState, setContractState] = useState("YET TO DEPLOYED");
  const [isDisabed, setIsDisabled] = useState(false);
  const { signer } = useSelector((state) => state.provider);

  // upadte option values
  const updateOptions = (e, value) => {
    let array = [...optionValues];
    array[e] = value;
    setOptionValues(array);
  };

  // delete option
  const deleteOption = (e) => {
    let temp = [...buttonArray];
    temp.pop();
    setButtonArray(temp);
    temp = [...optionValues];
    temp.splice(e, 1);
    setOptionValues(temp);
  };

  // component
  return (
    <div className="create-contract">
      <h1>CONTRACT STATE : {contractState}</h1>
      <form
        onSubmit={async (e) => {
          await createContractFormSubmit({
            setButtonArray,
            setOptionValues,
            setDuration,
            duration,
            setProposal,
            setContractState,
            setIsDisabled,
            signer,
            e,
            proposal,
            optionValues,
          });
        }}
      >
        <CustomInput
          text="proposal"
          type="text"
          required
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
        />
        <CustomInput
          text="Duration [In Minitues]"
          required
          value={duration}
          type="number"
          onChange={(e) => setDuration(e.target.value)}
        />
        {buttonArray.map((e) => (
          <div key={e} className="option-input">
            <CustomInput
              text={`option-${e + 1}`}
              type="text"
              required
              value={optionValues[e]}
              onChange={({ target }) => updateOptions(e, target.value)}
            />
            <MdDeleteOutline className="icon" onClick={() => deleteOption(e)} />
          </div>
        ))}
        <div className="buttons">
          <CustomButton
            type="button"
            disabled={isDisabed}
            onPressed={() => {
              let temp = [...buttonArray];
              let tempVal = [...optionValues];
              tempVal.push("");
              temp.push(temp.length);
              setButtonArray(temp);
              setOptionValues(tempVal);
            }}
            text="ADD OPTION"
          />
          <CustomButton disabled={isDisabed} type="submit" text="DEPLOY" />
        </div>
      </form>
    </div>
  );
};

export default CreateContract;
