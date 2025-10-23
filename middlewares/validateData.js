//considerar usar Schema

const datosString = [
    "id",
    "titulo",
    "director",
    "sinopsis",
    "generos",
    "paisOrigen",
    "idiomaOriginal",
    "repartoPrincipales"
];

const datosNumber = [
    "fechaEstreno",
    "costoInicial",
    "recaudacion",
    "duracionMinutos"
];

function validarNumero(numero) {
    if (Number.isInteger(numero) && numero > 0) {
        return numero;
    } else {
        return false;
    }
}

function validarString(clave, valor) {
    console.log("dentro de de validarString");
    if (datosString.find(elemento => clave === elemento) && typeof valor === "string") {
        console.log("la clave fue encontrado y es string")
        if (valor.trim() !== "") {
            console.log("string válido ", clave);
            return true;
        } else {
            console.log("dato inválido", clave);
            return false;
        }
    } else {
        console.log("no encontrado en datosstring o dato invalido");
        return false
    }
}

function validarNumeros(clave, valor) {
    console.log("validar dentro de numeros ",clave,valor);
    if (datosNumber.find(elemento => clave === elemento)) {
        if (Number.isInteger(valor) && valor > 0) {
            return true;
        } else {
            console.log(clave, " ", valor, "debe ser un número positivo")
            return false;
        }
    } else {
        return false;
    }
}
function validarArrays(clave,valor){
    console.log("array", clave,valor);
    //que linda la funcion every, gracias linus
    const todosValidos = valor.every(elemento => validarString(clave,elemento));

    if(!todosValidos){
        return false;
    }
    return true;
}

function validarBooleano(clave, valor) {
    console.log("dentro de validar booleano");
    console.log(clave, " ", valor);
    if (typeof valor !== "boolean") {
        console.log(clave, " ", valor);
        console.log(clave, "debe ser un dato  booleano");
        return false;
    }
    console.log(clave, " ", valor);
    return true;
}

function validarLosCampos(camposPelis) {
    for (let clave in camposPelis) {
        const valor = camposPelis[clave];

        //validamos si tenemos un valor nulo o indefinido
        if (typeof valor === "undefined" || valor === null) {
            console.log(`La propiedad "${clave}" tiene un valor undefined o nulo`);
            return false;
        }
        //validamos que ganadorOscar es un booleano(el único que lo debe ser)
        if (clave === "ganadorOscar") {
            if(!validarBooleano(clave, valor)){
                return false;
            }
            continue;
        }
        //validamos los arrays
        if(Array.isArray(valor) || valor===0){
            console.log("es un array", clave,valor);
            if(!validarArrays(clave,valor)){
                console.log("contenido del array invalido");
                return false;
            }
            continue;
        }
        //validamos los demas valores
        console.log("llamando a validar string");
        if (!validarString(clave, valor)) {
            if (!validarNumeros(clave, valor)) {
                return false;
            }
        }
    }
    //despúes del salir del for mandamos true
    return true;
}

module.exports = {
    validarNumero,
    validarLosCampos,
}

