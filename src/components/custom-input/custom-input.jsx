import "./custom-input.scss";

const CustomInput = ({ text, ...others }) => {
  return (
    <div className={`custom-input ${others.value.length ? "shrink" : ""}`}>
      <input {...others} />
      <label>{text}</label>
    </div>
  );
};

export default CustomInput;
