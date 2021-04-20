const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

const htmlmin = require("gulp-htmlmin");

const sass = require("gulp-sass");
const concat = require("gulp-concat");
const purgecss = require("gulp-purgecss");
const cleanCSS = require("gulp-clean-css");

// Compile sass into CSS, purge CSS, clean CSS & auto-inject into browsers
gulp.task("sass", function () {
  return (
    gulp
      .src("./scss/main.scss")
      .pipe(sass())
      .pipe(concat("app/css/main.css"))
      .pipe(purgecss({
          content: ['app/index.html']
      }))
      .pipe(
        cleanCSS({ debug: true }, (details) => {
          console.log(`${details.name}: ${details.stats.originalSize}`);
          console.log(`${details.name}: ${details.stats.minifiedSize}`);
        })
      )
      .pipe(gulp.dest("./"))
      .pipe(browserSync.stream())
  );
});

// Minify html & auto-inject into browsers
gulp.task("html_minify", function () {
  return gulp
    .src("./index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./app"))
    .pipe(browserSync.stream());
});

// Uglify JS & auto-inject into browsers
gulp.task("compressJS", function () {
  return gulp
    .src("scripts/**/*.js")
    .pipe(uglify())
    .pipe(rename("app.ugly.js"))
    .pipe(gulp.dest("app/scripts/"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html/JS files
gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./app/",
    });

    gulp.watch("scripts/**/*.js", gulp.series("compressJS"));
    gulp.watch("scss/*.scss", gulp.series("sass"));
    gulp.watch("./index.html", gulp.series("html_minify"));
    gulp.watch("app/*.html").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series("serve"));
