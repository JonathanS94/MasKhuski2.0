import React, { useState, useEffect, useRef } from "react";
import Image from "commons/Image";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Avanzado.style.js";
import BilletesMonedas from "components/BilletesMonedas/BilletesMonedas.js";
import Cronometro from "components/Cronometro/Cronometro.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const Avanzado = () => {
  const classes = useStyles();
  const [nombre, setNombre] = useState();
  const [edad, setEdad] = useState();
  const [values, setValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [results, setResults] = useState(Array(8).fill(null));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isScoreButtonVisible, setIsScoreButtonVisible] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const cronometroRef = useRef();
  const [score, setScore] = useState(0);
  const [sumas, setSumas] = useState([]);
  // Mapeo de las billetes a sus valores numéricos
  const bmValores = {
    "moneda5.png": 0.05,
    "moneda10.png": 0.1,
    "moneda25.png": 0.25,
    "moneda50.png": 0.5,
    "moneda100.png": 1.0,
    "billete1.png": 1,
    "billete2.png": 2,
    "billete5.png": 5,
    "billete10.png": 10,
    "billete20.png": 20,
    "billete50.png": 50,
  };

  // Inicializar valores
  useEffect(() => {
    // Esta función debe ser llamada cuando el componente Monedas calcule las sumas
    if (sumas.length > 0) {
      // Mezclar las sumas antes de establecer valores
      const shuffledSumas = shuffleArray(sumas);
      setValues(shuffledSumas);
      setInitialValues(shuffledSumas);
    }
  }, [sumas]);

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
    if (!data) {
      console.error("No se recibieron datos en el evento de drop.");
      return; // Salir si no hay datos
    }
    let src;
    try {
      src = JSON.parse(data);
    } catch (error) {
      console.error("Error al parsear JSON: ", error);
      return; // Salir si ocurre un error al parsear JSON
    }
    const newValues = [...values];
    newValues[index] = src;
    setValues(newValues);
  };
  // Función para calcular la suma de las monedas
  const calcularSumaValores = (imagenes) => {
    return imagenes.reduce((suma, imagen) => {
      return suma + (bmValores[imagen] || 0);
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
        const suma = calcularSumaValores(value);
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
    // Mostrar el botón de puntaje
    setIsScoreButtonVisible(true);
    // Calcular puntaje base
    let puntajeBase = correct * 4;
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
  localStorage.setItem("tipo", "Avanzado");
  localStorage.setItem("puntaje", score);
  localStorage.setItem("tiempo", timeElapsed);
  // Función para guardar el puntaje en el backend
  const guardarPuntaje = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/puntajes", {
        tipo: "Avanzado",
        puntos: score,
        tiempo: timeElapsed,
      });

      if (response.status === 200) {
        console.log("Puntaje guardado exitosamente");
        localStorage.setItem("tipo", "Avanzado");
        localStorage.setItem("puntaje", score);
        localStorage.setItem("tiempo", timeElapsed);
      } else {
        console.error("Error al guardar el puntaje");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  return (
    <div>
      <div className={classes.h1}>NIVEL &nbsp; AVANZADO</div>
      <Cronometro ref={cronometroRef} />
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <BilletesMonedas
            onDragStart={setDraggedImages}
            onSumasCalculated={setSumas}
          />
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
        {isScoreButtonVisible && (
          <Button
            className={classes.button}
            color="success"
            onClick={guardarPuntaje}
            value="Ver Puntaje Obtenido"
            href={"/resultado"}
          />
        )}
        <Button
          className={classes.button}
          color="success"
          value="Reiniciar el Juego"
          href={"/avanzado"}
        />
      </div>
    </div>
  );
};
export default Avanzado;
