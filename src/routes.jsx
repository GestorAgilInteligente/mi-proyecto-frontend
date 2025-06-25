// src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegistroColaborador from "./pages/RegistroColaborador";
import Proyectos from "./pages/Proyectos";
import Colaborador from "./pages/Colaborador";
import ProyectoDetalle from './pages/ProyectoDetalle';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<RegistroColaborador />} />
        <Route path="/proyectos" element={<Proyectos />} />
         <Route path="/colaborador" element={<Colaborador />} />
         <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}
