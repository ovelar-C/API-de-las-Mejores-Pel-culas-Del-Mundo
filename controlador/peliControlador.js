//CONTROLADOR
const { validarNumero, validarLosCampos } = require('../middlewares/validateData.js');
const peliModelo = require('../modelo/peliModelo.js');

//OK
function listarTodos(req, res) {
    //las mejores pelis
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
        res.status(400).json({ mensaje: "id debe ser un NÚMERO POSITIVO VÁLIDO" });
        return;
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
    const { genero, actor, rentable } = req.query;
    const filtros = {};

    if (genero) filtros.generos = genero;
    if (actor) filtros.repartoPrincipales = actor;
    if (rentable) filtros.rentable = rentable;
    console.log(filtros.generos,filtros.repartoPrincipales)

    console.log("llamamos a vlaidar campos");
    const valido = validarLosCampos(filtros);
    if (!valido) {
        console.log("parametros invalidos");
        res.status(400).json({ mensaje: "error" });
    } else {
        console.log("parametros validos");
        res.status(200).json(valido);
    }


   // const filtros = peliModelo.filtrarCampos(genero, actor, rentable);
    //hola


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
        res.status(400).json({ mensaje: "completar todos los campos con datos válidos" });
        return;
    }
    const peliculas = peliModelo.agregarPelicula(atributosPelis);

    if (peliculas) {
        res.status(202).json(peliculas);
    } else {
        res.status(404).json({ mensaje: "error al agregar pelicula" });
    }
}

function borrarPelicula(req, res) {
    console.log("dentro de borrar pelicula");

    const peliculaId = parseInt(req.params.id);
    const borrarPeli = peliModelo.eliminarPelicula(peliculaId);

    if (!borrarPeli) {
        res.status(404).json({ mensaje: "error al eliminar la pelicula" });
    } else {
        res.status(200).json(borrarPeli);
    }
}

//----------------------------------------------------
function modificarPelicula(req, res) {
    const peliId = parseInt(req.params.id);
    const {/*datos a actualizar*/ } = req.body;
    const datosModificar = {
        /*los datos a actualizar*/
    }
    //validación de la id
    if (!validarNumero(peliId)) {
        res.status(400).json({ mensaje: "ID invalido" });
    }
    //validación de los campos
    const valido = validarLosCampos(datosModificar);
    if (!valido) {
        res.status(400).json({ mensaje: "Completar todos los campos con valores válidos por favor" });
    }
    //si pasa todo OK
    const peli = peliModelo.actualizarPelicula(datosModificar, peliId);

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