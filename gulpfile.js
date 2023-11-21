var gulp = require('gulp');
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

function runFunc() {
    return gulp.src("draft/css/style.less")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ["last 15 version"]
    }))
    .pipe(gulp.dest("final/css/"))
    .pipe(rename({
        /* dirname: "main/text/ciao",
        basename: "aloha",
        prefix: "bonjour-", */
        suffix: "-min",
        // extname: ".md"
      }))
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("final/css/"));
}

// gulp.task("runf", runFunc);
gulp.task("watch", function () {
    return watch('draft/css/**/*.less', runFunc)
    .pipe(watch("final/index.html", browserSync.reload));
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./final"
        },
        // port: 9000
    });
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));