import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { TableBody } from "@mui/material";
//Estilos css
import { useStyles } from "./BilletesMonedas.style.js";

const BilletesMonedas = () => {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableBody>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.imgBillete}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda50.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.imgBillete}
              src={require("assets/img/billetes/billete2.png")}
              alt="Billete2"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda2"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.imgBillete}
              src={require("assets/img/billetes/billete50.png")}
              alt="Billete3"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda1.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete4"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda2"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete20.png")}
              alt="Billete5"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda50.png")}
              alt="Moneda2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete6"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda5.png")}
              alt="Moneda2"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete5.png")}
              alt="Billete7"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda1.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete50.png")}
              alt="Billete8"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda10.png")}
              alt="Moneda1"
            />
            <Image
              className={classes.imgMoneda}
              src={require("assets/img/monedas/moneda25.png")}
              alt="Moneda2"
            />
          </Col>
        </Row>
      </TableBody>
    </Table>
  );
};
export default BilletesMonedas;
