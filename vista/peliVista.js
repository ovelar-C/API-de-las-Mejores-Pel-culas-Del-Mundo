//VISTA

const express = require('express'); 
const router = express.Router();    

//referencia al controlador
const peliControlador = require('../controlador/peliControlador');

//definicion de las rutas, primero las rutas estaticas y despues las dinamicas
router.get('/', peliControlador.listarTodos);
router.get('/filtro', peliControlador.obtenerPorFiltrado)
router.get('/:id',peliControlador.obtenerPorID);
router.post('/postPeli', peliControlador.sumarPelicula);
router.delete('/deletePeli' , peliControlador.borrarPelicula);

module.exports = router;
