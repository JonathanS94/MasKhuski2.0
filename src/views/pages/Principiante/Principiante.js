import React, { useState, useEffect } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Principiante.style.js";
import Monedas from "components/Monedas/Monedas";
import Cronometro from "components/Cronometro/Cronometro.js";

const Principiante = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]); // Guardar valores iniciales
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Contador de aciertos
  const [incorrectCount, setIncorrectCount] = useState(0); // Contador de errores

  // Mapeo de las monedas a sus valores numéricos
  const monedaValores = {
    "moneda1.png": 1.0,
    "moneda25.png": 0.25,
    "moneda10.png": 0.1,
    "moneda5.png": 0.05,
    "moneda50.png": 0.5,
  };

  //
  useEffect(() => {
    const initialValue = ["$1.25", "$1.05", "$0.35", "$0.60", "$0.15", "$0.55"];
    const shuffledValue = shuffleArray(initialValue);
    setValues(shuffledValue);
    setInitialValues(shuffledValue); // Guardar los valores iniciales
  }, []);
  // Función para mezclar los elementos de un array
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

  // Evento de arrastre sobre la celda
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Evento de soltar sobre una celda específica
  const onDrop = (e, index) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("imagenes");
    const src = JSON.parse(data);
    const newValues = [...values];
    newValues[index] = src;
    setValues(newValues);
    // Mostrar la suma de monedas para la celda actual
    /*const suma = calcularSumaMonedas(src);
    alert(`Celda ${index + 1}: Suma de monedas = $${suma.toFixed(2)}`);*/
  };

  // Función para calcular la suma de las monedas
  const calcularSumaMonedas = (imagenes) => {
    return imagenes.reduce((suma, imagen) => {
      return suma + (monedaValores[imagen] || 0);
    }, 0);
  };
  // Función para renderizar las imágenes
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
  // Función para comprobar si los emparejamientos son correctos
  const checkMatches = () => {
    let correct = 0;
    let incorrect = 0;

    values.forEach((value, index) => {
      // Comparar el valor inicial con el valor actual en la celda
      if (Array.isArray(value)) {
        const suma = calcularSumaMonedas(value);
        const valorInicial = initialValues[index];
        const valorEsperado = parseFloat(valorInicial.slice(1));

        if (suma.toFixed(2) === valorEsperado.toFixed(2)) {
          correct += 1; // Incrementa el contador de aciertos si coinciden
        } else {
          incorrect += 1; // Incrementa el contador de errores si no coinciden
        }
      }
    });

    setCorrectCount(correct);
    setIncorrectCount(incorrect);

    if (correct === 6) {
      alert("¡Felicidades! ¡Todos los emparejamientos son correctos!");
    } else {
      alert(
        `Tienes emparejamientos ${correct} correctos y ${incorrect} incorrectos.`
      );
    }
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
          value="Enviar Respuesta"
          onClick={checkMatches} // Llamar a la función checkMatches al hacer clic
        />
      </div>
    </div>
  );
};

export default Principiante;
