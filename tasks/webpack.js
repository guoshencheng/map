
var webpackGulp = require('webpack-stream');
var webpack = require('webpack')
var path = require('path')
var webpackConfig = require('../webpack.config.js')
var gutil = require("gulp-util");
var WebpackDevServer = require("webpack-dev-server");

var input = path.resolve(__dirname, '../public/javascripts/apps/**/src/index.js')
var output = path.resolve(__dirname, '../public/javascripts/dist')
var all = path.resolve(__dirname, '../public/javascripts/**/*.js')

module.exports = function(gulp) {
  gulp.task('webpack', function() {
    return gulp.src(input)
      .pipe(webpackGulp(webpackConfig))
      .pipe(gulp.dest(output));
  });

  gulp.task("webpack-dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig)
    myConfig.devtool = "eval"
    myConfig.debug = true
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: { colors: true}
    }).listen(3000, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err)
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/build/index.html")
    })
  })

  gulp.task('webpack:watch', function() {
    gulp.watch(all, ['webpack'])
  })

}

