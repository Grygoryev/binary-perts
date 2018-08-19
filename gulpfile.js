const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        del = require('del'),
        server = require('browser-sync');

gulp.task('pug', () => {
    return gulp.src('src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
})

gulp.task('sass', () => {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
})

gulp.task('img', () => {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('build/img'))
})

gulp.task('server', () => {
    server.init({
        server: {
          baseDir: 'build'
        },
        notify: true
      })
})

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.*', gulp.series('sass'));
    gulp.watch('src/pug/**/*.*', gulp.series('pug'));
    // gulp.watch('src/js/**/*.*', gulp.series('js'));
  
    gulp.watch('build/**/*.*').on('change', server.reload);
  });

  gulp.task('clean', function () {
    return del('build');
  });
  
  gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'img')));
  
  gulp.task('serve', gulp.parallel('watch', 'server'));
  
  gulp.task('dev', gulp.series('build', 'serve'));