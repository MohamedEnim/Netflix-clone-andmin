import React, { useState } from "react";
import "./InputField.css";
const InputField = ({
  label,
  placeholder,
  border,
  value,
  type = "text",
  onchange,
  name,
  disabled = false,
}) => {
  const [data, setData] = useState(value);

  const handelChange = (e) => {
    setData(e.target.value);
    onchange(e.target);
  };
  return (
    <div className="inputField">
      <div className="inputField__item">
        <label htmlFor="">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className={`inputField__input ${!border && "inputField--option"}`}
          name={name}
          value={data}
          disabled={disabled}
          onChange={(e) => handelChange(e)}
        />
      </div>
    </div>
  );
};

export default InputField;
