const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, './src/index.js')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
 };