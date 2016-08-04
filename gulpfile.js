var gulp = require('gulp')
var sass = require('./tasks/sass')
var webpack = require('./tasks/webpack')

sass(gulp)
webpack(gulp)

module.exports = gulp
