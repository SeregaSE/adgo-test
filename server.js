const http = require('http');
const onError = require('./onError');
const onRequest = require('./onRequest');
const onListening = require('./onListening');
const config = require('./server.config')
const server = http.createServer();

server.on('error', onError)
server.on('request', onRequest);
server.on('listening', onListening)

server.listen(config);
