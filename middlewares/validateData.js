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
    if (typeof valor !== 'string') return false

    if (valor.trim() === "") return false

    if (clave === "titulo") {
        //titulo pasa porque titulo puede contener numeros
        return true;
    } else {
        console.log("validamos si ", clave, " contiene numeros o letras");
        return /^[a-zA-ZÀ-ÿ\s'-,.;/]+$/.test(valor);
    }
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
    if (valor.length === 0) return false
    const todosValidos = valor.every(elemento => validarString(clave, elemento));
    return todosValidos;
}
//----------------------------------------------------------

function validate(req, res, next) {
    const datos = req.body; //
    const id = req.params.id;
    const filtros = req.query;

    const cantidad = datosNumber.length + datosString.length

    console.log(req.method);
    console.log("id : ", id);
    console.log("filtro : ", filtros);
    console.log("datos : ", datos);

    if (!id && Object.keys(filtros).length > 0) {
        console.log("validamos los campos");
        if (!validarCampos(filtros))
            return res.status(400).json({ mensaje: "filtro con datos invalidos o vacíos" })
    }
    if (id && !validarID(id)) {
        return res.status(400).json({ mensaje: "id invalida" })
    }

    if (['PATCH', 'POST'].includes(req.method)) {
        console.log("dentro de patch,post");
        if (!datos) return res.status(400).json({ mensaje: "sin datos para agregar" });
        if (Object.keys(datos).length != cantidad && !['PATCH'].includes(req.method)) return res.status(400).json({ mensaje: "todos los campos son obligatorios" })
        delete datos.id
        delete datos.rentable
        if (!validarCampos(datos)) return res.status(400).json({ mensaje: "body vacío o con datos invalidos" });
    }

    next();
}
//----------------------------------------------------------

function validarCampos(datos) {
    for (let clave in datos) {
        const valor = datos[clave];
        //validamos si tenemos un valor nulo o indefinido
        if (typeof valor === 'undefined' || valor === null) return false

        //validamos que ganadorOscar es un booleano(el único que lo debe ser)
        console.log("validamos booleano")
        if (clave === "ganadorOscar" && typeof valor !== 'boolean') return false
        //validamos los arrays
        console.log("validamos array")
        if (Array.isArray(valor) && !validarArrays(clave, valor)) return false

        if (!datosNumber.includes(clave) && !datosString.includes(clave)) {
            console.log("no se permiten campos adicionales", clave);
            return false
        }
        
        if (datosNumber.includes(clave) && !validarNumeros(clave, valor)) {
            console.log("numero invalido");
            return false
        }
        if (datosString.includes(clave) && !validarString(clave, valor) && !Array.isArray(valor)) {
            console.log("algun string invalido");
            return false
        }
    }
    return true
}

module.exports = validate;

