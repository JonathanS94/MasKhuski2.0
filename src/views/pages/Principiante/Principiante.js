import React, { useState, useEffect } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Principiante.style.js";
import Monedas from "components/Monedas/Monedas";
import Cronometro from "components/Cronometro/Cronometro.js";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

const Principiante = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [draggedImages, setDraggedImages] = useState(null);

  useEffect(() => {
    const initialValue = ["$1.25", "$1.05", "$0.35", "$0.60", "$0.15", "$0.55"];
    const shuffledValue = shuffleArray(initialValue);
    setValues(shuffledValue);
  }, []);
  // Función para mezclar elementos de un array
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
  //Arrastre Durante el Movimiento
  const onDragOver = (e) => {
    e.preventDefault();
  };
  //Soltar en una celda especifica
  const onDrop = (e, index) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("imagenes");
    const src = JSON.parse(data);
    const newValues = [...values];
    newValues[index] = src;
    setValues(newValues);
  };
  //Agrupar Imagenes
  const renderizarImagenes = (imagenes) => {
    return imagenes.map((imagen, indice) => (
      <img
        key={indice}
        className={classes.img}
        src={require(`assets/img/monedas/${imagen}`)}
        alt={`moneda${indice + 1}`}
      />
    ));
  };

  return (
    <div>
      <div className={classes.h1}>NIVEL PRINCIPIANTE</div>
      <Cronometro />
      <Table className={classes.table}>
        <TableBody>
          <Row className={classes.row}>
            {values.slice(0, 3).map((value, index) => (
              <Col
                key={index}
                className={classes.col}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
              >
                {typeof value === "string" ? value : renderizarImagenes(value)}
              </Col>
            ))}
          </Row>
          <Row className={classes.row}>
            {values.slice(3, 6).map((value, index) => (
              <Col
                key={index + 3}
                className={classes.col}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index + 3)}
              >
                {typeof value === "string" ? value : renderizarImagenes(value)}
              </Col>
            ))}
          </Row>
        </TableBody>
      </Table>
      <div>
        <Monedas onDragStart={setDraggedImages} />
      </div>
      <div className={classes.root}>
        <Button
          className={classes.button}
          color="success"
          value="Enviar Repuesta"
          href={"/resultado"}
        />
      </div>
    </div>
  );
};

export default Principiante;
