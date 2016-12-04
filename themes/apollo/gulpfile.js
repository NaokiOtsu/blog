var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Sass
gulp.task('sass', function() {
    return gulp.src('./source/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
			browsers: ["last 2 versions", "ie >= 9", "Android >= 2.3", "ios_saf >= 8"], // サポートブラウザ(https://github.com/postcss/autoprefixer#options)
			cascade: false
		}))
        .pipe(gulp.dest('./source/css'));
});

// Defaultタスク
gulp.task('default', ['sass'], function() {
    gulp.watch('./source/scss/_partial/*.scss', ['sass']);
    gulp.watch('./source/scss/*.scss', ['sass']);
});