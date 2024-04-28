// Importación de los módulos necesarios
const express = require('express'); // Importa el framework Express para la creación de la aplicación web
const cors = require('cors'); // Importa el módulo CORS para habilitar el intercambio de recursos entre diferentes orígenes

// Creación de la aplicación Express
const app = express(); 

// Definición del puerto en el que la aplicación escuchará las solicitudes
const PORT = 5000;

app.use(express.json()); 
app.use(cors()); 

// Importación y uso de las rutas definidas en el archivo
const Router = require("./routes/routes")
app.use(Router);


// Inicio del servidor y escucha de solicitudes en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); 
}); 


//Comandos para ejeutarlo con la consola en la ruta de /backend
// ------ Para instalar node_moules ----- esta carpeta no se sube a GitHub (se agrega a .gitignore)
// npm i   
// ----- Para iniciar el proyecto ---- en el fondo se ejecuta el comando "nodemon src/app.js"
// npm start         
// ------ tambien se puede hacer con el comando: 
// node src/app.js 