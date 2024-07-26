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
  const [initialValues, setInitialValues] = useState([]); // Guardar valores iniciales
  const [draggedImages, setDraggedImages] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Contador de aciertos
  const [incorrectCount, setIncorrectCount] = useState(0); // Contador de errores

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
    // Mostrar la suma de monedas para la celda actual
    /*const suma = calcularSumaBilletes(src);
    alert(`Celda ${index + 1}: Suma de billetes = $${suma.toFixed(2)}`);*/
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
  // Función para comprobar si los emparejamientos son correctos
  const checkMatches = () => {
    let correct = 0;
    let incorrect = 0;

    values.forEach((value, index) => {
      // Comparar el valor inicial con el valor actual en la celda
      if (Array.isArray(value)) {
        const suma = calcularSumaBilletes(value);
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
          onClick={checkMatches} // Llamar a la función checkMatches al hacer clic
        ></Button>
      </div>
    </div>
  );
};
export default Intermedio;
