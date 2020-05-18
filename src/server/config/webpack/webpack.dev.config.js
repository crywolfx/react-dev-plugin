// webpack 默认配置
const path = require('path');
const webpack = require("webpack");

// 引入js到 html 文件中
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

// merge 用法和 Object.assign 类似
module.exports = merge(webpackBase, {
    entry: ['react-hot-loader/patch'],
    mode: 'development',
    plugins: [
        // 启用模块热替换(HMR - Hot Module Replacement)
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dll/react-manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, './dll/react.dll.js')
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    // // 启动项目
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        // quiet: true,
        historyApiFallback: true,
        hot: true,
    },
})