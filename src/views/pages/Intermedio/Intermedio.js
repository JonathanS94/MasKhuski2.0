import React, { useState, useEffect, useRef } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Intermedio.style.js";
import Billetes from "components/Billetes/Billetes";
import Cronometro from "components/Cronometro/Cronometro.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Intermedio = () => {
  const classes = useStyles([]);
  const [values, setValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [results, setResults] = useState(Array(8).fill(null));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const cronometroRef = useRef();
  const [score, setScore] = useState(0);
  // Mapeo de las billetes a sus valores numéricos
  const billeteValores = {
    "billete2.png": 2,
    "billete5.png": 5,
    "billete10.png": 10,
    "billete20.png": 20,
    "billete50.png": 50,
  };
  //Arreglo Numerico
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
    setInitialValues(shuffledValue); // Guardar los valores iniciales
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
  };
  // Función para calcular la suma de las monedas
  const calcularSumaBilletes = (imagenes) => {
    return imagenes.reduce((suma, imagen) => {
      return suma + (billeteValores[imagen] || 0);
    }, 0);
  };
  // Función para renderizar las imágenes
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
  // Función para calcular puntos adicionales basados en el tiempo
  const calcularPuntosBonus = (tiempo) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    const tiempoTotal = minutos * 60 + segundos; // Convertir tiempo a segundos

    if (tiempoTotal <= 60) {
      // 0 seg - 1 min
      return 4;
    } else if (tiempoTotal <= 120) {
      // 1 min 1 seg - 2 min
      return 3;
    } else if (tiempoTotal <= 180) {
      // 2 min 1 seg - 3 min
      return 2;
    } else if (tiempoTotal <= 240) {
      // 3 min 1 seg - 4 min
      return 1;
    }
    return 0; // No bonus si el tiempo es mayor a 4 minutos
  };
  // Función para comprobar si los emparejamientos son correctos
  const checkMatches = () => {
    let correct = 0;
    let incorrect = 0;
    const newResults = [];
    values.forEach((value, index) => {
      // Comparar el valor inicial con el valor actual en la celda
      if (Array.isArray(value)) {
        const suma = calcularSumaBilletes(value);
        const valorInicial = initialValues[index];
        const valorEsperado = parseFloat(valorInicial.slice(1));
        if (suma.toFixed(2) === valorEsperado.toFixed(2)) {
          correct += 1; // Incrementa el contador de aciertos si coinciden
          newResults[index] = true; // Emparejamiento correcto
        } else {
          incorrect += 1; // Incrementa el contador de errores si no coinciden
          newResults[index] = false; // Emparejamiento incorrecto
        }
      }
    });

    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setResults(newResults);
    setIsButtonVisible(false);
    // Calcular puntaje base
    let puntajeBase = correct * 3;
    // Pausar el cronómetro y guardar el tiempo
    cronometroRef.current.pause();
    setTimeElapsed(cronometroRef.current.getTime());
    const tiempoTotal = cronometroRef.current.getTime();
    // Calcular puntos bonus si todos los aciertos son correctos
    let puntosBonus = 0;
    if (correct === 8) {
      puntosBonus = calcularPuntosBonus(tiempoTotal);
      puntajeBase += puntosBonus;
    }
    setScore(puntajeBase);
    localStorage.setItem("score", puntajeBase);
  };
  return (
    <div>
      <div className={classes.h1}>NIVEL &nbsp; INTERMEDIO</div>
      <Cronometro ref={cronometroRef} />
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
                        {results[rowIndex * 2 + colIndex] !== null && (
                          <span className={classes.icon}>
                            {results[rowIndex * 2 + colIndex] ? (
                              <CheckCircleIcon
                                style={{ color: "green", fontSize: "32px" }}
                              />
                            ) : (
                              <CancelIcon
                                style={{ color: "red", fontSize: "32px" }}
                              />
                            )}
                          </span>
                        )}
                      </Col>
                    ))}
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className={classes.root}>
        {isButtonVisible && (
          <Button
            className={classes.button}
            color="success"
            value="Enviar Respuesta"
            onClick={checkMatches}
          />
        )}
        <Button
          className={classes.button}
          color="success"
          value="Ver Puntaje Obtenido"
          href={"/resultado"}
        />
      </div>
    </div>
  );
};
export default Intermedio;
