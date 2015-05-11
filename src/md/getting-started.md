## Getting Started

You'll find some essential files in the root of <code class="language-markup">CHWeb</code> to get up and running with these tools:

- <code class="language-markup">package.json</code> installs dependencies for gulp.js
- <code class="language-markup">gulpfile.js</code> configs the build system with tasks for compiling/minifying LESS and linting/concatenating/compressing JS
- <code class="language-markup">.editorconfig</code> to be used in conjunction with a text editor to keep codebase readable and consistent

### Installing node.js

Download node.js from the [homepage](http://nodejs.org/) and follow their install instructions. Once you have node.js installed, you can grab the build system (gulp.js) dependencies with <code class="language-markup">package.json</code>.

### package.json

In your terminal or command prompt, run the following command to install dependencies from <code class="language-markup">package.json</code>:

<pre>
<code class="language-bash">
&#36; npm install
</code>
</pre>

If you have trouble on a Mac, run this command and enter your system password:

<pre>
<code class="language-bash">
&#36; sudo npm install
</code>
</pre>

You'll notice in the root a new folder has been created called <code class="language-markup">node_modules</code>. This contains all the gulp.js modules that will run tasks in our build system.

### gulpfile.js

This configures all of our gulp tasks in the build system. We will take a look at it's contents bit by bit to better understand how it works.

#### Require

This tells gulp what node modules it needs to work and stores them for use in a task.

<pre>
<code class="language-javascript">
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var size = require('gulp-size');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
</code>
</pre>

#### Styles

This is our <code class="language-markup">'styles'</code> task. First, we tell gulp where to look for the scource files. In the root of <code class="language-markup">CHWeb</code>, you can find the <code class="language-markup">./src</code> directory. This contains the modular LESS components for styling the site. This task checks for LESS compiling errors, has an autoprefixer and distributes both an expanded and a minified version of the source files. The site uses the minified versions, so make sure to deploy those.

Task commad:  <code class="language-markup">$ gulp styles</code>

<pre>
<code class="language-javascript">
gulp.task('styles', function() {
 gulp.src([
  './src/less/styles.less',
  './src/less/ie-styles.less',
  './src/less/grids-responsive.less',
  './src/less/grids-responsive-old-ie.less',
  './src/less/meter.less',
  './src/less/clickshare.less'
 ])
 .pipe(plumber())
 .pipe(less())
 .pipe(prefix('last 8 versions', "Explorer 7"))
 .pipe(gulp.dest('./css'))
 .pipe(minifyCSS())
 .pipe(rename({ suffix: '.min' }))
 .pipe(size({ showFiles: true, title: 'styles' }))
 .pipe(gulp.dest('./css'));
});
</code>
</pre>

#### Lint & Scripts

The <code class="language-markup">'lint'</code> task uses JShint to check for errors and proper syntax. Errors are by default reported in your terminal or command prompt window.

Task commad:  <code class="language-markup">$ gulp lint</code>

<pre>
<code class="language-javascript">
gulp.task('lint', function() {
 gulp.src('./src/js/scripts.js')
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
});
</code>
</pre>

The <code class="language-markup">'scripts'</code> task runs on our JS files, found in <code class="language-markup">./src/js</code>. First, we lint the script for errors, then concatenate into a single file, then compress and distribute to our <code class="language-markup">js</code> folder -- this should be shipped to production.

Task commad:  <code class="language-markup">$ gulp scripts</code>

<pre>
<code class="language-javascript">
gulp.task('scripts', ['lint'], function() {
  gulp.src([
    './src/js/polyfills/*.js',
    './src/js/cci/*.js',
    './src/js/plugins/*.js',
    './src/js/app/*.js'
  ])
  .pipe(plumber())
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(size({ showFiles: true, title: 'scripts' }))
  .pipe(gulp.dest('./js'));
});
</code>
</pre>

#### Watch

The <code class="language-markup">'watch'</code> task will check to see if there are changes being made to our <code class="language-markup">./src</code> files when in development.

Task commad:  <code class="language-markup">$ gulp watch</code>

<pre>
<code class="language-javascript">
gulp.task('watch', function() {
 gulp.watch('./src/less/**/*.less', ['styles']);
 gulp.watch('./src/js/scripts.js', ['scripts']);
});
</code>
</pre>

#### Default

We define the <code class="language-markup">'default'</code> gulp task by telling it to run all of our predefined tasks <code class="language-markup">['styles', 'scripts', 'watch']</code>. When running this task, gulp will compile/concat/minify/compress all LESS and JS and continue to watch those same source files for change.  When working on <code class="language-markup">./src</code> files, any changed/saved file will be piped through the build system and distributed to their defined destinations. You will also notice that the size of these files will print out in your terminal or command prompt window. 
It is recommended that you run the <code class="language-markup">'default'</code> gulp task when in development.

Task command: <code class="language-markup">$ gulp</code>

<pre>
<code class="language-javascript">
gulp.task('default', ['styles', 'scripts', 'watch']);
</code>
</pre>

## Learn More

- [node.js](http://nodejs.org/)
- [gulp.js](http://gulpjs.com/)
- [LESS](http://lesscss.org/)
- [Node Packaged Modules](https://www.npmjs.org/)
- [Building With Gulp](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/)
- [An Introduction To LESS, And Comparison To Sass](http://www.smashingmagazine.com/2011/09/09/an-introduction-to-less-and-comparison-to-sass/)
- [Using the LESS CSS Preprocessor for Smarter Style Sheets](http://www.smashingmagazine.com/2010/12/06/using-the-less-css-preprocessor-for-smarter-style-sheets/)
