#! /usr/bin/env node
var shell = require("shelljs");
var targets = ['firefox', 'opera', 'chrome'];
var projectDir = shell.pwd();
var exkitDir = "node_modules/exkit";
var path = require('path');

var prepare = function() {
    if (shell.pwd() !== exkitDir) {
        shell.cd(exkitDir);
    }
};

var build = function (target) {
    if (targets.indexOf(target) == -1) {
        console.error("Target '"+target+"' does not exist.");
    }

    var outputDir = projectDir+"/dist/"+target;

    prepare();
    shell.echo("Compiling exkit for "+target+"... just a sec! (output: '"+outputDir+"')");
    shell.exec("gulp build --silent --target="+target+" --project-dir="+projectDir+" --output-dir="+outputDir);
    shell.cd(projectDir);
    shell.echo(target+" finished");
    shell.echo("");
};

var init = function() {
    if (!process.argv[3]) {
        console.error("no target dir set.");
        return;
    }

    var target = process.argv[3];
    var source = path.resolve(__dirname, '..', 'example');

    console.info("Initializing exkit in "+target+"... Hold on a sec");

    shell.cp("-r", source+'/*', target);
    shell.cd(target);
    shell.exec("npm install");

    console.info("Done! Run 'exkit build' to get started");
};

// 2nd argument is command
switch(process.argv[2]) {
case "build":
    if ((process.argv[3] || null) == null) {
        targets.forEach(function(target) {
            build(target);
        });
        break;
    }

    build(process.argv[3]);
    break;
case "init":
    init();
    break;
default:
    console.info("command not found. Available options are");
    console.info("init  -- initializes new exkit project and loads boilerplate");
    console.info("build -- compiles exkit project into browser extensions.");
    console.info("         The first parameter defines the target. Options are 'firefox', 'opera' and 'chrome'");
    console.info("         If no target is set, exkit will compile for all platforms");
}

shell.cd(projectDir);
