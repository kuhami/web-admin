const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader']),
            },
            {
                test: /\.(bmp|gif|jpeg|jpg|png)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name]_[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'styles.css',
            allChunks:true,
        }),
        new HtmlWebpackPlugin({
            title: '管理输出',
            filename: 'index.html',
            template: 'index.html',
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9000,
        proxy:{
            '/api':{
                target:'http://192.168.33.30:84/',
            }
        }
    }
});