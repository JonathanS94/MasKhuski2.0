import React, { useState, useEffect } from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { TableBody } from "@mui/material";
//Estilos css
import { useStyles } from "./Billetes.style.js";

const Billetes = ({ onDragStart, onSumasCalculated }) => {
  const classes = useStyles();
  const billetes = [
    "billete1.png",
    "billete5.png",
    "billete10.png",
    "billete20.png",
    "billete50.png",
  ];

  const [parejasMezcladas, setParejasMezcladas] = useState([]);
  const [sumasParejas, setSumasParejas] = useState([]);

  const billeteValores = {
    "billete1.png": 1,
    "billete2.png": 2,
    "billete5.png": 5,
    "billete10.png": 10,
    "billete20.png": 20,
    "billete50.png": 50,
  };

  useEffect(() => {
    const generadas = generarParejasAleatorias(8);
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
    const primerBillete = billetes[indices[0]];
    const segundoBillete = billetes[indices[1]];
    return [primerBillete, segundoBillete];
  };

  const generarIndicesAleatorios = () => {
    const indices = [];
    while (indices.length < 2) {
      const index = Math.floor(Math.random() * billetes.length);
      if (!indices.includes(index)) {
        indices.push(index);
      }
    }
    return indices;
  };

  const calcularSumaPareja = (pareja) => {
    return pareja.reduce(
      (suma, imagen) => suma + (billeteValores[imagen] || 0),
      0
    );
  };
  //Inicia el evento de arrastre
  const handleDragStart = (e, imagenes) => {
    e.dataTransfer.setData("imagenes", JSON.stringify(imagenes));
    onDragStart(imagenes);
  };
  //Agrupar Imagenes
  const renderizarImagenes = (imagenes) =>
    imagenes.map((imagen, indice) => (
      <Image
        key={indice}
        className={classes.img}
        src={require(`assets/img/billetes/${imagen}`)}
        alt={`billete${indice + 1}`}
      />
    ));
  return (
    <Table className={classes.table}>
      <Row className={classes.row}>
        {parejasMezcladas.slice(0, 2).map((pareja, index) => (
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
        {parejasMezcladas.slice(2, 4).map((pareja, index) => (
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
      <Row className={classes.row}>
        {parejasMezcladas.slice(4, 6).map((pareja, index) => (
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
      <Row className={classes.row}>
        {parejasMezcladas.slice(6, 8).map((pareja, index) => (
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
  );
};
export default Billetes;
