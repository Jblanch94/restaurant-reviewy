const httpProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    httpProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
