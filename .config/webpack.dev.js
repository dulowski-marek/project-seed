// Imports
const path = require('path');
const webpack = require('webpack');

// Plugins
const HotModuleReplacement = webpack.HotModuleReplacementPlugin,
  AutogenerateHTML = require('html-webpack-plugin');

// Config
module.exports = {
  target: 'web',
  devtool: 'eval-source-map',

  context: path.resolve(__dirname, '..'),
  entry: {
    'app/app': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../.build'),
    filename: '[name].js'
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
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: [
          'html-loader'
        ]
      }
    ]
  },

  devServer: {
    hot: true,
    port: 8000
  },

  plugins: [
    new HotModuleReplacement(),
    new AutogenerateHTML({
      template: './src/index.html',
      inject: 'body'
    })
  ]
};