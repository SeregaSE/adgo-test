const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry : './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
              
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                  loader: 'url-loader?limit=100000' 
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './public',
        hot: true,
        port: 3800,
        open: true,
        historyApiFallback: true
    }
}