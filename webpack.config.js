var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jade$/,
      loaders: ['jade']
    }, {
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
};
