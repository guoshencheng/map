
var webpack = require('webpack-stream');
var path = require('path')
var webpackConfig = require('../webpack.config.js')
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");
var input = path.resolve(__dirname, '../public/javascripts/apps/**/src/index.js')
var output = path.resolve(__dirname, '../public/javascripts/dist')

module.exports = function(gulp) {
  gulp.task('webpack', function() {
    return gulp.src(input)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(output));
  });

  gulp.task("webpack-dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig)
    myConfig.devtool = "eval"
    myConfig.debug = true
    new WebpackDevServer(webpack(myConfig), {
      publicPath: "/" + myConfig.output.publicPath,
      stats: { colors: true }
    }).listen(8080, 'localhost', function(err) {
      if (err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html")
    })
  })
}

