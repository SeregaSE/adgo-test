const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
};
