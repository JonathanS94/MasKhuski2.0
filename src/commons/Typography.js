import React from "react";
import { Typography } from "reactstrap";

const Typography = ({ level, children, className }) => {
  if (level === "h1") {
    return <h1 className={className}>{children}</h1>;
  }

  if (level === "h2") {
    return <h2 className={className}>{children}</h2>;
  }

  if (level === "h3") {
    return <h3 className={className}>{children}</h3>;
  }

  if (level === "p") {
    return <p className={className}>{children}</p>;
  }

  return <>{children}</>;
};
export default Typography;
