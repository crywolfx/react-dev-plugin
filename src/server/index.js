const Koa = require('koa');
const webpack = require('webpack'); // webpack模块
const koaWebpack = require('koa-webpack');  // koa-webpack-middleware
const chalk = require('chalk');
const devConfig = require('./config/webpack/webpack.dev.config')


const app = new Koa()

async function devStart({ port }) {
    try {
        const middleware = await koaWebpack({
            config: devConfig
        })
        app.use(middleware);
        app.listen(port);
        console.log(chalk.green(`server start at http://127.0.0.1:${port}`));
    } catch (e) {
        console.log(e)
    }
}

module.exports = { devStart };
