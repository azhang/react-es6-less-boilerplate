var gulp = require('gulp')
  , gutil = require('gulp-util')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , watchify = require('watchify')
  , browserify = require('browserify')
  , envify = require('envify')
  , eslint = require('gulp-eslint')
  , less = require('gulp-less')
  , minifyCSS = require('gulp-minify-css')
  , notify = require('gulp-notify')
  , sourcemaps = require('gulp-sourcemaps')
  , uglify = require('gulp-uglify')
  , es6ify = require('es6ify')
  , reactify = require('reactify')
  , connect = require('gulp-connect')
  , livereload = require('gulp-livereload')
;

var STYLES = ['css/app.less']
  , JSENTRY = "./js/app.jsx"
;

gulp.task('watch', function() {

  connect.server({
    root: '',
    livereload: true
  });

  // CSS
  gulp.watch(['css/**/*.less'], ['less']);

  // JS with Browserify
  watchify.args.debug = true;
  watchify.args.extensions = [".jsx"];
  var bundler = watchify(browserify(es6ify.runtime, watchify.args));
  bundler.add(JSENTRY);
  bundler.transform(reactify);
  bundler.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js(x?)$/));

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .on('error', notify.onError("<%= error.message %>"))
      //.on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('build'))
      .pipe(connect.reload())
      .pipe(notify("Finished building js"));
  }

  return rebundle();
});


gulp.task('less', function() {
  gulp.src(STYLES)
    .on('error', notify.onError("<%= error.message %>"))
    .pipe(sourcemaps.init())
      .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
    .pipe(notify("Finished building less"));
});


// gulp.task('files', function() {
//   gulp.src(['./client/*/images/**'])
//     .pipe(gulp.dest('build/client'))
//     .pipe(notify("Finished copying files"));
// });


gulp.task('browserify', function() {
  var bundler = browserify(JSENTRY, { debug: true, extensions: [".jsx"] });
  bundler.transform(reactify);
  bundler.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js(x?)$/));

  var bundle = function() {
    return bundler.bundle()
      .on('error', notify.onError("<%= error.message %>"))
      .pipe(source('app.js'))
      .pipe(gulp.dest('build'))
      .pipe(notify("Finished building js"));
  };
  return bundle();
});


gulp.task('dist', function() {
  // TODO: clean dir
  // TODO: eslint
  // TODO: documentation
  // TODO: testing
  // TODO: Deliver (push to server)
  // TODO: Push to CDN
  // TODO: Version bumper

  // CSS
  gulp.src(STYLES)
    .on('error', notify.onError("<%= error.message %>"))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/Release'));

  // Files
  // gulp.src(['./client/*/images/**'])
  //   .pipe(gulp.dest('build/Release/client'));

  // JS with Browserify
  var bundler = browserify(JSENTRY, {extensions: [".jsx"]});
  bundler.transform(reactify);
  bundler.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js(x?)$/));
  bundler.transofmr(envify);

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify({ compress: { drop_console:true } }))
    .pipe(gulp.dest('build/Release'));
  

  /*var rackspace = {
    'username': '',
    'apiKey': '',
    'region': '',
    'container': ''
  };

  gulp.src('./build/Release/**', {read: false})
    .pipe(cloudfiles(rackspace));*/
});

gulp.task('default', ['less', /*'files',*/ 'browserify']);

