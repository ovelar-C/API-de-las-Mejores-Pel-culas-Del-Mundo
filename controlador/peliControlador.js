//CONTROLADOR
//MIDDLEWARE DE VALIDACIONEEEEEEEEEEEEEEEEEEEEEES
const { validarNumero, validarLosCampos } = require('../middlewares/validateData.js');
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
    const peliculaId = parseInt(req.params.id);

    if (!validarNumero(peliculaId)) {
        return res.status(400).json({ mensaje: "id debe ser un NÚMERO POSITIVO VÁLIDO" });
    }
    const pelicula = peliModelo.traerPorID(peliculaId);
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

    if (!validarLosCampos(validarDatos)) {
        console.log("parametros invalidos");
        return res.status(400).json({ mensaje: "error" });
    }

    const resultado = peliModelo.filtrarCampos({ generos, actores });
    if (!resultado) {
        console.log("No se encontró ninguna película con esos filtros");
        res.status(404).json({ mensaje: "ERROR, películas con ese filtro no encontrada" });
    } else {
        res.status(200).json(resultado);
    }
}

//OK//----------------------------------------------------
function sumarPelicula(req, res) {
    console.log("dentro de la funcion sumar pelicula");
    const datosPeliculas = req.body
    console.log("llamando a validar campos");
    delete datosPeliculas.id

    if(!validarLosCampos(datosPeliculas)){
        console.log("completar campos vacios");
        return res.status(400).json({ mensaje: "completar todos los campos con datos válidos" });
    }

    const peliculas = peliModelo.agregarPelicula(datosPeliculas);
    if (peliculas) {
        res.status(201).json(peliculas);
    } else {
        res.status(500).json({ mensaje: "error al agregar la película" });
    }
}
//OK//----------------------------------------------------
function borrarPelicula(req, res) {
    console.log("dentro de borrar pelicula");

    const peliculaId = parseInt(req.params.id);
    if(!validarNumero(peliculaId)) return res.status(400).json({mensaje:"Id no válido"})
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
    if (Object.keys(datosActualizados).length === 0) {
        return res.status(400).json({ mensaje: "sin datos para actualizar" });
    }
    //validación de la id
    if (!validarNumero(peliId)) {
        return res.status(400).json({ mensaje: "ID invalido" });
    }
    //borramos el id que viene del body
    delete datosActualizados.id;

    //validación de los campos
    if (!validarLosCampos(datosActualizados)) {
        return res.status(400).json({ mensaje: "Completar todos los campos con valores válidos por favor" });
    }
    //si pasa todo OK
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