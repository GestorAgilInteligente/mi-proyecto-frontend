// src/pages/Login.jsx
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    // Aquí irá la lógica para autenticar más adelante
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-200 to-yellow-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Correo corporativo</label>
            <input
              type="email"
              required
              placeholder="nombre@empresa.com"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-green-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

