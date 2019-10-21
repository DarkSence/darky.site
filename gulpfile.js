'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
// var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');

gulp.task('sass' , function () {
  return gulp.src('sass/main.scss')
	 .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
	 .pipe(autoprefixer())
	 .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'));
});

gulp.task('watch',function () {
	gulp.watch('sass/main.scss',gulp.series('sass'));
});

gulp.task('default',gulp.series(gulp.parallel('sass'),
	'watch'
));