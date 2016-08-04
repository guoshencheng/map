var sass = require('gulp-sass');
var path = require('path')

var input = path.resolve(__dirname, '../public/style/*.scss')
var output = path.resolve(__dirname, '../public/stylesheets')

module.exports = function(gulp) {
  gulp.task('sass', function () {
    return gulp.src(input)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(output));
  });

  gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
  });
}

