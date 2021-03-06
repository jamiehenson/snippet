var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('sass', function() {
  gulp.src('./src/css/*.scss')
    .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('coffee', function() {
  gulp.src('./src/js/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('jade', function() {
  gulp.src('./src/html/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'));
});

gulp.task('minify-css', function() {
  return gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/css/*.scss', ['sass']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('./src/js/*.coffee', ['coffee']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch('./src/html/*.jade', ['jade']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(['./dist/css/*.css', '!./dist/css/*.min.css'], ['minify-css']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['sass', 'coffee', 'jade', 'minify-css', 'watch']);
