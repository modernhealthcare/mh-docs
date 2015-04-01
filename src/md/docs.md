## Getting Started

You'll find some essential files in the root of `CHWeb` to get up and running with these tools:

- `package.json` installs dependencies for gulp.js
- `gulpfile.js` configs the build system with tasks for compiling/minifying LESS and linting/compressing JS
- `.editorconfig` to be used in conjunction with Sublime Text to keep codebase readable and consistent

### Installing node.js

Download node.js from the [homepage](http://nodejs.org/) and follow their install instructions.  Once you have node.js installed, you can grab the build system (gulp.js) dependencies with `package.json`.

### package.json

In your terminal or command prompt, run the following command to install dependencies from `package.json`:

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

You'll notice in the root a new folder has been created called `node_modules`.  This contains all the gulp.js modules that will run tasks in our build system.

### gulpfile.js

This configures all of our gulp tasks in the build system.  We will take a look at it's contents bit by bit to better understand how it works.

#### Require

This tells gulp what node modules it needs to work and stores them for use in a task.

<pre>
<code class="language-javascript">
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  less = require('gulp-less'),
  prefix = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-minify-css'),
  size = require('gulp-size'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch');
</code>
</pre>

#### Styles

This is our `'styles'` task.  First, we tell gulp where to look for the scource files.  In the root of `CHWeb`, you can find the `src/` directory.  This contains the modular LESS components for styling the site.  The reason we have stylesheets broken out into sepearte sources in so that we only pull in what is neccessary in the browser.  This task checks for LESS compiling errors, has an autoprefixer and distributes both an expanded and a minified version of the source files.  The site uses the minified versions, so make sure to upload those.
This task can be ran on its own: `&#36; gulp styles`

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

The `'lint'` task uses JShint to check for errors and proper syntax.  Errors are by default reported in your terminal or command prompt window.
This task can be ran on its own: `&#36; gulp lint`

<pre>
<code class="language-javascript">
gulp.task('lint', function() {
  gulp.src('./src/js/scripts.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
</code>
</pre>

The `'scripts'` task runs on our main scripts file, found in `src/js/scripts.js`.  First, we lint the script for errors, then we minify and distribute to our `js/` folder as a minified version -- this should be shipped to production.
This task can be ran on its own: `&#36; gulp scripts`

<pre>
<code class="language-javascript">
gulp.task('scripts', ['lint'], function() {
  gulp.src('./src/js/scripts.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(size({ showFiles: true, title: 'scripts' }))
  .pipe(gulp.dest('./js'));
});
</code>
</pre>

#### Watch

The `'watch'` task will check to see if there are changes being made to our `src` files when working on them.
This task can be ran on its own: `&#36; gulp watch`

<pre>
<code class="language-javascript">
gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', ['styles']);
  gulp.watch('./src/js/scripts.js', ['scripts']);
});
</code>
</pre>

#### Default

We define the `'default'` gulp task by telling it to run all of our predefined tasks `['styles', 'scripts', 'watch']`.  When running this task, gulp will compile/minify all LESS and JS, then watch those same files for changes, so that when working on `src/` files, any changed/saved file will be piped through the build system and distributed to their defined destinations.  You will also notice that the size of these files will print out in your terminal or command prompt window.  
It is recommended that you run the `'default'` gulp task when working on source files:  `&#36; gulp`

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
