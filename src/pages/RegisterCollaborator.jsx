// Simulación: funcionalidad de registro de usuario
export default function RegisterCollaborator() {
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

        <form className="p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-gray-700">Registrar Colaborador</h2>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Nombre completo</label>
            <input type="text" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ej: Pepito Pérez" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Rol</label>
            <select className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Selecciona un rol</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>QA</option>
              <option>PM</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Competencias (tecnologías)</label>
            <input type="text" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ej: React, Python" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Disponibilidad (porcentaje o fechas)</label>
            <input type="text" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ej: 50% o del 5 al 30 julio" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Teléfono</label>
            <input
              type="tel"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 3001234567"
          />
        </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
