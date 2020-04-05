let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');


let conf = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: './js/build.js',
		
	},
	devServer: {
		overlay: true,
  	},
  	module: {
  		rules: [
  			{
  				test: /\.js$/,
  				loader: 'babel-loader',
  			},
  			{
  				test: /\.css$/,
  				use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
  			},
  		]
  	},
    plugins: [
    new ExtractTextPlugin("css/build.css"),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      minify: {
        collapseWhitespace: true
    }
    }),
    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
    ]
};

module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production
					? 'source-map'
					: 'eval-sourcemap';

	return conf;
};