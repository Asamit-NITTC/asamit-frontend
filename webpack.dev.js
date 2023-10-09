const { merge } = require('webpack-merge');
const webpack = require("webpack");
const dotenv = require("dotenv");
const common = require('./webpack.common.js');

const env = dotenv.config().parsed;

module.exports = merge(common,  {
    mode: 'development',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ],
    devServer: {
        /*
        static: {
            directory: path.join(__dirname, 'public'),
        },
        */
        open: false,
        hot: true,
        liveReload: true,
        historyApiFallback: true, // これ重要
        host: 'localhost',
        port: 8080,
        allowedHosts: [
          ".ngrok-free.app"
        ],
        proxy: {
            '/handler/**': {
                target: 'http://localhost:3001',
                secure: false,
                logLevel: 'debug',
            },
            '/users/**': {
              target: 'http://localhost:3000',
              secure: false,
              logLevel: 'debug'
            },
            '/target-time/**': {
              target: 'http://localhost:3000',
              secure: false,
              logLevel: 'debug'
            },
            '/wake/**': {
              target: 'http://localhost:3000',
              secure: false,
              logLevel: 'debug'
            },
            '/summit/**': {
              target: 'http://localhost:3000',
              secure: false,
              logLevel: 'debug'
            }
        }
    },

})
