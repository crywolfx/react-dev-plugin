// webpack 默认配置
const path = require('path');
// 压缩 Css 文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 用于处理多路径文件，使用purifycss的时候要用到glob.sync方法。
const glob = require('glob-all');
// Css tree shanking 摇树
const purifyCssWebpack = require('purifycss-webpack');
const myPlugin = require('../plugin/plugin');
const myPlugin2 = require('../plugin/plugin2');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

module.exports = merge(webpackBase, {
    mode: 'production',
    plugins: [
        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                // 去掉注释
                preset: ["default", { discardComments: { removeAll: true } }]
            }
        }),
        new purifyCssWebpack({
            paths: glob.sync([
                path.resolve(__dirname, './src/*html'),
                path.resolve(__dirname, './src/*js')
            ])
        }),
        new myPlugin(),
        new myPlugin2()
    ],
    optimization: {
        // js 开启 tree shanking
        usedExports: true,
        splitChunks: {
            chunks: "all", // 代码分隔 公共代码分离出来
            name: true,
            cacheGroups: {
                react: {
                    test: /[\\/]react|react-dom[\\/]/,
                    name: 'react'
                },
                lodash: {
                    test: /[\\/]lodash[\\/]/,
                    name: 'lodash'
                }
            }
        }
    }
})