import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import Logo from "commons/Logo";

export default function PageHeader() {
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">MÁS KHUSKI</h1>
          <Logo/>
          <h2 className="d-none d-sm-block">
            Cuenta Comingo
          </h2>
        </div>
      </Container>
    </div>
  );
}
