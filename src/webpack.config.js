var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')


module.exports = {
    entry: path.join(__dirname, './js/app/index'),
    output: {
        filename: 'js/bundle.js',
        path: path.join(__dirname, '../public')
    },
    resolve: {
        alias: {
            module: path.join(__dirname, './js/module'),
            scss: path.join(__dirname, './scss')
        }
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader', 'sass-loader', 'postcss-loader']
                    }) //抽离css成单独的文件
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ //之后可以直接使用jq不用require
            $: 'jquery'
        }),
        new ExtractTextPlugin('css/style.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ //压缩之前必须先转化成es5
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    watch: true
}