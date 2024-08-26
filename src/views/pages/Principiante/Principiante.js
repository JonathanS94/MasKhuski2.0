import React, { useState, useEffect, useRef } from "react";
import Button from "commons/Button";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
import { useStyles } from "./Principiante.style.js";
import Monedas from "components/Monedas/Monedas";
import Cronometro from "components/Cronometro/Cronometro.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const Principiante = () => {
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const [initialValues, setInitialValues] = useState([]); // Guardar valores iniciales
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Contador de aciertos
  const [incorrectCount, setIncorrectCount] = useState(0); // Contador de errores
  const [results, setResults] = useState(Array(6).fill(null));
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isScoreButtonVisible, setIsScoreButtonVisible] = useState(false); // Controlar la visibilidad del botón de puntaje
  const [timeElapsed, setTimeElapsed] = useState(0); // Para guardar el tiempo transcurrido
  const cronometroRef = useRef();
  const [score, setScore] = useState(0); // Estado para el puntaje
  const [sumas, setSumas] = useState([]);
  const [nombre, setNombre] = useState(localStorage.getItem("nombre"));
  const [edad, setEdad] = useState(localStorage.getItem("edad"));
  // Mapeo de las monedas a sus valores numéricos
  const monedaValores = {
    "moneda5.png": 0.05,
    "moneda10.png": 0.1,
    "moneda25.png": 0.25,
    "moneda50.png": 0.5,
    "moneda100.png": 1.0,
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
        const suma = calcularSumaMonedas(value);
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
    let puntajeBase = correct * 2;

    // Pausar el cronómetro y guardar el tiempo
    cronometroRef.current.pause();
    setTimeElapsed(cronometroRef.current.getTime());
    const tiempoTotal = cronometroRef.current.getTime();

    // Calcular puntos bonus si todos los aciertos son correctos
    let puntosBonus = 0;
    if (correct === 6) {
      puntosBonus = calcularPuntosBonus(tiempoTotal);
      puntajeBase += puntosBonus; // Sumar puntos bonus al puntaje base
    }
    setScore(puntajeBase); // Calcular el puntaje total
    localStorage.setItem("score", puntajeBase); // Almacenar el puntaje en localStorage
  };
  //Función para manejar las sumas calculadas recibidas desde el componente Monedas
  const handleSumasCalculated = (sumas) => {
    setSumas(sumas); // Guardar las sumas en el estado
  };
  // Función para guardar el puntaje en el backend
  const guardarPuntaje = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/puntajes", {
        nombre: nombre,
        edad: edad,
        tipo: "Principiante",
        puntos: score,
        tiempo: timeElapsed,
      });

      if (response.status === 200) {
        console.log("Puntaje guardado exitosamente");
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("edad", edad);
        localStorage.setItem("tipo", "Principiante");
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
      <div className={classes.h1}>NIVEL &nbsp; PRINCIPIANTE</div>
      <Cronometro ref={cronometroRef} />
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
                {results[index] !== null && (
                  <span className={classes.icon}>
                    {results[index] ? (
                      <CheckCircleIcon
                        style={{ color: "green", fontSize: "32" }}
                      />
                    ) : (
                      <CancelIcon style={{ color: "red", fontSize: "32" }} />
                    )}
                  </span>
                )}
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
                {results[index + 3] !== null && (
                  <span className={classes.icon}>
                    {results[index + 3] ? (
                      <CheckCircleIcon
                        style={{ color: "green", fontSize: "32" }}
                      />
                    ) : (
                      <CancelIcon style={{ color: "red", fontSize: "32" }} />
                    )}
                  </span>
                )}
              </Col>
            ))}
          </Row>
        </TableBody>
      </Table>
      <div>
        <Monedas
          onDragStart={setDraggedImages}
          onSumasCalculated={setSumas} // Almacena las sumas calculadas
        />
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
            value="Ver Puntaje Obtenido"
            onClick={guardarPuntaje}
            href={"/resultado"}
          />
        )}
        <Button
          className={classes.button}
          color="success"
          value="Reiniciar el Juego"
          href={"/principiante"}
        />
      </div>
      <div className={classes.info}>
        <p>Nombre: {nombre}</p>
        <p>Edad: {edad}</p>
      </div>
    </div>
  );
};

export default Principiante;
