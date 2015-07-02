var tabs = require("sdk/tabs");

var browser = {
    createTab: function(url) {
        tabs.open({url: url});
    }
};

module.exports = browser;
