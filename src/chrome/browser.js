var event = require("./event");

var browser = {
    createTab: function(url) {
        chrome.tabs.create({url: url});
    },
    setButtonIcon: function(path) {
        chrome.browserAction.setIcon({
            path: path
        });
    },
    setButtonLabel: function(text) {
        chrome.browserAction.setBadgeText({
            text: text
        });
    }
};

module.exports = browser;
