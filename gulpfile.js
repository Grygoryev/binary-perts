const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        del = require('del'),
        minify = require("gulp-csso"),
        rename = require("gulp-rename"),
        imagemin = require("gulp-imagemin"),
        server = require('browser-sync');


gulp.task('pug', () => {
    return gulp.src('src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
})

gulp.task('sass', () => {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('build/css'))
})

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'))
})

gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.optipng({optimisationLevel: 5}),
            imagemin.jpegtran({progressive: true})
        ]))
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
    gulp.watch('src/js/**/*.*', gulp.series('js'));
  
    gulp.watch('build/**/*.*').on('change', server.reload);
  });

  gulp.task('clean', function () {
    return del('build');
  });
  
  gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'img', 'js')));
  
  gulp.task('serve', gulp.parallel('watch', 'server'));
  
  gulp.task('dev', gulp.series('build', 'serve'));