/*global module */
// webpack.config.js
'use strict';
var webpack           = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var root              = __dirname + '/';
var nodeScripts       = root + 'node_modules/';
var scripts           = root + 'scripts/';
var advScriptsJS      = scripts + 'advarics/';
var vendorScripts     = scripts + 'vendor/';
var advStyles         = root + 'styles/advarics/';
var mainJS            = advScriptsJS + 'app.js';
var bundleJS          = scripts + 'bundle.js';

var config = {
    entry: mainJS,
    output: {
        filename: bundleJS
    },
    module: {
        noParse: [
                /vendor/
            ],
        preLoaders: [
               //{ test : /\.js$/, exclude: [/node_modules/, /vendor/], loader: 'jshint-loader' }
        ],
        loaders: [
            { test : /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test : /\.css$/, loader: 'style-loader!css-loader' },
            { test : /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' },
            { test : /\.html$/, loader: 'raw'}
        ]
    },
    jshint: {
        emitErrors: false,
        failOnHint: false,
        reporter: function(errors){
            errors.map(function(error){
                    console.log('line: [' + error.line + ']' +
                                ', reason: [' + error.reason + ']' +
                                ', evidence: [' + error.evidence.trim() + ']');
                });
            }
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css'],
        moduleDirectories: ['node_modules', 'bower_components'],
        alias: {

            /* advarics JavaScripts */
            'adv-chart': advScriptsJS + 'components/adv-chart',
            'api': advScriptsJS + 'tools/api',
            'ui': advScriptsJS + 'tools/ui',
            'vm': advScriptsJS + 'tools/vm'
        }
    },
    plugins: [
        new CompressionPlugin({
            asset     : "{file}.gz",
            algorithm : "gzip",
            regExp    : /\.js$|\.html$/,
            threshold : 10240,
            minRatio  : 0.8
        })
    ]
};

if(process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]);
}
else {
  config.devtool = 'sourcemap';
  config.debug   = true;
}

module.exports = config;
