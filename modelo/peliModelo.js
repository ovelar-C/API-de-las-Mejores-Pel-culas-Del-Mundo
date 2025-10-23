//MODELO

console.log("Modelo datosPeliculasModelo.js está siendo ejecutado");
const fs = require('fs');
const path = require('path');

//los datos lo tengo en un archivo json
const ubicacionArchivo = path.join(__dirname, '../data/datosSuperMegaImportantes.json');
const contenidoPeli = JSON.parse(fs.readFileSync(ubicacionArchivo, 'utf8'));

function traerTodos() {
    try {
        return contenidoPeli;
    } catch (error) {
        console.log("error al leer el json", error);
        return [];
    }
}

function traerPorID(id) {
    try {
        let peliId = contenidoPeli.find(peliculas => peliculas.id === id);
        return peliId;
    } catch (error) {
        console.log("no se encontró esa id D:", error);
    }
}

//----------------------------------------------------
function filtrarCampos(genero, actor, rentable) {
    //devolver por generos
    //por actores
    //rentable
    if(genero){
        
    }

    

   
}
//----------------------------------------------------


function agregarPelicula(ObjetoPeliculas) {
    //calculamos el id max que tiene peliculas, cuando termina le sumamos 1
    const maxId = contenidoPeli.reduce((max, peliculas) => peliculas.id > max ? peliculas.id : max, 0);
    const nuevoId = maxId + 1;

    //rentable???????????
    const peliculaNuevo = {
        id: nuevoId,
        titulo:             ObjetoPeliculas.titulo,
        fechaEstreno:       ObjetoPeliculas.fechaEstreno,
        director:           ObjetoPeliculas.director,
        ganadorOscar:       ObjetoPeliculas.ganadorOscar,
        generos:            ObjetoPeliculas.generos,
        costoInicial:       ObjetoPeliculas.costoInicial,
        recaudacion:        ObjetoPeliculas.recaudacion,
        rentable :          null,
        sinopsis:           ObjetoPeliculas.sinopsis,
        duracionMinutos:    ObjetoPeliculas.duracionMinutos,
        paisOrigen:         ObjetoPeliculas.paisOrigen,
        idiomaOriginal:     ObjetoPeliculas.idiomaOriginal,
        repartoPrincipales: ObjetoPeliculas.repartoPrincipales,
    }
    contenidoPeli.push(peliculaNuevo);

    try {
        fs.writeFileSync(ubicacionArchivo, JSON.stringify(contenidoPeli, null, 4), 'utf-8');
        console.log("Película agregado y guardado en el archivo");
    } catch (error) {
        console.error("Error al escribir en el archivo json", error.message);
    }
    return peliculaNuevo;
}


function eliminarPelicula(id){
    console.log("dentro de eliminar pleicula")
    //los id ya no quedarían ordenados(bueno o malo nose, no se repiten almenos);
    //Devuelve un nuevo array con los elementos que pasaron la condición
    const peliELiminada = contenidoPeli.filter(peli => peli.id !== id);

    if(peliELiminada.length === contenidoPeli.length){
        console.log("id no encontrada");
        return false;
    }else{
        console.log("pelicula eliminada");
        fs.writeFileSync(ubicacionArchivo, JSON.stringify(peliELiminada,null,4), 'utf-8');
        return peliELiminada;
    }
}

//----------------------------------------------------
function actualizarPelicula(datosActualizar,peliId){
    //usar put o patch
    //debo primero encontrar la peli con el id
    //despues poder reemplazar los datos
   
}
//----------------------------------------------------


module.exports = {
    traerTodos,
    traerPorID,
    filtrarCampos,
    agregarPelicula,
    eliminarPelicula,
    actualizarPelicula,
}