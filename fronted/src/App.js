import './App.css';
import Login from './componentes/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './componentes/registro';
import Administrador from './componentes/admin';
import Create from './componentes/create';
import PostList from './componentes/posts';
import Update from './componentes/editarP';
import AdministradorP from './componentes/adminP';
import  CargaMasivaUsuarios from './componentes/cargaUs';
import CargaMasivaPosts from './componentes/cargaPst';
import ReporteCategoria from './componentes/repCategoria';
import ReporteTopPosts from './componentes/repPost';
import ReporteTopUsuarios from './componentes/repUsers';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Administrador />} />
        <Route path="/create" element={<Create />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/update" element={<Update />} />
          <Route path="/adminP" element={<AdministradorP/>} />
          <Route path="/cargaU" element={<CargaMasivaUsuarios/>} />
          <Route path="/cargaP" element={<CargaMasivaPosts/>} />
          <Route path="/categoriesR" element={<ReporteCategoria/>} />
          <Route path="/TopPosts" element={<ReporteTopPosts/>} />
          <Route path="/topUsers" element={<ReporteTopUsuarios/>} />
      </Routes>
    </Router>
  );
}

export default App;