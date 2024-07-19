import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { TableBody } from "@mui/material";
//Estilos css
import { useStyles } from "./Billetes.style.js";

const Billetes = ({ onDragStart }) => {
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
        src={require(`assets/img/billetes/${imagen}`)}
        alt={`billete${indice + 1}`}
      />
    ));
  return (
    <Table className={classes.table}>
      <TableBody>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete2.png", "billete10.png"])
            }
          >
            {renderizarImagenes(["billete2.png", "billete10.png"])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete2.png", "billete20.png"])
            }
          >
            {renderizarImagenes(["billete2.png", "billete20.png"])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete10.png", "billete50.png"])
            }
          >
            {renderizarImagenes(["billete10.png", "billete50.png"])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete10.png", "billete10.png"])
            }
          >
            {renderizarImagenes(["billete10.png", "billete10.png"])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete5.png", "billete20.png"])
            }
          >
            {renderizarImagenes(["billete5.png", "billete20.png"])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete10.png", "billete5.png"])
            }
          >
            {renderizarImagenes(["billete10.png", "billete5.png"])}
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete5.png", "billete2.png"])
            }
          >
            {renderizarImagenes(["billete5.png", "billete2.png"])}
          </Col>
          <Col
            className={classes.col}
            draggable
            onDragStart={(e) =>
              handleDragStart(e, ["billete50.png", "billete20.png"])
            }
          >
            {renderizarImagenes(["billete50.png", "billete20.png"])}
          </Col>
        </Row>
      </TableBody>
    </Table>
  );
};
export default Billetes;
