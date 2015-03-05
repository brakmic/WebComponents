var Path                 = require('path');
var Hapi                 = require('hapi');
var server               = new Hapi.Server();
var routeConfigsPath     = '/scripts/advarics/config/routing/';

server.connection({ port : 3000 });

/* we use hapi-router */
/* scripts/advarics/config/routing/default.js  contains all routes */
server.register({
  register: require('hapi-router'),
  options: { routesDir: __dirname + routeConfigsPath}
}, function (err) {
  if (err) throw err;
});

/* start server */
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
