const { list_users } = require("../datalist/list.js");
const {list_posts}=require("../datalist/list.js");
const Post = require("../objetos/post.js");

function DeleteUser(req, res){
    try {
        const { carnet } = req.body; // Obtener el carnet del parámetro de la URL

        // Buscar el índice del usuario en la lista por su carnet
        const usuarioIndex = list_users.findIndex(user => user.carnet == carnet);

        if (usuarioIndex != -1){ // Si el usuario existe
            // Eliminar el usuario de la lista
            list_users.splice(usuarioIndex, 1); 

            // Enviar una respuesta con el mensaje de confirmación
            res.json({ msj: 'Usuario eliminado' });

        }else{
            // Si el usuario no existe, devolver un mensaje de error
            res.json({ msj: 'Usuario no encontrado' });
        }

    } catch(error){
        // Si ocurre algún error, imprimir en consola y enviar una respuesta con el mensaje correspondiente
        console.log(error)
        res.json({ error: 'Ocurrió un error al procesar la solicitud.' });

    }

}
function DeletePost(req, res){
    try {
        const { id} = req.body; // Obtener el carnet del parámetro de la URL

        // Buscar el índice del usuario en la lista por su carnet
        const PostIndex = list_posts.findIndex(Post => Post.id== id);

        if (PostIndex != -1){ // Si el usuario existe
            // Eliminar el usuario de la lista
            list_posts.splice(PostIndex, 1); 

            // Enviar una respuesta con el mensaje de confirmación
            res.json({ msj: 'Post eliminado' });

        }else{
            // Si el usuario no existe, devolver un mensaje de error
            res.json({ msj: 'Post no encontrado' });
        }

    } catch(error){
        // Si ocurre algún error, imprimir en consola y enviar una respuesta con el mensaje correspondiente
        console.log(error)
        res.json({ error: 'Ocurrió un error al procesar la solicitud.' });

    }

}

//Exportacion para poder ser importado en routes.js
module.exports = {
    DeleteUser,DeletePost
}