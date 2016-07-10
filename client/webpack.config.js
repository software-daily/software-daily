const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const path = require('path');
const precss = require('precss');
// const webpack = require('webpack');

module.exports = {
  // dev server configuration
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },

  // the build entry point
  entry: './src/index.jsx',

  module: {
    // loaders that specify how to transform different types of files
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-object-rest-spread'],
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.p?css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.woff$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        mimetype: 'application/font-woff',
        name: '[path][name].[ext]'
      }
    }, {
      test: /\.woff2$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        mimetype: 'application/font-woff2',
        name: '[path][name].[ext]'
      }
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: 'file-loader'
    }]
  },

  // build output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },

  // postcss configuration
  postcss: function(webpack) {
    return [
      atImport({
        addDependencyTo: webpack
      }),
      autoprefixer,
      precss,
      colorFunction
    ];
  },

  // options effecting the resolving of modules
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ]
  }
};
