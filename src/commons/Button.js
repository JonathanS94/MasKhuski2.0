import React from "react";
import { Button as StrapButton } from "reactstrap";

const Button = ({ color, onClick, value, href, className }) => {
  return (
    <StrapButton
      color={color}
      onClick={onClick}
      href={href}
      className={className}
    >
      {value}
    </StrapButton>
  );
};
export default Button;
