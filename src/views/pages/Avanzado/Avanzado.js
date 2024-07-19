import React, { useState, useEffect } from "react";
import Image from "commons/Image";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Avanzado.style.js";
import BilletesMonedas from "components/BilletesMonedas/BilletesMonedas.js";
import Cronometro from "components/Cronometro/Cronometro.js";

const Avanzado = () => {
  const classes = useStyles([]);
  const [values, setValues] = useState([]);
  const [draggedImages, setDraggedImages] = useState(null);
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
  // Agrupar Imagenes
  const renderizarImagenes = (imagenes) =>
    imagenes.map((imagen, indice) => {
      const esBillete = imagen.startsWith("billete");
      const ruta = esBillete ? `billetes/${imagen}` : `monedas/${imagen}`;
      return (
        <Image
          key={indice}
          className={esBillete ? classes.imgBillete : classes.imgMoneda}
          src={require(`assets/img/${ruta}`)}
          alt={`imagen${indice + 1}`}
        />
      );
    });

  return (
    <div>
      <div className={classes.h1}>NIVEL AVANZADO</div>
      <Cronometro />
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <BilletesMonedas onDragStart={setDraggedImages} />
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
export default Avanzado;
