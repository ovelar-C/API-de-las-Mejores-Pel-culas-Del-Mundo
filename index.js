//INDEX

const express = require('express'); //llamanos a la libreria express
const app = express();              //instancia de express
const port = 3000                   //definicion del puerto
const peliculaRutas = require('./vista/peliVista.js');
const logger = require('./middlewares/logger.js');
//---------------------------------------------------

app.use(logger);
app.use(express.json());            //middlware para procesar y leer jsons
app.use('/peliculas', peliculaRutas);

//escuchamos las solicitudes en el puerto indicado
app.listen(port,()=>{
    console.log("el mejor servidor del mundo mundial ");

});
