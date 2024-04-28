import React, { useState } from 'react';
import SidebarA from './sidebarA';
import { Modal, Button } from 'react-bootstrap'; // Importar componentes de Bootstrap

const CargaMasivaUsuarios = () => {
    const [archivo, setArchivo] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Para el modal

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
    };

    const handleUpload = async () => {
        if (archivo) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setUsuarios(data); // Actualiza el estado con datos del JSON

                    // Registro en el servidor (como en tu código original)
                    for (const usuario of data) {
                        const response = await fetch('http://localhost:5000/Registro', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                carnet: usuario.codigo,
                                nombre: usuario.nombres,
                                apellido: usuario.apellidos,
                                genero: usuario.genero,
                                correo: usuario.correo,
                                facultad: usuario.facultad,
                                carrera: usuario.carrera,
                                password: usuario.contrasenia,
                            }),
                        });

                        const responseData = await response.json();
                        if (responseData.mensaje !== 'Publicación hecha.') {
                            console.error(`Error al registrar el usuario ${usuario.codigo}`);
                        } else {
                            console.log(`Usuario ${usuario.codigo} registrado con éxito`);
                        }
                    }

                    alert('Usuarios registrados exitosamente');
                } catch (error) {
                    console.error('Error al leer el archivo JSON', error);
                    alert('Error al leer el archivo JSON');
                }
            };

            reader.readAsText(archivo);
        } else {
            alert('Por favor, selecciona un archivo para cargar.');
        }
    };

    const deleteUser = (carnet) => {
        setUsuarios(usuarios.filter((user) => user.codigo !== carnet)); // Eliminar un usuario
    };

    const viewUser = (user) => {
        setSelectedUser(user); // Mostrar modal
    };

    const handleClose = () => {
        setSelectedUser(null); // Cerrar modal
    };

    return (
        <div className="App">
        <SidebarA activeWindow="cargaU"></SidebarA>

        <div className="content">
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Cargar Masiva</button>
                </div>

                <div className="table-container"> {/* Estilo del contenedor */}
                    <table className="table table-bordered text-center"> {/* Estilo de la tabla */}
                        <thead className="table-dark"> {/* Fondo oscuro en la cabecera */}
                            <tr> {/* Filas de la cabecera */}
                                <th>Código</th> {/* Nombres de columnas */}
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Facultad</th>
                                <th>Carrera</th>
                                <th>Acciones</th> {/* Acciones para eliminar y ver */}
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((user, idx) => ( // Crear filas
                                <tr key={idx}>
                                    <td>{user.codigo}</td>
                                    <td>{user.nombres}</td>
                                    <td>{user.apellidos}</td>
                                    <td>{user.facultad}</td>
                                    <td>{user.carrera}</td>
                                    <td> {/* Botones de acciones */}
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.codigo)}>Eliminar</button> 
                                        <button className="btn btn-primary" onClick={() => viewUser(user)}>Ver</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedUser && ( /* Modal con detalles del usuario seleccionado */
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles del Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Código:</strong> {selectedUser.codigo}</p>
                                <p><strong>Nombre:</strong> {selectedUser.nombres}</p>
                                <p><strong>Apellido:</strong> {selectedUser.apellidos}</p>
                                <p><strong>Facultad:</strong> {selectedUser.facultad}</p>
                                <p><strong>Carrera:</strong> {selectedUser.carrera}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CargaMasivaUsuarios;