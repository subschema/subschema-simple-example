"use strict";
var webpack = require('webpack');
var path = require('path');
var join = path.join.bind(path, __dirname);

module.exports = {

    devtool: '#sourcemap',
    devServer: {
        contentBase: join("public"),
        info: true, //  --no-info option
        hot: true,
        inline: true
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
            'subschema': join('node_modules/subschema/dist/subschema-noreact')
        }
    },
    module: {
        extensions: ['', '.jsx', 'js'],
        loaders: [
            {
                test: /\.js(x)?$/,
                include: [
                    join('public')
                ],
                loaders: ['babel']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: "native-promise-only"
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

