#! /usr/bin/env node
var shell = require("shelljs");
var targets = ['firefox', 'opera', 'chrome'];
var projectDir = shell.pwd();
var exkitDir = "node_modules/exkit";

var prepare = function() {
    if (shell.pwd() !== exkitDir) {
        shell.cd(exkitDir);
    }
};

var build = function (target) {
    if (targets.indexOf(target) == -1) {
        console.error("Target '"+target+"' does not exist.");
    }

    prepare();
    shell.exec("gulp build --target="+target+" --project-dir="+projectDir);
};

var init = function() {
    if (!process.argv[3]) {
        console.error("no target dir set.");
    }

    console.info("Initializing exkit... Hold on a sec");

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
    console.info("command not found");
}

shell.cd(projectDir);
