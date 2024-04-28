import React, { useState, useEffect } from 'react'; // Importa React, el hook useState y el hook useEffect 
import { Modal, Button } from 'react-bootstrap'; // Importa componentes de React Bootstrap
import SidebarA from './sidebarA';
import Cookies from 'js-cookie';

const Administrador = () => {
  const [users, setUsers] = useState([]); // Declara el estado 'users' para almacenar la lista de usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Declara el estado 'selectedUser' para almacenar el usuario seleccionado
  const [validarEliminacion, setValidarEliminacion] = useState(false); // Controlar eliminación de usuarios

  useEffect(() => {
    console.log("Bienvenido " + Cookies.get('usuario'));

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.usuarios); // Establece los usuarios en el estado
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData(); // Obtener datos al montar el componente
  }, [validarEliminacion]);

  const deleteUser = async (carnet) => {
    try {
      const response = await fetch('http://localhost:5000/delete_user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carnet: carnet }),
      });
      const data = await response.json();

      if (!data.error) {
        alert(data.msj);
        setValidarEliminacion(!validarEliminacion); // Refrescar usuarios
      } else {
        alert(data.msj);
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const viewUser = (user) => {
    setSelectedUser(user); // Establece el usuario seleccionado para el modal
  };

  const handleClose = () => {
    setSelectedUser(null); // Restablece el estado cuando se cierra el modal
  };

  const exportToCSV = () => {
    // Crear la cabecera para el CSV
    const csvHeader = ['Carnet', 'Nombre', 'Apellido', 'Facultad'].join(',') + '\n';

    // Crear el contenido CSV a partir de los datos de los usuarios
    const csvContent = users.map(user => [
      user.carnet,
      user.nombre,
      user.apellido,
      user.facultad,
    ].join(',')).join('\n');

    // Generar un archivo Blob para la descarga
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });

    // Crear un enlace de descarga y hacer clic para descargar el archivo
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'usuarios.csv'); // Nombre del archivo
    document.body.appendChild(link);
    link.click(); // Hacer clic para descargar
    document.body.removeChild(link); // Eliminar el enlace después de descargar
  };

  return (
    <div className="App">
      <SidebarA activeWindow="users" />

      <div className="content">
        <Button variant="primary" onClick={exportToCSV}>Exportar a CSV</Button> {/* Botón para exportar */}
        
        <div className="table-container">
          <table className="table table-bordered text-center"> {/* Tabla con bordes y alineación centrada */}
            <thead className="table-dark">
              <tr>
                <th>Carnet</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Genero</th>
                <th>Facultad</th>
                <th>Correo</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.carnet}>
                  <td>{user.carnet}</td>
                  <td>{user.nombre}</td>
                 
                  <td>{user.apellido}</td>
                  <td>{user.genero}</td>
                  <td>{user.facultad}</td>
                  <td>{user.correo}</td>
                  <td>{user.carrera}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.carnet)}>Eliminar</button>
                    <button className="btn btn-primary" onClick={() => viewUser(user)}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUser && (
            <Modal show={true} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Detalles del Usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Carnet:</strong> {selectedUser.carnet}</p>
                <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                <p><strong>Apellido:</strong> {selectedUser.apellido}</p>
                <p><strong>Genero:</strong> {selectedUser.genero}</p>
                <p><strong>Correo:</strong> {selectedUser.correo}</p>
                <p><strong>Facultad:</strong> {selectedUser.facultad}</p>
                <p><strong>Carrera:</strong> {selectedUser.carrera}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Administrador;