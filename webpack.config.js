const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //模式**必填
    mode: 'development',

    //入口文件
    entry:{
        index:path.resolve(__dirname,'src/index')
    },

    //出口文件
    output:{
        path:path.resolve(process.cwd(),'dist'),
        filename:'static/js/[name].[chunkHash:8].js'
    },

    //插件 需要引入
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack',
            template:'public/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
        }),
    ],

    //loader
    module: {
        rules: [
            //css 编译
            // {test: /\.css/, use: ['style-loader','css-loader']},

            //css 提取 将CSS提取到单独的文件中
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                ],
            },

            {
                test: /\.less$/,
                use: [
                    'MiniCssExtractPlugin.loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            prependData: `@env: ${process.env.NODE_ENV};`,
                        },
                    },
                ],
            },
        ]
    },

    // derServer 快速开发 就是 package文件-->scripts里的指令的 参数配置
    devServer: {

    }
};