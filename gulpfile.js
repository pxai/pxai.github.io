var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('say_hello', function() {
	console.log('Gulp says hello');
});

gulp.task('just_move', function () {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('browserSync', function () {
  browserSync.init({
	server : {
	 baseDir: 'dist'
	}
  });
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Move fonts dir
gulp.task('movefonts', function () {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

// Concat & Minify CSS
gulp.task('minifycss', function () {
   return gulp.src('src/css/*.css')
    .pipe(concat('all.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
//    .pipe(notify({ message: 'CSS minification completed' }));
});

// Concat & Minify JS
gulp.task('minifyjs', function(){
  return gulp.src(['src/js/jquery.js','src/js/modal.js','src/js/custom.js'])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

// Useref & Minify HTML
gulp.task('minifyhtml', function(){
  return gulp.src('src/*.html')
    .pipe(useref({noAssets: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

// Watch Our Files
gulp.task('watch',function() {
  // and now my watch begins...
  gulp.watch('src/js/*.js', ['minifyjs']);
  gulp.watch('src/css/*.css', ['minifycss']);
  gulp.watch('src/index.html', ['minifyhtml']);
});

// Clean dist files
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

// Default
gulp.task('default', ['clean','movefonts','minifyjs','minifycss','minifyhtml','browserSync','watch']);
// Just move files
gulp.task('move',['just_move']);
// Simple task
gulp.task('greet',['say_hello']);
