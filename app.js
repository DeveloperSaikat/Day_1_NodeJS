const http = require('http');
const routes = require('./routes');

console.log(routes.randomText);

const server = http.createServer(routes.handler);

server.listen(3000);