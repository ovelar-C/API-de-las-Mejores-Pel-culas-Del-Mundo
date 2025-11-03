//VISTA
//----------------------------------------------------
const express = require('express'); 
const router = express.Router();    
const peliControlador = require('../controlador/peliControlador');
const validar = require('../middlewares/validateData');
//----------------------------------------------------
//definicion de las rutas, primero las rutas estaticas y despues las dinamicas
router.get('/', peliControlador.listarTodos);
router.get('/filtro', validar, peliControlador.obtenerPorFiltrado);
router.get('/rentable',validar, peliControlador.calcularRentable);
router.post('/',validar, peliControlador.sumarPelicula);
router.patch('/:id', validar,peliControlador.modificarPelicula);
router.get('/:id',validar,peliControlador.obtenerPorID);
router.delete('/:id' ,validar, peliControlador.borrarPelicula);
//----------------------------------------------------
module.exports = router;
