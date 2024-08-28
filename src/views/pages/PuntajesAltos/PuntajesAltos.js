import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "commons/Button";
import { useStyles } from "./PuntajesAltos.style.js";

const PuntajesAltos = () => {
  const classes = useStyles();
  const [puntajes, setPuntajes] = useState([]);
  const [filtroNivel, setFiltroNivel] = useState("Todos");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/puntajes/")
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
    </div>
  );
};

export default PuntajesAltos;
