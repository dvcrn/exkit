var config = require('./config.json');
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var event = require('./event');
var browser = require('./browser');

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

        console.info("Setting browser icon");
        if (typeof config['browser_action'] != undefined) {
            browser._setButton({
                "label": config['browser_action']['default_title'],
                "icon": config['browser_action']['default_icon']
            });
        }
    }
};

module.exports = exkit;
