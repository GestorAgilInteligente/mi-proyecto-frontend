// src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegistroColaborador from "./pages/RegisterCollaborator";
import RegisterTask from "./pages/RegisterTask";
import Proyectos from "./pages/Proyectos";
import Colaborador from "./pages/Colaborador";
import ProyectoDetalle from "./pages/ProyectoDetalle";
import RegistroProyecto from "./pages/RegisterProyectos";
import Layout from "./components/Layout"; // nuevo componente para navegación entre paginas
import IASuggestion from "./pages/IASuggestion";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta SIN layout */}
        <Route path="/" element={<Login />} />

        {/* Rutas CON layout (Navbar + contenido) */}
        <Route element={<Layout />}>
          <Route path="/registro" element={<RegistroColaborador />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/colaborador" element={<Colaborador />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
          <Route path="/crear-tarea" element={<RegisterTask />} />
          <Route path="/registroproyecto" element={<RegistroProyecto />} />
          <Route path="/ia-suggestion" element={<IASuggestion />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
