var gulp = require('gulp');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var jsonTransform = require('gulp-json-transform');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var argv = require('yargs').argv;
var shell = require('shelljs');

var projectDir = argv.projectDir;
var projectDist = argv.projectDir + '/dist';
var projectSrc = argv.projectDir + '/src';
var exkitDir = projectDist + '/exkit';

var target = argv.target;

var transformJson = function(transformer, platform) {
    return gulp.src(projectDir+'/exkit.json')
        .pipe(jsonTransform(transformer))
        .pipe(concat('package.json'))
        .pipe(gulp.dest(projectDist));
};

gulp.task('clean', function() {
    return gulp.src(projectDist, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('firefox', ['compile'], function() {
    gulp.src(projectDir+'/exkit.json')
        .pipe(jsonTransform(function (data) {
            data['content_scripts'].map(function(el) {
                el["files"].unshift("exkit/dom/helper.js");
                return el;
            });
            return {
                "content_scripts": data['content_scripts']
            };
        }))
        .pipe(concat('config.json'))
        .pipe(gulp.dest(exkitDir));

    // Copy all files that are referenced by content scripts into data folder
    var config = require(projectDir + '/exkit.json');
    config["content_scripts"].forEach(function(current) {
        current["files"].forEach(function (el) {
            gulp.src(projectDist + '/' + el).pipe(concat(el)).pipe(gulp.dest(projectDist+'/data'));
        });
    });

    // Also move helper into data dir
    gulp.src(exkitDir + '/dom/helper.js').pipe(concat('helper.js')).pipe(gulp.dest(projectDist+'/data/exkit/dom'));

    return transformJson(function (data) {
        return {
            "name": data["name_clean"],
            "id": data["id"],
            "version": data["version"],
            "description": data["description"]
        };
    });
});

gulp.task('chrome', ['compile'], function() {
    return transformJson(function (data) {
        return data;
    });
});

gulp.task('opera', ['compile'], function() {
    return transformJson(function (data) {
        return data;
    });
});

gulp.task('compile', ['clean'], function() {
    return gulp.src('src/'+target+'/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(exkitDir));
});

gulp.task('user-compile', ['clean'], function() {
    return gulp.src(projectSrc+'/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(projectDist));
});


gulp.task('build', ['clean', target, 'user-compile']);
