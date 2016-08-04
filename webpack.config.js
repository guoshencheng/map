var fs = require('fs');
var path = require('path');

var webpack = require('webpack');

var apps = fs.readdirSync("./public/javascripts/apps/")
var entry = {}
apps.filter(function(child) {
  var dir = "./public/javascripts/apps/" + child
  if (!fs.lstatSync(dir).isDirectory()) return false
  var ls = fs.readdirSync(dir)
  var index = ls.indexOf('src')
  return index < ls.length && index >= 0
}).forEach(function(child) {
  entry[child] = './public/javascripts/apps/' + child + '/src/index.js'
})

module.exports = {
  plugins:[
    new webpack.DefinePlugin({
      __DEBUG__:true
    }),
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
    path: path.resolve(__dirname, './public/javascripts/dist'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data'
      }
    ]
  },
  devtool: 'source-map'
};
