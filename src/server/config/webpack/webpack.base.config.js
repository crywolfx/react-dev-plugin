// webpack 默认配置
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [path.resolve(process.cwd(), './src/index.js')],
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: 'main.[hash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    // "style-loader", 
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 编译css
                    "postcss-loader", // postcss添加前缀，需要配置postcss.config.js
                    "less-loader" // 编译lcss
                ],
                // 这里会直接到 src 文件下找 less/css 文件进行编译，这里是项目优化的一个小技巧
                include: path.resolve(process.cwd(), './src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        // 复制一个 html 并将最后打包好的资源在 html 中引入
        new htmlWebpackPlugin({
            // 页面title 需要搭配 ejs 使用
            title: 'webpack-react',
            // html 模板路径
            template: path.resolve(process.cwd(), './src/template/index.html'),
            // 输出文件名称
            filename: 'index.html',
            minify: {
                // 压缩HTML⽂件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空⽩符与换⾏符
                minifyCSS: true // 压缩内联css
            }
        }),
        // 每次部署时清空 dist 目录
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:6].css',
        }),
        // new DashboardPlugin(dashboard.setData),
    ],
    resolve: {
        // 规定在那里寻找第三方模块
        modules: [path.resolve(process.cwd(), './node_modules')],
        // 别名
        alias: {
            '@': path.resolve(process.cwd(), './src')
        },
        // 自动补齐后缀名
        extensions: ['.js', '.jsx']
    },
}
