// src/pages/Proyectos.jsx
import { useNavigate } from 'react-router-dom';

const proyectosMock = [
  {
    id: 1,
    nombre: 'Plataforma de Tareas Inteligentes',
    etapa: 'Desarrollo',
    avance: 65,
    colaboradores: [
      { nombre: 'Juan Pérez', rol: 'Frontend', dedicacion: '50%' },
      { nombre: 'María Gómez', rol: 'Backend', dedicacion: '75%' },
    ],
  },
  {
    id: 2,
    nombre: 'Sistema de Inventarios IA',
    etapa: 'Planificación',
    avance: 20,
    colaboradores: [
      { nombre: 'Carlos Ruiz', rol: 'PM', dedicacion: '100%' },
    ],
  },
];

export default function Proyectos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Proyectos Activos</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {proyectosMock.map((proyecto) => (
          <div
            key={proyecto.id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/proyectos/${proyecto.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{proyecto.nombre}</h2>
            <p className="text-sm text-gray-500 mb-2">Etapa actual: <span className="font-medium">{proyecto.etapa}</span></p>

            <div className="mb-2">
              <div className="text-sm text-gray-500">Avance:</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${proyecto.avance}%` }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">{proyecto.avance}%</div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-600 font-semibold mb-1">Colaboradores:</p>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {proyecto.colaboradores.map((c, idx) => (
                  <li key={idx}>{c.nombre} ({c.rol}) - {c.dedicacion}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
