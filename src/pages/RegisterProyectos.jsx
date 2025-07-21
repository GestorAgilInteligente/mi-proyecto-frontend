// src/pages/RegisterProyectos.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function RegisterProyectos() {
  const [formulario, setFormulario] = useState({
    name: "", // nombre proyecto
    description: "", // descripción del proyecto
    delivery_date: "", // 
  });

  /**
 * Maneja los cambios en los inputs del formulario y actualiza el estado.
 * @param {object} e - Evento del input.
 */
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormulario((prev) => ({
    ...prev,
    [name]: value
  }));
};

 /** const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };
*/

  const manejarEnvio = async (e) => {
    e.preventDefault();

   if (!formulario.name || !formulario.description || !formulario.delivery_date) {
    alert("Por favor completa todos los campos del proyecto");
    return;
  }

  const data = {
    name: formulario.name,
    description: formulario.description,
    delivery_date: formulario.delivery_date,
  };

  try {
    const respuesta = await axios.post("http://localhost:3000/project", data);
    console.log("Proyecto registrado", respuesta.data);
    alert("Proyecto registrado correctamente");
    setFormulario({ name: "", description: "", delivery_date: "" });
  } catch (error) {
    console.error("Error al registrar:", error.response?.data || error.message);
    alert("Hubo un error al registrar el proyecto.");
  }
};

/**
 * Formulario de registro de proyectos.
 * Incluye campos requeridos por el backend: name, description y delivery_date.
 * Usa clases Tailwind CSS para el estilo visual.
 */
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
          Registrar Proyecto
        </h2>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Nombre del Proyecto</label>
          <input
            type="text"
            name="name"
            value={formulario.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Plataforma de gestión"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Descripción</label>
          <textarea
            name="description"
            value={formulario.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Breve descripción del proyecto"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Fecha de entrega</label>
          <input
            type="date"
            name="delivery_date"
            value={formulario.delivery_date}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
        >
          Registrar Proyecto
        </button>
      </form>
    </div>
  </div>
);
}