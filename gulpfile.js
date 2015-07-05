var gulp = require('gulp');
var babel = require('gulp-babel');
var ts = require('gulp-typescript');
var jsonTransform = require('gulp-json-transform');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

var argv = require('yargs').argv;
var shell = require('shelljs');

var projectDir = argv.projectDir;
var projectDist = argv.outputDir;
var projectSrc = argv.projectDir + '/src';
var projectExkitDir = projectDist + '/exkit';

var target = argv.target;

var transformJson = function(transformer, outputName) {
    return gulp.src(projectDir+'/exkit.json')
        .pipe(jsonTransform(transformer, 2))
        .pipe(concat(outputName))
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
                "content_scripts": data['content_scripts'],
                "browser_action": data['browser_action']
            };
        }))
        .pipe(concat('config.json'))
        .pipe(gulp.dest(projectExkitDir));

    // Copy all files that are referenced by content scripts into data folder
    var config = require(projectDir + '/exkit.json');
    config["content_scripts"].forEach(function(current) {
        current["files"].forEach(function (el) {
            gulp.src(projectDist + '/' + el).pipe(concat(el)).pipe(gulp.dest(projectDist+'/data'));
        });
    });

    // Also move helper into data dir
    gulp.src(projectExkitDir + '/dom/helper.js').pipe(concat('helper.js')).pipe(gulp.dest(projectDist+'/data/exkit/dom'));

    // Move all ressources into data
    gulp.src(projectDir+'/resources/**/*').pipe(gulp.dest(projectDist+'/data/resources'));

    transformJson(function (data) {
        return {
            "name": data["name_clean"],
            "id": data["id"],
            "version": data["version"],
            "description": data["description"]
        };
    }, "package.json");

});

gulp.task('chrome', ['compile'], function() {
    transformJson(function (data) {
        var cs = data["content_scripts"].map(function(el) {
            el["files"].unshift("exkit/dom/helper.js");

            return {
                "matches": el["matches"]["chrome"],
                "js": el["files"],
                "run_at": "document_end"
            };
        });

        return {
            "name": data["name"],
            "version": data["version"],
            "description": data["description"],
            "homepage_url": data["homepage_url"],
            "manifest_version": 2,
            "background": {
                "scripts": ["main.js"]
            },
            "content_scripts": cs,
            "browser_action": data["browser_action"]
        };
    }, "manifest.json");

    // Move all ressources into dist
    gulp.src(projectDir+'/resources/**/*').pipe(gulp.dest(projectDist+'/resources'));

    gulp.src(projectDist + '/main.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest(projectDist));
});

gulp.task('opera', ['compile', 'chrome'], function() {
});

gulp.task('compile', ['clean'], function() {
    return gulp.src('src/'+target+'/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(projectExkitDir));
});

gulp.task('user-compile', ['clean'], function() {
    return gulp.src(projectSrc+'/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(projectDist));
});


gulp.task('build', ['clean', target, 'user-compile']);
