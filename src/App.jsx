import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Proyectos from './pages/Proyectos';
import Colaborador from './pages/Colaborador';
import RegisterCollaborator from './pages/RegisterCollaborator';
import ProyectoDetalle from './pages/ProyectoDetalle';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/colaborador" element={<Colaborador />} />
        <Route path="/registrar" element={<RegisterCollaborator />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
