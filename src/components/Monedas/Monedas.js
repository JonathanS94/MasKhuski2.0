import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import TableBody from "@mui/material/TableBody";
//Estilos css
import { useStyles } from "./Monedas.style";

const Monedas = () => {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableBody>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda1.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda1.png")}
              alt="Moneda3"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda4"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda5"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda6"
            />
          </Col>
        </Row>

        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda50.png")}
              alt="Moneda7"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda8"
            />
          </Col>

          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda9"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda10"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda50.png")}
              alt="Moneda11"
            />
            <Image
              className={classes.img}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda12"
            />
          </Col>
        </Row>
      </TableBody>
    </Table>
  );
};

export default Monedas;
