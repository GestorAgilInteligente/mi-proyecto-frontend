// src/pages/Proyectos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

/**
 * Vista de Proyectos: muestra los proyectos registrados en el backend.
 * Estilo visual consistente con tarjetas personalizadas.
 */
export default function Proyectos() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);

  /**
   * Consulta los proyectos activos al backend y los guarda en el estado.
   */
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const res = await axios.get("/project");
        setProyectos(res.data.data); // extrae la lista de proyectos
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        alert("No se pudieron cargar los proyectos.");
      }
    };

    obtenerProyectos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Proyectos Activos
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/proyecto/${proyecto.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {proyecto.name}
            </h2>

            <p className="text-sm text-gray-500 mb-2">{proyecto.description}</p>

            <p className="text-sm text-gray-500 mb-1">
              Estado:{" "}
              <span className="font-semibold text-orange-700">
                {proyecto.status?.name || "Sin estado"}
              </span>
            </p>

            <div className="text-sm text-gray-500 mb-2">
              Fecha de entrega:{" "}
              <span className="font-medium">
                {new Date(proyecto.delivery_date).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
