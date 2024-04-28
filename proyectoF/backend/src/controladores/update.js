const { list_users } = require("../datalist/list");

function UpdateUser(req, res) {
    try {
        const { carnet, nombre,apellido,genero, edad, facultad,carrera, password } = req.body; // Obtener los datos a actualizar del cuerpo de la solicitud

        // Buscar el usuario en la lista por su carnet
        const usuarioIndex = list_users.findIndex(user => user.carnet === carnet);

        if (usuarioIndex !== -1) { // Si el usuario existe
            // Actualizar los campos del usuario, excepto el carnet
            const usuario = list_users[usuarioIndex];
            usuario.nombre = nombre;
    
            usuario.facultad = facultad
            usuario.password = password;
            usuario.apellido=apellido;
            usuario.genero=genero;
            usuario.carrera=carrera;

            // Enviar una respuesta con el mensaje de confirmación
            res.json({ mensaje: 'Usuario actualizado correctamente.' });
        } else {
            // Si el usuario no existe, devolver un mensaje de error
            res.json({ error: 'El usuario no fue encontrado.' });
        }
    } catch (error) {
        // Si ocurre algún error, enviar una respuesta con el código de error y el mensaje correspondiente
        console.log(error);
        res.json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
}

//Exportacion para poder ser importado en routes.js
module.exports = {
    UpdateUser    
};