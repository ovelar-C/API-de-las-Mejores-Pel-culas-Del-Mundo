//VISTA

const express = require('express'); 
const router = express.Router();    

//referencia al controlador
const peliControlador = require('../controlador/peliControlador');

//definicion de las rutas, primero las rutas estaticas y despues las dinamicas
router.get('/', peliControlador.listarTodos);
router.get('/filtro', peliControlador.obtenerPorFiltrado);
router.post('/postPeli', peliControlador.sumarPelicula);
router.patch('/actualizar/:id', peliControlador.modificarPelicula);
router.get('/:id',peliControlador.obtenerPorID);
router.delete('/deletePeli/:id' , peliControlador.borrarPelicula);


//GET localhost:3000/peliculas
//GET localhost:3000/peliculas/4
//POST localhost:3000/peliculas/postPeli {BODY}
//DELETE localhost:3000/peliculas/deletePeli/31
//GET localhost:3000/peliculas/filtro?generos=comedia&&repartoPrincipales=al pacino (400)
//GET localhost:3000/peliculas/filtro?generos=drama&&repartoPrincipales=al pacino (200)


module.exports = router;
