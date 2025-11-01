const fs = require('fs');
const path = require('path');
//----------------------------------------------------
function logger(req, res, next) {
    const { method, url } = req;
    const timestamp = new Date().toISOString(); 
    const log = `[${timestamp}] ${method} ${url}\n`;

    const logPath = path.join(__dirname, 'logs.txt');
    fs.appendFile(logPath, log, err =>{
        if(err) console.log("error al escribir el log");
    })
    next();
}
//----------------------------------------------------
module.exports = logger;
