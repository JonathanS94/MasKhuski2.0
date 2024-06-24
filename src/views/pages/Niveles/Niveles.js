import React from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "commons/Button";
import Image from "commons/Image.js";
//Estilo
import { useStyles } from "./Niveles.style.js";

const Niveles = () => {
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
            <div className={classes.h2} children={"Seleccione un Nivel:"}></div>
            <Image
              className={classes.img}
              src={require("assets/img/logo/logo.png")}
            />
          </Col>

          <Col
            md="6"
            className="d-flex flex-column align-items-center justify-content-center spaced-col"
          >
            <Button
              className={classes.button}
              color="success"
              value="Principiante"
              // href={"/principiante"}
            ></Button>
            <Button
              className={classes.button}
              color="success"
              value="Intermedio"
              // href={"/intermedio"}
            ></Button>
            <Button
              className={classes.button}
              color="success"
              value={"Avanzado"}
              // href={"/avanzado"}
            ></Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Niveles;
