//disculpas públicas por la persona que tendra que corregir esto
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
//----------------------------------------------------------
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
        //se saltea titulo porque titulo puede contener números
        return true;
    } else {
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
    const datos = req.body; 
    const id = req.params.id;
    const filtros = req.query;

    const cantidad = datosNumber.length + datosString.length

    if (!id && Object.keys(filtros).length > 0) {
        if (!validarCampos(filtros))
            return res.status(400).json({ mensaje: "Filtro con datos invalidos o vacíos" })
    }
    if (id && !validarID(id)) {
        return res.status(400).json({ mensaje: "ID invalida" })
    }
    //SEPARAR PATCH Y POST(sugerencia)
    if (['PATCH', 'POST'].includes(req.method)) {
        if (!datos || Object.keys(datos).length === 0) return res.status(400).json({ mensaje: "Sin datos para agregar" });
        delete datos.id
        delete datos.rentable
        if (Object.keys(datos).length != cantidad && !['PATCH'].includes(req.method)) return res.status(400).json({ mensaje: "No se permite agregar o restar algún campo" })
        if (!validarCampos(datos)) return res.status(400).json({ mensaje: "body vacío o con datos invalidos" });
    }
    next();
}
//----------------------------------------------------------
function validarCampos(datos) {
    for (let clave in datos) {
        const valor = datos[clave];

        if (typeof valor === 'undefined' || valor === null) return false

        if (clave === "ganadorOscar" && typeof valor !== 'boolean') return false

        if (Array.isArray(valor) && !validarArrays(clave, valor)) return false

        if (!datosNumber.includes(clave) && !datosString.includes(clave) && clave !== 'ganadorOscar') {
            return false
        }
        if (datosNumber.includes(clave) && !validarNumeros(clave, valor)) {
            return false
        }
        if (datosString.includes(clave) && !validarString(clave, valor) && !Array.isArray(valor)) {
            return false
        }
    }
    return true
}
//----------------------------------------------------
module.exports = validate;

