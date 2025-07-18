// src/pages/ProyectoDetalle.jsx
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const datosMock = {
  nombre: "Proyecto IA Talento",
  descripcion: "Sistema inteligente de asignación de tareas",
  etapa: "Desarrollo",
  avance: 75,
  colaboradores: [
    { nombre: "Juan Pérez", rol: "Backend", dedicacion: 60 },
    { nombre: "Ana Gómez", rol: "Frontend", dedicacion: 40 },
  ],
  fechas: {
    inicio: "2025-06-01",
    fin: "2025-08-01",
  },
};

export default function ProyectoDetalle() {
  const { id } = useParams(); // Simulado
  console.log("ID del proyecto:", id); // Se usará para cargar datos reales más adelante
  const totalDedicacion = datosMock.colaboradores.reduce((acc, colab) => acc + colab.dedicacion, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-md">
      {/* Encabezado */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1">{datosMock.nombre}</h1>
      <p className="text-gray-600 mb-2">{datosMock.descripcion}</p>
      <p className="text-sm text-gray-500">Etapa actual: <strong>{datosMock.etapa}</strong></p>

      {/* Métricas y gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Gráfica Circular de Avance */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Avance del Proyecto</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Completado", value: datosMock.avance },
                  { name: "Pendiente", value: 100 - datosMock.avance },
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
          <p className="mt-2 text-sm text-gray-600">Avance: {datosMock.avance}%</p>
        </div>

        {/* Gráfica de Barras por dedicación */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-center">Dedicación por Colaborador</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={datosMock.colaboradores}>
              <XAxis dataKey="nombre" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="dedicacion" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de colaboradores */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Integrantes del proyecto</h2>
        <ul className="space-y-2">
          {datosMock.colaboradores.map((colab, idx) => (
            <li key={idx} className="border p-3 rounded-md flex justify-between items-center">
              <div>
                <p><strong>{colab.nombre}</strong> – {colab.rol}</p>
                <p className="text-sm text-gray-600">Dedicación: {colab.dedicacion}%</p>
              </div>
              <button className="text-blue-600 hover:underline text-sm">
                Ver perfil
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Resumen general */}
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Duración:</strong> {datosMock.fechas.inicio} → {datosMock.fechas.fin}</p>
        <p><strong>Total ocupación asignada:</strong> {totalDedicacion}%</p>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Editar Proyecto
        </button>
        <button className="text-gray-600 hover:underline" onClick={() => history.back()}>
          Volver
        </button>
      </div>
    </div>
  );
}
