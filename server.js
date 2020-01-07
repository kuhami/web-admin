const express = require('express');
const proxy = require('express-http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


app.use('/api', proxy('192.168.33.30:84', {
    reqBodyEncoding: null,
    // forwardPath: function(req, res) {
    //     console.log('path', require('url').parse(req.url).path);
    //     return require('url').parse(req.url).path;
    // }
}));
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// Serve the files on port 9000.
app.listen(9000, function () {
    console.log('WebAdmin listening on port 9000!');
});