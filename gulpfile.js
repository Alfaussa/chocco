const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
 
const env = process.env.NODE_ENV;
 
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
 
sass.compiler = require('node-sass');
 
task('clean', () => {
 return src(`${DIST_PATH}/**/*`, { read: false })
   .pipe(rm())
})
task('copy:html', () => {
 return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
})
task('styles', () => {
 return src([...STYLE_LIBS, 'src/styles/main.scss'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpif(env === 'prod', autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
     })))
   .pipe(gulpif(env === 'prod', gcmq()))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(`${DIST_PATH}/styles`))
   .pipe(reload({ stream: true }));
});
const libs = [
 'node_modules/jquery/dist/jquery.js',
 'src/scripts/*.js'
];
task('scripts', () => {
 return src('src/scripts/*.js')
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.js', {newLine: ';'}))
   .pipe(gulpif(env === 'prod', babel({
       presets: ['@babel/env']
     })))
   .pipe(gulpif(env === 'prod', uglify()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(`${DIST_PATH}/scripts`))
   .pipe(reload({ stream: true }));
});
 
task('icons', () => {
  return src('src/images/icons/*.svg')
  .pipe(dest(`${DIST_PATH}/images/icons`));
 });


task( 'images', () => {
  return src("src/images/*.png")
  .pipe(dest("dist/images"));
});

task( 'imagesjpg', () => {
  return src("src/images/*.jpg")
  .pipe(dest("dist/images"));
});

task( 'fonts', () => {
  return src("src/fonts/*")
  .pipe(dest("dist/fonts"));
});

task( 'sprite', () => {
  return src("src/images/icons/sprite.png")
  .pipe(dest("dist/images/icons"));
});
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: true
 });
});
 
task('watch', () => {
 watch('./src/styles/**/*.scss', series('styles'));
 watch('./src/*.html', series('copy:html'));
 watch('./src/scripts/*.js', series('scripts'));
 watch('./src/images/icons/*.svg', series('icons'));
});
 
 
task('default',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons', 'images', 'imagesjpg', 'fonts'),
   parallel('watch', 'server')
 )
);
 
task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons', 'images', 'imagesjpg', 'fonts'))
);