var gulp = require('gulp')
var sass = require('./tasks/sass')
var webpack = require('./tasks/webpack')

sass(gulp)
webpack(gulp)

gulp.task('default', ['sass', 'sass:react', 'webpack'])

gulp.task('dev', ['webpack-dev-server', 'sass:watch', 'webpack:watch'])

module.exports = gulp
