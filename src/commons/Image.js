import React from "react";

const Image = ({ src, alt, href, className }) => {
  return (
    <>
      <img src={src} alt={alt} href={href} className={className} />
    </>
  );
};
export default Image;
