import React from "react";
import Button from "commons/Button";
import { useStyles } from "./PuntajesAltos.style.js";

const PuntajesAltos = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th>Nombre &nbsp;o&nbsp; Alias</th>
              <th>Edad</th>
              <th>Nivel</th>
              <th>Puntaje</th>
              <th>Tiempo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>Andrew Mike</td>
              <td>80</td>
              <td>Principiante</td>
              <td> 8</td>
              <td>5:13</td>
              <td>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-info btn-sm btn-icon"
                >
                  <i class="tim-icons icon-single-02"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-success btn-sm btn-icon"
                >
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-danger btn-sm btn-icon"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td class="text-center">2</td>
              <td>John Doe</td>
              <td>60</td>
              <td>Intermedio</td>
              <td>16</td>
              <td>3:13</td>

              <td>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-info btn-sm btn-round btn-icon"
                >
                  <i class="tim-icons icon-single-02"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-success btn-sm btn-round btn-icon"
                >
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-danger btn-sm btn-round btn-icon"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td class="text-center">3</td>
              <td>Alex Mike</td>
              <td>78</td>
              <td>Avanzado</td>
              <td> 30</td>
              <td>4:13</td>

              <td>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-info btn-simple btn-icon btn-sm"
                >
                  <i class="tim-icons icon-single-02"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-success btn-simple btn-icon btn-sm"
                >
                  <i class="tim-icons icon-settings-gear-63"></i>
                </button>
                <button
                  type="button"
                  rel="tooltip"
                  class="btn btn-danger btn-simple btn-icon btn-sm"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          className={classes.button}
          color="info"
          value="Salir del Juego"
          href={"/principal"}
        ></Button>
      </div>
    </>
  );
};

export default PuntajesAltos;
