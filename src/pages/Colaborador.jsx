import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from "../api/axios";


export default function Colaborador() {
  const { id } = useParams(); // Simulado
  console.log("ID del colaborador:", id); // Se usará en la conexión futura con backend

  // === Datos simulados (mock) ===
  const [colaborador, setColaborador] = useState({
    nombre: 'Juan Pérez',
    rol: 'Backend',
    competencias: 'Node.js, Express, MongoDB',
    proyectos: [
      { nombre: 'Proyecto A', dedicacion: 60, color: '#4F46E5' },
      { nombre: 'Proyecto B', dedicacion: 40, color: '#F59E0B' },
    ]
  });

  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [editandoProyectos, setEditandoProyectos] = useState(false);

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setColaborador({ ...colaborador, [name]: value });
  };

  const handleGuardarPerfil = () => {
    setEditandoPerfil(false);
  };

  const handleProyectoChange = (index, field, value) => {
    const nuevosProyectos = [...colaborador.proyectos];
    nuevosProyectos[index][field] = field === 'dedicacion' ? parseInt(value) : value;
    setColaborador({ ...colaborador, proyectos: nuevosProyectos });
  };

  const handleGuardarProyectos = () => {
    setEditandoProyectos(false);
  };

  const totalOcupacion = colaborador.proyectos.reduce((acc, p) => acc + p.dedicacion, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Perfil del Colaborador</h1>

      {/* === Sección perfil === */}
      <div>
        {editandoPerfil ? (
          <div className="space-y-2">
            <input
              className="w-full border p-2"
              name="nombre"
              value={colaborador.nombre}
              onChange={handlePerfilChange}
            />
            <input
              className="w-full border p-2"
              name="rol"
              value={colaborador.rol}
              onChange={handlePerfilChange}
            />
            <input
              className="w-full border p-2"
              name="competencias"
              value={colaborador.competencias}
              onChange={handlePerfilChange}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" onClick={handleGuardarPerfil}>
              Guardar
            </button>
          </div>
        ) : (
          <div className="space-y-1 mb-4">
            <p><strong>Nombre:</strong> {colaborador.nombre}</p>
            <p><strong>Rol:</strong> {colaborador.rol}</p>
            <p><strong>Competencias:</strong> {colaborador.competencias}</p>
            <button className="bg-blue-500 text-white px-4 py-1 mt-2 rounded hover:bg-green-700 transition" onClick={() => setEditandoPerfil(true)}>
              Editar perfil
            </button>
          </div>
        )}
      </div>

      {/* === Sección proyectos === */}
      <div>
        <h2 className="font-semibold mb-2">Proyectos asignados:</h2>

        {/* Gráfico circular (Donut) de dedicación */}
        <div className="flex items-center gap-4 mb-4">
          <svg width="100" height="100" viewBox="0 0 36 36" className="transform -rotate-90">
            {(() => {
              let offset = 0;
              return colaborador.proyectos.map((p, i) => {
                const percent = (p.dedicacion / 100) * 100;
                const dashArray = `${percent} ${100 - percent}`;
                const circle = (
                  <circle
                    key={i}
                    r="15.915"
                    cx="18"
                    cy="18"
                    fill="transparent"
                    stroke={p.color}
                    strokeWidth="3.5"
                    strokeDasharray={dashArray}
                    strokeDashoffset={offset}
                  />
                );
                offset -= percent;
                return circle;
              });
            })()}
          </svg>
          <div>
            <p className="font-semibold">Ocupación total: {totalOcupacion}%</p>
            <ul className="text-sm">
              {colaborador.proyectos.map((p, i) => (
                <li key={i}><span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ background: p.color }}></span>{p.nombre}</li>
              ))}
            </ul>
          </div>
        </div>

        {editandoProyectos ? (
          <div className="space-y-2">
            {colaborador.proyectos.map((proyecto, index) => (
              <div key={index} className="flex flex-col gap-1">
                <input
                  className="w-full border p-1"
                  value={proyecto.nombre}
                  onChange={(e) => handleProyectoChange(index, 'nombre', e.target.value)}
                />
                <input
                  type="number"
                  className="w-full border p-1"
                  value={proyecto.dedicacion}
                  onChange={(e) => handleProyectoChange(index, 'dedicacion', e.target.value)}
                />
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" onClick={handleGuardarProyectos}>
              Guardar proyectos
            </button>
          </div>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {colaborador.proyectos.map((p, idx) => (
              <li key={idx}>{p.nombre} – {p.dedicacion}%</li>
            ))}
          </ul>
        )}

        {!editandoProyectos && (
          <button className="bg-blue-500 text-white px-4 py-1 mt-3 rounded hover:bg-green-700 transition" onClick={() => setEditandoProyectos(true)}>
            Editar proyectos
          </button>
        )}
      </div>
    </div>
  );
}
