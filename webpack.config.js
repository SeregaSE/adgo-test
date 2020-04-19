var path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const frontConfig = {
    target: 'web',
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'index_bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './build'),
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['@babel/preset-env', '@babel/react'],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties'],
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                regenerator: true
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};

module.exports = [frontConfig];
