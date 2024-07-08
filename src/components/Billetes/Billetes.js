import React from "react";
import Image from "commons/Image";
import { Table, Row, Col } from "reactstrap";
import { TableBody } from "@mui/material";
//Estilos css
import { useStyles } from "./Billetes.style.js";

const Billetes = () => {
  const classes = useStyles();
  return (
    <Table className={classes.table}>
      <TableBody>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete1"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete2.png")}
              alt="Billete2"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete2.png")}
              alt="Billete3"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete20.png")}
              alt="Billete4"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete5"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete50.png")}
              alt="Billete6"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete7"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete8"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete5.png")}
              alt="Billete9"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete20.png")}
              alt="Billete10"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete10.png")}
              alt="Billete11"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete5.png")}
              alt="Billete12"
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete5.png")}
              alt="Billete13"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete2.png")}
              alt="Billete14"
            />
          </Col>
          <Col className={classes.col}>
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete20.png")}
              alt="Billete15"
            />
            <Image
              className={classes.img}
              src={require("assets/img/billetes/billete50.png")}
              alt="Billete16"
            />
          </Col>
        </Row>
      </TableBody>
    </Table>
  );
};
export default Billetes;
