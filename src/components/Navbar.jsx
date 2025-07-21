// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Gestor Ágil Inteligente</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Login</Link>
        <Link to="/registro" className="hover:underline">Registro Colaborador</Link>
        <Link to="/proyectos" className="hover:underline">Proyectos</Link>
        <Link to="/crear-tarea" className="hover:underline">Crear tarea</Link>
        <Link to="/colaborador" className="hover:underline">Colaborador</Link>
        <Link to="/registroproyecto" className="hover:underline">Registro Proyecto</Link>
        <Link to="/ia-suggestion" className="hover:underline">Sugerencia IA</Link>
      </div>
    </nav>
  );
}
