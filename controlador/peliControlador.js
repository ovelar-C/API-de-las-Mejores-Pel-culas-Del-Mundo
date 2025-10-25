//CONTROLADOR
const { validarNumero, validarLosCampos } = require('../middlewares/validateData.js');
const peliModelo = require('../modelo/peliModelo.js');

//OK
function listarTodos(req, res) {
    const peliculas = peliModelo.traerTodos();
    console.log("Se llamó a listarTodos()");

    if (peliculas.length > 0) {
        res.status(200).json(peliculas);
    } else {
        res.status(404).json({ mensaje: "error al listar" });
        console.log("error");
    }
}
//OK
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
//----------------------------------------------------
function obtenerPorFiltrado(req, res) {
    const { generos, repartoPrincipales } = req.query;
    const validarDatos = {}
    if(generos) validarDatos.generos = generos
    if(repartoPrincipales) validarDatos.repartoPrincipales = repartoPrincipales

    if(!validarLosCampos(validarDatos)){
        console.log("parametros invalidos");
        return res.status(400).json({ mensaje: "error" });
    }

    const resultado = peliModelo.filtrarCampos({generos,repartoPrincipales});

    if(!resultado){
        console.log("No se encontró ninguna película con esos filtros");
        res.status(400).json({ mensaje: "ERROR, películas con ese filtro no encontrada" });
    }else{
        res.status(200).json(resultado);
    }
}

//----------------------------------------------------

//OK
function sumarPelicula(req, res) {
    console.log("dentro de la funcion sumar pelicula");
    //desestructuracion del objeto body
    const {
        titulo,
        fechaEstreno,
        director,
        ganadorOscar,
        generos,
        costoInicial,
        recaudacion,
        sinopsis,
        duracionMinutos,
        paisOrigen,
        idiomaOriginal,
        repartoPrincipales
    } = req.body

    const atributosPelis = {
        titulo,
        fechaEstreno,
        director,
        ganadorOscar,
        generos,
        costoInicial,
        recaudacion,
        sinopsis,
        duracionMinutos,
        paisOrigen,
        idiomaOriginal,
        repartoPrincipales
    };
    console.log("llamando a validar campos");
    let validarPeli = validarLosCampos(atributosPelis);

    if (!validarPeli) {
        console.log("completar campos vacios");
        return res.status(400).json({ mensaje: "completar todos los campos con datos válidos" });
    }
    const peliculas = peliModelo.agregarPelicula(atributosPelis);

    if (peliculas) {
        res.status(202).json(peliculas);
    } else {
        res.status(404).json({ mensaje: "error al agregar la película" });
    }
}

function borrarPelicula(req, res) {
    console.log("dentro de borrar pelicula");

    const peliculaId = parseInt(req.params.id);
    const borrarPeli = peliModelo.eliminarPelicula(peliculaId);

    if (!borrarPeli) {
        res.status(404).json({ mensaje: "error al eliminar la película" });
    } else {
        res.status(200).json(borrarPeli);
    }
}

//----------------------------------------------------
function modificarPelicula(req, res) {
    const peliId = parseInt(req.params.id);
    const datosActualizados = req.body;
    //titulo no me valida si es numero o booleano nose noseeeeeeee
    if(Object.keys(datosActualizados).length === 0){
        return res.status(400).json({mensaje: "sin datos para actualizar"});
    }
    //validación de la id
    if (!validarNumero(peliId)) {
        return res.status(400).json({ mensaje: "ID invalido" });
    }
    delete datosActualizados.id;

    //validación de los campos
    const valido = validarLosCampos(datosActualizados);
    if (!valido) {
        return res.status(400).json({ mensaje: "Completar todos los campos con valores válidos por favor" });
    }
    //si pasa todo OK
    const peli = peliModelo.actualizarPelicula(datosActualizados, peliId);

    if (!peli) {
        res.status(400).json({ mensaje: " error al actulizar los datos" });
    } else {
        res.status(200).json(peli);
    }
}
//----------------------------------------------------


module.exports = {
    listarTodos,
    obtenerPorID,
    obtenerPorFiltrado,
    sumarPelicula,
    borrarPelicula,
    modificarPelicula,
}