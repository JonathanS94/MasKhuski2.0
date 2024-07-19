import React, { useState, useEffect } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Intermedio.style.js";
import Billetes from "components/Billetes/Billetes";
import Cronometro from "components/Cronometro/Cronometro.js";

const Intermedio = () => {
  const classes = useStyles([]);
  const [values, setValues] = useState([]);
  const [draggedImages, setDraggedImages] = useState(null);
  useEffect(() => {
    const initialValue = [
      "$12",
      "$22",
      "$60",
      "$20",
      "$25",
      "$15",
      "$7",
      "$70",
    ];
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
        src={require(`assets/img/billetes/${imagen}`)}
        alt={`billete${indice + 1}`}
      />
    ));
  };
  return (
    <div>
      <div className={classes.h1}>NIVEL INTERMEDIO</div>
      <Cronometro />
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <Billetes onDragStart={setDraggedImages} />
        </div>
        <div className={classes.rightContainer}>
          <Table className={classes.table}>
            <TableBody>
              {Array.from({ length: 4 }, (_, rowIndex) => (
                <Row key={rowIndex} className={classes.row}>
                  {values
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map((value, colIndex) => (
                      <Col
                        key={colIndex}
                        className={classes.col}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, rowIndex * 2 + colIndex)}
                      >
                        {typeof value === "string"
                          ? value
                          : renderizarImagenes(value)}
                      </Col>
                    ))}
                </Row>
              ))}
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
export default Intermedio;
