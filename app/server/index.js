const http = require('http');
const { parse: parseUrl } = require('url');
const data = require('./data');
const config = require('../server.config');

const server = http.createServer();
const routes = Object.keys(data);

server.on('request', (request, response) => {
    const url = parseUrl(request.url);
    const [_, api, version, route] = url.pathname.split('/');

    if (request.headers.origin !== undefined) {
        response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    }

    response.setHeader('Access-Control-Allow-Headers', 'content-type');

    if (request.method === 'OPTIONS') {
        response.end();
    }

    if (request.method === 'GET' && api === 'api' && version === 'v1' && routes.includes(route)) {
        try {
            const source = typeof data[route] === 'function' ? data[route](url) : data[route];
            response.setHeader('Content-Type', 'application/json');
            const body = JSON.stringify(source);
            response.end(body);
        } catch (error) {
            console.error(error);
            response.statusCode = error.code || 500;
            response.end(error.message || 'Internal server error');
        }
    } else {
        response.statusCode = 404;
        response.end();
    }
});

server.on('error', console.error);
server.on('listening', () => console.info(`server listening on ${config.host}:${config.port}`));

server.listen(config);
