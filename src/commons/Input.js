import React from "react";
import { Input as StrapInput } from "reactstrap";

const Input = ({ placeholder, className }) => {
  return (
    <StrapInput placeholder={placeholder} className={className}></StrapInput>
  );
};
export default Input;
