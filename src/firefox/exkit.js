var config = require('./config.json');
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var event = require('./event');

var exkit = {
    init: function () {
        console.info("initializing page mods");
        for (var contentScript of config["content_scripts"]) {

            var files = contentScript["files"].map(function(path) {
                return self.data.url(path);
            });

            pageMod.PageMod({
                include: contentScript["matches"]["firefox"],
                contentScriptFile: files,
                onAttach: (worker) => event._handlePort(worker.port)
            });
        }
    }
};

module.exports = exkit;
