import React, { useState, useEffect } from "react";

// reactstrap components
import { Container, Row, Col, Progress } from "reactstrap";
import Image from "commons/Image.js";
import Button from "commons/Button";
import Input from "commons/Input";
//Estilo
import { useStyles } from "./PagerHeader.style";

export default function PageHeader() {
  const classes = useStyles();
  //Componentes Usuario
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  // Validacion de campos vacios y 
  useEffect(() => {
    let completedFields = 0;
    if (name.length > 0) completedFields++;
    if (age.length > 0) completedFields++;
    setProgress((completedFields / 2) * 100);

    if (completedFields === 2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, age]);
  // Validacion de solo ingrese hasta 20 letras
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 20) {
      setName(value);
    }
  };
  // Validacion de solo ingrese hasta dos digitos
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setAge(value);
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
              placeholder="Ingrese su Nombre o Alias "
              value={name}
              onChange={handleNameChange}
            />
            <Input
              className={classes.input}
              placeholder="Ingrese su Edad "
              value={age}
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
              href="/niveles"
              disabled={isButtonDisabled}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
