import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
//Estilos css
import { useStyles } from "./Monedas.style";

const Monedas = ({ onDragStart }) => {
  const classes = useStyles();
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
        src={require(`assets/img/monedas/${imagen}`)}
        alt={`moneda${indice + 1}`}
      />
    ));

  return (
    <Table className={classes.table}>
      <Row className={classes.row}>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda1.png", "moneda25.png"])
          }
        >
          {renderizarImagenes(["moneda1.png", "moneda25.png"])}
        </Col>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda1.png", "moneda5.png"])
          }
        >
          {renderizarImagenes(["moneda1.png", "moneda5.png"])}
        </Col>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda10.png", "moneda5.png"])
          }
        >
          {renderizarImagenes(["moneda10.png", "moneda5.png"])}
        </Col>
      </Row>
      <Row className={classes.row}>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda50.png", "moneda10.png"])
          }
        >
          {renderizarImagenes(["moneda50.png", "moneda10.png"])}
        </Col>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda25.png", "moneda10.png"])
          }
        >
          {renderizarImagenes(["moneda25.png", "moneda10.png"])}
        </Col>
        <Col
          className={classes.col}
          draggable
          onDragStart={(e) =>
            handleDragStart(e, ["moneda50.png", "moneda5.png"])
          }
        >
          {renderizarImagenes(["moneda50.png", "moneda5.png"])}
        </Col>
      </Row>
    </Table>
  );
};

export default Monedas;
