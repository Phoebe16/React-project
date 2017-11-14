var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },

    devtool: "source-map",

    resolve: {
        extensions: ['.js', '.jsx'],
        // 起别名 "module" -> "./app/components"会导致错误
      // 模块别名相对于当前上下文导入
        alias: {
            'actions': path.resolve(__dirname, 'app/actions'),
            'components': path.resolve(__dirname, 'app/components'),
            'config': path.resolve(__dirname, 'app/config'),
            'constants': path.resolve(__dirname, 'app/constants'),
            'containers': path.resolve(__dirname, 'app/containers'),
            'fetch': path.resolve(__dirname, 'app/fetch'),
            'reducers': path.resolve(__dirname, 'app/reducers'),
            'router': path.resolve(__dirname, 'app/router'),
            'static': path.resolve(__dirname, 'app/static'),
            'store': path.resolve(__dirname, 'app/store'),
            'util': path.resolve(__dirname, 'app/util')
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
             
            },
            { 
              test:/\.(png|gif|jpg|jpeg|bmp)$/i, 
              loader:'url-loader?limit=5000&name=img/[name].[ext]'
            },
            { 
              test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
              loader:'url-loader?limit=5000&name=fonts/[name].[ext]'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    devServer: {
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: './public',  //本地服务器所加载的页面所在的目录
        historyApiFallback: true,  //不跳转
        inline: true,  //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}