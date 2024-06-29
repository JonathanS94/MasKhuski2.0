import React from "react";
import { Input as StrapInput } from "reactstrap";

const Input = ({ placeholder, className, value, onChange }) => {
  return (
    <StrapInput
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
    ></StrapInput>
  );
};
export default Input;
