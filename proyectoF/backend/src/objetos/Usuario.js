class Usuario {

    constructor(carnet, nombre,apellido,genero, edad,correo, facultad,carrera, password){
        this.carnet = carnet; 
        this.nombre = nombre ;
        this.apellido=apellido;
        this.genero=genero;
        this.edad = edad;
        this.correo=correo;
        this.facultad = facultad;
        this.carrera=carrera;
        this.password = password
    }

    
}

//Exportacion para poder ser importado en ingreso.js
module.exports = Usuario; 