//VISTA

const express = require('express'); 
const router = express.Router();    

//referencia al controlador
const peliControlador = require('../controlador/peliControlador');
const validar = require('../middlewares/validateData');

//definicion de las rutas, primero las rutas estaticas y despues las dinamicas
router.get('/', peliControlador.listarTodos);
router.get('/filtro', validar, peliControlador.obtenerPorFiltrado);
router.get('/rentable',validar, peliControlador.calcularRentable);
router.post('/',peliControlador.sumarPelicula);
router.patch('/:id', peliControlador.modificarPelicula);
router.get('/:id',validar,peliControlador.obtenerPorID);
router.delete('/:id' ,validar, peliControlador.borrarPelicula);

//GET       localhost:3000/api/peliculas/rentable?titulo=1917
//GET       localhost:3000/api/peliculas
//GET       localhost:3000/api/peliculas/4
//POST      localhost:3000/peliculas/ {BODY}
//DELETE    localhost:3000/peliculas/31
//GET       localhost:3000/api/peliculas/filtro?generos=comedia&&actores= al pacino (vacío)
//GET       localhost:3000/api/peliculas/filtro?generos=drama&&actores=al pacino (200)
//PATCH     localhost:3000/peliculas/33 {BODY}
//GET       localhost:3000/api/peliculas/rentable?titulo=paprika (TRUE)
//GET       localhost:3000/api/peliculas/rentable?titulo=CASINO (FALSE)



module.exports = router;
