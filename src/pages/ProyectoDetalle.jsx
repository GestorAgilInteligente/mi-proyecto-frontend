// src/pages/ProyectoDetalle.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ProyectoDetalle() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

  /**
   * Consulta al backend el detalle del proyecto por ID.
   */
  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const res = await axios.get(`/project/${id}`);
        setProyecto(res.data.data); // ajustado al formato real del backend
      } catch (error) {
        console.error("Error cargando proyecto:", error);
        alert("No se pudo cargar el proyecto.");
      }
    };

    fetchProyecto();
  }, [id]);

  if (!proyecto) {
    return <p className="text-center mt-10 text-gray-600">Cargando proyecto...</p>;
  }

  const avance = proyecto.progress || 0;
  const colaboradores = proyecto.colaborators || [];
  const totalDedicacion = colaboradores.reduce((acc, colab) => acc + colab.dedication, 0);

    return (
    <div className="p-6 max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-md">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1">{proyecto.name}</h1>
      <p className="text-gray-600 mb-2">{proyecto.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        Estado: <strong>{proyecto.status?.name || "Sin estado"}</strong>
      </p>
      <p className="text-sm text-gray-500">
        Fecha de entrega:{" "}
        {proyecto.delivery_date ? (
          <strong>{new Date(proyecto.delivery_date).toLocaleDateString()}</strong>
        ) : (
          <em>No definida</em>
        )}
      </p>

      {/* Métricas y gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Gráfica Circular de Avance */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Avance del Proyecto</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Completado", value: avance },
                  { name: "Pendiente", value: 100 - avance },
                ]}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#10B981" />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600">Avance: {avance}%</p>
        </div>

        {/* Gráfica de Barras por dedicación */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Dedicación por Colaborador</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={colaboradores}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="dedication" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Lista de colaboradores */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Resumen de integrantes asignados</h2>
        {colaboradores.length === 0 ? (
          <p className="text-sm text-gray-600">No hay colaboradores asignados aún.</p>
        ) : (
          <ul className="space-y-2">
            {colaboradores.map((colab, idx) => (
              <li
                key={idx}
                className="border p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{colab.name}</strong> – {colab.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dedicación: {colab.dedication}%
                  </p>
                </div>
                <button className="text-blue-600 hover:underline text-sm">
                  Ver perfil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Resumen general */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Fecha de creación:</strong>{" "}
          {proyecto.created_at ? (
            new Date(proyecto.created_at).toLocaleDateString()
          ) : (
            <em>No disponible</em>
          )}
        </p>
        <p>
          <strong>Total ocupación asignada:</strong> {totalDedicacion}%
        </p>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Editar Proyecto
        </button>
        <button
          className="text-gray-600 hover:underline"
          onClick={() => history.back()}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
