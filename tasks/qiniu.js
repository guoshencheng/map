var path = require('path');
var qnUpload = require('gulp-qiniu');
var src = path.resolve(__dirname,'../src/resource/*/*.*');
var optionDir = 'mine'
module.exports = function(gulp){
  gulp.task('qiniu',function(){
    gulp.src(src).pipe(qnUpload({
      accessKey: "EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL",
      secretKey: "xOUHlBygVg_dIxPcgWmEVu7GG5jl_XVQ57mrV7o0",
      bucket: "pixigame",
      private: false
    },{
      dir: optionDir,
      versionFile: './cdn.json'
    }))
  });
};
