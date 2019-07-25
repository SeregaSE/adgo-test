const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    inline: true,
    contentBase: "./dist",
    port: 8080,
    proxy: { "/": { target: "http://localhost:3000", secure: false } }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
    new CleanWebpackPlugin()
  ]
};
