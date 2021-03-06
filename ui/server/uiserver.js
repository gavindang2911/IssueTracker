const path = require('path');
require('dotenv').config({
  path: path.resolve('sample.env'),
});
const express = require('express');
const proxy = require('http-proxy-middleware');
const render = require('./render.js');

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && process.env.NODE_ENV !== 'production') {
  console.log('Adding dev middlware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config.js');
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}
app.get('/about', render);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('public/index.html'));
// });
app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget, changeOrigin: true }));
}

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;

const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
  console.log('avC' + window.ENV);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
