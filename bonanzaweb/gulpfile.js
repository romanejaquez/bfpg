var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngdocs = require('gulp-ngdocs');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var cleancss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require('path');

var buildDir = 'bin/';

gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('styles.css'))
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('default', function(callback) {
   runSequence('less', 'ts', callback); 
});

