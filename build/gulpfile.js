const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const less = require('gulp-less');
const uglifycss = require('gulp-uglifycss');
const del = require('del');

gulp.task('js', () => {
  return pipeline(
    gulp.src('../src/ui/js/*'),
    concat('common.js'),
    terser(),
    rename({ suffix: '.min' }),
    gulp.dest('../dist/js')
  );
});
gulp.task('cleanJS', () => {
  return del('../dist/js/*', { force: true });
})

gulp.task('css', () => {
  return pipeline(
    gulp.src('../src/ui/css/*'),
    concat('common.css'),
    uglifycss({ maxLineLen: 90 }),
    gulp.dest('../dist/css')
  );
});
gulp.task('cleanCSS', () => {
  return del('../dist/css/*', { force: true });
})

gulp.task('less', () => {
  return pipeline(
    gulp.src('../src/ui/less/*'),
    less(),
    concat('common.less'),
    uglifycss({ maxLineLen: 90 }),
    gulp.dest('../dist/less')
  );
});
gulp.task('cleanLess', () => {
  return del('../dist/less/*', { force: true });
})

gulp.task('image', () => {
  return pipeline(
    gulp.src('../src/ui/imgs/*'),
    gulp.dest('../dist/source/imgs')
  );
})
gulp.task('cleanImage', () => {
  return del("../dist/source/imgs/*", { force: true })
})

gulp.task('prehook', () => {
  return gulp.src('../.git-hooks/*')
    .pipe(gulp.dest('../.git/hooks'))
})

const allResources = ['js', 'css', 'less', 'image', 'prehook'];
const cleanAllResources = ['cleanJS', 'cleanCSS', 'cleanLess', 'cleanImage'];

gulp.task('default', gulp.parallel(allResources));
gulp.task('cleanAllResources', gulp.parallel(cleanAllResources));