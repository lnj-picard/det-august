const proxy = require('http-proxy-middleware');

//set up proxy
module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'http://localhost:5000/' }));
};
