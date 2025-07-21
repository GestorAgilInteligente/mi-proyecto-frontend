// src/pages/RegisterCollaborator.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function IASuggestion() {
  const [formulario, setFormulario] = useState({
    taskId: "",
    roleId: "",
  });
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [roles, setRoles] = useState([]);
  const [suggestion, setSuggestion] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProject = await axios.get("/project");
        setProjects(resProject.data.data);
        const resRoles = await axios.get("/role");
        setRoles(resRoles.data);
      } catch (err) {
        console.error(err);
        alert("Error obteniendo proyectos");
      }
    };
    fetchData();
  }, []);

  const searchTask = async (id) => {
    try {
      const resTasks = await axios.get(`/task/project/${id}`);
      setTasks(resTasks.data.data);
    } catch (err) {
      console.error(err);
      alert("Error obteniendo tareas del proyecto");
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    console.log(formulario);

    if (!formulario.taskId || !formulario.roleId) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const data = {
      taskId: formulario.taskId,
      roleId: formulario.roleId,
    };

    try {
      const respuesta = await axios.post("http://localhost:3000/n8n", data);
      console.log("Sugerencia", respuesta.data);
      setSuggestion(respuesta.data);
    } catch (error) {
      console.error(
        "Error al pedir la sugerencia:",
        error.response?.data || error.message
      );
      alert("Hubo un error al pedir la sugerencia.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="bg-gradient-to-r from-purple-500 via-orange-300 to-pink-400 rounded-t-xl h-28 flex justify-center items-center"></div>

        <form onSubmit={manejarEnvio} className="p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-gray-700">
            Sugerencia de IA
          </h2>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Proyecto</label>
            <select
              value={formulario.project}
              onChange={(e) => {
                const selectedId = e.target.value;
                searchTask(selectedId);
              }}
            >
              <option key={0} value="" disabled={true} selected={true}>
                Seleccione un proyecto
              </option>
              {projects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Tareas</label>
            <select
              value={formulario.taskId}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  taskId: e.target.value,
                })
              }
            >
              <option key={0} value="" disabled={true}>
                Seleccione una tarea
              </option>
              {tasks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Role</label>
            <select
              value={formulario.roleId}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  roleId: e.target.value,
                })
              }
            >
              <option key={0} value="" disabled={true}>
                Seleccione el rol
              </option>
              {roles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
          >
            Solicitar sugerencia
          </button>
        </form>
      </div>
      {suggestion?.opcion1 && (
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Opción</th>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Justificación</th>
              </tr>
            </thead>
            <tbody>
              {[suggestion.opcion1, suggestion.opcion2, suggestion.opcion3]
                .filter(Boolean) // elimina nulos o undefined
                .map((opcion, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-4 py-2 font-semibold">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{opcion.name}</td>
                    <td className="border px-4 py-2">{opcion.justification}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
