import React, { useState, useEffect } from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import Image from "commons/Image.js";
import Input from "commons/Input.js";
import Button from "commons/Button.js";
import axios from "axios"; // Importar Axios
import { useStyles } from "./PagerHeader.style";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  //Componentes Usuario
  const [nombre, setNombre] = useState([]);
  const [edad, setEdad] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Validacion de campos vacios
  useEffect(() => {
    let completedFields = 0;
    if (nombre.length > 0) completedFields++;
    if (edad.length > 0) completedFields++;
    setProgress((completedFields / 2) * 100);

    if (completedFields === 2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nombre, edad]);

  // Validacion de solo ingrese hasta 20 letras
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 20) {
      setNombre(value);
    }
  };

  // Validacion de solo ingrese hasta dos digitos
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setEdad(value);
    }
  };

  // Método para manejar el envío de datos
  const handleSubmit = async () => {
    try {
      // Guardar datos en la API
      const response = await axios.post("http://127.0.0.1:8000/usuarios/", {
        nombre: nombre,
        edad: edad,
      });
      console.log("Datos guardados exitosamente:", response.data);
      // Guardar datos en localStorage para acceso posterior
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("edad", edad);
      navigate("/niveles");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square6" />
      <Container className={classes.container}>
        <Row className="w-100">
          <Col
            md="6"
            className="d-flex flex-column align-items-center justify-content-center spaced-col"
          >
            <div className={classes.h1}>MÁS KHUSKI</div>
            <Image
              className={classes.img}
              src={require("assets/img/logo/logo.png")}
            />
            <div className={classes.h2}>Cuenta Conmigo</div>
          </Col>
          <Col
            md="6"
            className="d-flex flex-column align-items-center justify-content-center spaced-col"
          >
            <Input
              className={classes.input}
              placeholder="Ingrese su Nombre o Alias"
              value={nombre}
              onChange={handleNameChange}
            />
            <Input
              className={classes.input}
              placeholder="Ingrese su Edad"
              value={edad}
              onChange={handleAgeChange}
            />
            <Progress
              className={classes.progress}
              value={progress}
              color="success"
            />
            <Button
              className={classes.button}
              color="success"
              value="JUGAR"
              onClick={handleSubmit}
              //href="/niveles"
              disabled={isButtonDisabled}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageHeader;
