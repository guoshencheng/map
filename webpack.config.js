var fs = require('fs');
var path = require('path');

var webpack = require('webpack')

var ExtractTextPlugin = require("extract-text-webpack-plugin")

var apps = fs.readdirSync("./webapp/js/apps/")
var entry = {}
apps.filter(function(child) {
  var dir = "./webapp/js/apps/" + child
  if (!fs.lstatSync(dir).isDirectory()) return false
  var ls = fs.readdirSync(dir)
  var index = ls.indexOf('src')
  return index < ls.length && index >= 0
}).forEach(function(child) {
  entry[child] = './webapp/js/apps/' + child + '/src/index.js'
})

module.exports = {
  plugins:[
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("production") 
       }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("../../reactstyles/[name].css")
  ],
  externals:{
    'pixi':'PIXI',
    'PIXI':'PIXI'
  },
  resolve: {
    extensions: ['', '.js']
  },
  entry: entry,
  output: {
    publicPath: path.resolve(__dirname, './public/javascripts/dist'),
    path: path.resolve(__dirname, './public/javascripts/dist'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(["css", "sass"]),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules")
      },
    ]
  },
};
