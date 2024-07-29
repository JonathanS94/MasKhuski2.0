import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import Niveles from "views/pages/Niveles/Niveles.js";
import Principiante from "views/pages/Principiante/Principiante.js";
import Intermedio from "views/pages/Intermedio/Intermedio.js";
import Avanzado from "views/pages/Avanzado/Avanzado.js";
import Resultado from "views/pages/Resultado/Resultado.js";
import PuntajesAltos from "views/pages/PuntajesAltos/PuntuajesAltos.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Navigate to="/principal" replace />} />
      <Route path="/principal" element={<Index />} />
      <Route path="/niveles" element={<Niveles />} />
      <Route path="/principiante" element={<Principiante />} />
      <Route path="/intermedio" element={<Intermedio />} />
      <Route path="/avanzado" element={<Avanzado />} />
      <Route path="/resultado" element={<Resultado />} />
      <Route path="/puntajes" element={<PuntajesAltos />} />
    </Routes>
  </BrowserRouter>
);
