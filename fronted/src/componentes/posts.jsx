import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'; // Importar componentes de React-Bootstrap
import Sidebar from './sidebarU';
import Cookies from 'js-cookie';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [comentario, setComentario] = useState('');
  const [showModal, setShowModal] = useState(false); // Controlar visibilidad del modal
  const [selectedPost, setSelectedPost] = useState(null); // Almacena el post seleccionado para el modal

  // Estado para rastrear si el usuario ha dado "Me gusta"
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setShowComments(Array(data.posts.length).fill(false)); // Inicializar visibilidad de comentarios
        }
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPosts(); // Obtener datos de posts al montar el componente
  }, []);

  const toggleComments = (index) => {
    const newShowComments = [...showComments];
    newShowComments[index] = !newShowComments[index];
    setShowComments(newShowComments); // Alterna la visibilidad de comentarios
  };

  const toggleLike = async (post) => {
    const isLiked = likedPosts.includes(post.id); // Verifica si el post ya tiene "Me gusta"

    try {
      const response = await fetch(
        isLiked ? 'http://localhost:5000/dislike' : 'http://localhost:5000/like',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            carnet: Cookies.get('usuario'),
            publicacion: post.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje); // Muestra mensaje exitoso

        if (isLiked) {
          setLikedPosts(likedPosts.filter((id) => id !== post.id)); // Remueve el "Me gusta"
        } else {
          setLikedPosts([...likedPosts, post.id]); // Añade el "Me gusta"
        }

        // Refrescar para mostrar el nuevo número de likes
        const fetchPosts = async () => {
          const response = await fetch('http://localhost:5000/posts', {
            method: 'GET',
          });
          const data = await response.json();
          setPosts(data.posts); // Actualizar datos después de dar/retirar "Me gusta"
        };

        fetchPosts();
      } else {
        alert('Error al dar like/dislike.'); // Manejo de errores
      }
    } catch (error) {
      console.error('Error al dar like/dislike:', error); // Registro de errores
    }
  };

  const handleChange = (event) => {
    setComentario(event.target.value); // Actualizar el valor del comentario
  };

  const handleSubmit = async (event, postId) => {
    event.preventDefault(); // Prevenir recarga de la página
    try {
      const response = await fetch('http://localhost:5000/comentar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnet: Cookies.get('usuario'),
          publicacion: postId,
          comentario: comentario,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje);

        // Refrescar para mostrar el nuevo comentario
        const fetchPosts = async () => {
          const response = await fetch('http://localhost:5000/posts', {
            method: 'GET',
          });
          const data = await response.json();
          setPosts(data.posts); // Actualizar datos después de un comentario
        };

        fetchPosts(); // Actualizar posts para mostrar nuevos comentarios
      } else {
        alert('Error al enviar el comentario.');
      }
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post); // Establece el post seleccionado
    setShowModal(true); // Muestra el modal
  };

  const closeModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedPost(null); // Restablecer el post seleccionado
  };

  return (
    <div className="App">
      <Sidebar activeWindow="posts" />

      <div className="content" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        <div className="container mt-5">
          <h2>Lista de Posts</h2>
          {posts.map((post, index) => (
            <div key={post.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <p className="card-text">{post.faculty}</p>
                <span className="badge bg-primary">{post.category}</span>
                <p className="card-text mt-2">{post.text}</p>
                {post.image && (
                  <img src={post.image} className="img-fluid mb-2" alt="Imagen del post" />
                )}
                <p className="card-text">
                  <small className="text-muted">Publicado el {new Date(post.dateTime).toLocaleString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant={likedPosts.includes(post.id) ? 'success' : 'primary'} // Cambiar el color del botón según el estado de "Me gusta"
                    onClick={() => toggleLike(post)}
                  >
                    {likedPosts.includes(post.id) ? 'Quitar Me gusta' : 'Me gusta'} ({post.likes}) {/* Muestra el número de likes */}
                  </Button>
                  <Button
                    variant="secondary" // Botón de comentarios
                    onClick={() => toggleComments(index)}
                  >
                    Mostrar Comentarios ({post.comments.length}) {/* Muestra el número de comentarios */}
                  </Button>
                </div>
                {showComments[index] && (
                  <div className="comments mt-3">
                    <h6>Comentarios:</h6>
                    {post.comments.map((comment, idx) => (
                      <div key={idx} className="card mb-2">
                        <div className="card-body">
                          <p>
                            <strong>{comment.name}</strong> ({comment.faculty})
                          </p>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={4} // Espacio para comentarios
                        value={comentario}
                        onChange={handleChange}
                      />
                      <Button
                        variant="primary"
                        onClick={(event) => handleSubmit(event, post.id)} // Enviar comentario
                      >
                        Enviar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para mostrar detalles adicionales */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div>
              <h5>{selectedPost.name}</h5>
              <p>{selectedPost.faculty}</p>
              <p>{selectedPost.category}</p>
              <p>{selectedPost.text}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostList;