var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: [
        'babel-polyfill',
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:3001',
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "*": "http://localhost:3000"
        },
        stats: {
            // Config for minimal console.log mess.
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'react-hot', 'babel?' + JSON.stringify({
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    })
                ],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                 loader: 'style!css-loader'
             }, {
                 test: /\.(jpe?g|png|gif|svg)$/i,
                 loaders: ['file?hash=sha512&digest=hex&name=media/[name]-[hash:8].[ext]']
             //}, { test: /.(woff|woff2|eot|ttf)$/,
            //      loader:"url?prefix=font/&limit=5000"
             }, {
                 test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                 loader: "url-loader?limit=10000&name=media/[name]-[hash:8].[ext]"
             }
        ]
    },
    resolve: {
        root: path.resolve('./src')
    },
    plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              'window.jQuery': 'jquery',
              "Hammer": "hammerjs/hammer",
              // createDayLabel: "jquery",
              // createWeekdayLabel: "jquery",
              // activateOption: "jquery",
              // leftPosition: "jquery"
            })
        ],
};
