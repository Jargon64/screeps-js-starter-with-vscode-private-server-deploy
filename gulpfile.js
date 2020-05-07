const gulp = require('gulp');
const flatten = require('gulp-flatten');
const replace = require('gulp-replace');
const screeps = require('gulp-screeps');
const credentials = require('./credentials.js');
 
gulp.task('screeps-official', function() {
  return gulp.src('src/**/*.js')
    .pipe(flatten())
    .pipe(replace(/require\(\'[^\/\']*\/([^\']+)\'\)\;/g, 'require(\'$1\');'))
    .pipe(screeps(credentials.official));
});

gulp.task('screeps-private', function() {
  return gulp.src('src/**/*.js')
    .pipe(flatten())
    .pipe(replace(/require\(\'[^\/\']*\/([^\']+)\'\)\;/g, 'require(\'$1\');'))
    .pipe(screeps(credentials.private));
});
