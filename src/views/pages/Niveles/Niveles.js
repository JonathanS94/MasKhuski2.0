import React from "react";
import Button from "commons/Button";
//import Image from "assets/img/logo/logo.png";
import { useStyles } from "./Niveles.style.js";
import { Container, Row } from "reactstrap";

const Niveles = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Row>
        <div className={classes.h2} children={"Seleccione un Nivel:"}></div>
      </Row>

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
    </Container>
  );
};
export default Niveles;
