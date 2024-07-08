import React, { useState, useEffect } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Avanzado.style.js";
import BilletesMonedas from "components/BilletesMonedas/BilletesMonedas.js";

const Avanzado = () => {
  const classes = useStyles([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    const initialValue = [
      "$10.60",
      "$2.30",
      "$51.05",
      "$10.50",
      "$20.75",
      "$10.15",
      "$6.10",
      "$50.35",
    ];
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
      <div className={classes.h1}>NIVEL AVANZADO</div>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <BilletesMonedas />
        </div>
        <div className={classes.rightContainer}>
          <Table className={classes.table}>
            <TableBody>
              <Row className={classes.row}>
                <Col className={classes.col}>{values[0]}</Col>
                <Col className={classes.col}>{values[1]}</Col>
              </Row>
              <Row className={classes.row}>
                <Col className={classes.col}>{values[2]}</Col>
                <Col className={classes.col}>{values[3]}</Col>
              </Row>
              <Row className={classes.row}>
                <Col className={classes.col}>{values[4]}</Col>
                <Col className={classes.col}>{values[5]}</Col>
              </Row>

              <Row className={classes.row}>
                <Col className={classes.col}>{values[6]}</Col>
                <Col className={classes.col}>{values[7]}</Col>
              </Row>
            </TableBody>
          </Table>
        </div>
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
export default Avanzado;
