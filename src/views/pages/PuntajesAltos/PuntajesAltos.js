import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "commons/Button";
import { useStyles } from "./PuntajesAltos.style.js";

const PuntajesAltos = () => {
  const classes = useStyles();
  const [puntajes, setPuntajes] = useState([]);
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [tipo, setTipo] = useState("");
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Obtener el puntaje de localStorage cuando el componente se monta
  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    const storedEdad = localStorage.getItem("edad");
    const storedTipo = localStorage.getItem("tipo");
    const storedScore = localStorage.getItem("score");
    const storedTimeElapsed = localStorage.getItem("tiempo");

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
    if (storedTimeElapsed !== null) {
      setTimeElapsed(storedTimeElapsed);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/puntajes")
      .then((response) => {
        const sortedPuntajes = response.data.sort((a, b) => {
          if (a.puntos === b.puntos) {
            // Si los puntos son iguales, ordenar por el menor tiempo
            return a.tiempo - b.tiempo;
          }
          // Ordenar por puntos más altos
          return b.puntos - a.puntos;
        });
        setPuntajes(sortedPuntajes);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los puntajes:", error);
      });
  }, []);

  // Filtrar puntajes por nivel
  const puntajesFiltrados = puntajes.filter((puntaje) => {
    if (filtroNivel === "Todos") {
      return true;
    }
    return puntaje.tipo === filtroNivel;
  });

  return (
    <div>
      <div className={classes.filterContainer}>
        <p>
          <label htmlFor="nivel">Buscar por Nivel:</label>
          &nbsp; &nbsp;
          <select
            id="nivel"
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </p>
      </div>

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
          {puntajes
            .filter((puntaje) =>
              filtroNivel === "Todos" ? true : puntaje.tipo === filtroNivel
            )
            .slice(0, 20) // Limita el número de elementos mostrados a 20
            .map((puntaje, index) => (
              <tr key={puntaje.id}>
                <td className="text-center">{index + 1}</td>
                <td>{puntaje.nombre}</td>
                <td>{puntaje.edad}</td>
                <td>{puntaje.tipo}</td>
                <td>{puntaje.puntos}</td>
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
