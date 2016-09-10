var sass = require('gulp-sass');
var path = require('path')

var input = path.resolve(__dirname, '../webapp/css/**/*.scss')
var output = path.resolve(__dirname, '../public/stylesheets')

var reactIn = path.resolve(__dirname, '../webapp/reactcss/components/*.scss')
var reactOut = path.resolve(__dirname, '../webapp/reactcss/dist')

module.exports = function(gulp) {
  gulp.task('sass', function () {
    return gulp.src(input)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(output));
  })
  
  gulp.task('sass:react', function () {
    return gulp.src(reactIn)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(reactOut));
  })

  gulp.task('sass:watch', function () {
    gulp.watch(input, ['sass']);
  });
  
  gulp.task('sass:react:watch', function () {
    gulp.watch(input, ['sass:react']);
  });
}

