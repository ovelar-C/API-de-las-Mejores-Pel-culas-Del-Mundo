//considerar usar Schema
const datosString = [
    "id",
    "titulo",
    "director",
    "sinopsis",
    "generos",
    "paisOrigen",
    "idiomaOriginal",
    "actores"
];

const datosNumber = [
    "fechaEstreno",
    "costoInicial",
    "recaudacion",
    "duracionMinutos"
];
//----------------------------------------------------------

function validarID(valor) {
    const numeroValor = parseInt(valor);
    if (Number.isInteger(numeroValor)) return true
    return false
    
}
//----------------------------------------------------------

function validarString(clave, valor) {
    console.log("dentro de de validarString");
    if (typeof valor !== 'string') return false

    if (valor.trim() === "") return false

    if (clave === "titulo") {
        console.log("titulo pasa");
        return true;
    } else {
        console.log("validamos si ", clave, " contiene numeros o letras");
        return /^[a-zA-ZÀ-ÿ\s'-,.;/]+$/.test(valor);
    }
    return false;
}
//----------------------------------------------------------

function validarNumeros(clave, valor) {
    const numeroValor = parseInt(valor);
    if (!Number.isInteger(numeroValor) || numeroValor <= 0) {
        return false;
    }
    return true;
}
//----------------------------------------------------------

function validarArrays(clave, valor) {
    //que linda la funcion every, gracias linus
    const todosValidos = valor.every(elemento => validarString(clave, elemento));
    return todosValidos;
}
//----------------------------------------------------------

function validate(req, res, next) {
    const datos = req.body; //
    const id = req.params.id;
    const filtros = req.query;
    console.log(req.method);
    console.log(id);
    console.log(filtros);

    if (!id && Object.keys(filtros).length > 0) {
        console.log("validamos los campos");
        if (!validarCampos(filtros))
            return res.status(400).json({ mensaje: "filtro con datos invalidos o vacíos" })
    }
    if (id && !validarID(id)) {
        return res.status(400).json({ mensaje: "id invalida" })
    }
    console.log("id fue valido");

    if (['PATCH', 'POST'].includes(req.method)) {
        if (!validarCampos(datos) || !datos)
            return res.status(400).json({ mensaje: "body vacío o invalido" });
    }

    next();

}
//----------------------------------------------------------

function validarCampos(datos) {
    for (let clave in datos) {
        const valor = datos[clave];
        //validamos si tenemos un valor nulo o indefinido
        if(typeof valor === 'undefined' || valor === null) return false

        //validamos que ganadorOscar es un booleano(el único que lo debe ser)
        if (clave === "ganadorOscar" && typeof valor !== 'boolean') return false

        //validamos los arrays
        if(Array.isArray(valor) && !validarArrays(clave,valor)) return false

        if (!datosNumber.includes(clave) && !datosString.includes(clave)) {
            console.log("no se permiten campos adicionales", clave);
            return false
        }
        //validamos los demas valores

        /*
        if (datosString.includes(clave)) {
            if (!validarString(clave, valor)) return false
            continue;
        }

        if (datosNumber.includes(clave)) {
            if (!validarNumeros(clave, valor)) return false
            continue;
        }
        */
        if(datosNumber.includes(clave) && !validarNumeros(clave,valor)) return false
        if(datosString.includes(clave) && !validarString(clave,valor)) return false

        return true;
    }
}

module.exports = validate;

