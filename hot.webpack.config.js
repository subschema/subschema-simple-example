var webpack = require('webpack');
var path = require('path');

var port = process.env['WEBPACK_PORT'] || 8007;
var host = process.env['WEBPACK_HOST'] || '127.0.0.1';

module.exports = {

    devtool: 'eval',
    debug: true,
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        './public/index.jsx'
    ],

    devServer: {
        contentBase: "public",
        info: true, //  --no-info option
        hot: true,
        inline: true,
        port: port,
        host: host
    },

    output: {
        path: ".build",
        filename: 'app.entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        alias: {
            'subschema': path.join(__dirname, 'node_modules/subschema/dist/subschema-noreact')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: [
                    'public'
                ],
                loaders: ['babel']
            }, {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]

    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            Promise: "native-promise-only"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        function () {
            this.plugin("done", function (stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            })
        }]
};
