import React, { useState, useEffect } from "react";
import Image from "commons/Image";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Avanzado.style.js";
import BilletesMonedas from "components/BilletesMonedas/BilletesMonedas.js";
import Cronometro from "components/Cronometro/Cronometro.js";

const Avanzado = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]); // Guardar valores iniciales
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Contador de aciertos
  const [incorrectCount, setIncorrectCount] = useState(0); // Contador de errores

  // Mapeo de las billetes a sus valores numéricos
  const Valores = {
    "moneda1.png": 1.0,
    "moneda25.png": 0.25,
    "moneda10.png": 0.1,
    "moneda5.png": 0.05,
    "moneda50.png": 0.5,
    "billete2.png": 2,
    "billete5.png": 5,
    "billete10.png": 10,
    "billete20.png": 20,
    "billete50.png": 50,
  };
  //Arreglo Numerico
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
    setInitialValues(shuffledValue); // Guardar los valores iniciales
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
  // Evento de arrastre sobre la celda
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
    // Mostrar la suma de valores para la celda actual
    const suma = calcularSumaValores(src);
    alert(`Celda ${index + 1}: Suma de valores = $${suma.toFixed(2)}`);
  };
  // Función para calcular la suma de las monedas
  const calcularSumaValores = (imagenes) => {
    return imagenes.reduce((suma, imagen) => {
      return suma + (Valores[imagen] || 0);
    }, 0);
  };
  // Función para renderizar las imágenes
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
  // Función para comprobar si los emparejamientos son correctos
  const checkMatches = () => {
    let correct = 0;
    let incorrect = 0;

    values.forEach((value, index) => {
      // Comparar el valor inicial con el valor actual en la celda
      if (Array.isArray(value)) {
        const suma = calcularSumaValores(value);
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

    if (correct === 8) {
      alert("¡Felicidades! ¡Todos los emparejamientos son correctos!");
    } else {
      alert(
        `Tienes emparejamientos ${correct} correctos y ${incorrect} incorrectos.`
      );
    }
  };

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
          onClick={checkMatches} // Llamar a la función checkMatches al hacer clic
        ></Button>
      </div>
    </div>
  );
};
export default Avanzado;
