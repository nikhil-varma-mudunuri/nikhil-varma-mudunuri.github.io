import "./named-icon.scss";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoCreateOutline,
  IoEllipse,
} from "react-icons/io5";

const NamedIcon = ({ name, id, isLoggedIn, onPressed }) => {
  return (
    <div className="namedIcon" onClick={onPressed}>
      {
        {
          1: <IoHomeOutline className="icon" />,
          2: <IoCreateOutline className="icon" />,
          3: (
            <IoEllipse
              className={`icon ${isLoggedIn ? "loggedIn" : "loggedOut"}`}
            />
          ),
          4: <IoSettingsOutline className="icon" />,
        }[id]
      }
      <p>{name}</p>
    </div>
  );
};

export default NamedIcon;
