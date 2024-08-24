import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "commons/Button";
import { useStyles } from "./PuntajesAltos.style.js";

const PuntajesAltos = () => {
  const classes = useStyles();
  const [puntajes, setPuntajes] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [edad, setEdad] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [score, setScore] = useState();
  const [timeElapsed, setTimeElapsed] = useState();

  // Obtener el puntaje de localStorage cuando el componente se monta
  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedEdad = localStorage.getItem("edad");
    const storedTipo = localStorage.getItem("tipo");
    const storedScore = localStorage.getItem("score");
    const storedtimeElapsed = localStorage.getItem("tiempo");

    if (storedNombre !== null) {
      setNombre(storedNombre);
    }
    if (storedEdad !== null) {
      setEdad(storedEdad);
    }
    if (storedTipo !== null) {
      setTipo(storedTipo);
    }
    if (storedScore !== null) {
      setScore(parseInt(storedScore, 10));
    }
    if (storedtimeElapsed !== null) {
      setTimeElapsed(storedtimeElapsed);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/puntajes")
      .then((response) => {
        setPuntajes(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los puntajes:", error);
      });
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Nombre &nbsp;o&nbsp; Alias</th>
            <th>Edad</th>
            <th>Nivel</th>
            <th>Puntaje</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {puntajes.map((puntaje, index) => (
            <tr key={puntaje.id}>
              <td className="text-center">{index + 1}</td>
              <td>{puntaje.usuario.nombre}</td>
              <td>{puntaje.usuario.edad}</td>
              <td>{puntaje.nivel.tipo}</td>
              <td>{puntaje.puntaje}</td>
              <td>{puntaje.tiempo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className={classes.button}
        color="info"
        value="Salir del Juego"
        href={"/principal"}
      ></Button>

      <div className={classes.container}>
        <div className={classes.puntajeItem}>
          <p>
            <strong>Nombre:</strong> {nombre}
          </p>
          <p>
            <strong>Edad:</strong> {edad}
          </p>
          <p>
            <strong>Nivel:</strong> {tipo}
          </p>
          <p>
            <strong>Puntaje:</strong> {score}
          </p>
          <p>
            <strong>Tiempo:</strong> {timeElapsed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuntajesAltos;
