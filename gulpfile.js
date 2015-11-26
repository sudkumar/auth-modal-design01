'use strict';

// load the required files
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');

// global config variables

var copyAtBuild = ['./app/**/*'];
var removeAtBuild = ['./build/sass', './app/css'];


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



// create the build task
gulp.task('build:before', ['sass']);

gulp.task('build:clean', function(cb){
		return del([
			"./build"
			], cb);
	});

gulp.task('build:copy', ['build:clean', 'build:before'], function(){
	return gulp.src(copyAtBuild)
	.pipe(gulp.dest('./build/'));
	});

gulp.task('build:remove', ['build:copy'], function(cb){
	return del( removeAtBuild, cb);
	});

gulp.task('build', ['build:copy', 'build:remove']);