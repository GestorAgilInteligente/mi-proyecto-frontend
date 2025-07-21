// src/pages/RegisterCollaborator.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function RegisterCollaborator() {
  const [formulario, setFormulario] = useState({
    first_name: "", // nombres
    last_name: "", // apellidos
    phone: "",
    email: "",
    password: "",
    confirmPass: "",
    skills: [], // array de strings (UUIDs de skills)
    roles: [], // array de un string (UUID del rol)
    contracted_time: "", // string UUID
  });
  const [contracted, setContracted] = useState([]);
  const [roles, setRoles] = useState([]);
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
        const resRole = await axios.get("/role");
        setRoles(resRole.data); // retorna un array
        const resContracted = await axios.get("/contracted-time");
        setContracted(resContracted.data);
        const resSkill = await axios.get("/skill");
        setSkills(resSkill.data.data);
      } catch (err) {
        console.error(err);
        alert("Error obteniendo roles, skills o tiempo contratado");
      }
    };
    fetchData();
  }, []);
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (
      !formulario.first_name ||
      !formulario.last_name ||
      !formulario.email ||
      !formulario.phone ||
      !formulario.password ||
      !formulario.confirmPass ||
      !formulario.contracted_time ||
      formulario.skills.length === 0 ||
      formulario.roles.length === 0
    ) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (formulario.password !== formulario.confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const data = {
      email: formulario.email,
      password: formulario.password,
      confirmPass: formulario.confirmPass, // obligatorio revisar
      first_name: formulario.first_name,
      last_name: formulario.last_name,
      phone: formulario.phone,
      skills: formulario.skills, // array de strings
      roles: formulario.roles, // array de strings
      contracted_time: formulario.contracted_time, // UUID
    };

    try {
      const respuesta = await axios.post(
        "http://localhost:3000/auth/signup",
        data
      );
      console.log("Colaborador registrado", respuesta.data);
      alert("Colaborador registrado correctamente");
    } catch (error) {
      console.error(
        "Error al registrar:",
        error.response?.data || error.message
      );
      alert("Hubo un error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="bg-gradient-to-r from-purple-500 via-orange-300 to-pink-400 rounded-t-xl h-28 flex justify-center items-center">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-white overflow-hidden shadow">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-gray-700">
            Registrar Colaborador
          </h2>

          <input
            type="text"
            placeholder="Nombres"
            value={formulario.first_name}
            onChange={(e) =>
              setFormulario({ ...formulario, first_name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={formulario.last_name}
            onChange={(e) =>
              setFormulario({ ...formulario, last_name: e.target.value })
            }
          />

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Rol</label>
            <select
              value={formulario.roles[0] || ""}
              onChange={(e) =>
                setFormulario({ ...formulario, roles: [e.target.value] })
              }
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              tiempo contratado
            </label>
            <select
              value={formulario.contracted_time}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  contracted_time: e.target.value,
                })
              }
            >
              {contracted.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Selecciona tus tecnologías (skills)
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
            <label className="text-sm text-gray-600 mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formulario.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 3001234567"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">password</label>
            <input
              type="password"
              name="password"
              value={formulario.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Abcd1234*"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">confirmPass</label>
            <input
              type="password"
              name="confirmPass"
              value={formulario.confirmPass}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Abcd1234*"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="demo@email.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
          >
            Registrar Colaborador
          </button>
        </form>
      </div>
    </div>
  );
}
