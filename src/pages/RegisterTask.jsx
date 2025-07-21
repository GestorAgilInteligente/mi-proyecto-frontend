// src/pages/RegisterCollaborator.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function RegisterTask() {
  const [formulario, setFormulario] = useState({
    name: "", // nombre
    details: "",
    time_required: 10,
    priority: 3,
    skills: [], // array de strings (UUIDs de skills)
    status: "", // string UUID
    project: "", // string UUID
  });
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState([]);
  const [skillsDisponibles, setSkills] = useState([]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProject = await axios.get("/project");
        setProjects(resProject.data.data);
        const resStatus = await axios.get("/status");
        setStatus(resStatus.data);
        const resSkill = await axios.get("/skill");
        setSkills(resSkill.data.data);
      } catch (err) {
        console.error(err);
        alert("Error obteniendo proyectos, skills o estados");
      }
    };
    fetchData();
  }, []);
  const manejarEnvio = async (e) => {
    e.preventDefault();

    console.log(formulario);

    if (
      !formulario.name ||
      !formulario.details ||
      !formulario.time_required ||
      !formulario.priority ||
      formulario.skills.length === 0 ||
      !formulario.status ||
      !formulario.project
    ) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const data = {
      name: formulario.name,
      details: formulario.details,
      time_required: formulario.time_required,
      priority: formulario.priority,
      skills: formulario.skills, // array de strings
      status: formulario.status, // UUID
      project: formulario.project, // UUID
    };

    try {
      const respuesta = await axios.post("http://localhost:3000/task", data);
      console.log("Tarea creada", respuesta.data);
      alert("Tarea creada correctamente");
      setFormulario({
        name: "", // nombre
        details: "",
        time_required: 10,
        priority: 3,
        skills: [], // array de strings (UUIDs de skills)
        status: "", // string UUID
        project: "", // string UUID
      });
    } catch (error) {
      console.error(
        "Error al crear tarea:",
        error.response?.data || error.message
      );
      alert("Hubo un error al crear la tarea. Verifica los datos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="bg-gradient-to-r from-purple-500 via-orange-300 to-pink-400 rounded-t-xl h-28 flex justify-center items-center"></div>

        <form onSubmit={manejarEnvio} className="p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-gray-700">
            Crear tarea
          </h2>

          <div className="flex">
            <div>
              <label className="text-sm text-gray-600 mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formulario.name}
                onChange={(e) =>
                  setFormulario({ ...formulario, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1">
                Prioridad (1 baja - 5 alta)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                placeholder="3"
                value={formulario.priority}
                onChange={(e) =>
                  setFormulario({ ...formulario, priority: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Proyecto</label>
            <select
              value={formulario.project}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  project: e.target.value,
                })
              }
            >
              <option key={0} value="" disabled={true}>
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
            <label className="text-sm text-gray-600 mb-1">
              Selecciona las habilidades requeridas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {skillsDisponibles.map((skill) => (
                <label key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={skill.id}
                    checked={formulario.skills.includes(skill.id)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      const nuevasSkills = checked
                        ? [...formulario.skills, value]
                        : formulario.skills.filter((s) => s !== value);
                      setFormulario({ ...formulario, skills: nuevasSkills });
                    }}
                  />
                  <span>{skill.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Detalles</label>
            <input
              type="text"
              name="details"
              value={formulario.details}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Detalles de la tarea"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Tiempo requerido (en horas)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              placeholder="10"
              value={formulario.time_required}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  time_required: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Estado</label>
            <select
              value={formulario.status}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  status: e.target.value,
                })
              }
            >
              <option key={0} value="" disabled={true}>
                Seleccione un estado
              </option>
              {status.map((item) => (
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
            Crear tarea
          </button>
        </form>
      </div>
    </div>
  );
}
