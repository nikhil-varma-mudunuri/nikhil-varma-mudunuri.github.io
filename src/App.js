import "./App.css";
import initialSetup from "./functions/initialSetup";
import handleChanges from "./functions/handleChanges";
import Settings from "./pages/settings/settings";
import NavBar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import CreateContract from "./pages/create-contract/create-contract";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// App Component

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.information);
  useEffect(() => {
    handleChanges(dispatch);
    initialSetup(dispatch, isLoggedIn);
  });
  return (
    <div className="App">
      <NavBar />
      {isLoggedIn ? (
        <Routes>
          <Route path="/create-contract" element={<CreateContract />} />
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      ) : (
        <p>Connect metamask account to access</p>
      )}
    </div>
  );
};

export default App;
