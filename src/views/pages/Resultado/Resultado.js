import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "commons/Image.js";
import Button from "commons/Button.js";
import { useStyles } from "./Resultado.style.js";
import { useNavigate } from "react-router-dom";

const Resultado = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  // Obtener el puntaje de localStorage cuando el componente se monta
  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
      setScore(parseInt(storedScore, 10));
    }
  }, []);

  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  // Función para regresar a la página anterior
  const handleGoBack = () => {
    navigate(-1); // Navegar a la página anterior
  };

  return (
    <>
      <div className="wrapper">
        <div
          className="square square-1"
          id="square1"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-2"
          id="square2"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-3"
          id="square3"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-4"
          id="square4"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-5"
          id="square5"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-6"
          id="square6"
          style={{ transform: squares1to6 }}
        />
        <div
          className="square square-7"
          id="square7"
          style={{ transform: squares7and8 }}
        />
        <div
          className="square square-8"
          id="square8"
          style={{ transform: squares7and8 }}
        />
        <div className="page-header">
          <div className={classes.h1}>PUNTAJE &nbsp; OBTENIDO</div>
          <Container className={classes.container}>
            <Row>
              <Col>
                <Image
                  className={classes.img}
                  src={require("assets/img/logo/logo.png")}
                />
              </Col>
              <Col>
                <div className={classes.score}>{score} Puntos</div>
              </Col>
              <Col>
                <Button
                  className={classes.button}
                  color="info"
                  value="Volver a intertarlo"
                  onClick={handleGoBack}
                ></Button>
                <Button
                  className={classes.button}
                  color="info"
                  value="Volver a Selección de Nivel"
                  href={"/niveles"}
                ></Button>
                <Button
                  className={classes.button}
                  color="info"
                  value={"Tabla de Puntajes"}
                  href={"/puntajes"}
                ></Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Resultado;
