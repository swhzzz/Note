var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: path.join(__dirname, './js/app/index'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../public/javascripts')
    },
    resolve: {
        alias: {
            module: path.join(__dirname, './js/module'),
            scss: path.join(__dirname, './scss')
        }
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    watch: true
}