import React, { useState, useEffect } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Principiante.style.js";
import Monedas from "components/Monedas/Monedas";

const Principiante = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  useEffect(() => {
    const initialValue = ["$1.25", "$1.05", "$0.35", "$0.60", "$0.15", "$0.55"];
    const shuffledValue = shuffleArray(initialValue);
    setValues(shuffledValue);
  }, []);
  // Función para mezclar un array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  return (
    <div>
      <div className={classes.h1}>NIVEL PRINCIPIANTE</div>
      <Table className={classes.table}>
        <TableBody>
          <Row className={classes.row}>
            <Col className={classes.col}>{values[0]}</Col>
            <Col className={classes.col}>{values[1]}</Col>
            <Col className={classes.col}>{values[2]}</Col>
          </Row>
          <Row className={classes.row}>
            <Col className={classes.col}>{values[3]}</Col>
            <Col className={classes.col}>{values[4]}</Col>
            <Col className={classes.col}>{values[5]}</Col>
          </Row>
        </TableBody>
      </Table>
      <div>
        <Monedas />
      </div>
      <div className={classes.root}>
        <Button
          className={classes.button}
          color="success"
          value="Enviar Repuesta"
          //href={"/"}
        ></Button>
      </div>
    </div>
  );
};
export default Principiante;
