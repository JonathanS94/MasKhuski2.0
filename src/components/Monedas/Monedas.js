import React, { useState, useEffect } from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { useStyles } from "./Monedas.style";

const Monedas = ({ onDragStart, onSumasCalculated }) => {
  const classes = useStyles();
  const monedas = [
    "moneda5.png",
    "moneda10.png",
    "moneda25.png",
    "moneda50.png",
    "moneda100.png",
  ];

  const [parejasMezcladas, setParejasMezcladas] = useState([]);
  const [sumasParejas, setSumasParejas] = useState([]);

  const monedaValores = {
    "moneda5.png": 0.05,
    "moneda10.png": 0.1,
    "moneda25.png": 0.25,
    "moneda50.png": 0.5,
    "moneda100.png": 1.0,
  };

  useEffect(() => {
    const generadas = generarParejasAleatorias(6);
    const sumas = generadas.map((pareja) => calcularSumaPareja(pareja));
    setParejasMezcladas(generadas);
    setSumasParejas(sumas);
    if (onSumasCalculated) {
      onSumasCalculated(sumas.map((suma) => `$${suma.toFixed(2)}`));
    }
  }, [onSumasCalculated]);

  const generarParejasAleatorias = (numeroDeParejas) => {
    const parejasUnicas = new Set();
    while (parejasUnicas.size < numeroDeParejas) {
      const pareja = seleccionarParejaAleatoria();
      if (!parejasUnicas.has(pareja.toString())) {
        parejasUnicas.add(pareja.toString());
      }
    }
    return Array.from(parejasUnicas).map((pareja) => pareja.split(","));
  };

  const seleccionarParejaAleatoria = () => {
    const indices = generarIndicesAleatorios();
    const primeraMoneda = monedas[indices[0]];
    const segundaMoneda = monedas[indices[1]];
    return [primeraMoneda, segundaMoneda];
  };

  const generarIndicesAleatorios = () => {
    const indices = [];
    while (indices.length < 2) {
      const index = Math.floor(Math.random() * monedas.length);
      if (!indices.includes(index)) {
        indices.push(index);
      }
    }
    return indices;
  };

  const calcularSumaPareja = (pareja) => {
    return pareja.reduce(
      (suma, imagen) => suma + (monedaValores[imagen] || 0),
      0
    );
  };

  const handleDragStart = (e, imagenes) => {
    e.dataTransfer.setData("imagenes", JSON.stringify(imagenes));
    onDragStart(imagenes);
  };

  const renderizarImagenes = (imagenes, suma) => (
    <div>
      {imagenes.map((imagen, indice) => (
        <Image
          key={indice}
          className={classes.img}
          src={require(`assets/img/monedas/${imagen}`)}
          alt={`moneda${indice + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div>
      <Table className={classes.table}>
        <Row className={classes.row}>
          {parejasMezcladas.slice(0, 3).map((pareja, index) => (
            <Col
              key={index}
              className={classes.col}
              draggable
              onDragStart={(e) => handleDragStart(e, pareja)}
            >
              {renderizarImagenes(pareja, sumasParejas[index])}
            </Col>
          ))}
        </Row>
        <Row className={classes.row}>
          {parejasMezcladas.slice(3, 6).map((pareja, index) => (
            <Col
              key={index + 3}
              className={classes.col}
              draggable
              onDragStart={(e) => handleDragStart(e, pareja)}
            >
              {renderizarImagenes(pareja, sumasParejas[index + 3])}
            </Col>
          ))}
        </Row>
      </Table>
    </div>
  );
};

export default Monedas;
