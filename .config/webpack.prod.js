// Imports
const path = require('path');
const webpack = require('webpack');

// Plugins
const EnableProduction = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.LoaderOptionsPlugin({
    debug: false,
    minimize: true
  })
];

const MinifyPlugin = require('babel-minify-webpack-plugin'),
  ExtractText = require('extract-text-webpack-plugin'),
  ExtractCommon = webpack.optimize.CommonsChunkPlugin,
  AutogenerateHTML = require('html-webpack-plugin');

// Config
module.exports = {
  target: 'web',
  devtool: 'source-map',

  context: path.resolve(__dirname, '..'),
  entry: {
    'app/app': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../.dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.scss$/,
        use: ExtractText.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              config: {
                path: '.config/postcss.config.js'
              }
            }
          }]
        })
      },
      {
        test: /\.html$/,
        loaders: [
          'html-loader'
        ]
      }
    ]
  },

  plugins: [
    ...EnableProduction,
    new MinifyPlugin(),
    new ExtractText('css/app.[chunkhash].css'),
    new ExtractCommon({
      name: 'common',
      filename: 'app/common.[chunkhash].js'
    }),
    new AutogenerateHTML({
      template: './src/index.html',
      inject: 'body'
    }),
  ]
};