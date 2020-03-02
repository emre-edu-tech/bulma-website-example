// Gulp Version 4
// Initialize modules
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const source = require('vinyl-source-stream');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const cssimport = require('gulp-cssimport');

// File path variables
const files = {
	scssPath: 'src/scss/**/*.scss',
	jsPath: 'src/js/**/*.js'
}

// Sass task
const options = {
	includePaths: ['node_modules']
};
// Sass task
function scssTask(){
	return gulp.src(files.scssPath)
				.pipe(sourcemaps.init())
				.pipe(sass())
				.pipe(cssimport(options))
				.pipe(postcss([autoprefixer(), cssnano()]))
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('dist/css/'));
}

// JS Task
function jsTask(){
	return browserify({
            entries: ["./src/js/app.js"]
        })
            // Bundle it all up!
            .bundle()
            // Source the bundle
            .pipe(source('app.js'))
            // Then write the resulting files to a folder
            .pipe(gulp.dest("./dist/js"))
}

// Cachebusting task
const cbString = new Date().getTime();
function cacheBustTask(){
	return gulp.src(['dist/*.html'])
				.pipe(replace(/cb=\d+/g, 'cb=' + cbString))
				.pipe(gulp.dest('./dist'));
}

// Watch task
function watchTask(){
	gulp.watch([files.scssPath, files.jsPath],
        gulp.series(
            gulp.parallel(scssTask, jsTask),
            cacheBustTask
        )
    );
}

// Default task (main gulp task)
exports.default = gulp.series([
		gulp.parallel(scssTask, jsTask),
		cacheBustTask,
		watchTask
]);


// Version 3
// gulp.task('task-name', function(){
// 	return gulp.src('source-files')		// get source files
// 	.pipe(gulpPlugin())					// send it through a gulp plugin
// 	.pipe(gulp.dest('destination'))		// output the file in the destination folder
// });