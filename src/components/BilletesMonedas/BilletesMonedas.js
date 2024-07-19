import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { TableBody } from "@mui/material";
import { useStyles } from "./BilletesMonedas.style.js";

const BilletesMonedas = ({ onDragStart }) => {
  const classes = useStyles();

  //Inicia el evento de arrastre
  const handleDragStart = (e, imagenes) => {
    e.dataTransfer.setData("imagenes", JSON.stringify(imagenes));
    onDragStart(imagenes);
  };

  // Agrupar Imagenes
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

  return (
    <Table className={classes.table}>
      <TableBody>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete10.png",
                "moneda50.png",
                "moneda10.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete10.png",
              "moneda50.png",
              "moneda10.png",
            ])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete2.png",
                "moneda25.png",
                "moneda5.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete2.png",
              "moneda25.png",
              "moneda5.png",
            ])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete50.png",
                "moneda1.png",
                "moneda5.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete50.png",
              "moneda1.png",
              "moneda5.png",
            ])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete10.png",
                "moneda25.png",
                "moneda25.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete10.png",
              "moneda25.png",
              "moneda25.png",
            ])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete10.png",
                "moneda25.png",
                "moneda25.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete20.png",
              "moneda25.png",
              "moneda50.png",
            ])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete10.png",
                "moneda10.png",
                "moneda5.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete10.png",
              "moneda10.png",
              "moneda5.png",
            ])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete5.png",
                "moneda1.png",
                "moneda10.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete5.png",
              "moneda1.png",
              "moneda10.png",
            ])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, [
                "billete50.png",
                "moneda25.png",
                "moneda10.png",
              ])
            }
          >
            {renderizarImagenes([
              "billete50.png",
              "moneda25.png",
              "moneda10.png",
            ])}
          </Col>
        </Row>
      </TableBody>
    </Table>
  );
};

export default BilletesMonedas;
