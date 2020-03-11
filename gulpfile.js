const { watch, src, dest } = require('gulp');
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglifyStyle = require("gulp-uglifycss");

function genJs() {
  return src("./dist-assets/js/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(src('vendor/*.js'))
    .pipe(rename({ extname: '.js' }))
    .pipe(dest('./dist-assets/js/min/'));
}

function uglifyJs() {
  return src("./dist-assets/js/min/app.js")
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./dist-assets/js/min/'));
}

function uglifycss() {
  return src("./dist-assets/custom/css/*.css")
    .pipe(uglifyStyle({
      "maxLineLen": 80,
      "uglyComments": false
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest("./dist-assets/custom/css/min/"))
}


exports.default = function() {
  watch("./dist-assets//js/*.js", genJs);

  watch("./dist-assets//js/min/app.js", uglifyJs);

  watch("./dist-assets//css/*.css", uglifycss);
}
