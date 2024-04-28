
const { list_users } = require("../datalist/list.js");
const Usuario = require("../objetos/Usuario");


function Registro(req, res) {
    try {
        // Obtener los datos proporcionados en el cuerpo de la solicitud
        const data = req.body;

        // Verificar si el carnet ya está registrado
        //const carnetExiste = list_users.some((user) => user.carnet === data.carnet);

       /* if (carnetExiste) {
            // Si el carnet ya está registrado, enviar un mensaje de error
            return res.json({ mensaje: "El carnet ya está registrado." });
        }*/

        // Crear una nueva instancia de Usuario con los datos proporcionados
        const newUser = new Usuario(data.carnet, data.nombre,data.apellido, data.genero,data.edad,data.correo, data.facultad,data.carrera, data.password);

        // Agregar el nuevo usuario a la lista
        list_users.push(newUser);

        // Enviar una respuesta con el mensaje de confirmación
        res.json({ mensaje: "Usuario registrado correctamente." });
    } catch (error) {
        // Si ocurre un error, imprimir en consola y enviar un mensaje de error
        console.log(error);
        res.json({ mensaje: "Ocurrió un error al hacer el registro." });
    }
}


function Login(req, res) {
    try {
        const { carnet, password } = req.body;
        const usuario = list_users.find(find_user => find_user.carnet == carnet && find_user.password == password);

        if (usuario) {
            // Enviar respuesta y finalizar
            return res.json({ mensaje: "Usuario ha iniciado sesión", error: false });
        } else {
            // Enviar respuesta de error y finalizar
            return res.json({ mensaje: "Usuario no está en el sistema", error: true });
        }

    } catch (error) {
        console.log(error);

        // Enviar respuesta de error y finalizar
        return res.json({ mensaje: "Ocurrió un error con el inicio de sesión", error: true });
    }
}


function GetUsers(req, res) {
    try{
        //Devolver la lista de usuarios junto con un mensaje de Exito al hacer la peticion
        res.json({mensaje : "Exito", usuarios: list_users})
    }catch (error) {
        //Si ocurre un error, imprime en consola y envia mensaje
        console.log(error)
        res.json({mensaje : "Ocurrio un error al hacer el registro"})
    }

}

//Exportacion para poder ser importado en routes.js
module.exports = {
    Registro,
    GetUsers,
    Login
}