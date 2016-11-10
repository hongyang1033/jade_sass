var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var errorNotify = require('gulp-error-notifier');

//Options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

//Task BrowserSync
gulp.task('browser-sync', function () {
    bs.init({
        server: {
            baseDir: 'dist',
            index: "hello.html"
        }
    });
    gulp.watch('./src/jade/*.jade', ['jade']);
});

//Task jade to HTML
gulp.task('jade', function() {
    gulp.src('./src/*.jade')
    .pipe(errorNotify())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.reload({stream: true}))
});

//Task Sass to css
gulp.task('sass', function () {
    return gulp
    .src('./src/sass/*.sass')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('./dist/style'))
    .pipe(bs.reload({stream: true}))
});

//Task watch
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['./src/*.jade'], ['jade']);
    gulp.watch('./src/sass/*.sass', ['sass']);
});


//Default task
gulp.task('default', ['jade', 'sass', 'watch']);
