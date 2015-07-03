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
