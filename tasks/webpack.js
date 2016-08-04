
var webpack = require('webpack-stream');
var path = require('path')
var webpackConfig = require('../webpack.config.js')

var input = path.resolve(__dirname, '../public/javascripts/apps/**/src/index.js')
var output = path.resolve(__dirname, '../public/javascripts/dist')

module.exports = function(gulp) {
  gulp.task('webpack', function() {
    return gulp.src(input)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(output));
  });
}

