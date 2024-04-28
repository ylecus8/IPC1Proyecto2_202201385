import React, { useState, useEffect } from 'react'; // Importa React, el hook useState y el hook useEffect 
import { Modal, Button } from 'react-bootstrap'; // Importa componentes de React Bootstrap
import SidebarA from './sidebarA';


const AdministradorP = () => {
    const [posts, setposts] = useState([]); // Declara el estado 'posts' para almacenar la lista de usuarios
    const [selectedPost, setSelectedPost] = useState(null); // Declara el estado 'selectedPost' para almacenar el usuario seleccionado
    const [validarEliminacion, setValidarEliminacion] = useState(false); // Declara el estado 'validarEliminacion' para controlar la eliminación de usuarios


    useEffect(() => { // Utiliza el hook useEffect para cargar la lista de usuarios cuando se monta el componente o cuando 'validarEliminacion' cambia
        console.log("Bienvenido ")
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setposts(data.posts);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };

        fetchData();
    }, [validarEliminacion]);
    const deletePost = async (id) => { // Define una función para eliminar un usuario
        try {
            const response = await fetch('http://localhost:5000/delete_post', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            const data = await response.json();
            console.log(data)
            if (!data.error) {
                alert(data.msj)
                setValidarEliminacion(!validarEliminacion);
            } else {
                alert(data.msj);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }

    };
    const viewPost = (post) => { // Define una función para mostrar los detalles de un usuario
        setSelectedPost(post); // Actualiza el estado 'selectedPost' con el usuario seleccionado
    };
    const handleClose = () => { // Define una función para cerrar el modal
        setSelectedPost(null); // Actualiza el estado 'selectedPost' para que no haya ningún usuario seleccionado
    };


    return ( // Devuelve el contenido JSX que representa el componente

        <div className="App">
            <SidebarA activeWindow="postsP"></SidebarA>

            <div className="content">
                <div className="table-container"> {/* Contenedor de la tabla */}
                    <table className="table table-bordered text-center"> {/* Tabla con bordes y alineación centrada */}
                        <thead className="table-dark"> {/* Cabecera de la tabla con fondo oscuro */}
                            <tr> {/* Fila de la cabecera */}
                                <th>id</th> {/* Celda de la cabecera */}
                                <th>carnet</th> {/* Celda de la cabecera */}
                                <th>descripcion</th> {/* Celda de la cabecera */}
                                <th>Categoria</th> {/* Celda de la cabecera */}
                                <th>Anonimo</th> {/* Celda de la cabecera */}

                            </tr>
                        </thead>
                        <tbody> {/* Cuerpo de la tabla */}
                            {posts.map(post => ( // Mapea cada usuario en la lista 'posts' y renderiza una fila de la tabla para cada usuario
                                <tr key={post.id}> {/* Fila de la tabla con clave única basada en el carnet del usuario */}
                                    <td>{post.id}</td> 
                                    <td>{post.carnet}</td> {/* Celda con el carnet del usuario */}
                                    <td>{post.text}</td> {/* Celda con el nombre del usuario */}
                                    <td>{post.category}</td> {/* Celda con la edad del usuario */}
                                    <td>{post.anonimo}</td> {/* Celda con la facultad del usuario */}
                                    <td> {/* Celda con botones de acciones */}
                                        <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Eliminar</button> {/* Botón para eliminar el usuario */}
                                        <button className="btn btn-primary" onClick={() => viewPost(post)}>Ver</button> {/* Botón para ver los detalles del usuario */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedPost && ( // Muestra el modal solo si `selectedPost` no es `null`
  <Modal show={true} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Detalles del Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Verifica que los nombres de las propiedades coincidan */}
      <p><strong>Carnet:</strong> {selectedPost.carnet}</p> 
      <p><strong>Descripción:</strong> {selectedPost.text}</p> 
      <p><strong>Categoría:</strong> {selectedPost.category}</p>
      <p><strong>Anónimo:</strong> {selectedPost.anonymus ? 'Sí' : 'No'}</p> 
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


}
export default AdministradorP;