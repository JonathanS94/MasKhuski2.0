import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import Image from "commons/Image.js";
import Button from "commons/Button";
import Input from "commons/Input";
//Estilo
import { useStyles } from "./PagerHeader.style";
export default function PageHeader() {
  const classes = useStyles();
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square6" />

      <Container className={classes.container}>
        <Row className="w-100">
          <Col
            md="6"
            className="d-flex flex-column align-items-center justify-content-center spaced-col"
          >
            <div className={classes.h1}>MÁS KHUSKI</div>
            <Image
              className={classes.img}
              src={require("assets/img/logo/logo.png")}
            />

            <div className={classes.h2}>Cuenta Conmigo</div>
          </Col>
          <Col
            md="6"
            className="d-flex flex-column align-items-center justify-content-center spaced-col"
          >
            <Input
              className={classes.input}
              placeholder="Ingrese su Nombre o Alias "
            />
            <Input className={classes.input} placeholder="Ingrese su Edad " />
            <Button
              className={classes.button}
              color="success"
              value="JUGAR"
              href="/niveles"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
