const express = require('express');
const app = express();

app.use('/vendors', express.static(__dirname + '/node_modules/'));

app.use(express.static(__dirname + '/public/'));

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
})