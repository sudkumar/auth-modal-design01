'use strict';

// load the required files
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// server + watch  
gulp.task('serve', ['sass'], function(){
	
	// create the server
	browserSync.init({
		server: "./app",
		notify: false
		});
	
	// add watch tasks
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html').on('change', browserSync.reload);

	});

// create task for sass
gulp.task('sass', function(){
	return gulp.src('app/sass/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
			}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
	});

// Create the default tasks
gulp.task('default', ['serve']);