import "./custom-button.scss";
const CustomButton = ({ text, onPressed, ...others }) => {
  return (
    <button className="custom-button" onClick={onPressed} {...others}>
      {text}
    </button>
  );
};

export default CustomButton;
