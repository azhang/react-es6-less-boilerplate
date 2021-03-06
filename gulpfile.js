var gulp = require('gulp')
  , plugins = require('gulp-load-plugins')()
  , rimraf = require('rimraf')
  , browserSync = require('browser-sync')
  , runSequence = require('run-sequence');
// var karma = require('karma').server;

var STYLES = ['src/css/app.less'];


// DEVELOPMENT TASKS
//================================================

 // BrowserSync Server
gulp.task('browser-sync', function() {
  browserSync.init([
    './src/css/**/*',
    './src/js/**/*',
    './**/*.html'
  ],
  {
    notify: false,
    server: {
      baseDir: ['./']
    },
    port: 3000,
    browser: ["google chrome"],
    tunnel: false
  });
});


// Default
gulp.task('default', ['browser-sync']);

// Tests
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});


// DISTRIBUTION TASKS
//===============================================

// Delete dist Directory
gulp.task('delete-dist', function(cb) {
  rimraf('./dist', cb);
});

// Bundle js with jspm
gulp.task('bundle', plugins.shell.task([
  'jspm bundle-sfx ./src/js/app.js ./dist/js/app.js'
]));

// Build Less -> minified css
gulp.task('less', function() {
  gulp.src(STYLES)
    .on('error', plugins.notify.onError("<%= error.message %>"))
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.less())
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.sourcemaps.init({loadMaps: true})) // Load sourcemaps generated by less
      .pipe(plugins.autoprefixer({}))
      .pipe(plugins.csso())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(plugins.rename('app.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['bundle', 'less']);


// Copy index.html to 'dist'
gulp.task('html', function() {
  gulp.src(['./index.html'])
    .on('error', plugins.notify.onError("<%= error.message %>"))
    .pipe(gulp.dest('./dist'));
});

// Uglify the bundle
gulp.task('uglify', function() {
  return gulp.src('./dist/js/app.js')
    .on('error', plugins.notify.onError("<%= error.message %>"))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.rename('app.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist', function() {
  runSequence(
    'delete-dist',
    ['build', 'html'],
    'uglify'
  );
});
