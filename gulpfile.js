const { watch, src, dest } = require('gulp');
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglifyStyle = require("gulp-uglifycss");

function genJs() {
  return src("./dist-assets/custom/js/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(src('vendor/*.js'))
    .pipe(rename({ extname: '.js' }))
    .pipe(dest('./dist-assets/custom/js/min/'));
}

function uglifyJs() {
  return src("./dist-assets/custom/js/min/app.js")
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./dist-assets/custom/js/min/'));
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
  watch("./dist-assets/custom/js/*.js", genJs);

  watch("./dist-assets/custom/js/min/app.js", uglifyJs);

  watch("./dist-assets/custom/css/*.css", uglifycss);
}
