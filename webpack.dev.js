const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
// 包大小分析插件
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: "development",
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
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
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
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        //new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
            }),
        ]
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        open: true,
        port: 9000,
        openPage: '#/home',
        stats: 'errors-only',
        proxy: {
            "/api": {
                target: "http://192.168.33.30:84",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
});