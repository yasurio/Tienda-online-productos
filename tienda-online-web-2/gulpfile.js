// Import Modules

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var runSequence = require('run-sequence');

// Paths settings

var paths = {
    dest: 'public/js',
    tsEntry: ['./ts/init.ts'],
    tsFiles: './ts/**/*.ts',
};

// Tasks

gulp.task('ts', function () {
    return browserify({
            basedir: '.',
            debug: true,
            entries: paths.tsEntry,
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('typescript.js'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function () {
    gulp.watch(paths.tsFiles, ['ts']);
});

// Group tasks

gulp.task('default', function(callback) {
    runSequence('ts', 'watch');
});