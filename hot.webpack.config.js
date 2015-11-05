var webpack = require('webpack');
var path = require('path');

var port = process.env['WEBPACK_PORT'] || 8007;
var host = process.env['WEBPACK_HOST'] || '127.0.0.1';
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

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
            'subschema': path.join(__dirname, 'node_modules/subschema/src/index.jsx'),
            'subschema-styles': path.join(__dirname, 'node_modules/subschema/src/styles')

	
        }
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                //do this to prevent babel fromt tanslating everything.
                include: ['./public'],
                loaders: ['react-hot', 'babel?stage=0']
            }, {
                test: /\.js(x)?$/,
                exclude: [
                    /webpack/,
                    /node_modules\/(?!(subschema))/,
                    'public'
                ],
                loaders: ['babel?stage=0']
            }, {
                test:/\.less$/,
                loader:'style!css!less'
            }
        ]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
}
