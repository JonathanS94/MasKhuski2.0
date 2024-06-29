import React from "react";
import { Button as StrapButton } from "reactstrap";

const Button = ({ color, onClick, value, href, className, disabled }) => {
  return (
    <StrapButton
      color={color}
      onClick={onClick}
      href={href}
      className={className}
      disabled={disabled}
    >
      {value}
    </StrapButton>
  );
};
export default Button;
