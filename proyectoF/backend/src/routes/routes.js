const express = require('express'); 

const router = express.Router(); // Crea el Express router

//Importaciones de funciones creadas en controladores
const { Registro, GetUsers, Login } = require('../controladores/ingreso');
const { DeleteUser } = require('../controladores/delete');
const { UpdateUser } = require('../controladores/update');
const { GetPosts, Publicar,Comentar,Like,Dislike, reporteCategoria ,GetPostLikes, GetTopUsers} = require('../controladores/posts');
const { DeletePost } = require('../controladores/delete');


//Metodos Post
router.post('/Registro', Registro)
router.post('/Login', Login)
router.post('/publicar', Publicar)
router.get('/posts', GetPosts)
router.get('/TopPosts', GetPostLikes)
//Get
router.get('/users', GetUsers)
router.get('/TopUsers', GetTopUsers)
router.get('/reportecategoria', reporteCategoria)
//Metodos delete
router.delete('/delete_user', DeleteUser)
router.delete('/delete_post', DeletePost)
//Metodos put
router.put('/update', UpdateUser )
//router.get('/reportecategoria', reporteCategoria)
router.post('/comentar', Comentar)
router.post('/like', Like)
router.post('/dislike', Dislike)


module.exports = router;



