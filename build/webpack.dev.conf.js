const webpack = require("webpack");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require("path");
const utils = require('./utils');
const config = require('./config');

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist/"),
    port: 8888,
    hot: true,
    overlay: true,
    proxy: {
      '/': { 
        target: 'http://121.229.62.212:90/', //源地址 
        changeOrigin: true, //改变源 
        pathRewrite: { 
          '^/': 'http://121.229.62.212:90/' //路径重写 
        } 
      } 
    },
    historyApiFallback: true,
    publicPath: config.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    },
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:8888`],
      },
      onErrors: utils.createNotifierCallback()
    })
  ]
};
