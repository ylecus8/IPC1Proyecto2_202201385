import React, { useState } from 'react';
import SidebarA from './sidebarA'; // Cambia según tu sidebar
import { Modal, Button } from 'react-bootstrap'; // Para el modal y botones de Bootstrap

const CargaMasivaPosts = () => {
    const [archivo, setArchivo] = useState(null); // Para el archivo cargado
    const [posts, setPosts] = useState([]); // Para almacenar los posts cargados
    const [selectedPost, setSelectedPost] = useState(null); // Para el modal de detalles

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file); // Actualiza el archivo seleccionado
    };

    const handleUpload = async () => {
        if (archivo) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Realiza la transformación para los nombres correctos
                    const postsTransformed = data.map((post) => ({
                        carnet: post.codigo, // Transforma `codigo` a `carnet`
                        text: post.descripcion, // Transforma `descripcion` a `text`
                        category: post.categoria,
                        anonymus: post.anonimo,
                        image: post.imagen || '', // Campo de imagen, con valor por defecto
                    }));

                    setPosts(postsTransformed); // Almacena los datos transformados

                    // Guardar en el servidor
                    for (const post of postsTransformed) {
                        const response = await fetch('http://localhost:5000/publicar', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                carnet: post.carnet,
                                category: post.category,
                                text: post.text,
                                image: post.image, // Incluye el campo de imagen
                                anonymus: post.anonymus,
                            }),
                        });

                        const responseData = await response.json();
                        if (responseData.mensaje !== 'Post registrado exitosamente') {
                            console.error(`Error al registrar el post ${post.carnet}`);
                        } else {
                            console.log(`Post ${post.carnet} registrado con éxito`);
                        }
                    }

                    alert('Posts registrados exitosamente');
                } catch (error) {
                    console.error('Error al leer el archivo JSON:', error);
                    alert('Error al leer el archivo JSON');
                }
            };

            reader.readAsText(archivo); // Lee el archivo como texto
        } else {
            alert('Por favor, selecciona un archivo para cargar.');
        }
    };

    const deletePost = (carnet) => {
        setPosts(posts.filter((post) => post.carnet !== carnet)); // Elimina un post por carnet
    };

    const viewPost = (post) => {
        setSelectedPost(post); // Muestra el modal de detalles
    };

    const handleClose = () => {
        setSelectedPost(null); // Cierra el modal
    };

    return (
        
        <div className="App">
            <SidebarA activeWindow="cargaP"></SidebarA>

            <div className="content">
                <div>
                    <input type="file" onChange={handleFileChange} /> {/* Para cargar archivo JSON */}
                    <button onClick={handleUpload}>Cargar Masivamente</button> {/* Botón para cargar */}
                </div>

                <div className="table-container"> {/* Contenedor para la tabla */}
                    <table className="table table-bordered text-center"> {/* Tabla para mostrar posts */}
                        <thead className="table-dark"> {/* Cabecera oscura */}
                            <tr> {/* Fila de la cabecera */}
                                <th>Carnet</th> 
                                <th>Descripción</th> 
                                <th>Categoría</th> 
                                <th>Anónimo</th> 
                                <th>Acciones</th> {/* Acciones para eliminar y ver detalles */}
                            </tr>
                        </thead>
                        <tbody> {/* Cuerpo de la tabla */}
                            {posts.map((post, idx) => ( 
                                <tr key={idx}> {/* Fila para cada post */}
                                    <td>{post.carnet}</td> {/* Muestra carnet */}
                                    <td>{post.text}</td> {/* Muestra descripción */}
                                    <td>{post.category}</td> {/* Muestra categoría */}
                                    <td>{post.anonymus ? 'Sí' : 'No'}</td> {/* Muestra si es anónimo */}
                                    <td> {/* Para acciones */}
                                        <button className="btn btn-danger" onClick={() => deletePost(post.carnet)}>Eliminar</button>
                                        <button className="btn btn-primary" onClick={() => viewPost(post)}>Ver Detalles</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedPost && ( /* Modal para mostrar detalles del post seleccionado */
                        <Modal show={true} onHide={handleClose}> {/* Para cerrar el modal */}
                            <Modal.Header closeButton> {/* Título del modal */}
                                <Modal.Title>Detalles del Post</Modal.Title> 
                            </Modal.Header>
                            <Modal.Body> {/* Cuerpo del modal con detalles */}
                                <p><strong>Carnet:</strong> {selectedPost.carnet}</p> 
                                <p><strong>Descripción:</strong> {selectedPost.text}</p> 
                                <p><strong>Categoría:</strong> {selectedPost.category}</p> 
                                <p><strong>Anónimo:</strong> {selectedPost.anonymus ? 'Sí' : 'No'}</p> 
                                <p><strong>Imagen:</strong> {selectedPost.image}</p> {/* Campo de imagen */}
                            </Modal.Body>
                            <Modal.Footer> {/* Pie del modal */}
                                <Button variant="secondary" onClick={handleClose}>Cerrar</Button> 
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CargaMasivaPosts;