//SERVIDOR
//---------------------------------------------------
const express = require('express'); 
const app = express();              
const port = 3000                   
const peliculaRutas = require('./vista/peliVista.js');
const logger = require('./middlewares/logger.js');
//---------------------------------------------------
app.use(logger);
app.use(express.json());            
app.use('/api/peliculas', peliculaRutas);
//---------------------------------------------------

app.listen(port,()=>{
    console.log("el mejor servidor del mundo mundial ");

});
