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
function filtrarCampos({generos, repartoPrincipales}) {
    //rentable
    let resultado = contenidoPeli;
    //filtramos las pelis por genero
    if (generos) {
        resultado = resultado.filter(peli => {
            if (!peli.generos) return false;
            // convierte array a string si es necesario
            const generosStr = Array.isArray(peli.generos) ? peli.generos.join(", ") : peli.generos;
            return generosStr.toLowerCase().includes(generos.toLowerCase());
        });
    }
    //ya filtrado genero, filtramos por reparto
    if (repartoPrincipales) {
        resultado = resultado.filter(peli => {
            if (!peli.repartoPrincipales) return false;
            const repartoStr = Array.isArray(peli.repartoPrincipales) ? peli.repartoPrincipales.join(", ") : peli.repartoPrincipales;
            return repartoStr.toLowerCase().includes(repartoPrincipales.toLowerCase());
        });
    }

    if(resultado.length === 0) return [];

    const resultadoFinal = resultado.map(peli => ({
        id: peli.id,
        titulo: peli.titulo,
        generos: peli.generos,
        repartoPrincipales: peli.repartoPrincipales,
        duracionMinutos: peli.duracionMinutos
        })
    );
    return resultadoFinal;
}
//----------------------------------------------------


function agregarPelicula(ObjetoPeliculas) {
    //calculamos el id max que tiene peliculas, cuando termina le sumamos 1
    const maxId = contenidoPeli.reduce((max, peliculas) => peliculas.id > max ? peliculas.id : max, 0);
    const nuevoId = maxId + 1;

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
//aunque se quiera actualizar la id , no se puede
function actualizarPelicula(datosActualizar,peliId){
    const indice =contenidoPeli.findIndex(peli => peli.id == peliId);
    //esto devuelve -1 si no encontro
    if(indice === -1){
        console.log("id no econtrada");
        return false
    }
    //copiamos las propiedades actuales de la peli
    //sobrescrimos los datos con datosActualizar
    contenidoPeli[indice] = {... contenidoPeli[indice], ...datosActualizar}
    try {
        fs.writeFileSync(ubicacionArchivo, JSON.stringify(contenidoPeli, null, 4), 'utf-8');
        console.log("Película actualizada y guardado en el archivo");
    } catch (error) {
        console.error("Error al escribir en el archivo json", error.message);
    }
    return contenidoPeli[indice];
}
//----------------------------------------------------
function rentabilidadPeli(){
    //me dan un titulo y retorno si fue rentable o no
}
//----------------------------------------------------


module.exports = {
    traerTodos,
    traerPorID,
    filtrarCampos,
    agregarPelicula,
    eliminarPelicula,
    actualizarPelicula,
    rentabilidadPeli
}