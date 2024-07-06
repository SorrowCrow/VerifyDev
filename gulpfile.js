import gulp from "gulp";
import bs from "browser-sync";
const browserSync = bs.create();

import htmlmin from "gulp-htmlmin";

import concat from "gulp-concat";
import purgecss from "gulp-purgecss";
import cleanCSS from "gulp-clean-css";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// Compile sass into CSS, purge CSS, clean CSS & auto-inject into browsers
gulp.task("sass", function () {
  return gulp
    .src("./scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("app/css/main.css"))
    .pipe(
      purgecss({
        content: ["app/index.html"],
      })
    )
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
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

// Static Server + watching scss/html/JS files
gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./app/",
    });

    gulp.watch("scss/*.scss", gulp.series("sass"));
    gulp.watch("./index.html", gulp.series("html_minify"));
    gulp.watch("app/*.html").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series("serve"));
