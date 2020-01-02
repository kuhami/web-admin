const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

console.log('-------------------配置信息------------------');

module.exports = {
    devtool: 'source-map',
    mode: "development",
    entry: {
        app: path.join(__dirname, './src/index.js')
    },
    output: {
        filename: 'js.[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /\.module\.less$/,
                loader: ExtractTextWebpackPlugin.extract(['css-loader', 'postcss-loader', 'less-loader']),
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
        new CleanWebpackPlugin(),
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
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
            }),
        ]
    },
    performance:{
        hints: false
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: './dist',
        hot: true,
        overlay: true,
        stats: "errors-only"
    }
};