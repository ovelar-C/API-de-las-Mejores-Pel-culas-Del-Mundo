function logger(req, res, next) {
    const { method, url } = req;
    console.log(`[${time}] ${method} ${url}`);
    next(); // importante: continúa con el siguiente middleware o ruta
}

module.exports = logger;
