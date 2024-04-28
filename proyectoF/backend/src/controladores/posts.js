const { list_users, list_posts } = require("../datalist/list");
const Post = require("../objetos/post");
const Comment = require("../objetos/commets");

function Publicar(req, res){
    try{

        const {carnet, category, text, image, anonymus} = req.body; 

        const usuario = list_users.find(find_user => find_user.carnet == carnet)
        const currentDate = new Date();

        if (usuario){
            let carnetToUse = carnet;
            if(anonymus){
                carnetToUse = null;
                carnetToUse = null;
            }
            const newPost = new Post(carnetToUse, category, text, image, currentDate, 0)
            list_posts.push(newPost);
            res.json({mensaje : "Publicacion hecha."})
        }
        else{

            res.json({mensaje : "Error, no se encuentra el usuario"})
        }
        
    } catch (error){
        //Si ocurre un error, imprime en consola y envia mensaje
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }
}

function buscarNombreFacultad(carnet) {

    if (carnet === null){
        return { nombre: 'Anonimo', facultad: 'Anonimo' };
    }

    const usuarioEncontrado = list_users.find(usuario => usuario.carnet === carnet);
    if (usuarioEncontrado) {
      return { nombre: usuarioEncontrado.nombre, facultad: usuarioEncontrado.facultad };
    } 
}
  

function GetPosts(req, res) {
    try{        
        const list_posts_con_nombres_facultades = list_posts.map(post => {
            const { nombre: nombrePost, facultad: facultadPost } = buscarNombreFacultad(post.carnet);
        
            const list_comment_con_nombres_facultades = post.comments.map(comment => {
                const { nombre: nombreComment, facultad: facultadComment } = buscarNombreFacultad(comment.carnet);
                return { ...comment, name: nombreComment, faculty: facultadComment };
            });
        
            return { ...post, name: nombrePost, faculty: facultadPost, comments: list_comment_con_nombres_facultades };
        });
        

        res.json({mensaje : "Exito", posts: list_posts_con_nombres_facultades})
    }catch (error) {        
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }

}
function GetPostLikes(req, res) {
    try {
      const list_posts_con_nombres_facultades = list_posts.map((post) => {
        const { nombre: nombrePost, facultad: facultadPost } = buscarNombreFacultad(post.carnet);
  
        const list_comment_con_nombres_facultades = (post.comments || []).map((comment) => {
          const { nombre: nombreComment, facultad: facultadComment } = buscarNombreFacultad(comment.carnet);
          return { ...comment, name: nombreComment, faculty: facultadComment };
        });
  
        return {
          ...post,
          name: nombrePost,
          faculty: facultadPost,
          comments: list_comment_con_nombres_facultades,
        };
      });
  
      // Ordenar por el número de "Me gusta" en orden descendente
      const sorted_posts = list_posts_con_nombres_facultades.sort((a, b) => b.likes - a.likes);
  
      // Limitar a los primeros 5 posts
      const top_5_posts = sorted_posts.slice(0, 5);
  
      res.json({ mensaje: "Éxito", posts: top_5_posts });
    } catch (error) {
      console.error("Error en GetPosts:", error); // Manejo de errores
      res.json({ mensaje: "Ocurrió un error" }); // Mensaje de error
    }
  }


function reporteCategoria(req, res) {
    try{        
        const categories = ['Anuncio Importante', 'Divertido', 'Académico', 'Variedad'];
        const countByCategory = {};

        // Inicializar el conteo de todas las categorías a 0
        categories.forEach(category => {
            countByCategory[category] = 0;
        });

        // Contar la cantidad de posts por categoría
        for (const post of list_posts) {
            countByCategory[post.category]++;
        }

        res.json({countByCategory})
    }catch (error) {        
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }

}


function Comentar(req, res){
    try{

        const {carnet, comentario, publicacion}= req.body; 
        const post = list_posts.find(find_post => find_post.id == publicacion)
        
        if (post){
            
            const newComment = new Comment(carnet, comentario)
            post.comments.push(newComment);
            res.json({mensaje : "Comentario realizado."})
        }
        else{

            res.json({mensaje : "Error, no se encuentra el usuario"})
        }
        
    } catch (error){
        //Si ocurre un error, imprime en consola y envia mensaje
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }
}

function Like(req, res){
    try{

        const {carnet, publicacion}= req.body; 
        const post = list_posts.find(find_post => find_post.id == publicacion)
        
        if (post){
            post.likes++;
            res.json({mensaje : "Dista like a la publicacion."})
        }
        else{

            res.json({mensaje : "Error, no se encuentra el usuario"})
        }
        
    } catch (error){
        //Si ocurre un error, imprime en consola y envia mensaje
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }
}

function Dislike(req, res){
    try{

        const {carnet, publicacion}= req.body; 
        const post = list_posts.find(find_post => find_post.id == publicacion)
        
        if (post){
            post.likes--;
            res.json({mensaje : "Dista like a la publicacion."})
        }
        else{

            res.json({mensaje : "Error, no se encuentra el usuario"})
        }
        
    } catch (error){
        //Si ocurre un error, imprime en consola y envia mensaje
        console.log(error)
        res.json({mensaje : "Ocurrio un error"})
    }
}
function GetTopUsers(req, res) {
    try {
      // Calcula el número de publicaciones creadas por cada usuario
      const userCounts = {};
      list_posts.forEach((post) => {
        if (post.carnet) {
          userCounts[post.carnet] = (userCounts[post.carnet] || 0) + 1;
        }
      });
  
      // Ordena los usuarios por el número de publicaciones creadas en orden descendente
      const sortedUsers = Object.keys(userCounts).sort((a, b) => userCounts[b] - userCounts[a]);
  
      // Obtiene los 10 primeros usuarios con más publicaciones creadas
      const topUsers = sortedUsers.slice(0, 10);
  
      // Formatea los datos para devolverlos al cliente
      const topUsersData = topUsers.map((user) => ({
        carnet: user,
        postsCreated: userCounts[user],
      }));
  
      res.json({ mensaje: "Éxito", topUsers: topUsersData });
    } catch (error) {
      console.error("Error en GetTopUsers:", error);
      res.json({ mensaje: "Ocurrió un error" });
    }
  }

module.exports = {
    Publicar,
    GetPosts,
    reporteCategoria,
    Comentar,
    Like,
   Dislike, GetPostLikes, GetTopUsers
}