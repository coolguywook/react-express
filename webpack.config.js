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
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file?hash=sha512&digest=hex&name=media/[name]-[hash:8].[ext]']
            }, {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&name=media/[name]-[hash:8].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", 'window.jQuery': 'jquery'})
    ],
    resolve: {
        root: path.resolve('./src')
    }

};
