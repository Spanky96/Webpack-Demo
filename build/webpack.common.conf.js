const webpack = require("webpack");
const merge = require("webpack-merge");
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require("path");

const productionConfig = require("./webpack.prod.conf.js"); // 引入生产环境配置文件
const developmentConfig = require("./webpack.dev.conf.js"); // 引入开发环境配置文件
var fs = require('fs');
/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */
const generateConfig = env => {
  // 将需要的Loader和Plugin单独声明

  let scriptLoader = [{
    loader: "babel-loader"
  }];

  var cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }

    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
      var useLoaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

      if (loader) {
        useLoaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        })
      }
      // console.log(JSON.stringify(loaders));
      if (env === "production") {
        return ExtractTextPlugin.extract({
          // 生产环境：分离、提炼样式文件
          fallback: {
            loader: "style-loader"
          },
          use: useLoaders
        });
      } else {
        useLoaders.unshift({
          loader: "style-loader"
        });
        return useLoaders;
      }
    }

    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', {
        indentedSyntax: true
      }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
    }
  }

  var entrys = {};
  fs.readdirSync('./src/pages').forEach((n) => {
    entrys[n] = `./src/pages/${n}/${n}.js`;
  });
  return {
    entry: entrys,
    output: {
      publicPath: env === "development" ? "/" : __dirname + "/../dist/",
      path: path.resolve(__dirname, "..", "dist"),
      filename: "./js/[name].bundle.js",
      chunkFilename: "./js/[name].chunk.js"
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: scriptLoader
        },
        {
          test: /\.css$/,
          use: cssLoaders({
            sourceMap: true,
            usePostCSS: true
          }).css
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.scss$/,
          use: cssLoaders({
            sourceMap: true,
            usePostCSS: true
          }).scss
        },{
          test: /\.(htm|html)$/i,
          use:['html-loader'] 
        }
      ]
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, '../src/assets')
      }
    },
    plugins: [
      // 开发环境和生产环境二者均需要的插件
      ...Object.keys(entrys).map((n) => {
        return new HtmlWebpackPlugin({
            filename: n + ".html",
            template: path.resolve(__dirname, "../src/pages/" + n, n + ".html"),
            chunks: [n],
            minify: {
              collapseWhitespace: true
            }
          });
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
          ignore: ['.*']
        }
      ]),
      new webpack.ProvidePlugin({
        $: "jquery"
      })
    ]
  };
};

module.exports = env => {
  let config = env === "production" ? productionConfig : developmentConfig;
  return merge(generateConfig(env), config);
};