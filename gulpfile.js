'use strict'
// Installs
// sudo npm -g install gulp-cli
// sudo npm install gulp --save-dev
// sudo npm install gulp-sass --save-dev
// sudo npm install browser-sync --save-dev
// npm install del gulp-imagemin --save-dev
// npm install gulp-uglify gulp-usemin gulp-rev gulp-clean-css gulp-flatmap gulp-htmlmin --save-dev
// npm install imagemin-mozjpeg imagemin-pngquant --save-dev

var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
del = require('del'),
uglify = require('gulp-uglify'),
usemin= require('gulp-usemin'),
rev = require('gulp-rev'),
cleancss = require('gulp-clean-css'),
flatmap = require('gulp-flatmap'),
htmlmin = require('gulp-htmlmin');

var imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

gulp.task('sass', function () {
	return gulp.src('./css/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest('./css'));

});

gulp.task('sass:watch', function() {
	gulp.watch('./css/*.scss', gulp.series('sass'));

});

gulp.task('browser-sync', function () {
	var files = ['./paginas/*.html', './css/*.css', './images/*.{png,jpg,gif,jpeg}', './js/*.js'];
	browserSync.init(files, {
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('copyfonts', function(){
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
	return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
				.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function(){

   return   gulp.src('imagenes/*')
   			 .pipe(imagemin([
			      pngquant({quality: [0.5, 0.5]}),
			      mozjpeg({quality: 50})
			    ]))
    		.pipe(gulp.dest('dist/imagenes/'))

});


gulp.task('usemin', function(){
	return gulp.src('paginas/*.html')
				.pipe(flatmap(function(stream, file){
					return stream
						.pipe(usemin({
							css: [rev()],
							html: [function() { return htmlmin({collapseWhitespace: true})}],
							js: [uglify(), rev()],
							inlinejs: [uglify()],
							inlinecss: [cleancss(), 'concat']
						}));
				}))

.pipe(gulp.dest('dist/paginas/'));
});

gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));
gulp.task('build', gulp.series('clean','copyfonts','imagemin','usemin'));

