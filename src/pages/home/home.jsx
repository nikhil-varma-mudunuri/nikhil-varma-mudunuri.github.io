import "./home.scss";
import CustomInput from "../../components/custom-input/custom-input";
import { useState } from "react";
import { RiPhoneFindLine } from "react-icons/ri";
import searchContract from "../../functions/searchContract";
import { useDispatch, useSelector } from "react-redux";
import { setContract, setContractOwner } from "../../redux/provider";
import ChairPersonTab from "../../tabs/chairperson/chairperson";
import ClientTab from "../../tabs/client/client";
import Timer from "../../components/timer/timer";

const Home = () => {
  const [search, setSearch] = useState(
    sessionStorage.getItem("contractAddress") == null
      ? ""
      : sessionStorage.getItem("contractAddress")
  );
  const dispatch = useDispatch();
  const { signer, contractOwner } = useSelector((state) => state.provider);
  const { accountAddress } = useSelector((state) => state.information);

  return (
    <div className="home">
      <form
        onSubmit={(e) =>
          searchContract({
            e,
            search,
            dispatch,
            setContract,
            signer,
            setContractOwner,
          })
        }
      >
        <div className="option-input">
          <CustomInput
            text="Contract Address"
            type="text"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="icon"
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "white",
            }}
          >
            <RiPhoneFindLine />
          </button>
        </div>
      </form>
      {sessionStorage.getItem("contractAddress") === "" ||
      sessionStorage.getItem("contractAddress") === null ? null : (
        <Timer />
      )}

      {sessionStorage.getItem("contractAddress") === "" ||
      sessionStorage.getItem("contractAddress") === null ? (
        <p>first load contract</p>
      ) : contractOwner !== "" ? (
        contractOwner.toUpperCase() === accountAddress.toUpperCase() ? (
          <ChairPersonTab />
        ) : (
          <ClientTab />
        )
      ) : null}
    </div>
  );
};
export default Home;
