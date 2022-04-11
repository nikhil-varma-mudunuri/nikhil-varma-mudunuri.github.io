import "./client.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomButon from "../../components/custom-button/custom-button";

const ClientTab = () => {
  const { contract } = useSelector((state) => state.provider);
  const { accountAddress } = useSelector((state) => state.information);
  const [options, setOptions] = useState([]);
  const [proposalName, setProposalName] = useState("");
  const [selected, setSelected] = useState("");
  const [isVoted, setIsVoted] = useState([true, "waiting..."]);
  const [electionState, setElectionState] = useState(0);
  const [winnerName, setWinnerName] = useState(
    "Election completed waiting for results"
  );
  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        contract.on("Start", () => {
          setElectionState(1);
        });
        contract.on("End", () => {
          setElectionState(2);
        });
        contract.on("Results", (state) => setWinnerName(state));
        try {
          let temp = await contract.getState();
          setElectionState(temp);
          temp = await contract.isVoted(accountAddress);
          setIsVoted(temp);
          if (!temp[0]) {
            temp = await contract.getProposalName();
            setProposalName(temp);
            temp = await contract.getProposalOptions();
            setOptions(temp);
          }
        } catch (error) {
          setOptions([]);
          setProposalName("");
          alert(error.data ? error.data.message : error.message);
        }
      }
    };
    fetchData();
  }, [contract, accountAddress]);
  return (
    <div className="client-tab">
      {electionState < 2 ? (
        isVoted[0] ? (
          <p>{isVoted[1]}</p>
        ) : (
          <div className="client-div">
            <form onSubmit={(e) => voting(e, selected, contract, setIsVoted)}>
              <h1>{proposalName}</h1>

              {options.map((e, index) => (
                <label key={e}>
                  <input
                    type="radio"
                    id={index}
                    name="selected"
                    value={e}
                    onChange={(e) => setSelected(e.target.id)}
                  />
                  <span>{e}</span>
                </label>
              ))}
              <CustomButon
                style={{
                  marginTop: "20px",
                  padding: "12px 30px",
                }}
                text="Vote"
              />
            </form>
          </div>
        )
      ) : (
        <p>{winnerName}</p>
      )}
    </div>
  );
};

const voting = async (e, selected, contract, setIsVoted) => {
  e.preventDefault();
  try {
    let z = await contract.vote(selected);
    await z.wait(z);
    setIsVoted([true, "already voted"]);
  } catch (error) {
    alert(error.data.message);
  }
};

export default ClientTab;
