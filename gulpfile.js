var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  less = require('gulp-less'),
  prefix = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-minify-css'),
  markdown = require('gulp-markdown'),
  include = require('gulp-file-include'),
  minifyHTML = require('gulp-html-minifier'),
  size = require('gulp-size'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('styles', function() {
  gulp.src([
    './src/less/styles.less',
    './src/less/ie-styles.less',
    './src/less/grids-responsive.less',
    './src/less/grids-responsive-old-ie.less'
  ])
  .pipe(plumber())
  .pipe(less())
  .pipe(prefix('last 8 versions', "Explorer 7"))
  .pipe(gulp.dest('./dist/css'))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(size({ showFiles: true, title: 'styles' }))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('lint', function() {
  gulp.src('./src/js/scripts.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'], function() {
  gulp.src([
    './src/js/scripts.js',
    './src/js/prism.js'
  ])
  .pipe(concat('scripts.js'))
  .pipe(plumber())
  .pipe(gulp.dest('./dist/js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(size({ showFiles: true, title: 'scripts' }))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('markdown', function() {
  gulp.src('./src/md/**/*.md')
  .pipe(plumber())
  .pipe(markdown())
  .pipe(size({ showFiles: true, title: 'markdown' }))
  .pipe(gulp.dest('./src/inc'));
});

gulp.task('html', ['markdown'], function() {
  gulp.src([
    './src/index.html',
    './src/inc/**/*.html'
  ])
  .pipe(plumber())
  .pipe(include({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(minifyHTML({
    removeComments: true,
    collapseWhitespace: true,
    keepClosingSlash: true
  }))
  .pipe(size({ showFiles: true, title: 'html' }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  gulp.src('./src/img/*')
  .pipe(imagemin({
    progressive: true
  }))
  .pipe(size({ showFiles: true, title: 'images' }))
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function() {
  gulp.src('./src/fonts/*')
  .pipe(size({ showFiles: true, title: 'fonts' }))
  .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
});

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('build', ['styles', 'scripts', 'markdown', 'html', 'images', 'fonts']);

gulp.task('default', ['build', 'browser-sync'], function() {
  gulp.watch('./src/less/**/*.less', ['styles', 'reload']);
  gulp.watch('./src/js/scripts.js', ['scripts', 'reload']);
  gulp.watch(['./src/md/**/*.md', './src/index.html'], ['markdown', 'html', 'reload']);
  gulp.watch('./src/img/*', ['images', 'reload']);
  gulp.watch('./src/fonts/*', ['fonts', 'reload']);
});
