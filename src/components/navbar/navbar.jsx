import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import NamedIcon from "../named-icon/named-icon";
import GUILogin from "../../functions/guiLogin";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.information);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav>
      <div
        className="logo"
        onClick={() => {
          location.pathname !== "/" && navigate("/");
        }}
      >
        Voting System
      </div>
      <div className="options">
        <NamedIcon
          name="home"
          id="1"
          onPressed={() => {
            location.pathname !== "/" && navigate("/");
          }}
        />
        <NamedIcon
          name="create contract"
          id="2"
          onPressed={() => {
            location.pathname !== "/create-contract" &&
              navigate("/create-contract");
          }}
        />
        <NamedIcon
          id="3"
          name={isLoggedIn ? "connected" : "disconnected"}
          isLoggedIn={isLoggedIn}
          onPressed={() => GUILogin(isLoggedIn, dispatch)}
        />
        <NamedIcon
          id="4"
          name="settings"
          onPressed={() => {
            location.pathname !== "/settings" && navigate("/settings");
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
