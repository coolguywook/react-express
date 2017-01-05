var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: [
        'babel-polyfill', './src/index.js'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
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
                test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/i,
                loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]']
            }
        ]
    },

    resolve: {
        root: path.resolve('./src')
    },

    plugins:[
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress:{
            warnings: true
          }
        })
    ]
};