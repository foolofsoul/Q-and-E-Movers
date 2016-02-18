var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),

	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

gulp.task('jade', function() {
	return gulp.src('jade/**/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('./css/style.scss')
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['./css', './css/**']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('jade/**/*.jade', ['jade']);
	gulp.watch('css/**/*.scss', ['sass']);
});


gulp.task('default', [ 'connect', 'jade', 'sass', 'watch']);