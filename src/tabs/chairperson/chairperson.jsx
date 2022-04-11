import "./chairperson.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import CustomInput from "../../components/custom-input/custom-input";
import CustomButon from "../../components/custom-button/custom-button";
const Heap = require("heap");
const ChairPersonTab = () => {
  const { contract } = useSelector((state) => state.provider);
  const [addr, setAddr] = useState("");
  const [electionState, setElectionState] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        const temp = await contract.getState();
        setElectionState(temp);
        contract.on("Results", (string) => {
          console.log(string);
        });
      }
    };
    fetchData();
  }, [contract]);
  return (
    <div className="chairperson-tab">
      <form
        className="option-input"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            let k = await contract.giveRightToVote(
              addr.split(";").map((e) => e.trim())
            );
            await k.wait();
            setAddr("");
          } catch (error) {
            alert(error.data ? error.data.message : error.message);
          }
        }}
      >
        <CustomInput
          text="Right to Vote [seperate by ';' for multiple accountAddress]"
          type="text"
          required
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
        />
        <button
          className="icon"
          style={{
            outline: "none",
            border: "none",
            backgroundColor: "white",
          }}
        >
          <TiTickOutline />
        </button>
      </form>
      <div className="buttons">
        <CustomButon
          text="START ELECTION"
          disabled={electionState !== 0}
          onPressed={async () => {
            const k = await contract.start();
            await k.wait();
            setElectionState(1);
            window.location.reload();
          }}
        />
        <CustomButon
          text="END ELECTION"
          disabled={electionState !== 1}
          onPressed={async () => {
            const k = await contract.end();
            await k.wait();
            setElectionState(2);
            window.location.reload();
          }}
        />
        <CustomButon
          text="GET RESULTS"
          disabled={electionState !== 2}
          onPressed={async () => {
            const k = await contract.results();
            const results = k.map((e) => [e.name, parseInt(e.count)]);
            const heap = new Heap((a, b) => b[1] - a[1]);
            for (let a of results) {
              heap.push(a);
            }
            console.log(heap);
            // console.log(results);
          }}
        />
      </div>
    </div>
  );
};

export default ChairPersonTab;
