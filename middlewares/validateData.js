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
    //me mandan un clave y un valor
    const nuevoValor = valor.toString();
    //vemos si clave esta en el array string
    //vemos tambien si está vacío el valor
    if (nuevoValor.trim() !== "") {
        console.log(clave, "es valido");
        if (clave === "titulo") {
            console.log("titulo pasa");
            return true;
        } else {
            console.log("validamos si ", clave, " contiene numeros o letras");
            return /^[a-zA-ZÀ-ÿ\s'-,.;/]+$/.test(nuevoValor);
        }
    }
    return false;
}

function validarNumeros(clave, valor) {
    console.log("validar dentro de numeros ", clave, valor);

    const numeroValor = parseInt(valor);
    if (!Number.isInteger(numeroValor) || numeroValor <= 0) {
                console.log(clave, " ", valor, "debe ser un número positivo");

        return false;
    }
    return true;
}

function validarArrays(clave, valor) {
    console.log("array", clave, valor);
    //que linda la funcion every, gracias linus
    const todosValidos = valor.every(elemento => validarString(clave, elemento));

    if (!todosValidos) {
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
            if (!validarBooleano(clave, valor)) {
                return false;
            }
            continue;
        }
        //validamos los arrays
        if (Array.isArray(valor)) {
            console.log("es un array", clave, valor);
            if (!validarArrays(clave, valor)) {
                console.log("contenido del array invalido");
                return false;
            }
            continue;
        }
        if(!datosNumber.includes(clave) && !datosString.includes(clave)){
            console.log("no se permiten campos adicionales", clave);
            return false;
        }
        //validamos los demas valores
        console.log("llamando a validar string");
        if(datosString.includes(clave)){
            if(!validarString(clave,valor)) return false
            continue;
        }
        if (datosNumber.includes(clave)) {
            if (!validarNumeros(clave, valor)) return false
            continue;
            }
        }
    //despúes del salir del for mandamos true
    return true;
}

module.exports = {
    validarNumero,
    validarLosCampos,
}

