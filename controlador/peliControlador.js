//CONTROLADOR
//MIDDLEWARE DE VALIDACIONEEEEEEEEEEEEEEEEEEEEEES D:
//ARREGLAR POSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT D:

const peliModelo = require('../modelo/peliModelo.js');

//OK//----------------------------------------------------
function listarTodos(req, res) {
    const peliculas = peliModelo.traerTodos();

    if (peliculas.length > 0) {
        res.status(200).json(peliculas);
    } else {
        res.status(404).json({ mensaje: "error al listar o lista vacía" });
    }
}
//OK//----------------------------------------------------
function obtenerPorID(req, res) {
    const peliId = parseInt(req.params.id)

    const pelicula = peliModelo.traerPorID(peliId);
    if (pelicula) {
        res.status(200).json(pelicula);
    } else {
        res.status(404).json({ mensaje: "error al obtener ID" })
    }
}
//OK//----------------------------------------------------
function obtenerPorFiltrado(req, res) {
    const { generos, actores } = req.query;
    const validarDatos = {}
    if (generos) validarDatos.generos = generos
    if (actores) validarDatos.actores = actores

    const resultado = peliModelo.filtrarCampos({ generos, actores });
    if (!resultado) {
        res.status(404).json({ mensaje: "ERROR, películas con ese filtro no encontrada" });
    } else {
        res.status(200).json(resultado);
    }
}

//NO OK//----------------------------------------------------
function sumarPelicula(req, res) {
    const datosPeliculas = req.body
    const peliculas = peliModelo.agregarPelicula(datosPeliculas);
    if (peliculas) {
        res.status(201).json(peliculas);
    } else {
        res.status(500).json({ mensaje: "error al agregar la película" });
    }
}
//OK//----------------------------------------------------
function borrarPelicula(req, res) {
    const peliculaId = parseInt(req.params.id);
    const borrarPeli = peliModelo.eliminarPelicula(peliculaId);

    if (!borrarPeli) {
        res.status(404).json({ mensaje: "error al eliminar la película" });
    } else {
        res.status(200).json(borrarPeli);
    }
}
//OK//----------------------------------------------------

function modificarPelicula(req, res) {
    const peliId = parseInt(req.params.id);
    const datosActualizados = req.body;
    //titulo no me valida si es número o booleano nose noseeeeeeee porqueeeeeeeee
    delete datosActualizados.id;

    const peli = peliModelo.actualizarPelicula(datosActualizados, peliId);

    if (!peli) {
        res.status(404).json({ mensaje: " error al actulizar los datos" });
    } else {
        res.status(200).json(peli);
    }
}
//OK//----------------------------------------------------
function calcularRentable(req,res){
    const {titulo} = req.query
    if(!titulo) return res.status(400).json({mensaje: "titulo vacío"});

    esRentable = peliModelo.rentabilidadPeli(titulo);
    if(!esRentable) return res.status(404).json({mensaje: "titulo no encontrado"});
    
    res.status(200).json(esRentable);
}
//----------------------------------------------------

module.exports = {
    listarTodos,
    obtenerPorID,
    obtenerPorFiltrado,
    sumarPelicula,
    borrarPelicula,
    modificarPelicula,
    calcularRentable,
}